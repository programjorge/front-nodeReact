import axios from "axios";
import { useState } from "react";
import logo from "../img/logo.png"

const Header = () => {

    //metodos
    //metodo para logearse
    const log = async(event) =>{
        axios.get("http://localhost:8080/api")
        .then((response) => {
           for(let i = 0; i < response.data.length; i++){
              if(user.userName === response.data[i].userName && user.password === response.data[i].Password){
                setConnection(true)
                break;
              } else {
                document.getElementById("user").className = "error"
                document.getElementById("password").className = "error"
                setError("Usuario o contrasña equivocados")
                setConnection(false)
              }
           }
        })
        event.preventDefault();
    }

    //metodo para abrir la pestaña de regitro
    const openRegister = () =>{
      setRegister(true)
    }

    //metodo para cerrar la pestaña de registro
    const closeRegister = () =>{
      setRegister(false)
    }

    //metodo para registrar usuario
    const registerUser = async(event) =>{
      if(userReg.userNameReg !== "" && userReg.passwordReg !== ""){
        let data = {
          title: 'Mi post registro',
          body: 'post para registrar un usuario',
          userName: userReg.userNameReg,
          Password: userReg.passwordReg
        }
        axios.post("http://localhost:8080/api", data)
        .then(() =>{
          axios.get("http://localhost:8080/api")
          .then((response) => {
            for(let i = 0; i < response.data.length; i++){
              if(user.userName === response.data[i].userName && user.password === response.data[i].Password){
                 break;
              }
            }
          }).then(()=>{
            setRegister(false)
            setError("")
            setregComplete("Usuario registrado")
          })
        })
        .catch(error => {
          setErrorReg("Este usuario ya esta registrado")
        });
      } else {
        console.log("no pueden estar vacios")

      }
      event.preventDefault();
    }

    //metodo para conseguir almacenar los value en el usuario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };

    //igual pero para registros
    const handleChangeReg = (event) => {
      const { name, value } = event.target;
      setUserReg((prevData) => ({
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

    //user register hook
    const [userReg, setUserReg] = useState({
      userNameReg:"",
      passwordReg:""
    })

    //conexion hook
    const [connection, setConnection] = useState(false)

    const [regComplete, setregComplete] = useState("")

    //mensaje de error login
    const [error, setError] = useState("")

    //mensaje de error registro
    const [errorReg, setErrorReg] = useState("")

    //reg hook
    const [register, setRegister] = useState(false)

    //definicion de el state header que tendra el form
    const header = (
      <div className="headerBlock">
          <img className="logo" alt = "logo" src = {logo}></img>
          <form onSubmit={log}>
          <a className="parrafoError">{error}</a>
          <a className="completo">{regComplete}</a>
          <input
            id = "user"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            type="text"
            placeholder="Usuario"
            required
          />
          <input 
            id = "password"
            name="password"
            type="password" 
            value={user.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
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
        <form className="regScreen" onSubmit={registerUser}>
        <p onClick={closeRegister} className="cerrar">cerrar</p>
        <input
            id = "user2"
            name="userNameReg"
            type="text"
            placeholder="Usuario"
            value={userReg.userNameReg}
            onChange={handleChangeReg}
            required
          />
        <input 
            id = "password2"
            name="passwordReg"
            type="password" 
            placeholder="Contraseña"
            value={userReg.passwordReg}
            onChange={handleChangeReg}
            required
          />
           <a className="parrafoError">{errorReg}</a>
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