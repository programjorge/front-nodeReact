import axios from "axios";
import { useState, useContext } from "react";
import logo from "../../img/logo.png"
import {UserContext} from "../../context/userContext"
const Header = () => {

  const {
    user,
    log,
    logOut,
    error,
    registerUser
  } = useContext(UserContext)
    //metodos
    //metodo para logearse
    // const log = async(event) =>{
    //     axios.get("http://localhost:8080/api")
    //     .then((response) => {
    //        for(let i = 0; i < response.data.length; i++){
    //           if(user.userName === response.data[i].userName && user.password === response.data[i].Password){
    //             setConnection(true)
    //             break;
    //           } else {
    //             setError("Usuario o contrasña equivocados")
    //             setConnection(false)
    //           }
    //        }
    //     })
    //     event.preventDefault();
    // }

    //metodo para abrir la pestaña de regitro
    const openRegister = () =>{
      setShowRegister(true)
    }

    //metodo para cerrar la pestaña de registro
    const closeRegister = () =>{
      setShowRegister(false)
    }

    //metodo para registrar usuario
    // const registerUser = async(event) =>{
    //   if(userReg.userNameReg !== "" && userReg.passwordReg !== ""){
    //     let data = {
    //       title: 'Mi post registro',
    //       body: 'post para registrar un usuario',
    //       userName: userReg.userNameReg,
    //       Password: userReg.passwordReg
    //     }
    //     axios.post("http://localhost:8080/api", data)
    //     .then(() =>{
    //       axios.get("http://localhost:8080/api")
    //       .then((response) => {
    //         for(let i = 0; i < response.data.length; i++){
    //           if(user.userName === response.data[i].userName && user.password === response.data[i].Password){
    //              break;
    //           }
    //         }
    //       }).then(()=>{
    //         setRegister(false)
    //         setError("")
    //         setregComplete("Usuario registrado")
    //       })
    //     })
    //     .catch(error => {
    //       setErrorReg("Este usuario ya esta registrado")
    //     });
    //   } else {
    //     console.log("no pueden estar vacios")

    //   }
    //   event.preventDefault();
    // }

    //metodo para conseguir almacenar los value en el usuario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserLog((prevData) => ({
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
    const [userLog, setUserLog] = useState({
        userName: "",
        password: ""
    });

    //user register hook
    const [userReg, setUserReg] = useState({
      userNameReg:"",
      passwordReg:""
    })


    // const [regComplete, setregComplete] = useState("")

    //mensaje de error login
    // const [error, setError] = useState("")

    //mensaje de error registro
    const [errorReg, setErrorReg] = useState("")

    //reg hook
    const [showRegister, setShowRegister] = useState(false)

    const handleRegister = (event) =>{
      event.preventDefault()
      const registrado = registerUser(userReg)
      setShowRegister(!registrado)
    }
    const handleLogin = (event) =>{
      event.preventDefault()
      log(userLog)
    }

    //definicion de la pantalla de registro
    const registerScreen = (
      <div className="offScreen">
        <form className="regScreen" onSubmit={handleRegister}>
        <p>Registro</p>
        <svg onClick={closeRegister} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x-circle cerrar" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        <input
            id = "user2"
            name="userNameReg"
            type="text"
            placeholder="Usuario"
            value={userReg.userNameReg}
            onChange={handleChangeReg}
            className="input"
            required
          />
        <input 
            id = "password2"
            name="passwordReg"
            type="password" 
            placeholder="Contraseña"
            value={userReg.passwordReg}
            onChange={handleChangeReg}
            className="input"
            required
          />
           <a className="parrafoError">{errorReg}</a>
          <button className="botonAction2">Registrar</button>
        </form>
      </div>
    )

      return (
      <header className="header">
        {showRegister ? registerScreen : ""}  
        {user ? (<div><a>{user.userName}</a></div>) : (
        <div className="headerBlock">
          <img className="logo" alt = "logo" src = {logo}></img>
          <form onSubmit={handleLogin}>
          <a className="parrafoError">{error}</a>
          {/* <a className="completo">{regComplete}</a> */}
          <input
            id = "user"
            name="userName"
            value={userLog.userName}
            onChange={handleChange}
            type="text"
            placeholder="Usuario"
            className="input"
            required
          />
          <input 
            id = "password"
            name="password"
            type="password" 
            value={userLog.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="input"
            required
           />
          <input type="submit" className="botonAction" />
          <a onClick={openRegister}>Registrar</a>
        </form>
      </div>
      )}
      </header>)
      
}
export default Header;