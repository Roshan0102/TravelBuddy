import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Viewrides.css';
import Headerarea from './Headerarea';


const Viewrides = () => {
  const [username, setUsername] = useState("");
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const apiUrl = 'http://localhost:5000';

  // Memoize the handleviewrides function with useCallback
  const handleviewrides = useCallback(() => {
    setTodos([]);
    if (username.trim() !== '') {
      const query = `?username=${username}`;
      fetch(apiUrl + '/viewrides' + query, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setTodos(data);
            setMessage('Rides Fetched Successfully');
          } else {
            setMessage('No rides found for the given criteria');
          }
        })
        .catch((error) => {
          setError('Unable to fetch rides');
          console.error(error);
        });
    }
  }, [username]);  // The function will only be recreated when the username changes

  // Initialize the effect
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    handleviewrides();
  }, [handleviewrides]);

  // Deletion function for rides
  const handleDeleteride = (id) => {
    if (window.confirm("Sure you wanna delete?")) {
      console.log("Deleting ride with id:", id);
      fetch(apiUrl + '/deleteride/' + id, {
        method: "DELETE"
      })
        .then((response) => {
          if (response.ok) {
            const updatedTodos = todos.filter((todo) => todo._id !== id);
            setTodos(updatedTodos);
          } else {
            console.error('Failed to delete ride');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };


  return (
    <div>
      <Headerarea />
    <div  className='viewridesmaincontainer border-0 vh-100 bg-primary'>
      <div className='d-flex justify-content-center align-items-center'>
        {/* <button type='button' className='btn btn-primary' onClick={handleviewrides}>View Published Rides</button> */}
        {/* <form>
          <div className="mb-5">
            <input
              type="text"
              className="form-control border-0 text-white"
              id="name"
              value={username}
              readOnly
            />
          </div>
        </form> */}
      </div>
      <ul className='list-group'>
        {todos.map((item) => (
          <li key={item._id} className="list-group-item abc">
            <div className='toshowmaincontainer'>
              <div className='toshowtopcontainer'>
                <div className='toshowtopleftcontainer'>
                  <p>Name: {item.username}</p>
                  <p>From: {item.leaving} To: {item.going}</p>
                </div>
                <div className='toshowtoprightcontainer'>
                  <p>Amount: {item.amount}</p>
                  <p>10% Discount</p>
                </div>
              </div>
              <hr />
              <div className='toshowbottomcontainer'>
                <div className='toshowbottomleftcontainer'>
                  <p>Date: {item.date} | Time: {item.time}  Passengers: {item.passengers}</p>
                </div>
                <div className='toshowbottomrightcontainer'>
                  <button className='sendrequest1 bg-danger' type='button' onClick={() => handleDeleteride(item._id)}>Delete</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Viewrides;
