import React, { useState, useEffect } from 'react';
import { useStateValue } from './StateProvider';
import './ModalStructure.css';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import datepicker styles
import { addDays } from 'date-fns'; // For adding days to calculate the end date

function ModalStructure({ id, title, price, rating, img }) {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  const [selectedOption, setSelectedOption] = useState('1');
  const [clicked, setClicked] = useState(false);
  const [startDate, setStartDate] = useState(new Date()); // Initialize with current date
  const [endDate, setEndDate] = useState(new Date()); // Initialize end date

  // Helper function to calculate the number of days based on the selected duration
  const getDurationInDays = (duration) => {
    switch (duration) {
      case '1':
        return 7; // 1 week
      case '2':
        return 14; // 2 weeks
      case '4':
        return 30; // 1 month (approx.)
      case '13':
        return 90; // 3 months (approx.)
      default:
        return 7;
    }
  };

  // Helper function to calculate the minimum selectable date (day after tomorrow)
  const getMinSelectableDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2); // Add 2 days to the current date
    return date;
  };

  // Update the end date whenever the start date or selected option changes
  useEffect(() => {
    const days = getDurationInDays(selectedOption);
    setEndDate(addDays(startDate, days));
  }, [startDate, selectedOption]);

  const handleSubsequentClicks = () => {
    navigate('/checkout');
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const addToBasket = () => {
    // Dispatch the item into the data layer
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        img: img,
        price: price * selectedOption,
        rating: rating,
        startDate: startDate,
        endDate: endDate, // Include the calculated end date
      },
    });
    setClicked(true);
  };

  return (
    <div className='modalStructure'>
      <img className='modalStructure__image' src={img} alt={title} />
      <div className='modalStructure__info'>
        <p className='modalStructure__title'>{title}</p>
        <div className='modalStructure__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        <p className='modalStructure__price'>
          <small>₹</small>
          <strong>{price}</strong>
          <small>/week</small>
        </p>
        <div className='modalStructure__dropdown'>
          <h3>Select duration</h3>
          <select value={selectedOption} onChange={handleChange}>
            <option value='1'>1 week</option>
            <option value='2'>2 weeks</option>
            <option value='4'>1 Month</option>
            <option value='13'>3 Months</option>
          </select>
        </div>
        <div className='modalStructure__date'>
          <h3>Select start date</h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)} // Update start date on selection
            dateFormat='dd/MM/yyyy'
            minDate={getMinSelectableDate()} // Set minimum selectable date
          />
        </div>
        <div className='modalStructure__confirm'>
          <strong>Total Price: ₹</strong> {price * selectedOption}
        </div>
        <div className='modalStructure__dates'>
          <p><strong>Start Date:</strong> {startDate.toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {endDate.toLocaleDateString()}</p>
        </div>
        <button onClick={clicked ? handleSubsequentClicks : addToBasket}>
          {clicked ? 'Go to cart' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}

export default ModalStructure;
