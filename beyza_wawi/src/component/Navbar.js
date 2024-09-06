import React from "react";
import '../css/Header.css'

const Navbar = ({ children }) => {
    return (
        <div className="headerr">
            <div className="flex-between">
                {children}
            </div>
        </div>
    );
}

export default Navbar;