import Layout from "../layaout/layaout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./product";
import Swal from 'sweetalert2';
import consolas from "../img/consolas.jpg";

const Consolas = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const closeProduct = () =>{
    setProduct();
  }
  const search = () =>{
    let busqueda = document.getElementById("buscador").value;
    for(let i = 0; i<products.length; i++){
      if(products[i].name === busqueda){
        handleDivClick(products[i].id);
        break;
      } else{
        if(i === products.length-1 && products[i].name !== busqueda){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha encontrado el producto que buscas',
            footer: '<a href="">Why do I have this issue?</a>'
          });
        }
      }
    }
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
    return (
      <Layout>
            {product ? (
            <Product id={product.id} name={product.name} price={product.price} img = {product.image} onAction={closeProduct} description={product.description}/>
          ) : null}
      <div className="bannerConsole" onClick={() => handleDivClick(2)}>
          <div key='2'>
            <b>Play Station 5</b><br></br>
            <p>¡Experimenta el futuro del entretenimiento con la asombrosa PS5! Sumérgete en una nueva era de juegos con gráficos impresionantes, velocidades de carga ultrarrápidas y una inmersión total en tus títulos favoritos. La PS5 redefine los límites de lo que es posible en los videojuegos, llevándote a mundos extraordinarios llenos de realismo y emociones intensas. Descubre una experiencia de juego sin precedentes con su potente procesador, su innovador control DualSense y su compatibilidad con la tecnología de trazado de rayos.</p>
          </div>
        </div>
        <div className="divBuscador">
          <div className="divInputBuscador">
            <input id = "buscador" placeholder="Buscar producto..."></input>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" onClick={search}>
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </div>
        </div>
        <div className="Products">
          <h3 className="h3">Todas las Consolas</h3>
          {products.map((product) => (
            product.categoryId === 2 ? 
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
            : ""
          ))}
        </div>
        <div className="divParrafoPromo">
          <h3>Las mejores consolas</h3>
          <p className="parrafoPromo">¡Bienvenido a nuestra app web, tu destino número uno para encontrar las mejores consolas y la aclamada PS en un solo lugar! Prepárate para descubrir una experiencia de juego extraordinaria que te llevará a nuevos horizontes de diversión y entretenimiento.</p>
          <p>En nuestra app, te ofrecemos una selección cuidadosamente curada de las consolas más innovadoras del mercado, incluida la codiciada PS. Desde la última generación de PlayStation hasta las consolas más populares del momento, aquí encontrarás todo lo que necesitas para disfrutar de experiencias de juego inolvidables.</p>
        </div>
        <div className="map">
          <div>
            <p>Ya sea que estés buscando una consola para ti o quieras hacer un regalo especial, nuestra app web tiene todo lo que necesitas. Explora nuestra amplia gama de opciones, desde packs completos hasta ediciones limitadas, y encuentra la consola perfecta que se adapte a tus necesidades y preferencias.</p>
            <p>Pero eso no es todo. También ofrecemos una variedad de accesorios y complementos que elevarán tu experiencia de juego a otro nivel. Desde mandos adicionales hasta auriculares de alta calidad, estamos comprometidos en brindarte todo lo necesario para disfrutar al máximo cada partida</p>
          </div>
            <img src = {consolas} alt = "games" className="imgRelleno"></img>
        </div>
      </Layout>
      )
}
export default Consolas;