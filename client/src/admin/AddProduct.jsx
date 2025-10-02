import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'western',
    size: [],
    color: [],
    brand: '',
    stock: '',
    images: [],
    materialComposition: '',
    weaveType: '',
    finishType: '',
    pattern: '',
    careInstructions: '',
    style: '',
    countryOfOrigin: '',
  });

  const handleChange = (e) => {
    console.log(formData)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("in")
      const response = await axiosInstance.post('/products', formData);
      console.log('Product added successfully:', response.data);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 h-full w-full">
      <h2 className="text-2xl font-bold mb-4 h-fit">Add Product</h2>
      <div className="grid grid-cols-2 gap-3 h-fit">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          required
          onChange={handleChange}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          required
          onChange={handleChange}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          onChange={handleChange}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
        <select
          name="category"
          onChange={handleChange}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        >
          <option value="western">Western</option>
          <option value="ethnic">Ethnic</option>
          <option value="accessories">Accessories</option>
        </select>
        <input
          type="text"
          name="size"
          placeholder="Sizes (comma-separated)"
          required
          onChange={(e) => setFormData({ ...formData, size: e.target.value.split(',') })}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
        <input
          type="text"
          name="color"
          placeholder="Colors (comma-separated)"
          onChange={(e) => setFormData({ ...formData, color: e.target.value.split(',') })}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          required
          onChange={handleChange}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          required
          onChange={handleChange}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
      {formData.images.map((img, index) => (
  <input
    key={index}
    type="text"
    value={img}
    onChange={(e) => {
      const newImages = [...formData.images];
      newImages[index] = e.target.value;
      setFormData({ ...formData, images: newImages });
    }}
    placeholder={`Image URL ${index + 1}`}
    className="border rounded-lg h-12 px-5 py-2 outline-none mb-2 w-full"
  />
))}

<button
  type="button"
  onClick={() => setFormData({ ...formData, images: [...formData.images, ""] })}
  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
>
  + Add Image
</button>

        <input
          type="text"
          name="materialComposition"
          placeholder="Material Composition"
          required
          onChange={handleChange}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
        <input
          type="text"
          name="weaveType"
          placeholder="Weave Type"
          required
          onChange={handleChange}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
        <input
          type="text"
          name="finishType"
          placeholder="Finish Type"
          required
          onChange={handleChange}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
        <input
          type="text"
          name="pattern"
          placeholder="Pattern"
          required
          onChange={handleChange}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
        <input
          type="text"
          name="careInstructions"
          placeholder="Care Instructions"
          required
          onChange={handleChange}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
        <input
          type="text"
          name="style"
          placeholder="Style"
          required
          onChange={handleChange}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
        <input
          type="text"
          name="countryOfOrigin"
          placeholder="Country of Origin"
          required
          onChange={handleChange}
          className="border rounded-lg h-16 px-5 py-3 outline-none mb-3"
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg my-7">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
