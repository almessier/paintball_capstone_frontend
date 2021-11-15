import React from "react";
import { NavLink } from "react-router-dom";
import './navbar.css';


const Navbar = ({user}) => {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-custom">
                <div className="container-fluid">
                    <NavLink className="navbar-brand nav-main-logo" to="/">
                        <img src="images/hopper 50px height.png" alt="Home Logo"/>
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {
                                <React.Fragment>
                                    {!user &&
                                        <React.Fragment>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/login">
                                                    Login
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/register">
                                                    Register
                                                </NavLink>
                                            </li>
                                        </React.Fragment>
                                    }
                                    {user &&
                                        <React.Fragment>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/viewListings">
                                                    View Listings
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/chat">
                                                    Chat
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/editProfile">
                                                    Edit Profile
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/logout">
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </React.Fragment>
                                    }
                                </React.Fragment>
                            }
                        </ul>
                    </div>   
                </div>
            </nav>
        </>
    );
}

export default Navbar;
