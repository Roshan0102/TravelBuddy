//headerarea

import React,{useState,useEffect} from 'react';
import '../styles/Headerarea.css';
import { Link, useNavigate,Routes,Route } from 'react-router-dom';

export default function Headerarea() {
      const[username,setUsername] = useState("");  
    
      const[leaving,setLeaving] = useState("");
  
      const [going,setGoing] = useState("");
  
      const [date,setDate] = useState("");
  
      const [message,setMessage] = useState('');
  
      const [error,setError] = useState('');
  
      const [todos, setTodos] = useState([]);

      const [todos3, setTodos3] = useState([]);

      const navigate = useNavigate();

      const [requestStatus, setRequestStatus] = useState({});

      // const [requestStatus1, setRequestStatus1] = useState({});

      const apiUrl = 'http://localhost:5000';

      useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
        handlesearchride();
      }, []); 
      
      const handlesearchride = (event) => {
        if(event){
          event.preventDefault();
        }
        setTodos([]);
        setRequestStatus({}); // Reset the request status object
        if (leaving.trim() !== '' && going.trim() !== '' && date.trim() !== '') {
          const query = `?leaving=${leaving}&going=${going}&date=${date}`;
      
          fetch(apiUrl + '/searchride' + query, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (Array.isArray(data) && data.length > 0) {
                setTodos(data); // Update todos with the full dataset from the server
                setMessage('Rides Fetched Successfully');
      
                // Fetch request status for each item
                data.forEach((item) => {
                  const query = `?username=${item.username}&leaving=${item.leaving}&going=${item.going}&date=${item.date}&time=${item.time}&amount=${item.amount}&passengers=${item.passengers}&requestname=${username}`;
                  fetch(apiUrl + '/searchrequeststatus' + query, {
                    method: "GET",
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  })
                    .then((res) => {
                      if (res.ok) {
                        return res.json();
                      } else {
                        console.log("requeststatus is null");
                        return null;
                      }
                    })
                    .then((data1) => {
                      if (data1 && data1.length > 0) {
                        setRequestStatus((prevStatus) => ({
                          ...prevStatus,
                          [item._id]: data1[0].requeststatus,
                        }));
                      }
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                });
              } else {
                setMessage('No rides found for the given criteria');
              }
            })
            .catch((error) => {
              setError('Unable to fetch rides');
              console.error(error);
            });
        }
      };

      const handleSendRequest = async (item) => {
        const requestData = {
            ...item,
            requeststatus: 'requested',
            requestname: username,
        };
    
        try {
            const response = await fetch(apiUrl + '/sendrequest', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });
    
            if (response.ok) {
                const savedRequest = await response.json();
                setMessage('Request sent successfully!');
                // Fetch the request status using the item's ID
                await fetchRequestStatus(savedRequest._id);
            } else {
                setError('Failed to send request');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error while sending request');
        }
    };
    const fetchRequestStatus = async (id) => {
      try {
          console.log(id)
          const response = await fetch(`${apiUrl}/requestreturn?id=${id}`);
          console.log(response)
          const data = await response.json();
          console.log(data)
          if (response.ok) {
              setRequestStatus(data.requeststatus); // Set the fetched status
          } else {
              setError(data.message);
          }
      } catch (error) {
          console.error('Error fetching request status:', error);
      }
  };
  console.log(requestStatus)
  return (
    <div className="overallcontainer">
      <div className="contentcontainer1">
        <nav className="navbar navbar-expand-lg bg-primary fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">TravelBuddy</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto d-flex flex-row gap-5">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#" onClick={() => navigate("/requests")}>Requests</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href ="#" onClick={() => navigate("/Viewrides")}>View Published Rides</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href ="#" onClick={() => navigate("/Publishride")}>Publish a ride</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#" onClick={() => navigate("/")}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </div>

<div className="bodycontainer vh-100">
  {/* <div
    className="position-absolute top-0 start-0 w-100 h-100"
    style={{
      backgroundImage: url('https://pbs.twimg.com/media/GfJqY6cbgAAc2CP?format=jpg&name=large'),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: 1,
    }}
   ></div> */}

    {/* Form */}
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px', backgroundColor: 'rgba(22, 20, 20, 0.22)',color:'white'}}>
        <h2 className="text-center mb-4 text-light">Pick Your Bike Ride </h2>
          <h2 className='text-center text-success mb-4'>{username.charAt(0).toUpperCase() + username.slice(1)}</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="leaving" className="form-label">Leaving From</label>
            <input
              type="text"
              className="form-control"
              id="leavingFrom"
              placeholder="Enter departure location"
              value={leaving}
              onChange={(e) => setLeaving(e.target.value)}
              required
            />
          </div>

          {/* Going To Input */}
          <div className="mb-3">
            <label htmlFor="going" className="form-label">Going To</label>
            <input
              type="text"
              className="form-control"
              id="goingTo"
              placeholder="Enter destination"
              value={going}
              onChange={(e) => setGoing(e.target.value)}
              required
            />
          </div>

          {/* Date Input */}
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>


          <button type="submit" className="btn btn-success w-100 mt-3" onClick={handlesearchride}>Search</button>
        </form>
      </div>
    </div>
  </div>
  {/* <div className='usd'> */}
  <div className='list-group ulli'>
    {todos.map((item) => (
      <div key={item._id} className="list-group-item abc">
        <div className='toshowmaincontainer card shadow-lg'>
          <div className='toshowtopcontainer'>
            <div className='toshowtopleftcontainer'>
              <p>Name: {item.username}</p>
              <p>{item.leaving} ----- {item.going}</p>
            </div>
            <div className='toshowtoprightcontainer'>
              <p>Amount: <span style={{ textDecoration: "line-through" }}>{item.amount}</span> {item.amount - (item.amount/100)*10}</p>
              <p>10% Discount By TravelBuddy</p>
            </div>
          </div>
          <hr />
          <div className='toshowbottomcontainer'>
            <div className='toshowbottomleftcontainer'>
              <p>Date: {item.date} | Time: {item.time}  Passengers: {item.passengers}</p>
            </div>
            <div className='toshowbottomrightcontainer'>
              {requestStatus[item._id] ? (
                  <span>{requestStatus[item._id]}</span>
              ) : (
                  <button className='sendrequest' type='button' onClick={() => handleSendRequest(item)}>
                      Send Request
                  </button>
              )}
          </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  {/* </div> */}
</div>
  );
}