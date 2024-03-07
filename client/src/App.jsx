import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
  const [productData, setProductData] = useState({
    id: '',
    category: '',
    name: '',
    price: '',
    stock: '',
    description: ''
  });
  const [allProducts, setAllProducts] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del producto al backend
    console.log('Datos del producto enviados:', productData);
    try {
      const { data } = await axios.post(
        `http://localhost:8001/data_form_by_body`,
        productData
      );
      console.log('Response BACK, add product FORM + Body:', data);
      setProductData({
        id: '',
        category: '',
        name: '',
        price: '',
        stock: '',
        description: ''
      })
      alert("Producto agragado con éxito")
      return
    } catch (error) {
      console.log('Error en POST -> Datos del producto enviados:', error)
    }
  };

  const addProductObject = async () => {
    const productOnlyObjectVar = {
      id: "0101",
      category: "H",
      name: "VAR",
      price: 987654321,
      stock: 123456789,
      description: "tv UNIQUE"
    }
    try {
      const { data } = await axios.post(
        `http://localhost:8001/data_by_body`,
        productOnlyObjectVar
      );
      console.log('Response BACK, add product object body:', data);
    } catch (error) {
      console.log('Error en POST -> Datos del producto enviados:', error)
    }
  }

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8001/all_products`,
      );
      console.log('Response GET all Products:', data);
      setAllProducts(data.products)
    } catch (error) {
      console.log('Error en POST -> Datos de todos los productos solicitados:', error)
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>CODERHOUSE</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className='container'>
            <input
              type="text"
              name="id"
              value={productData.id}
              placeholder="ID"
              onChange={handleChange}
              key="id"
            />
            <input
              type="text"
              name="category"
              value={productData.category}
              placeholder="Category"
              onChange={handleChange}
              key="category"
            />
            <input
              type="text"
              name="name"
              value={productData.name}
              placeholder="Name"
              onChange={handleChange}
              key="name"
            />
            <input
              type="number"
              name="price"
              value={productData.price}
              placeholder="Price"
              onChange={handleChange}
              key="price"
            />
            <input
              type="number"
              name="stock"
              value={productData.stock}
              placeholder="Stock"
              onChange={handleChange}
              key="stock"
            />
            <input
              type="text"
              name="description"
              value={productData.description}
              placeholder="Description"
              onChange={handleChange}
              key="description"
            />
            <button type="submit">Agregar Producto de FORM por Body</button>
          </div>
        </form>
        <p>
          BACKEND <code>NODE JS</code> Introducción a Express Avanzado
        </p>
        <button onClick={addProductObject}>Agregar Producto data pura object por Body</button>
      </div>
      <div className='list'>
        <button onClick={getAllProducts}>Ver Lista de Productos</button>
        <h3>Lista de Productos:</h3>
        {
          Object.keys(allProducts).length > 0 ? <div className='listDetail'>
            {allProducts?.map((p, index) => {

              return (
                <div className='product' key={p.id ? p.id : index}>
                  <p>Marca: {p.name} <code></code>Precio: {p.price}</p>
                  <p>Categoría: {p.category}</p>
                </div>
              )
            })}
          </div> : null
        }
      </div>
      <p className="read-the-docs">
        Bienvenidos a nuestro curso BackEnd en NodeJS Módulo 1
      </p>
    </>
  );
}

export default App;
