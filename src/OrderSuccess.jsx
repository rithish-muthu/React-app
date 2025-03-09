import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-10 shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase! Your order has been confirmed and will be shipped soon.
        </p>
        

        <div className="bg-green-100 p-4 rounded-lg mb-4">
          <p className="text-green-800 font-semibold">A confirmation email has been sent to your email address.</p>
        </div>


        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          Back to Home 🏠
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
