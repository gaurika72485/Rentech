import React, { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import { db } from './firebase'; // Import Firestore
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import necessary Firestore functions
import './Orders.css'; // Create a CSS file for styles if needed

function Orders() {
  const [{ user }] = useStateValue(); // Get the current user
  const [orders, setOrders] = useState([]); // State to hold orders

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const ordersRef = collection(db, 'orders'); // Reference to the orders collection
        const q = query(ordersRef, where('userId', '==', user.uid)); // Query to get orders for the current user
        const querySnapshot = await getDocs(q); // Fetch the documents

        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() }); // Store order data with document ID
        });

        setOrders(fetchedOrders); // Set the orders state
      }
    };

    fetchOrders(); // Call the function to fetch orders
  }, [user]); // Dependency on user

  // Function to parse Firestore date fields
  const parseDate = (date) => {
    if (date instanceof Date) {
      return date; // If already a Date object
    } else if (date && date.seconds) {
      return new Date(date.seconds * 1000); // Convert Firestore Timestamp to Date
    } else {
      console.error("Invalid date format:", date); // Log the invalid date
      return new Date(); // Fallback to current date
    }
  };

  return (
    <div className="orders">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p> // Message for no orders
      ) : (
        <div className="orders__list">
          {orders.map((order) => (
            <div key={order.id} className="order">
              <h3>Order ID: {order.id}</h3>
              <p>Date: {parseDate(order.orderDate).toLocaleDateString()}</p> {/* Format the order date */}
              <p>Total Price: ₹{order.totalPrice}</p>
              <p>Start Date: {parseDate(order.startDate).toLocaleDateString()}</p> {/* Display start date */}
              <p>End Date: {parseDate(order.endDate).toLocaleDateString()}</p> {/* Display end date */}
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.title} - ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
