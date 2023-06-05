import { useState, useContext } from "react";
import { CartContext } from "../context/shop.context";
import Layout from "../layaout/layaout"
import tarjetas from "../img/tarjetas.png"
import logo from "../img/logo.png"

const Shop = () => {
    const {
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart } = useContext(CartContext);
    var precioTotal = 0;
    const handleDelete = (id) =>{
        removeFromCart(id)
    }
    return (
      <Layout>
            <div>
                <h3>Carrito de la compra</h3>
                {cartItems.length > 0 ? 
                    <div className="shop">
                        <div className="shopItems">
                        {cartItems.map((product, index) =>{
                            {precioTotal += product.price * product.cantidad}
                            return (
                            <div id = {"producto"+index} className="productoCarrito">
                                <b id = {"name"+index}>{product.name}</b>
                                <b id = {"price"+index}>{product.price}€</b>
                                <b id = {"cantidad"+index}>{product.cantidad}</b>
                                <svg onClick={() => handleDelete(product.id)} id = {"eliminar"+index} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3-fill precio" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                            </div>)
                            
                        })}
                        </div>
                        <div className="precioTotal">
                           <b>Precio total: {precioTotal} €</b> 
                        </div>
                        <div className="totalForm">
                            <div className="formPedido">
                                <div className="formLogitos">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                </svg>
                                <input id = "nombreReceptor" placeholder="Nombre del receptor" type="text"></input>
                                </div>
                                <div className="formLogitos">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
                                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                                    </svg>
                                    <input id = "adress" placeholder="Dirección" type="text"></input>
                                </div>
                                <div className="pisoPortal">
                                    <input id = "piso" placeholder=" Nº piso (opcional)" type="number"></input>
                                    <input id = "portal" placeholder="Portal (opcional)" type="text"></input>
                                </div>
                                <div className="formLogitos">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16">
                                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                    </svg>
                                    <input id = "telefono" placeholder="Telefono" type="number"></input>
                                </div>
                                <div className="formLogitos">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                                    </svg>
                                    <input id = "tarjeta" placeholder="Nº tarjeta" type="number"></input>
                                </div>
                                
                                <img id = "imgTarjetas" src={tarjetas}></img>
                                <div className="pisoPortal">
                                    <input id = "mesExpiracion" placeholder="mes expiración" type="number"></input>
                                    <input id = "añExpiracion" placeholder="año expiración" type="text"></input>
                                </div>
                                <input id = "cvc" placeholder="CVC" type="number"></input>
                                
                                <button>Realizar pedido</button>
                            </div>
                            <div><img className="logoForm" src = {logo} alt = "logo"></img></div>
                        </div>
                    </div>
                     : <p>No hay prodcutos en el carrito</p> }
            </div>
      </Layout>
      )
}
export default Shop;