import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    );
    
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleBuyNow = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    alert("Redirecting to payment...");
    navigate("/checkout");  
  };
  

  return (
<div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
  <h1 className="text-4xl font-bold mb-6">Your Cart 🛒</h1>

  {cart.length === 0 ? (
    <p className="text-xl">Your cart is empty.</p>
  ) : (
    <div className="w-full max-w-4xl bg-white shadow-lg p-6 rounded-lg">
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center border-b py-4">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="text-lg font-bold text-blue-600">${item.price}</p>

          <div className="flex items-center">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="px-3 py-1 bg-gray-200 text-lg font-bold"
            >
              -
            </button>
            <span className="px-4">{item.quantity}</span>
            <button
              onClick={() => increaseQuantity(item.id)}
              className="px-3 py-1 bg-gray-200 text-lg font-bold"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 hover:text-red-800 font-bold"
          >
            Remove ❌
          </button>
        </div>
      ))}

      {/* Total Price */}
      <div className="flex justify-between items-center mt-6 text-2xl font-bold">
        <span>Total Amount:</span>
        <span className="text-green-600">${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
      </div>

      {/* Buy Now Button */}
      <button
        onClick={handleBuyNow}
        className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-3 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        Buy Now 🛍️
      </button>
    </div>
  )}
</div>

  );
}

export default Cart;
