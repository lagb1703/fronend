import React from 'react';
import ReactDOM from 'react-dom/client';
import PrincipalPage from './Principal';
import Page from './admin';
import Login from './login';
import Header from './header';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Header />{/*el header esta en todas las paginas*/}
    <Routes>{/*aca comienza el enrutamiento*/}
      <Route path='/' element={<PrincipalPage />} />{/*enrutamiento pagina principal*/}
      <Route path='/login' element={<Login />}/>{/*enrutamiento login*/}
      <Route path='/admin' element={<Page />}/>{/*enrutamiento del administrador*/}
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();//algo del reactmejor no tacar
