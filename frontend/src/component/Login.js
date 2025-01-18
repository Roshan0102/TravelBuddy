import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const apiUrl = 'http://localhost:5000';

    const handleLogin = async () => {
        const response = await fetch(apiUrl+'/logintb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernameOrEmail, password }),
        });

        if (response.ok) {
            const { userId } = await response.json();
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', usernameOrEmail);
            navigate('/Headerarea');
        } else {
            const error = await response.json();
            setMessage(error.message || 'Login failed');
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mb-4">Login</h2>
            {message && <p className="message">{message}</p>}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Username or Email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;