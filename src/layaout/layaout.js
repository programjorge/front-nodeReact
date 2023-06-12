import Header from "./header/header"
import Footer from "./footer/footer"
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
                <Footer/>
            </footer>
        </>
    )
}

export default Layout