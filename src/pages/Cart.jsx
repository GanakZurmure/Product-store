import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

function Cart({ cart, setCart }) {
  const navigate = useNavigate(); // ✅ navigate hook
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 0.5 sec

    return () => clearTimeout(timer);
  }, []);

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // ✅ LOADING UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // go back
        className="mb-6 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
      >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>

      </button>

      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-xl shadow">

              <div className="flex items-center gap-4">
                <img src={item.image} className="h-16" alt={item.title}/>
                <div>
                  <h2 className="text-sm font-semibold">{item.title}</h2>
                  <p className="text-green-600 font-bold">${item.price}</p>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>

            </div>
          ))}

          <div className="text-right text-xl font-bold mt-4">
            Total: ${total.toFixed(2)}
          </div>

        </div>
      )}

    </div>
  );
}

export default Cart;