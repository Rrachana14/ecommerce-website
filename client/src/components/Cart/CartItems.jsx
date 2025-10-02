import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartItems = ({ cart, onRemoveItem, onUpdateQuantity , setTotalPrice}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    
    setTotalPrice(total);
  }, [cart, setTotalPrice]);

  
 return(
  <table className="w-full  table-fixed text-left border-collapse">
  <thead className="bg-gray-100  ">
    <tr>
      <th className="p-3 border-b ">Image</th>
      <th className="p-3 border-b">Product</th>
      <th className="p-3 border-b">Quantity</th>
      <th className="p-3 border-b">Size</th>
      <th className="p-3 border-b">Price</th>
      <th className="p-3 border-b ">Total</th>
      <th className="p-3 border-b ">Actions</th>
    </tr>
  </thead>
  <tbody>
    {cart.map((item) => {
      const imageUrl = item.product.images || "/placeholder.jpg";
      const price = item.product.price || 0;
      const total = price * item.quantity;
      const product = item.product || {};

      return (
        <tr key={item.id} className="border-b hover:">
          <td className="p-3  ">
            <img
              src={imageUrl}
              alt={product.name || "Product"}
              className="w-20 h-20 object-cover rounded "
            />
          </td>
        <td className="font-semibold font-[ubantu] text-sm"> {product.name || "Unnamed Product"}</td>
          <td className="p-3">
            <div className="flex items-center space-x-2  h-8">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 h-fit"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded h-fit"
              >
                +
              </button>
            </div>
          </td>
          <td className="p-3 text-sm text-gray-700">{item.size || "N/A"}</td>
          <td className="p-3 text-sm text-gray-700">₹{price.toFixed(2)}</td>
          <td className="p-3 text-sm text-gray-700">₹{total.toFixed(2)}</td>
          <td className="p-3">
            <button
              onClick={() => onRemoveItem(item.id)}
              className="text-red-600 hover:text-red-800 text-sm text-start"
            >
              Remove
            </button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

 )
};

export default CartItems;
