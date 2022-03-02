import Footer from "./Footer"
import Header from "./Header"

const Layout = ({children}) => {
    return (
        <div className="container flex flex-col p-1 mx-auto">
            <Header />
            <div className="flex-auto bg-blue-50/50">
            { children }
            </div>
            <Footer />
        </div>
    )
}

export default Layout
