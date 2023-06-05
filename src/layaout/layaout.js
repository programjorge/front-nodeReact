import Header from "./header/header"
import Nav from "../components/navBar.js"
const Layout = ({children}) =>{
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Nav/>
                {children}
            </main>
            <footer>

            </footer>
        </>
    )
}

export default Layout