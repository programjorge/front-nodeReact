import { useState, useEffect, useContext } from "react";
import axios from "axios";
import estrella5 from "../img/5estrellas-removebg-preview.jpg";
import estrella5B from "../img/5estrellas.png";
import { CartContext } from "../context/shop.context";
import estrella0 from "../img/0estrellas-removebg-preview.jpg";
import estrella1 from "../img/1estrellas-removebg-preview.jpg";
import estrella2 from "../img/2estrellas-removebg-preview.jpg";
import estrella3 from "../img/3estrellas-removebg-preview.jpg";
import estrella4 from "../img/4estrellas-removebg-preview.jpg";
import Swal from 'sweetalert2';
import {UserContext} from "../context/userContext";


const Product = ({id,name,price,onAction,img, description}) => {
  const [comentaries, setComentaries] = useState(null);
  const [sendComentaries, setSendComentaries] = useState();
  const [puntuacion, setPuntuacion] = useState();
  const [contador, setContador] = useState(0);
  const [productoComprado, setProductoComprado] = useState(false);

  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const {
    user
    } = useContext(UserContext);
  const desabilitado = () =>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No pueden opinar sobre los productos que no ha comprado',
      footer: '<a href="">Why do I have this issue?</a>'
    });
  }
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
  const postComentary = () =>{
    const url = 'http://localhost:8080/api/comentaries';
      const comentario = document.getElementById("comentario").value;
      if(!comentario){
        return console.log("el comentario no puede estar vacio");
      } else{
          axios.post(url, {
            productId:id,
            description: comentario
          })
          .then(response => {
            Swal.fire({
              position: 'top-bottom',
              icon: 'success',
              title: 'Comentario enviado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            });
          });
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
    const getUserComprador = async() =>{
      if(user){
        let idUsuario = undefined;
        await axios.get("http://localhost:8080/api")
        .then((response) => {
          for(let i = 0; i < response.data.length; i++){
              if(user.userName=== response.data[i].userName && user.password === response.data[i].Password){
                idUsuario = response.data[i].id;
                break;
              }
          }
        }).then(()=>{
          axios.get(
            "http://localhost:8080/api/pedidos"
          ).then(response =>{
            for(let i = 0; i < response.data.length; i++){
              if(idUsuario=== response.data[i].UserId && id === response.data[i].ProductId){
                setProductoComprado(true);
                break;
              }
          }
          })

        })
      }
    }
    const getPuntuaciones = async() =>{
      try{
        await axios.get("http://localhost:8080/api/ratings")
        .then(res =>{
          let contador = 0;
          let totalPuntuaciones = 0;
          let puntuacionFinal = 0;
          res.data.map((puntuacion) =>  {
            if(puntuacion.ProductId === id){
              contador += 1;
              totalPuntuaciones += puntuacion.RatingId;
            }
          })
          puntuacionFinal = totalPuntuaciones/contador;
          setPuntuacion(Math.round(puntuacionFinal));
          setContador(contador);
        })

      }catch (error) {
        console.error(error);
      }
    }
    getComentaries();
    getPuntuaciones();
    getUserComprador();
    
  }, [id]);

  const handleAdd = () =>{
    addToCart({
      id,
      name,
      price,
    });
    Swal.fire({
      position: 'top-bottom',
      icon: 'success',
      title: 'Producto añadido a la cesta correctamente.',
      showConfirmButton: false,
      timer: 1500
    });
  }
  const renderizarEstrella = (puntuaciones) => {
    switch (puntuaciones) {
      case 1:
        return <img className="estrellas" src={estrella1} alt="Imagen 0" />;
      case 2:
        return <img className="estrellas" src={estrella2} alt="Imagen 1" />;
      case 3:
        return <img className="estrellas" src={estrella3} alt="Imagen 2" />;
      case 4:
        return <img className="estrellas" src={estrella4} alt="Imagen 3" />;
        case 5:
          return <img className="estrellas" src={estrella5} alt="Imagen 4" />;
          default:
            return <img className="estrellas" src={estrella0} alt="Imagen default" />;
    }
  };
  const updateRating = async() =>{
    const url = 'http://localhost:8080/api/ratings';
          axios.post(url, {
            ProductId:id,
            RatingId: document.getElementById("selectEstrellas").value
          })
          .then(response => {
            Swal.fire({
              position: 'top-bottom',
              icon: 'success',
              title: 'Puntuacion enviada correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            });
          });
  }
  return (
    <div className="productScreen">
      <div className="leftScreen">
        <input id={id} hidden></input>
        <img src={img}></img>
        <div className="valoraciones">
          {renderizarEstrella(puntuacion)}
          <p>({contador} valoraciones)</p>
        </div>
        <div className="namePrice">
          <b>{name}</b>
        </div>
      </div>
      <div className="rightScreen">
        {comentaries ? (
          
          <div className="verComentarios">
          {productoComprado ? 
            <div className="divPuntuar">            
              <img className="estrella" src={estrella5B}></img>
                <select id = "selectEstrellas">
                    <option className="selectEstrellas" value = "1">1</option>
                    <option className="selectEstrellas" value = "2">2</option>
                    <option className="selectEstrellas" value = "3">3</option>
                    <option className="selectEstrellas" value = "4">4</option>
                    <option className="selectEstrellas" value = "5">5</option>
                </select>
                <button className="puntuar" onClick={updateRating}>Puntuar Producto</button>
              </div> :""}

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
          {productoComprado ?          
          <button onClick={postComentary}>
            <b>Comentar</b>
          </button> :    
          <button className="desabilitado" onClick={desabilitado}>
            <b>Comentar</b>
          </button>}

          {sendComentaries ? <p className="completo">{sendComentaries}</p> : <p className="precio">{sendComentaries}</p>}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x cerrarProduct" viewBox="0 0 16 16" onClick={onAction}>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        <div className="description">
          <em>"{description}"</em>  
        </div>
        <div className="precioAñadir">
          <a>Precio: <b>{price}€</b></a>
          <b onClick = {handleAdd}>Añadir a la cesta</b>
        </div>
      </div>
    </div>
  );
};

export default Product;
