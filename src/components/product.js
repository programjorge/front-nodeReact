import { useState, useEffect, useContext } from "react";
import axios from "axios";
import estrella5 from "../img/5estrellas.png"
import { CartContext } from "../context/shop.context";

const Product = ({id,name,price,onAction,img}) => {
  const [comentaries, setComentaries] = useState(null);

  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  } = useContext(CartContext)

  function toggleComentarios(event) {
    event.preventDefault();
    const divComentarios = document.querySelector('.todosComentarios');
    if (divComentarios) {
      divComentarios.classList.add('todosComentariosTrue');
      divComentarios.classList.remove('todosComentarios');
    }
    else{
      const divComentarios = document.querySelector('.todosComentariosTrue');
      if(divComentarios){
        divComentarios.classList.add('todosComentarios');
        divComentarios.classList.remove('todosComentariosTrue');
      }
    }
  }

  useEffect(() => {
    const getComentaries = async () => {
      let productId = id;
      try {
        const response = await axios.get(
          "http://localhost:8080/api/comentaries/" + productId
        );
        setComentaries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getComentaries();
  }, [id]);

  const handleAdd = () =>{
    addToCart({
      id,
      name,
      price,
    })
  }
  return (
    <div className="productScreen">
      <div className="leftScreen">
        <input id={id} hidden></input>
        <img src={img}></img>
        <div className="valoraciones"></div>
        <div className="namePrice">
          <b>{name}</b>
        </div>
      </div>
      <div className="rightScreen">
        {comentaries ? (
          
          <div className="verComentarios">
          <div className="divPuntuar">            <img className="estrella" src={estrella5}></img>
                <select id = "selectEstrellas">
                    <option className="selectEstrellas" value = "0">0</option>
                    <option className="selectEstrellas" value = "1">1</option>
                    <option className="selectEstrellas" value = "2">2</option>
                    <option className="selectEstrellas" value = "3">3</option>
                    <option className="selectEstrellas" value = "4">4</option>
                    <option className="selectEstrellas" value = "5">5</option>
                </select>
                <button className="puntuar">Puntuar Producto</button></div>
            <a onClick={toggleComentarios}>Ver comentarios</a>


            {comentaries.length > 0 ? (
              <div className="todosComentarios">
              {comentaries.map((comentary) => (
                <div className="comentarios" key={comentary.id}>
                  {comentary.description}
                </div>
              ))}
              </div>
            ) : (
              <div className="noProduct">Este producto no tiene comentarios</div>
            )}
          </div>
        ) : (""

        )}
        <div className="divComentario">
          <textarea id="comentario" placeholder="Escriba aquí su comentario"></textarea>
          <button>
            <b>Comentar</b>
          </button>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x cerrarProduct" viewBox="0 0 16 16" onClick={onAction}>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        <a>{price}</a>
        <p onClick = {handleAdd}>añadir</p>
      </div>
    </div>
  );
};

export default Product;
