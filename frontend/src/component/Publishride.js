import React, {useState,useEffect} from 'react';

export default function Publishride() {
    const[leaving,setLeaving] = useState("");

    const [going,setGoing] = useState("");

    const [date,setDate] = useState("");

    const [passengers,setPassengers] = useState("");

    const [time,setTime] = useState("");

    const [amount,setAmount] = useState("");

    const [message,setMessage] = useState('');

    const [error,setError] = useState('');

    const [todos, setTodos] = useState([]);

    const [username, setUsername] = useState('');

    // const [edit, setEdit] = useState();

    const apiUrl = 'http://localhost:5000';

    useEffect(() => {
      // Retrieve the username from localStorage
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
          setUsername(storedUsername);
      }
      }, []);


    const handlepublishride=() =>{
        // event.preventDefault();
        

        if(username.trim() !== '' && leaving.trim() !== '' && going.trim() !== '' && date.trim() !== '' && time.trim() !== '' && passengers.trim() !== '' && amount.trim() !== '' ){
          // const formattedDate = new Date(date).toISOString().slice(0, 10);

            fetch(apiUrl + '/ride',{
                method : "POST",
                headers:{
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({username,leaving,going,date,time,passengers,amount})
            })

            .then((res)=>{

                if (res.ok){

                    setTodos([...todos,{username,leaving,going,date,time,passengers,amount}])
                    setMessage('Item Added Successfully')
                    alert("Ride added successfully");

                }else{

                    setError('Unable to add Item')
                }

            })
    }}
  return (
    <div style={{backgroundColor: 'rgba(22, 90, 215, 0.312)'}} className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: '1000%', maxWidth: '700px'}}>
        <h2 className="text-center mb-4">Publish Your Ride</h2>
        <form className=''>
        <div className="mb-3">
            <label htmlFor="Name" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="name"
              // placeholder="Enter departure location"
              value={username}
              // onChange={(e) => setLeaving(e.target.value)}
              readonly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="leavingFrom" className="form-label">Leaving From</label>
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
            <label htmlFor="goingTo" className="form-label">Going To</label>
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

          <div className="mb-3">
            <label htmlFor="time" className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          {/* No. of Passengers Input */}
          <div className="mb-3">
            <label htmlFor="passengers" className="form-label">No. of Passengers</label>
            <input
              type="number"
              className="form-control"
              id="passengers"
              placeholder="Enter number of passengers"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              placeholder="Enter the amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100 mt-3" onClick={handlepublishride}>Publish Ride</button>
        </form>
      </div>
    </div>
  );
}
