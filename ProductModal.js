import React from 'react'
import ModalStructure from './ModalStructure'
import { useStateValue } from './StateProvider';
import './ProductModal.css'

function ProductModal({id,title,price,rating,img}) {
    const [{ preview }, dispatch] = useStateValue();

  return (    
    <div className='productModal'>
       <div>
          {preview.map(item => (
            <ModalStructure
              id={item.id}
              title={item.title}
              img={item.img}
              rating={item.rating}
              price={item.price}
              
            />
          ))}
        </div>
    </div> 
  )
}

export default ProductModal