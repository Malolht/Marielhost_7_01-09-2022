import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./log/Logout";
import { useSelector } from "react-redux";

const Navbar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact="true" to="/">
                        <div className="logo">
                            <img src="./img/logos/icon-left-font-monochrome-black.png" alt="icon" />
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact="true" to="/profil">
                                <h5>Welcome {userData.prenom} !</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li className="welcome">Développons-nous !</li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;