import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Footer from './components/Footer.jsx';
import ExploreMore from './components/ExploreMore.jsx';
import UserContextProvider from './Context/userContextProvider.jsx';
import BuyNowPage from './components/BuyNow.jsx';
import OrderConfirmationPage from './components/OrderConfirmationPage.jsx';
import OrderPlaced from './components/OrderConfirmationPage.jsx';
import Orders from './components/Orders.jsx';
import Cart from './components/Cart.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<App />} />
          <Route path='/Explore' element={<ExploreMore/>}>
          </Route>
          <Route path='/buyNow' element={<BuyNowPage/>}>
          </Route>
          <Route path='/buyNow/Confirm' element={<OrderPlaced/>}></Route>
          <Route path='Orders' element={<Orders/>}></Route>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>
);
