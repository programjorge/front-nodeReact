import React, { useEffect, useState } from "react";
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
        {product ? (
            <Product id={product.id} name={product.name} price={product.price} img = {product.image} onAction={closeProduct} description={product.description}/>
          ) : null}
          <div className="bannerHome" onClick={() => handleDivClick(6)}>
          <div key='6'>
            <b>Entra en un mundo de aventura</b><br></br>
            <p>Olvida todo lo que sabes sobre los juegos de The Legend of Zelda. Entra en un mundo de descubrimientos, exploración y aventura en The Legend of Zelda: Breath of the Wild, un juego de la serie que rompe con las convenciones. Viaja por prados, bosques y cumbres montañosas para descubrir qué ha sido del asolado reino de Hyrule en esta aventura a cielo abierto.</p>
          </div>
        </div>
        <div className="Products">
          <h3 className="h3">Todos los productos</h3>
          {products.slice(0, 6).map((product) => (
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
        <div className="intro">
            <h2>¿Por que elegir C-GAMING?</h2>
            <div className="intro-cols">
                <div>
                  <div className="iconoIntro"></div>
                  <h3>Envío rapido</h3>
                  <p>Nos caracterizamos por un envio rapido a nuestro cliente en cualquier parte del territorio nacional.</p>
                </div>
                <div>
                  <div className="iconoPagar"></div>
                  <h3>Pago seguro</h3>
                  <p>Nuestro pago es 100% seguro acorde a la ley nacional de España</p>
                </div>
                <div>
                  <div className="iconoPrecios"></div>
                  <h3>Mejores precios</h3>
                  <p>Tenemos los mejores precios en mismos productos que otras tiendas</p>
                </div>
            </div>
        </div>
        <div className="map">
          <div>
            <h5>Haznos una visita</h5>
            encuentranos en nuestra tienda física si desea un trato todavia mas cercano o cree que podemos ayudarle en alguna incidencia.
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24223.162673245213!2d-3.1731725!3d40.63219015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd43ac63987ff53b%3A0x800a702e2c07492e!2sGuadalajara!5e0!3m2!1ses!2ses!4v1686579671725!5m2!1ses!2ses" title="guadalajara" width="400" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </Layout>
  );
};

export default Home;
