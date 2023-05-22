import Header from "./header/header"

const Layout = ({children}) =>{
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                {children}
            </main>
            <footer>

            </footer>
        </>
    )
}

export default Layout