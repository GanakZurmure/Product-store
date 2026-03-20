import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      
      <button
        onClick={() => navigate(-1)}
        className="flex gap-2 mb-6 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
      >
       <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>
</span> 
      </button>

      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg text-black">

    
        <div className="flex justify-center items-center bg-gray-100 p-6 rounded-xl">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            {product.title}
          </h1>

          <p className="text-gray-500 mb-2 capitalize">
            {product.category}
          </p>

          <p className="text-gray-700 mb-4 leading-relaxed">
            {product.description}
          </p>

          <h2 className="text-2xl font-semibold text-green-600 mb-6">
            ${product.price}
          </h2>

          
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            🛒 Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;