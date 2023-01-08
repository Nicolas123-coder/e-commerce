import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
//TODO: arrumar os imports em um index.js 
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/contexts/user';
import { ProductsProvider } from './components/contexts/products';
import { CartProvider } from './components/contexts/cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>  {/*Esse context ta aqui pq a gente pode pegar valores do usuario nesta ordem de declaração, os produtos pode chegar ao user provider e usar seus dados*/}
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
