import React, { useEffect, useState } from "react";
import Nav from "./navBar";
import axios from "axios";
import Layout from "../layaout/layaout";
import Product from "./product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();

  useEffect(() => {
    getProducts();
  }, []);


  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
    } catch (error) {
      // console.error(error);
    }
  };
  const closeProduct = () =>{
      setProduct()
  }

  const handleDivClick = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/products/" + id,
        { params: { id } }
      );
      response.data.id = id
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
        {<Nav/>}
        {product ? (
            <Product id={product.id} name={product.name} price={product.price} img = {product.image} onAction={closeProduct} description={product.description}/>
          ) : null}
        <div className="Products">
          <h3 className="h3">Todos los productos</h3>
          {products.map((product) => (
            <div
              className="divProduct"
              key={product.id}
              onClick={() => handleDivClick(product.id)}
            >
              <img
                className="imgProduct"
                src={product.image}
                alt="productImage"
              />
              <p>{product.name}</p>
              <div className="precio">{product.price}€</div>
            </div>
          ))}
        </div>
    </Layout>
  );
};

export default Home;
