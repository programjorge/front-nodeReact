import React, {useState, useEffect, useCallback} from 'react'
// import { redirect } from 'react-router-dom hacer un redirect en el logout hacia donde desee'
import axios from "axios";

export const UserContext = React.createContext()

const UserProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const [error, setError] = useState("")
    
    const log = async(user) =>{
        axios.get("http://localhost:8080/api")
        .then((response) => {
           for(let i = 0; i < response.data.length; i++){
              if(user.userName=== response.data[i].userName && user.password === response.data[i].Password){
                localStorage.setItem("user",response.data[i].userName)
                localStorage.setItem("contraseña",response.data[i].Password)
                setUser(user)
                break;
              } else {
                setUser(null)
                setError("Usuario o contraseña equivocados")
              }
           }
        })
    }
    const logOut = () =>{
        localStorage.removeItem("user")
        localStorage.removeItem("contraseña")
        setUser(null)
    }
    const registerUser = async(userReg) =>{
        if(userReg.userNameReg !== "" && userReg.passwordReg !== ""){
          let data = {
            title: 'Mi post registro',
            body: 'post para registrar un usuario',
            userName: userReg.userNameReg,
            Password: userReg.passwordReg
          }
          axios.post("http://localhost:8080/api", data)
          .then(() =>{
            log({userName:userReg.userNameReg,password:userReg.passwordReg})
            return true
          })
          .catch(error => {
            setError("Usuario ya registrado")
            return false
          });
        }
    }
    const contextValue = {
        user,
        log: useCallback(userData => log(userData),[]),
        logOut,
        error,
        registerUser
    }

    useEffect(() => {
        if(localStorage.getItem("user")){
            log({userName:localStorage.getItem("user"), password:localStorage.getItem("contraseña")})
        }
      }, []);
      return <UserContext.Provider value = {contextValue}>{children}</UserContext.Provider>
}

export default UserProvider