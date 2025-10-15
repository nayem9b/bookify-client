import React, { createContext, useEffect, useState, useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../Firebase/Firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [authError, setAuthError] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  // Fetch user role from your backend
  const fetchUserRole = useCallback(async (currentUser) => {
    if (!currentUser) {
      setUserRole(null);
      return;
    }
    
    try {
      const idToken = await currentUser.getIdToken();
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/api/user/role', {
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserRole(data.role);
      } else {
        console.error('Failed to fetch user role');
        setUserRole('buyer'); // Default role if fetch fails
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole('buyer'); // Default role on error
    }
  }, []);

  // Handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserRole(currentUser);
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchUserRole]);

  // Google Sign In
  const googleSignIn = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Sign In
  const userSignIn = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // User Registration
  const userSignUp = async (email, password, userData = {}) => {
    setLoading(true);
    setAuthError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save additional user data to your backend
      const idToken = await result.user.getIdToken();
      await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          uid: result.user.uid,
          email: result.user.email,
          ...userData,
          role: 'buyer', // Default role
        }),
      });
      
      return result;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // User Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Check if user has required role
  const hasRole = (requiredRole) => {
    if (!user) return false;
    return userRole === requiredRole;
  };

  const authInfo = {
    user,
    userRole,
    loading,
    authError,
    googleSignIn,
    userSignIn,
    userSignUp,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default UserContext;
