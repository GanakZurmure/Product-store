import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 p-4 flex flex-col">

      <Link to={`/product/${product.id}`}>
        <div className="h-44 flex items-center justify-center mb-3">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain hover:scale-105 transition"
          />
        </div>

        <h2 className="text-sm font-semibold line-clamp-2 min-h-[40px]">
          {product.title}
        </h2>

        <p className="text-xs text-gray-500 mt-1 capitalize">
          {product.category}
        </p>

        <p className="text-yellow-500 text-sm mt-1">
          ⭐ {product.rating?.rate}
        </p>

        <p className="text-green-600 font-bold text-lg mt-2">
          ${product.price}
        </p>
      </Link>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
      >
        🛒 Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;