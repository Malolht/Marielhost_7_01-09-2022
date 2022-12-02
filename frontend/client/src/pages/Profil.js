import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/profil/UpdateProfil";
import { NavLink } from 'react-router-dom';

const Profil = () => {
    const uid = useContext(UidContext);

    return (
        <div className="profil-page">
            {uid ? (
                <UpdateProfil />
            ) : (
                    <div className="log-container">
                        <div className="text-container">
                            <span>
                                Veuillez vous authentifier avant d'accéder à votre profil !
                            </span>
                            <NavLink to='/' exact="true">
                                <img src="/img/icons/home.svg" alt="Home" title="Retour à la page de connexion" />
                            </NavLink>
                        </div>
                        <div className="img-container">
                            <img src="./img/icons/login-pic.png" alt="Logo Profil Connection" />
                        </div>
                    </div>
            )}
        </div>

    );
};

export default Profil;