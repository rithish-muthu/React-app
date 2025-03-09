import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit_card",
  });

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill in all fields.");
      return;
    }
    alert("Order placed successfully!");
    localStorage.removeItem("cart"); 
    navigate("/ordersuccess"); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6">Checkout 🛍️</h1>

      <div className="w-full max-w-4xl bg-white shadow-lg p-6 rounded-lg">

        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        {cart.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-2">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-lg text-blue-600">₹{item.price} x {item.quantity}</p>
              </div>
            ))}
            <div className="flex justify-between text-2xl font-bold mt-4">
              <span>Total:</span>
              <span className="text-green-600">₹{totalPrice}</span>
            </div>
          </>
        )}

     
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <textarea
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          ></textarea>

        
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={formData.paymentMethod === "credit_card"}
                onChange={handleChange}
              />
              <span>Credit/Debit Card</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === "paypal"}
                onChange={handleChange}
              />
              <span>PayPal</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              <span>Cash on Delivery</span>
            </label>
          </div>

      
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-3 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Place Order ✅
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;

