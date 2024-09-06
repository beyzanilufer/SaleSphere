import React, { useEffect, useState } from "react";

import Navbar from "../component/Navbar";
import { BiExport } from "react-icons/bi";
import { IoIosSave } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import { PiUsersThree } from "react-icons/pi";
import axios from "axios";
import '../css/Business.css'
import Button from 'react-bootstrap/Button';
import FormModal, { ModalBody } from "../component/FormModal";
import { ModalHeader } from "react-bootstrap";

function MainGroup() {
    const [data, setData] = useState([]);
    const showNum = 10;
    const [page, setPage] = useState(0);
    const [sum, setSum] = useState(0);
    const [reload, setReload] = useState("");
    const [maingroup, setMaingroup] = useState({});
    const [notification, setNotification] = useState("");
    const [inputControl, setInputControl] = useState(false);
    const [modalShow, setModalShow] = useState(false);


   

    const fetchData = () => {
        axios.get('http://localhost/api/outputMain.php').then((res) => {
            setSum(res.data.length);
            setData(
                res.data.slice((page + 1) * showNum - 10, (page + 1) * showNum)
            );
           
        })
    }
    const handleReload = () => {
        setReload("Reload...")
        fetchData();
    }
    const handleClose = () =>{
        setModalShow(false);
        setMaingroup({
            grup_name: '',
           
        })
    } 

    const addBusiness = (e) => {
        console.log(maingroup)
        e.preventDefault();
        /*if ((!maingroup.group_name) ) {
            setInputControl(true)
            setNotification("Please fill in the field.");

            return;
        }*/
        fetch('http://localhost/api/addmaingroup.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(maingroup)
        })
            .then(response => response.json())
            .then(maingroup => {
                setNotification(maingroup.message)
                setMaingroup({
                    grup_name: '',
                   
                })
                handleClose();
                fetchData();
            })


    }
    

    const handleEditClick = (item) => {
        console.log("zz",item);
        setMaingroup(item);
        
        setModalShow(true);
    };


    useEffect(() => {
        fetchData();
        if (reload) {
            const timee = setTimeout(() => {
                setReload('');

            }, 1000);
            return () => clearTimeout(timee);
        }
        if (notification) {
            const timee = setTimeout(() => {
                setNotification('');
            }, 2000);
            return () => clearTimeout(timee);
        }


        
    }, [page,reload,notification])


    return (


        <div>
            <Navbar>
                
                <button className="containersss"  variant="primary" onClick={() => setModalShow(true)} to="/newBusiness">
                    <PiUsersThree className="logoo" />
                    <p className="text-p">NEW</p>
                </button>
                <button className="containersss"  onClick={handleReload}>
                    <TfiReload className="logoo" />
                    <p className="text-p">RELOAD</p>
                </button>
            </Navbar>
            <div className="pagee">
            <h3 style={{ backgroundColor: 'green', alignItems: 'center', textAlign: 'center' }}>{reload}</h3>

                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Main Group</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((e) => (
                                    <tr key={e.ID} onClick={() => handleEditClick(e)} style={{ cursor: 'pointer' }}>
                                        <td>{e.ID}</td>
                                        <td>{e.group_name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td style={{ textAlign: 'center' }}>no data</td>
                                </tr>
                            )

                            }
                        </tbody>
                    </table>
                    <div className="pagination-container">
                        <div className="pagination-buttons ">
                            <button onClick={() => (page - 1) >= 0 ? setPage(page - 1) : setPage(page)}>-</button>
                            <button onClick={() => (page + 1) < sum / showNum ? setPage(page + 1) : setPage(page)}>+</button>
                        </div>
                        <span style={{ flexDirection: 'column', fontSize: '15px', fontWeight: '600' }}>{page + 1}.Sayfa</span>

                    </div>
                </div>
            </div>

            {   
                modalShow &&
                <form>
                <FormModal
                    title={"New Business Partner (Unsaved)"}
                    show={modalShow}
                    handleClose={handleClose}>
                    <ModalBody>
                        <h3 style={{ color: 'darkred', textAlign: 'center' }}>{notification}</h3>

                        <div className="business-form">
                            <div >
                                <div className="form-group" >
                                    <p>Name</p>
                                    <input required value={maingroup.group_name} className="input" onChange={(e) => {
                                        setMaingroup({ ...maingroup, group_name: e.target.value })
                                    }} />
                                    
                            
                                </div>
                                

                            </div>

                            
                        </div>

                    </ModalBody>
                    <ModalHeader>
                        <input value={" save"} type="submit" style={{backgroundColor: 'blue', outline:"none" , border:"none", color:"white",width: '350px', textAlign: 'center', alignItems: 'center',padding:"13px 10px", borderRadius:"4px" }} onClick={(e) => addBusiness(e)} 
                           
                        />
                        <Button style={{ backgroundColor: 'red', width: '350px', textAlign: 'center', alignItems: 'center' }} onClick={() => handleClose()}>
                            close
                        </Button>


                    </ModalHeader>
                </FormModal>
                </form>
            }




        </div>
    )
}

export default MainGroup