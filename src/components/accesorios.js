import Layout from "../layaout/layaout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./product";
import Swal from 'sweetalert2';
import accesorios from "../img/accesorios.jpg";

const Accesorios = () => {
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
      <div className="bannerAccesorio" onClick={() => handleDivClick(3)}>
          <div key='3'>
            <b>Teclado gaming</b><br></br>
            <p>Compatible con Windows, Mac, IOS, Linux y Android, este teclado posee un tamaño ideal que se adapta a cualquier setup, perfecto para usarlo tanto en casa como en la oficina y llevártelo donde quiera que vayas, al ser muy cómodo de transportar. Ozone Tactical es un teclado ligero y elegante perfecto para un uso eficaz del espacio. Layout americano.</p>
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
          <h3 className="h3">Todos los accesorios</h3>
          {products.map((product) => (
            product.categoryId === 3 ? 
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
          <h3>Los mejores accesorios</h3>
          <p className="parrafoPromo">Explora nuestro catálogo cuidadosamente seleccionado, donde cada producto ha sido elegido por su calidad, rendimiento y durabilidad. Queremos asegurarnos de que obtengas accesorios que cumplan con tus expectativas y te brinden una ventaja competitiva en tus sesiones de juego.</p>
          <p>Además, nuestra app web ofrece una interfaz intuitiva que te permitirá navegar fácilmente entre las diferentes categorías de productos y leer reseñas de otros usuarios para tomar decisiones informadas. No importa si eres un jugador ocasional o un entusiasta de la informática, aquí encontrarás lo que necesitas para llevar tu experiencia de juego al siguiente nivel.</p>
        </div>
        <div className="map">
          <div>
            <p>Eso no es todo, nuestra app web también presenta promociones exclusivas y descuentos especiales, para que puedas obtener los accesorios que deseas a precios asequibles. Queremos brindarte la mejor experiencia de compra posible y ayudarte a encontrar los complementos perfectos para potenciar tu pasión por los videojuegos y la informática.</p>
            <p>No esperes más, descarga nuestra app web ahora y adéntrate en el emocionante mundo de los accesorios de ordenador y consolas. ¡Prepárate para desatar tu potencial y alcanzar la victoria con los mejores productos del mercado!</p>
          </div>
            <img src = {accesorios} alt = "games" className="imgRelleno"></img>
        </div>
      </Layout>
      )
}
export default Accesorios;