import React from 'react';
import { Link } from 'react-router-dom';
import 'C:/Users/admin/Documents/TravelBuddy/frontend/src/styles/Headerarea.css';

export default function Headerarea() {
  return (
    <div style={{ backgroundColor: 'rgba(22, 90, 215, 0.312)' }}>
      <div className="overallcontainer">
        <div className="contentcontainer1">
          <nav className="navbar navbar-expand-lg bg-primary fixed-top">
            <div className="container-fluid">
              <Link className="nav-link active" aria-current="page" to="/bodyarea">TravelBuddy</Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto d-flex flex-row gap-5">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/requests">Requests</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/Viewrides">View Published Rides</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/Publishride">Publish a Ride</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/bodyarea">Search Rides</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/">Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
