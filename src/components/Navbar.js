import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to='/'>Home</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to='/create-student'>Create Student</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/create-mentor'>Create Mentor</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/assign-mentor'>Assign Mentor-Student</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/change-mentor'>Change Mentor</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
