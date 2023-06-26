import { useState, useContext,useEffect} from "react";
import Layout from "../layaout/layaout";
import axios from "axios";
import {UserContext} from "../context/userContext";
import Swal from 'sweetalert2';
import imagen from "../img/moto.png";

const RegistroPedidos = () =>{

    const [registroPedido, setRegistroPedido] = useState([]);

    const {
    user
    } = useContext(UserContext);

    const getRegistroPedido = async() =>{
        try{
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
                const url = 'http://localhost:8080/api/registro/pedidos';
                axios.get(url)
                .then(res =>{
                    let arrayPedidos = [];
                    for(let i = 0; i<res.data.length; i++){
                        if(res.data[i].userId === idUsuario){
                            let pedido = JSON.parse(res.data[i].pedido);
                            arrayPedidos.push(pedido);
                        }
                    }
                    setRegistroPedido(arrayPedidos);
                })
            })
        } catch{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido algo inesperado! vuelva a intentar mas tarde',
                footer: '<a href="">Why do I have this issue?</a>'
              });
        }
    }
    useEffect(() => {
        getRegistroPedido();
      }, []);
      var precioTotal = 0;
    return (
        <Layout>
            <img className="moto" src = {imagen}></img>
            {registroPedido ? 
            <div className="todosRegistros">
            {registroPedido.map((pedido,index) => (
                <div key={index} className="divRegistroPedidos">
                    <h3>Pedido {index+1}</h3>
                    {pedido.map((producto) =>(
                        <div key= {producto.length} className="divRegistroPedidos2">
                            <p key={producto.name}><b>Producto:</b> {producto.name} ,</p> 
                            <p><b>Precio:</b> {producto.price}€ ,</p> 
                            <p><b>Cantidad:</b>x{producto.cantidad}</p>
                            <p hidden>{precioTotal += producto.price * producto.cantidad}</p>
                            
                        </div>
                    ))}
                    <b>Precio total: {precioTotal}€ </b>
                    <p hidden>{precioTotal = 0}</p>
                </div>
            ))}
            </div> : "No hay registro de pedidos"}

         </Layout>
    )
}
export default RegistroPedidos;