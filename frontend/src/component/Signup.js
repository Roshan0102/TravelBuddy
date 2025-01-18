import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:5000';

  const handleSubmit = async () => {
    if (usernameOrEmail && password) {
        const response = await fetch(apiUrl+'/signuptb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usernameOrEmail,
                password,
            }),
        });

        if (response.ok) {
            setMessage('Signup successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/Login');
            }, 2000); 
        } else {
            const error = await response.json();
            setMessage(error.message || 'Signup failed. Please try again.');
        }
    }
};

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Create an Account</h2>

          {message && <div className="alert alert-info">{message}</div>}

          <div className="card p-4">
            <form>
              <div className="mb-3">
                <label htmlFor="usernameOrEmail" className="form-label">Username or Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="usernameOrEmail"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </form>

            <div className="text-center mt-3">
              <p>Already have an account? <Link to="/Login">Login here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;