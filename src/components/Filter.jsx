import { useState, useRef, useEffect } from "react";

function Filter({ setCategory }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select Category"); // ✅ track selected
  const dropdownRef = useRef();

  const categories = [
    { label: "All Categories", value: "" },
    { label: "Men", value: "men's clothing" },
    { label: "Women", value: "women's clothing" },
    { label: "Jewelery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
  ];

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-10 px-3 border rounded-lg bg-white text-left shadow-sm"
      >
        {selected} {/* ✅ show selected category */}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-10">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => {
                setCategory(cat.value);  // update parent
                setSelected(cat.label);  // update button text
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded-lg"
            >
              {cat.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filter;