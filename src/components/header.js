import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {

    //metodos
    //metodo para logearse
    const log = async(event) =>{
        axios.get("http://localhost:8080/api")
        .then((response) => {
            console.log(user)
    
        })
        setConnection(true)
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
    //hooks
    //user hook
    const [user, setUser] = useState({
        userName: "",
        password: ""
    });

    //conexion hook
    const [connection, setConnection] = useState(false)



    //definicion de el state header que tendra el form
    const header = (
        <form onSubmit={log}>
          <input
            name="userName"
            value={user.userName}
            onChange={handleChange}
            type="text"
          />
          <input name="password" type="password" />
          <input type="submit" />
        </form>
      );

    //definicion de el state header que tendra el user logeado
      const headerLog = (
        <header className="header"><h1>{user.userName}</h1></header>
      );


      return (
      <header className="header">
        {connection ? headerLog : header}
      </header>)
      
}
export default Header;