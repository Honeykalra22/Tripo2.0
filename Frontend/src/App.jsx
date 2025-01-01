import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Login from './Authentication/Login'
import Register from './Authentication/Register'
import { Toaster } from 'react-hot-toast'
import Plan_A_Trip from './Pages/Plan_A_Trip/Plan_A_Trip'

function App() {
  return (
    <div className="bg-black text-white">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element = {<Login/>}/>
          <Route path='/register' element = {<Register/>} />
          <Route path='/plantrip' element = {<Plan_A_Trip/>} />
        </Routes>
        <Footer/>
        </Router>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: "0", color: "red" },
          },
          success: {
            style: { borderRadius: "0", color: "green" },
          },
          duration: 2500,
        }}
      />
    </div>
  )
}


export default App