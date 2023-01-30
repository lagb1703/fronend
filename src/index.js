import React from 'react';
import ReactDOM from 'react-dom/client';
import PrincipalPage from './Principal';
/*import ShoppingCart from './shoppingCart';
import Register from './register';
import Login from './login';
import Produt from './product';*/
import Header from './header';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={PrincipalPage}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
