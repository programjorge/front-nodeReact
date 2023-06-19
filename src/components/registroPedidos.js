import { useState, useContext,useEffect} from "react";
import { CartContext } from "../context/shop.context";
import Layout from "../layaout/layaout";
import axios from "axios";
import {UserContext} from "../context/userContext"
import Swal from 'sweetalert2'
import Product from "./product";

const RegistroPedidos = () =>{

    const [registroPedido, setRegistroPedido] = useState([])

    const {
    cartItems, 
    addToCart, 
    removeFromCart, 
    clearCart } = useContext(CartContext);

    const {
    user
    } = useContext(UserContext)

    const getRegistroPedido = async() =>{
        try{
            let idUsuario = undefined
            await axios.get("http://localhost:8080/api")
            .then((response) => {
               for(let i = 0; i < response.data.length; i++){
                  if(user.userName=== response.data[i].userName && user.password === response.data[i].Password){
                    idUsuario = response.data[i].id
                    break;
                  }
               }
            }).then(()=>{
                const url = 'http://localhost:8080/api/registro/pedidos';
                axios.get(url)
                .then(res =>{
                    let arrayPedidos = []
                    for(let i = 0; i<res.data.length; i++){
                        if(res.data[i].userId === idUsuario){
                            let pedido = JSON.parse(res.data[i].pedido)
                            arrayPedidos.push(pedido)
                        }
                    }
                    setRegistroPedido(arrayPedidos)
                })
            })
        } catch{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido algo inesperado! vuelva a intentar mas tarde',
                footer: '<a href="">Why do I have this issue?</a>'
              })
        }
    }
    useEffect(() => {
        getRegistroPedido()
      }, []);
    return (
        <Layout>
            {registroPedido ? 
            <div>
            {registroPedido.map((pedido,index) => (
                <div key={index}>
                    <h3>pedido {index+1}</h3>
                    {pedido.map((producto) =>(
                        <div key= {producto.length}>
                            <p key={producto.name}>{producto.name}</p>   
                            <p key={producto.price}>{producto.price}</p> 
                            <p key={producto.cantidad}>{producto.cantidad}</p> 
                        </div>
                    ))}
                </div>
            ))}
            </div> : "No hay registro de pedidos"}
         </Layout>
    )
}
export default RegistroPedidos