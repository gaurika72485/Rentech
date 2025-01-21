
import React from 'react'
import "./Product.css"
import { useStateValue } from './StateProvider';
import { Link, useNavigate } from 'react-router-dom';

function Product({id,title,price,rating,img}) {
    const [{ basket, preview }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const previewProduct = () => {
      // dispatch the item into the data layer
      dispatch({
        type: "ADD_TO_PREVIEW",
        item: {
          id: id,
          title: title,
          img: img,
          price: price,
          rating: rating,
        },
      });
      navigate('/product-preview'); 
    };

  return (
        <div className="product"> 
            <div className="product__info"> 
                <p>{title}</p>
                <p>Starting from:</p>
                <p className="product__price">
                    <small>₹ </small>
                    <strong>{}{price}</strong>
                </p>
                <div className="product__rating">
                    Quality: 
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p>⭐</p>
                        ))}
                </div>
            </div>
                <img className='product__img'
                    src={img}
                />
                <button onClick={previewProduct} className='product__button'>Preview before Rent</button>           
        </div>
    )
}

export default Product