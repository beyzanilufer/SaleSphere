import axios from "axios";
import React, { useEffect, useState } from "react"
import '../css/Business.css'
import '../css/Header.css'
import { CgExport } from "react-icons/cg";
import { TfiReload } from "react-icons/tfi";
import Navbar from "../component/Navbar";
import Button from 'react-bootstrap/Button';
import { FaUserEdit } from "react-icons/fa";
import FormModal, { ModalBody } from "../component/FormModal";
import { ModalHeader } from "react-bootstrap";

function Business() {
    const [data, setData] = useState([]);
    const showNum = 10;
    const [page, setPage] = useState(0);
    const [sum, setSum] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [reload, setReload] = useState("");
    const [notification, setNotification] = useState("");
    const [business, setBusiness] = useState({});
    const [inputControl, setInputControl] = useState(false);



    const fetchData = () => {
        axios.get('http://localhost/api/output.php').then((res) => {
            setSum(res.data.length);
            setData(
                res.data.slice((page + 1) * showNum - 10, (page + 1) * showNum)

            );
            
        })


        
    }
    console.log(data);

    const handleReload = () => {
        setReload("Reload...")
        fetchData();
    }

    const handleClose = () => {
        setModalShow(false);
        setBusiness({
                    Company: '',
                    First_Name: '',
                    Last_Name: '',
                    Phone: '',
                    E_Mail: '',
                    Street: '',
                    House_Num: '',
                    City: '',
                    Area_Code: '',
                    Postcode: '',
                    Country: '',
                    Fax: ''
                })
    }

    const addBusiness = (e) => {
       
        
        e.preventDefault();
        /*if ((!business.Company) || (!business.Street) || (!business.House_Num) || (!business.City) || (!business.Postcode) || (!business.Country)) {
            setInputControl(true)
            setNotification("Please fill in the field.");

            return;
        }*/
        fetch('http://localhost/api/addBusiness.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(business)
        })
            .then(response => response.json())
            .then(business => {
                setNotification(business.message)
                setBusiness({
                    Company: '',
                    First_Name: '',
                    Last_Name: '',
                    Phone: '',
                    E_Mail: '',
                    Street: '',
                    House_Num: '',
                    City: '',
                    Area_Code: '',
                    Postcode: '',
                    Country: '',
                    Fax: ''
                })
                handleClose();
                fetchData();
            })


    }
  
    const handleEditClick = (item) => {
        setBusiness(item);
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




    }, [page, reload, notification])




    return (
        <div>



            <Navbar>
               
                <button className="containersss" onClick={handleReload} >
                    <TfiReload className="logoo" />
                    <p className="text-p">RELOAD</p>
                </button>
                <Button className="containersss" variant="primary" onClick={() => setModalShow(true)} to="/newBusiness">
                    <FaUserEdit className="logoo" />
                    <p className="text-p">NEW</p>
                </Button>
            </Navbar>




            <div className="pagee">
                <h3 style={{ backgroundColor: 'green', alignItems: 'center', textAlign: 'center' }}>{reload}</h3>

                
                <div className="table">

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th style={{textAlign:'center'}}>Company</th>
                                <th style={{textAlign:'center'}}>First Name</th>
                                <th style={{textAlign:'center'}}>Last Name</th>
                                <th style={{textAlign:'center'}}>Phone</th>
                                <th style={{textAlign:'center'}}>E-Mail</th>
                                <th style={{textAlign:'center'}}>Street</th>
                                <th style={{textAlign:'center'}}>House Num</th>
                                <th style={{textAlign:'center'}}>City</th>
                                <th style={{textAlign:'center'}}>Area Code</th>
                                <th style={{textAlign:'center'}}>Postcode</th>
                                <th style={{textAlign:'center'}}>Country</th>
                                <th style={{textAlign:'center'}}>Fax</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((e) => (
                                    <tr key={e.ID} onClick={() => handleEditClick(e)} style={{ cursor: 'pointer'}}>
                                        <td style={{textAlign:'center'}}>{e.ID}</td>
                                        <td style={{textAlign:'center'}}>{e.Company}</td>
                                        <td style={{textAlign:'center'}}>{e.First_Name}</td>
                                        <td style={{textAlign:'center'}}>{e.Last_Name}</td>
                                        <td style={{textAlign:'center'}}>{e.Phone}</td>
                                        <td style={{textAlign:'center'}}>{e.E_Mail}</td>
                                        <td style={{textAlign:'center'}}>{e.Street}</td>
                                        <td style={{textAlign:'center'}}>{e.House_Number}</td>
                                        <td style={{textAlign:'center'}}>{e.City}</td>
                                        <td style={{textAlign:'center'}}>{e.Area_Code}</td>
                                        <td style={{textAlign:'center'}}>{e.Postcode}</td>
                                        <td style={{textAlign:'center'}}>{e.Country}</td>
                                        <td style={{textAlign:'center'}}>{e.Fax}</td>


                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td style={{ textAlign: 'center' }}> no data</td>
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
                                    <p>First Name</p>
                                    <input value={business.First_Name } placeholder='First Name' className="input" onChange={(e) => 
                                        setBusiness({ ...business, First_Name: e.target.value })} />
                                    
                            
                                </div>
                                <div className="form-group">
                                    <p>Company</p>
                                    <input required value={business.Company } placeholder='company' className="input" onChange={(e) => {
                                        setBusiness({ ...business, Company: e.target.value })
                                    }} />
                                </div>
                                <div className="form-group">
                                    <p>E-Mail</p>
                                    <input value={business.E_Mail } placeholder='e-mail' className="input" onChange={(e) => {
                                        setBusiness({ ...business, E_Mail: e.target.value })
                                    }} />
                                </div>
                                <div className="form-group">
                                    <p>Phone</p>
                                    <input value={business.Phone } placeholder='phone' className="input" onChange={(e) => {
                                        setBusiness({ ...business, Phone: e.target.value })
                                    }} />
                                </div>
                                <div className="form-group">
                                    <p>Street</p>
                                    <input required value={business.Street } placeholder='street' className="input" onChange={(e) => {
                                        setBusiness({ ...business, Street: e.target.value })
                                    }} />
                                </div>
                                <div className="form-group">
                                    <p>House Number</p>
                                    <input value={business.House_Number } placeholder='house number' className="input" onChange={(e) => {
                                        setBusiness({ ...business, House_Number: e.target.value })
                                    }} />
                                </div>

                            </div>

                            <div>
                                <div className="form-group">
                                    <p>City</p>
                                    <input required value={business.City } placeholder='city' className="input" onChange={(e) => {
                                        setBusiness({ ...business, City: e.target.value })
                                    }} />
                                </div>
                                <div className="form-group">
                                    <p>Area code</p>
                                    <input value={business.Area_Code } placeholder='area code' className="input" onChange={(e) => {
                                        setBusiness({ ...business, Area_Code: e.target.value })
                                    }} />
                                </div>

                                <div className="form-group">
                                    <p>Last Name</p>
                                    <input value={business.Last_Name } placeholder='last name' className="input" onChange={(e) => {
                                        setBusiness({ ...business, Last_Name: e.target.value })
                                    }} />
                                </div>
                                <div className="form-group">
                                    <p>Fax</p>
                                    <input value={business.Fax } placeholder='fax' className="input" onChange={(e) => {
                                        setBusiness({ ...business, Fax: e.target.value })
                                    }} />
                                </div>
                                <div className="form-group">
                                    <p>Postcode</p>
                                    <input required value={business.Postcode } placeholder='postcode' className="input" onChange={(e) => {
                                        setBusiness({ ...business, Postcode: e.target.value })
                                    }} />
                                </div>
                                <div className="form-group">
                                    <p>Country</p>
                                    <input required value={business.Country } placeholder='country' className="input" onChange={(e) => {
                                        setBusiness({ ...business, Country: e.target.value })
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

export default Business