import Layout from "../layaout/layaout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./product";
import Swal from 'sweetalert2';
import pack from "../img/pack.jpg";

const Packs = () => {
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
        break
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
    }
  };
    return (
      <Layout>
            {product ? (
            <Product id={product.id} name={product.name} price={product.price} img = {product.image} onAction={closeProduct} description={product.description}/>
          ) : null}
      <div className="bannerPacks" onClick={() => handleDivClick(4)}>
          <div key='4'>
            <b>Combo MCPX</b><br></br>
            <p>En este combo no puedes dejarlo pasar, contiene unos auriculares, teclado y monitor RGX con luces RGB de la ultima calidad y lo ultimo en el mercado</p>
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
          <h3 className="h3">Todos los packs</h3>
          {products.map((product) => (
            product.categoryId === 4 ? 
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
          <h3>Los mejores packs</h3>
          <p className="parrafoPromo">Explora nuestro catálogo cuidadosamente seleccionado, donde cada producto ha sido elegido por su calidad, rendimiento y durabilidad. Queremos asegurarnos de que obtengas accesorios que cumplan con tus expectativas y te brinden una ventaja competitiva en tus sesiones de juego.En nuestra app web, te ofrecemos una amplia gama de packs gaming, desde configuraciones de PC personalizadas hasta bundles para consolas de última generación. Cada pack ha sido diseñado teniendo en cuenta las necesidades y preferencias de los jugadores más exigentes, para que puedas sumergirte de lleno en tus juegos favoritos sin preocuparte por nada más.</p>
          <p>Nuestros packs incluyen componentes de primera calidad, como potentes procesadores, tarjetas gráficas de última generación, monitores de alta resolución y mucho más. Además, también encontrarás una selección de accesorios de primer nivel, como teclados mecánicos, ratones de precisión y auriculares envolventes, para que puedas disfrutar de una experiencia de juego inigualable.</p>
        </div>
        <div className="map">
          <div>
            <p>Nuestra app web también te ofrece la comodidad de comparar diferentes packs y leer reseñas de otros jugadores, para que puedas tomar la mejor decisión según tus necesidades y presupuesto. Y lo mejor de todo, nuestros packs gaming vienen con precios competitivos y promociones exclusivas, para que obtengas el máximo valor por tu inversión.</p>
            <p>Así que no esperes más, descarga nuestra app web y descubre los packs gaming que te llevarán a un nuevo nivel de diversión y emoción. Prepara tus habilidades, desafía los límites y vive la experiencia de juego definitiva. ¡Los mejores momentos te esperan con nuestros increíbles packs gaming!</p>
          </div>
            <img src = {pack} alt = "games" className="imgRelleno"></img>
        </div>
      </Layout>
      )
}
export default Packs;