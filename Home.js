import React, { useEffect, useState } from 'react';
import './Home.css';
import panel1 from './img/panel1.png';
import Product from './Product';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";
import { useStateValue } from './StateProvider';

const categories = [
  { name: 'Cameras', value: 'camera' },
  { name: 'Laptops', value: 'computer' },
  { name: 'Display', value: 'display' },
  { name: 'Play', value: 'game' }
];

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [{ searchQuery }] = useStateValue(); // Get search query from state
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsData);
    setFilteredProducts(productsData); // Initially, show all products
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search query
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]); // Runs whenever searchQuery or products change

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products.filter(product =>
        product.title.toLowerCase().includes(searchQuery)
      ));
    } else {
      const filtered = products.filter(product => 
        product.category === category && 
        product.title.toLowerCase().includes(searchQuery)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className='home'>
      <div className='home__container'>
        <img className='home__image' src={panel1} alt="Home Banner" />
      </div>
      
      <div className="home__category">
        <div className="category__tiles">
          <div
            className={`category__tile ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => handleCategoryChange("all")}
          >
            All Products
          </div>
          {categories.map(category => (
            <div
              key={category.value}
              className={`category__tile ${selectedCategory === category.value ? "active" : ""}`}
              onClick={() => handleCategoryChange(category.value)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

      <div className="home__row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              rating={product.rating}
              img={product.img}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
