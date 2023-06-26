import React, {useState, useEffect, useCallback} from 'react';
import Swal from 'sweetalert2';
// import { redirect } from 'react-router-dom hacer un redirect en el logout hacia donde desee'
import axios from "axios";

export const UserContext = React.createContext();

const UserProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    
    const log = async(user) =>{
        axios.get("http://localhost:8080/api")
        .then((response) => {
           for(let i = 0; i < response.data.length; i++){
              if(user.userName=== response.data[i].userName && user.password === response.data[i].Password){
                localStorage.setItem("user",response.data[i].userName);
                localStorage.setItem("contraseña",response.data[i].Password);
                setUser(user);
                break;
              } if(i === response.data.length -1 && user.userName !== response.data[i].userName && user.password !== response.data[i].Password) {
                setUser(null)
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Usuario o contraseña equivocados.',
                  footer: '<a href="">Why do I have this issue?</a>'
                });
              }
           }
        })
    }
    const logOut = () =>{
        localStorage.removeItem("user");
        localStorage.removeItem("contraseña");
        setUser(null);
    }
    const registerUser = async(userReg) =>{
        let expresionContraseña = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
        if(!expresionContraseña.test(userReg.passwordReg)){
          userReg.passwordReg = "";
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario debe tener una contraseña con letras, numeros y minimo 6 caracteres',
            footer: '<a href="">Why do I have this issue?</a>'
          });
        } 
        if(userReg.userNameReg !== "" && userReg.passwordReg !== ""){
          let data = {
            title: 'Mi post registro',
            body: 'post para registrar un usuario',
            userName: userReg.userNameReg,
            Password: userReg.passwordReg
          }
          await axios.post("http://localhost:8080/api", data)
          .then(() =>{
            Swal.fire({
              position: 'top-bottom',
              icon: 'success',
              title: 'Usuario registrado correctamente',
              showConfirmButton: false,
              timer: 1500
            }).then(()=>{
              log({userName:userReg.userNameReg,password:userReg.passwordReg})
              return true
            })
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Esta cuenta ya esta creada',
              footer: '<a href="">Why do I have this issue?</a>'
            });
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
    };

    useEffect(() => {
        if(localStorage.getItem("user")){
            log({userName:localStorage.getItem("user"), password:localStorage.getItem("contraseña")});
        }
      }, []);
      return <UserContext.Provider value = {contextValue}>{children}</UserContext.Provider>
}

export default UserProvider;