import React, { useEffect, useState } from "react";
import { IoIosSave } from "react-icons/io";

import { Col, Row, FormGroup, Label, Form, Input } from "reactstrap";
import Navbar from "../component/Navbar";
import '../css/Header.css'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


function Company() {

    const [data, setData] = useState({ username: sessionStorage.getItem("username"), newpassword: "" });
    const [notification, setNotification] = useState("");
    const [passwordhidden, setPasswordhidden] = useState({
        oldpassword: "password",
        newpassword: "password",
        newpasswordtwo: "password"
    });
    const [haveSymbol, setHaveSymbol] = useState(false);
    const [haveUpperCase, setHaveUpperCase] = useState(false);
    const [haveNumber, sethaveNumber] = useState(false);
    const [isStrength, setIsStrength] = useState(false);
    
  

    const changeTheme = (prm) => {
      


        if (prm === "oldpassword") {
            setPasswordhidden({ ...passwordhidden, oldpassword: passwordhidden.oldpassword === "password" ? "text" : "password" });
        } else if (prm === "newpassword") {
            setPasswordhidden({ ...passwordhidden, newpassword: passwordhidden.newpassword === "password" ? "text" : "password" });
        } else {
            setPasswordhidden({ ...passwordhidden, newpasswordtwo: passwordhidden.newpasswordtwo === "password" ? "text" : "password" });
        }


    };





    useEffect(() => {
        if (notification) {
            const timee = setTimeout(() => {
                setNotification("");
            }, 2000);
            return () => clearTimeout(timee);
        }
    }, [notification])

    useEffect(() => {
        let isStrength, haveSymbol, haveUpperCase, haveNumber;

        haveSymbol = /[!§$%&()=?}\]\[.,:\-_+]/i.test(data.newpassword);
        haveUpperCase = /[A-Z]/g.test(data.newpassword) && /[a-z]/g.test(data.newpassword);
        haveNumber = /[1-9]/g.test(data.newpassword);
        isStrength = haveSymbol && haveUpperCase && haveNumber;


        setHaveSymbol(haveSymbol)
        setHaveUpperCase(haveUpperCase)
        setIsStrength(isStrength)
        sethaveNumber(haveNumber)
        console.log(haveNumber, haveSymbol, isStrength, haveUpperCase)
    }, [data.newpassword])

    const addData = () => {
        console.log(data)
        if ((!data.oldpassword) || (!data.newpassword) || (!data.newpasswordtwo)) {

            setNotification("Please fill in the fields!!!");

            return
        }

        setData({ ...data })
        console.log(data)
        fetch('http://localhost/api/update.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                setNotification(data.message)

                setData({

                    username: sessionStorage.getItem("username"),
                    newpassword: '',
                    newpasswordtwo: '',
                    oldpassword: ''
                })
            })

    }
    const getPwStrengthDiv = () => {
        let newPassword = data.newpassword,
            text = "",
            color = "white",
            width = "0%",
            textColor = "black";

        if (isStrength && newPassword.length >= 8) {
            text = "strong";
            color = "rgb(101,158,100)";
            width = "100%";
            textColor = "#fff";
        } else if (newPassword.length >= 8) {
            text = "good";
            color = "#ffc107";
            width = "80%";
            textColor = "#212529";
        } else if (newPassword.length > 0) {
            text = "weak";
            color = "#dc3545";
            width = "5%";
        } else if (newPassword.length === 0) {
            text = "password_level";
            color = "#d8d1e3";
            textColor = "#6c727e";
            width = "100%";
        }
        return (
            <div className="pw-check">
                <div className="pw-check-valid-div">
                    <div
                        style={{
                            backgroundColor: color,
                            height: "100%",
                            width: width,
                            position: "absolute",
                            left: 0,
                        }}
                    />
                    <div className="pw-c-v-text" style={{ color: textColor }}>
                        {text}
                    </div>
                </div>
            </div>
        );
    }




    return (

        <div>


            <Navbar>
                <button disabled={!isStrength} value={data.password} className="containersss" onClick={() => { addData();  }}>
                    <IoIosSave className="logoo" />
                    <p className="text-p">SAVE</p>
                </button>

            </Navbar>





            <div className="password-HomePage">
                <h2 >Change Password</h2>
                <div >

                    <ul>
                        <li>It must be at least 8 characters long.</li>
                        <li>It must contain at least one lowercase letter and one uppercase letter.</li>
                        <li>It must contain at least one digit</li>
                        <li>It must contain at least one of the special characters.([! 5 & ()=?][..:,*+-])</li>
                    </ul>
                    <Row className="change-password-form-group-row">
                        <Col className="change-password-form-group-col">
                            <br />
                            {getPwStrengthDiv()}
                        </Col>
                    </Row>

                    <p>Current Password</p>
                    <div className="cerceve">
                        <input className="hidden" value={data.oldpassword} type={passwordhidden.oldpassword} onChange={(e) => {
                            setData({ ...data, oldpassword: e.target.value })

                        }} placeholder='Enter your password' />

                        {
                            passwordhidden.oldpassword === "text" ? <FaEye className="iconn" onClick={() => changeTheme("oldpassword")} /> : <FaEyeSlash className="iconn" onClick={() => changeTheme("oldpassword")} />
                        }


                    </div>

                    <p>New Password</p>
                    <div className="cerceve">
                        <input className="hidden" value={data.newpassword} type={passwordhidden.newpassword} onChange={(e) => {
                            setData({ ...data, newpassword: e.target.value })
                        }} placeholder='Enter your new password' />
                        {
                            passwordhidden.newpassword === "text" ? <FaEye className="iconn" onClick={() => changeTheme("newpassword")} /> : <FaEyeSlash className="iconn" onClick={() => changeTheme("newpassword")} />
                        }



                    </div>
                    <p>Password Control</p>
                    <div className="cerceve">
                        <input className="hidden" value={data.newpasswordtwo} type={passwordhidden.newpasswordtwo} onChange={(e) => {
                            setData({ ...data, newpasswordtwo: e.target.value })
                        }} placeholder='Confirm the new password' />
                        {
                            passwordhidden.newpasswordtwo === "text" ? <FaEye className="iconn" onClick={() => changeTheme("newpasswordtwo")} /> : <FaEyeSlash className="iconn" onClick={() => changeTheme("newpasswordtwo")} />
                        }



                    </div>




                </div>

            </div>
            <h3 style={{ color: 'darkred' }}>{notification}</h3>





        </div>





    )
}

export default Company