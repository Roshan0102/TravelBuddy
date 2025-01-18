import React, { useState, useEffect, useCallback } from 'react';

const Requestrides = () => {
  const [username, setUsername] = useState("");
  const [requestStatus, setRequestStatus] = useState('');
  const [todos, setTodos] = useState([]);
  const [todo2, setTodos2] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const apiUrl = 'http://localhost:5000';

  // Memoize the handleviewrides function with useCallback
  const handlerequests = useCallback(() => {
    setTodos([]);
    setRequestStatus({});
    if (username.trim() !== '') {
      const query = `?username=${username}`;
      fetch(apiUrl + '/requestrides' + query, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setTodos(data);
            setMessage('requests Fetched Successfully');
          } else {
            setMessage('No requests found for the given criteria');
          }
        })
        .catch((error) => {
          setError('Unable to fetch requests');
          console.error(error);
        });
    }
  }, [username]);

  // Initialize the effect
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    handlerequests(); 
  }, [handlerequests]);

  // Deletion function for rides
  const handleAcceptride = (id) => {
    console.log("Accepting ride with id:", id);
  
    fetch(apiUrl + '/acceptride/' + id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requeststatus: "accepted" }) // Use lowercase
    })
      .then((response) => {
        if (response.ok) {
          handlerequests();
          return response.json(); // Resolve JSON here
        } else {
          throw new Error('Failed to accept ride');
        }
      })
      .then((data) => {
        console.log("Response data:", data);
        setTodos2(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  const handleRejectride = (id) => {
    console.log("Rejecting ride with id:", id);
  
    fetch(apiUrl + '/acceptride/' + id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requeststatus: "rejected" }) // Use lowercase
    })
      .then((response) => {
        if (response.ok) {
          handlerequests();
          return response.json(); // Resolve JSON here
        } else {
          throw new Error('Failed to accept ride');
        }
      })
      .then((data) => {
        console.log("Response data:", data);
        setTodos2(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  


  return (
    <div style={{backgroundcolor: 'rgba(22, 90, 215, 0.312)'}} className='viewridesmaincontainer border-0'>
      <h1 className='text-primary d-flex justify-content-center'>Requests Received</h1>
      <div className='d-flex justify-content-center align-items-center'>
      </div>
      <ul style={{border: "0px solid black"}} className='list-group'>
        {todos.map((item) => (
          <li key={item._id} style={{border: "0px solid black"}} className="list-group-item">
            <div className='toshowmaincontainer'>
              <div className='toshowtopcontainer'>
                <div className='toshowtopleftcontainer'>
                  <p>Name: {item.requestname}</p>
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
                {item.requeststatus === "accepted" || item.requeststatus === "rejected"? (
                  <span>{item.requeststatus}</span>
                  ) : (
                    <div className='d-flex justify-content-space-between align-items-center gap-2'>
                    <button className='sendrequest1 bg-success' type='button' onClick={() => handleAcceptride(item._id)}>Accept</button>
                    <button className='sendrequest1 bg-danger' type='button' onClick={() => handleRejectride(item._id)}>Reject</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Requestrides;
