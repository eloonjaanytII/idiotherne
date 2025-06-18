import { Suspense } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex flex-col max-w-screen mx-auto">
        <Navbar/>
        <main className="p-4 w-[90vw] m-auto overflow-hidden min-h-[80vh]">
            <Suspense fallback={<div>is Loading...</div>}>
                <Outlet/>
            </Suspense>
        </main>
        <Footer />
    </div>
)
}

export default Layout