import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category.name}</p>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-blue-600">
          ${product.price}
        </span>
        <span className="text-sm font-medium text-gray-800">
          Stock: {product.stock}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
