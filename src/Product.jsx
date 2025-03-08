import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Product() {
  const [count,setCount] = useState(0)  
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || {};
  const user = localStorage.getItem("user");

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!user) {
      if (count < 2) {
        alert("user not logged in");
        setCount(count+1);
      } else if (count <= 5) {
        alert(
          `Please sign in to continue. You've tried ${count} times, but only signed-in users are allowed.`
        );
        setCount(count+1);
      } else {
        navigate("/signup");
      }
    } else {
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-3xl overflow-hidden p-16 flex flex-col md:flex-row items-center md:items-start gap-16">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-[500px] h-[500px] object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold text-gray-900">
            {product.name}
          </h1>
          <p className="mt-8 text-2xl text-gray-700 leading-relaxed">
            {product.description}
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-8">
            Price: ${product.price}
          </p>
          <p className="text-2xl text-gray-800 mt-4">
            Category: {product.category}
          </p>
          <p className="text-3xl text-yellow-500 mt-4">⭐ {product.rating}</p>

          <button
            onClick={addToCart}
            className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold text-2xl px-8 py-4 rounded-xl shadow-lg transition-all duration-300"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
