import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../img/logo.png"

const Header = () => {

    //metodos
    //metodo para logearse
    const log = async(event) =>{
        axios.get("http://localhost:8080/api")
        .then((response) => {
           response.data.map((usuario) => {
              if(user.userName === usuario.userName && user.password === usuario.Password){
                console.log("conectado")
                setConnection(true)
              } else {
                document.getElementById("user").className = "error"
                document.getElementById("password").className = "error"
                setError("Usuario o contrasña equivocados")
                setConnection(false)
              }
           })
           }
    
        )
        event.preventDefault();
    }
    //metodo de registro
    const openRegister = () =>{
      setRegister(true)
    }
    const closeRegister = () =>{
      setRegister(false)
    }
    //metodo para conseguir almacenar los value en el usuario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };   
    //hooks
    //user hook
    const [user, setUser] = useState({
        userName: "",
        password: ""
    });

    //conexion hook
    const [connection, setConnection] = useState(false)

    //mensaje de error
    const [error, setError] = useState("")

    //reg hook
    const [register, setRegister] = useState(false)

    //definicion de el state header que tendra el form
    const header = (
      <div className="headerBlock">
          <img className="logo" src = {logo}></img>
          <form onSubmit={log}>
          <a className="parrafoError">{error}</a>
          <input
            id = "user"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            type="text"
            placeholder="Usuario"
          />
          <input 
            id = "password"
            name="password"
            type="password" 
            value={user.password}
            onChange={handleChange}
            placeholder="Contraseña"
           />
          <input type="submit" />
          <a onClick={openRegister}>Registrar</a>
        </form>
      </div>

      );

    //definicion de el state header que tendra el user logeado
      const headerLog = (
        <div className="header"><h1>{user.userName}</h1></div>
      );

    //definicion de la pantalla de registro
    const registerScreen = (
      <div className="offScreen">
        <form className="regScreen">
        <p onClick={closeRegister} className="cerrar">cerrar</p>
        <input
            id = "user"
            name="userNameReg"
            type="text"
            placeholder="Usuario"
          />
        <input 
            id = "password"
            name="password"
            type="password" 
            placeholder="Contraseña"
          />
          <button className="regButton">Registrar</button>
        </form>
      </div>
    )

      return (
      <header className="header">
        {register ? registerScreen : ""}  
        {connection ? headerLog : header}
      </header>)
      
}
export default Header;