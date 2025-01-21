import React, { useEffect, useState } from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import ad from './img/ad.png';
import axios from 'axios';
import { doc, getDoc, collection, addDoc } from "firebase/firestore"; // Import addDoc
import { auth, db } from './firebase'; // Import Firestore
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch user's name from Firestore
  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserName(userData.name);
        }
      }
    };

    fetchUserName();
  }, [user]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const saveOrderToFirestore = async (orderData) => {
    try {
      // Add a new order to the 'orders' collection
      const orderRef = await addDoc(collection(db, 'orders'), orderData); // Use addDoc to create a new document
      console.log("Order saved to Firestore with ID:", orderRef.id); // Log the document ID
    } catch (error) {
      console.error("Error saving order to Firestore:", error);
    }
  };

  const onPayment = async (price) => {
    try {
      const options = {
        productId: 1,
        amount: price
      };

      const res = await axios.post('http://localhost:4000/api/createOrder', options);
      const data = res.data;

      console.log(data);

      const paymentObject = new window.Razorpay({
        key: "rzp_test_IqWHz96pvX48FS",
        order_id: data.id,
        ...data,
        handler: function (response) {
          console.log(response);

          const options2 = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };

          axios.post('http://localhost:4000/api/verifyPayment', options2)
            .then(async (res) => {
              console.log(res.data);
              if (res?.data?.success) {
                alert('Payment successful');

                // Prepare order data to save
                const orderData = {
                  userId: user.uid, // Add user ID
                  items: basket.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    startDate: item.startDate, // Include start date
                    endDate: item.endDate, // Include end date
                  })),
                  totalPrice: price, // Total price
                  orderDate: new Date(), // Current date
                };

                // Save order to Firestore
                await saveOrderToFirestore(orderData);
                
                navigate('/order-confirmation'); // Navigate to order confirmation page
              } else {
                alert('Payment failed');
              }
            }).catch((err) => {
              console.error(err);
              alert('Payment verification failed');
            });
        }
      });

      paymentObject.open();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  return (
    <div className='checkout'>
      <div className="checkout__left">
        <img className="checkout__ad" src={ad} alt="Checkout Ad" />
        <div>
          <h3>Hello, {!user ? 'Guest' : userName}</h3>
          <h2 className="checkout__title">Your Basket</h2>

          {basket.map(item => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              img={item.img}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal onPayment={onPayment} />   
      </div>
    </div>
  );
}

export default Checkout;
