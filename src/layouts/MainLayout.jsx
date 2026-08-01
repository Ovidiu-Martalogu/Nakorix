import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

export default function MainLayout({ children }) {
    return (
        <>
            <Header />

            <div className="app-layout">
                <Sidebar />

                <main>
                    {children}
                </main>
            </div>

            <Footer />
        </>
    )
}