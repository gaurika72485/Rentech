// OrderConfirmation.js
import React, { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase'; // Adjust your import as necessary
import './OrderConfirmation.css';

function OrderConfirmation() {
    const [{ user , basket}] = useStateValue();
    const [userAddress, setUserAddress] = useState({});
    const [orderConfirmed, setOrderConfirmed] = useState(false); // Flag for order confirmation

    // Fetch user's address from Firestore
    useEffect(() => {
        const fetchUserAddress = async () => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setUserAddress(userData); // Set the entire user data including address
                    setOrderConfirmed(true); // Set to true once address is fetched
                }
            }
        };

        fetchUserAddress();
    }, [user]);

    return (
        <div className="order-confirmation">
            {orderConfirmed ? (
                <>
                    <img className='confirm__img'
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp9zCTxTTeD55Fa45aBsTOmGYMSoKLr86kCQ&s'
                    />
                    <h1>Order Confirmed!</h1>
                    <p>Your order has been successfully placed.</p>
                    <h2>Your gadget will be delivered to:</h2>
                    <p>{userAddress.address1}</p>
                    {userAddress.address2 && <p>{userAddress.address2}</p>} {/* Only show if address2 exists */}
                    <p>{userAddress.city}, {userAddress.state} - {userAddress.pincode}</p>
                    {/* Show order details */}
                    <h2>Order Details:</h2>
                    {basket.map((item, index) => (
                        <div key={index}>
                            <p><strong>Item:</strong> {item.title}</p>
                            <p><strong>Delivery date:</strong> {item.startDate.toLocaleDateString()}</p>
                            <p><strong>Pickup Date:</strong> {item.endDate.toLocaleDateString()}</p>
                            <p><strong>Total Price:</strong> ₹{item.price}</p>
                            <p>Delivery and pickup will be done on the given dates between 9am to 7pm.</p>
                        </div>
                    ))}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default OrderConfirmation;
