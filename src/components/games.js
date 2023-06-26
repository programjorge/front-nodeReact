
import Layout from "../layaout/layaout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./product";
import Swal from 'sweetalert2';
import gamesImg from "../img/games.jpg";

const Games = () => {
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
      <div className="bannerHome" onClick={() => handleDivClick(7)}>
          <div key='6'>
            <b>Entra en un mundo de aventura</b><br></br>
            <p>Olvida todo lo que sabes sobre los juegos de The Legend of Zelda. Entra en un mundo de descubrimientos, exploración y aventura en The Legend of Zelda: Breath of the Wild, un juego de la serie que rompe con las convenciones. Viaja por prados, bosques y cumbres montañosas para descubrir qué ha sido del asolado reino de Hyrule en esta aventura a cielo abierto.</p>
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
          <h3 className="h3">Todos los Videojuegos</h3>
          {products.map((product) => (
            product.categoryId === 1 ? 
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
          <h3>Los mejores juegos</h3>
          <p className="parrafoPromo">¡Celebra la emoción de los videojuegos con nuestra venta especial en la app web! Sumérgete en un mundo lleno de aventuras, desafíos y diversión ilimitada mientras disfrutas de los mejores títulos a precios increíbles!</p>
          <p>¿Estás buscando el juego perfecto para desafiar tus habilidades estratégicas? ¿O tal vez deseas sumergirte en un apasionante universo de fantasía? No importa qué tipo de jugador seas, nuestra venta de videojuegos tiene algo para todos.</p>
        </div>
        <div className="map">
          <div>
            <p>Nuestra venta no se limita solo a los juegos. También encontrarás accesorios y equipos de alta calidad para mejorar tu experiencia de juego. Desde auriculares envolventes hasta controles especializados, estamos comprometidos en brindarte todo lo que necesitas para alcanzar la victoria.</p>
            <p>¡No dejes pasar esta oportunidad! La venta de videojuegos en nuestra app web es una ocasión única para disfrutar de emocionantes aventuras a precios inigualables. Haz clic en el enlace y sumérgete en un universo de diversión inigualable. ¡Prepárate para jugar como nunca antes lo habías hecho!</p>
          </div>
            <img src = {gamesImg} alt = "games" className="imgRelleno"></img>
        </div>
      </Layout>
      )
}
export default Games;