import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isOpen: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload || [];
    },
    addToWishlist: (state, action) => {
      const exists = state.items.find(i => i.id === action.payload.id || i._id === action.payload._id);
      if (!exists) state.items.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id && i._id !== id);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    toggleWishlist: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
