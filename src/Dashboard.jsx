import React, { useState, useEffect } from "react";
import data from "./products.json";
import { Link } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} state={{ product }}>
            <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white h-auto min-h-[450px] flex flex-col justify-between transition-transform hover:scale-105">
              

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mb-4"
              />

              <div className="flex flex-col flex-grow text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-2 flex-grow">{product.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">Price: ₹{product.price}</p>
                <p className="text-gray-700 mt-1">Category: {product.category}</p>
                <p className="text-yellow-500 mt-1">⭐ {product.rating}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
