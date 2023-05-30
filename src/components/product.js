import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/shop.context";
import axios from "axios";

const Product = (props) => {
  // const {
  //     cartItems,
  //     addToCart,
  //     removeFromCart,
  //     clearCart } = useContext(CartContext);
  //     const handleAddToCart = (props) => {
  //         addToCart(props);
  //       };
  const [comentaries, setComentaries] = useState(null);

  useEffect(() => {
    const getComentaries = async () => {
      let productId = props.id;
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
  }, [props.id]); // Agrega props.id como dependencia del useEffect

  return (
    <div className="productScreen">
      <div className="leftScreen">
        <input id={props.id} hidden></input>
        <img src={props.img}></img>
        <div className="valoraciones"></div>
        <div className="namePrice">
          <b>{props.name}</b>
        </div>
      </div>
      <div className="rightScreen">
        {comentaries ? ( 
            <div>
                <a>Ver comentarios</a>
                <div>
                    {comentaries.map((comentary) => (
                        <div>{comentary.description}</div>
                    ))}
                </div>
            </div>
        ) : (
          <a>Este producto no tiene comentarios</a>
        )}
        <p onClick={props.onAction}>CERRAR</p>
        <a>{props.price}</a>
        <p onClick>añadir</p>
      </div>
    </div>
  );
};

export default Product;
