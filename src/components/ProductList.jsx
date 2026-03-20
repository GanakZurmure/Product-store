import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import Filter from "./Filter";

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // ✅ NEW STATES
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products ❌");
        setLoading(false);
      });
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (category ? p.category === category : true)
  );

  // ✅ LOADING UI
  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
</div>
    );
  }

  // ✅ ERROR UI
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">

      {/* Search + Filter */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
       <div className="flex flex-col md:flex-row gap-4 items-center">
  
  {/* Search */}
  <div className="w-full md:w-2/3">
    <SearchBar setSearch={setSearch} />
  </div>

  {/* Filter */}
  <div className="w-full md:w-1/3">
    <Filter setCategory={setCategory} />
  </div>

</div>
      </div>

      {/* Products */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No products found </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              addToCart={addToCart} // ✅ PASS THIS
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;