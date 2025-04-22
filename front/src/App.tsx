import { useState } from 'react'
import PlusCircle from './components/PlusCircle';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/router';

function App() {

  return (
    <BrowserRouter>
    <AppRoutes />
    </BrowserRouter>
  )
}

export default App
