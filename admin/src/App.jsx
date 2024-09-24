import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Orders'
import AddRecipe from './pages/AddRecipe/AddRecipe'
import AddRecipe1 from './pages/AddRecipe1/AddRecipe1'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/addrecipe' element={<AddRecipe />} />
          <Route path='/addrecipe1' element={<AddRecipe1 />} />
          <Route path='/add' element={<Add />} />
          <Route path='/list' element={<List />} />
          <Route path='/orders' element={<Order />} />
        </Routes>
      </div>

    </div>
  )
}

export default App
