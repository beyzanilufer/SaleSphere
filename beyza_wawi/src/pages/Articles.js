import React, { useEffect, useState } from "react";
import { CgExport } from "react-icons/cg";
import { TfiReload } from "react-icons/tfi";
import Navbar from "../component/Navbar";
import Button from 'react-bootstrap/Button';
import { IoCubeOutline } from "react-icons/io5";
import axios from "axios";
import FormModal from "../component/FormModal";
import { ModalBody, ModalHeader } from "react-bootstrap";
import { MdAddPhotoAlternate } from "react-icons/md";

function Articles() {
    const [data, setData] = useState([]);
    const showNum = 10;
    const [page, setPage] = useState(0);
    const [sum, setSum] = useState(0);
    const [reload, setReload] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [notification, setNotification] = useState("");
    const [articles, setArticles] = useState({tax_rate:'%7'});
    const [department, setDepartment] = useState([]);
    const [taxRate, setTaxRate] = useState({ taxRate1: '%7', taxRate2: '%19' });
   


    const handleClose = () => {
        setModalShow(false);
        setArticles({
            product_name: '',
        })
    }

    const fetchData = () => {
        axios.get('http://localhost/api/outputDepartment.php').then((res) => {

            const options = res.data.map((articles) => ({
                value: articles.ID,
                label: articles.category,
            }));
            setDepartment(options);
        })
    }




    const getData = () => {
        axios.get('http://localhost/api/outputArticles.php').then((res) => {
            setSum(res.data.length);
            setData(res.data.slice((page + 1) * showNum - 10, (page + 1) * showNum));
        })
    }

    const handleReload = () => {
        setReload("Reload...")
        fetchData();
        getData();
    }

    const addArticle = (e) => {
        e.preventDefault();
        if ((!articles.product_name) || (!articles.barcode)) {
            setNotification("Please fill in the field");
            return;
        }
        fetch('http://localhost/api/addArticles.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articles)
        })

            .then(response => response.json())
            .then(articles => {
                setNotification(articles.message)
                setArticles({
                    product_name: '',
                })
            })
        handleClose();
    }

    console.log("aararra",articles);

    const handleEditClick=(item)=>{
        setArticles(item);
        setModalShow(true);
    }

    useEffect(() => {
        fetchData();
        getData();
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
            return () => clearTimeout(timee)
        }
    }, [page, reload, notification])






    return (


        <div>
            <Navbar>
            <button className="containersss">
                    <MdAddPhotoAlternate  className="logoo" />
                    <p className="text-p">PHOTO</p>
                </button>
                <button className="containersss">
                    <CgExport className="logoo" />
                    <p className="text-p">EXPORT</p>
                </button>
                <button className="containersss" onClick={handleReload} >
                    <TfiReload className="logoo" />
                    <p className="text-p">RELOAD</p>
                </button>
                <Button className="containersss" onClick={() => setModalShow(true)}>
                    <IoCubeOutline className="logoo" />
                    <p className="text-p">NEW</p>
                </Button>
            </Navbar>

            <div className="pagee">
                <h3 style={{ backgroundColor: 'green', alignItems: 'center', textAlign: 'center' }}>{reload}</h3>

                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: "50px",textAlign:'center' }}>ID</th>
                                <th style={{ width: "200px",textAlign:'center' }}>Barcode</th>
                                <th style={{ width: "200px",textAlign:'center'}}>Product Name</th>
                                <th style={{ width: "200px",textAlign:'center'}}>Category</th>
                                <th style={{ width: "200px",textAlign:'center' }}>Group</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.length > 0 ? (
                                data.map((e) => (
                                    <tr key={e.ID} style={{ border: "none", borderBottom: "2px solid lightgrey", padding: "0 5px", width: "100%", height: "40px",cursor: 'pointer'}} onClick={() => handleEditClick(e)}>
                                        <td style={{textAlign:'center'}}>{e.ID}</td>
                                        <td style={{textAlign:'center'}}>{e.barcode}</td>
                                        <td style={{textAlign:'center'}}>{e.product_name}</td>
                                        <td style={{textAlign:'center'}}>{e.department_name}</td>
                                        <td style={{textAlign:'center'}}>{e.group_name}</td>



                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td style={{ textAlign: 'center' }}>no data</td>
                                </tr>
                            )}
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
                        title={"Add New Article (Unsaved)"}
                        show={modalShow}
                        handleClose={handleClose}>
                        <ModalBody>
                            <h3 style={{ color: 'darkred', textAlign: 'center' }}>{notification}</h3>
                            <div>
                                <div>
                                    <div className="form-group">
                                        <p>Product Name</p>
                                        <input value={articles.product_name} className="input" onChange={(e) => {
                                            setArticles({ ...articles, product_name: e.target.value })
                                        }} />
                                    </div>
                                    <div className="form-group">
                                        <p>Barcode</p>
                                        <input value={articles.barcode} className="input" onChange={(e) => {
                                            setArticles({ ...articles, barcode: e.target.value })
                                        }} />

                                    </div>
                                    <div className="form-group">
                                        <p>Price</p>
                                        <input value={articles.price} className="input" onChange={(e) => {
                                            setArticles({ ...articles, price: e.target.value })
                                        }} />

                                    </div>
                                    <div className="form-group">
                                        <p>Tax Rate</p>
                                        <select
                                        
                                            value={articles.tax_rate }
                                            onChange={(e) => {
                                            
                                                
                                                setArticles({ ...articles, tax_rate: e.target.value })
                                            }}>

                                             
                                            <option value={taxRate.taxRate1}>{taxRate.taxRate1}</option>
                                            <option value={taxRate.taxRate2}>{taxRate.taxRate2}</option>

                                        </select>

                                    </div>
                                    <div className="form-group">
                                        <p>Category</p>
                                        <select value={articles.Department_Category || ''}
                                            onChange={(e) => {
                                                setArticles({ ...articles, Department_Category: e.target.value })
                                            }}
                                            className="input"
                                        >
                                            <option value="">
                                                select a category
                                            </option>
                                            {department.map((DepartmentGroup, index) => (
                                                <option key={index} value={DepartmentGroup.value}>{DepartmentGroup.label}</option>
                                            ))}

                                        </select>


                                    </div>
                                </div>
                            </div>



                        </ModalBody>
                        <ModalHeader>
                            <input value={"save"} type="submit" style={{ backgroundColor: 'blue', outline: "none", border: "none", color: "white", width: '250px', textAlign: 'center', alignItems: 'center', padding: "13px 10px", borderRadius: "8px" }} onClick={(e) => addArticle(e)} />
                            <Button style={{ backgroundColor: 'red', width: '250px', textAlign: 'center', alignItems: 'center' }} onClick={() => handleClose()}>
                                close
                            </Button>
                        </ModalHeader>

                    </FormModal>
                </form>
            }










        </div>
    )
}

export default Articles