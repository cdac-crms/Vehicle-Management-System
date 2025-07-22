
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/Home/HomePage'
import Header from './Components/Navbar/Header';
function App() {
  
  return (
 <div>
    
      <Header></Header>

      <Routes>
         <Route path="/" element={<HomePage />} />
      </Routes>

 </div>
 
  )
}

export default App
