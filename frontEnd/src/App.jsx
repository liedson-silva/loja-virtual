import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <main className='min-h-[95vh]'>
        <Header />
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
