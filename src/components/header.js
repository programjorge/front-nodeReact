import axios from "axios";

const Header = () => {
    const log = async() =>{
        axios.get("http://localhost:8080/api").then((response) => console.log(response.data[0]))

 
    }
    return (
        <header className="header">
            <button onClick={log}>HEADER</button>
        </header>
      )
}
export default Header;