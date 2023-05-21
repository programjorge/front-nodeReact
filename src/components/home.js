import React, { useEffect, useState } from 'react';
import Nav from "./navBar"
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDivClick = (id) => {
    console.log('Clicked div ID:', id);
  };

  return (
    <main>
      {<Nav/>}
      <div className='Products'>
      <h3 className='h3'>Todos los productos</h3>
        {products.map((product) => (
          <div className='divProduct' key={product.id} onClick={() => handleDivClick(product.id)}>
            <img className='imgProduct' src={product.image} alt="productImage" />
            <p>{product.name}</p>
            <div className='precio'>{product.price}€</div>
          </div>
      ))}
      </div>
    </main>
  );
};

export default Home;
