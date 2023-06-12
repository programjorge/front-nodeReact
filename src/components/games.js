
import Layout from "../layaout/layaout"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./product";
const Games = () => {
      const [products, setProducts] = useState([]);
      const [product, setProduct] = useState();
      const closeProduct = () =>{
            setProduct()
        }
      //   useEffect(() => {
      //       getProducts();
      //     }, []);
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
            {product ? (
            <Product id={product.id} name={product.name} price={product.price} img = {product.image} onAction={closeProduct} description={product.description}/>
          ) : null}
      <div className="bannerHome" onClick={() => handleDivClick(6)}>
          <div key='6'>
            <b>Entra en un mundo de aventura</b><br></br>
            <p>Olvida todo lo que sabes sobre los juegos de The Legend of Zelda. Entra en un mundo de descubrimientos, exploración y aventura en The Legend of Zelda: Breath of the Wild, un juego de la serie que rompe con las convenciones. Viaja por prados, bosques y cumbres montañosas para descubrir qué ha sido del asolado reino de Hyrule en esta aventura a cielo abierto.</p>
          </div>
        </div>
      </Layout>
      )
}
export default Games;