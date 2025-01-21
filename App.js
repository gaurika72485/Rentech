import React, { useEffect } from 'react';
import './App.css';
import Header from "./Header";
import Home from './Home';
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import CreateAccount from './CreateAccount';
import ProductModal from './ProductModal';
import Footer from './Footer';
import OrderConfirmation from './OrderConfirmation';
import Orders from './Orders';


function App() {
  const [{}, dispatch] = useStateValue();

  //Listener
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route 
            path='/checkout' 
            element={
              <>
                <Header/>
                <Checkout/>
                <Footer/>
              </>
            }
          />
          <Route 
            path='/orders' 
            element={
              <>
                <Header/>
                <Orders/>
                <Footer/>
              </>
            }
          />
          <Route 
            path='/product-preview' 
            element={
              <>
                <Header/>
                <ProductModal/>
                <Footer/>
              </>
            }
          />
          <Route 
            path='/order-confirmation' 
            element={
              <>
                <Header/>
                <OrderConfirmation/>
                <Footer/>
              </>
            }
          />
          <Route 
            path='/login' 
            element={
              <>
                <Login/>
              </>
            }
          />
          <Route 
            path='/create-account' 
            element={
              <>  
                <CreateAccount />
              </>
            }
          />  
          <Route 
            path='/'
            element={
              <>
                <Header/>
                <Home/>
                <Footer/>
              </>
            }
          />  
        </Routes>
        
      </div>  
    </Router>
  );
}

export default App;
