import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Login from './Authentication/Login'
import Register from './Authentication/Register'


function App() {
  return (
    <div className="bg-black text-white">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element = {<Login/>}/>
          <Route path='/register' element = {<Register/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}


export default App