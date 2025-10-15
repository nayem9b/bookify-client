import React, { useEffect, useState } from 'react';
import { FaLock, FaCreditCard, FaCcVisa, FaCcMastercard, FaPaypal, FaShoppingCart } from 'react-icons/fa';
import { SiAmericanexpress } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cartSlice';

const Payment = () => {
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  useEffect(() => {
    if (items.length === 0) {
      navigate('/');
    }
  }, [items, navigate]);

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpiry(value);
  };

  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!cardNumber || !cardName || !expiry || !cvv) {
      alert('Please fill in all payment details');
      return;
    }

    try {
      // In a real app, you would process the payment here
      console.log('Processing payment', { cardNumber, cardName, expiry, cvv });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear the cart after successful payment
      dispatch(clearCart());
      
      // Redirect to success page or home with success message
      navigate('/orders', { 
        state: { 
          message: 'Your order has been placed successfully!',
          orderDetails: {
            orderId: `ORDER-${Date.now()}`,
            items,
            total: calculateTotal(),
            date: new Date().toLocaleDateString()
          }
        } 
      });
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600">Enter your payment details below</p>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Order Summary */}
            <div className="p-8 md:w-2/5 bg-gray-50 border-r border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item._id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                        {item.image_url && (
                          <img 
                            src={item.image_url} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.title?.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
                        </h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="p-8 md:w-3/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
                <div className="flex space-x-2">
                  <FaCcVisa className="text-2xl text-blue-900" />
                  <FaCcMastercard className="text-2xl text-red-600" />
                  <SiAmericanexpress className="text-2xl text-blue-800" />
                  <FaPaypal className="text-2xl text-blue-700" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength="19"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                    <FaCreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      value={expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="•••"
                        maxLength="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveCard"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
                    Save card for future payments
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center space-x-2"
                  >
                    <FaLock />
                    <span>Pay ${calculateTotal()}</span>
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center flex items-center justify-center">
                  <FaLock className="mr-1" /> Your payment is secure and encrypted
                </p>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-8 md:w-1/2">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-medium text-gray-800 mb-2">What's included</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Secure payment processing
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 Customer support
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Money-back guarantee
                  </li>
                </ul>
              </div>

              <div className="text-xs text-gray-500 space-y-2">
                <p>By completing your purchase, you agree to our Terms of Service and Privacy Policy.</p>
                <p>All transactions are secure and encrypted.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
