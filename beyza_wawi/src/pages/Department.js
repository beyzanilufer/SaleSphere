import React, { useEffect, useState } from "react";
import { BiExport } from "react-icons/bi";
import { IoIosSave } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import Navbar from "../component/Navbar";
import axios from "axios";
import { BiGrid } from "react-icons/bi";
import FormModal, { ModalBody } from "../component/FormModal";
import { ModalHeader } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

function Department(){
    const [data, setData] = useState([]);
    const showNum = 10;
    const [page, setPage] = useState(0);
    const [sum, setSum] = useState(0);
    const [reload, setReload] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [notification, setNotification] = useState("");
    const [department, setDepartment] = useState({});
    const [groups, setGroups] = useState([]);




    const fetchData = () => {
        axios.get('http://localhost/api/outputGroup.php').then((res) => {


            const options = res.data.map((department) => ({
                value: department.grup_id,
                label: department.name,
                
            }));

          

            setGroups(options);

        })
    }
    const getData = () => {
        axios.get('http://localhost/api/outputDepartment.php').then((res) => {
            setSum(res.data.length);

         
            setData(
                res.data.slice((page + 1) * showNum - 10, (page + 1) * showNum)
            );

        })
    }

    const handleReload = () => {
        setReload("Reload...")
        fetchData();
        getData();
        
    }
    
    const handleClose = () =>{
        setModalShow(false);
        setDepartment({
            Group: '',
        });
    } 

    const addGroup = (e) => {
   
        e.preventDefault()
       /* if ((!department.category)) {

            setNotification("Please fill in the field.");

            return;
        }*/
        fetch('http://localhost/api/addDepartment.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(department)
        })
            .then(response => response.json())
            .then(department => {
                setNotification(department.message)
                setDepartment({
                    category: '',

                })
                handleClose();
                getData();
            })


    }
    console.log("ttttt",department)
    const handleEditClick=(item)=>{
        setDepartment(item);
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
            return () => clearTimeout(timee);
        }



    }, [page, reload, notification])







    return(


        <div>
            <Navbar>
                <button className="containersss">
                    <BiExport className="logoo" />
                    <p className="text-p">EXPORT</p>
                </button>
                <button className="containersss"  >
                    <IoIosSave className="logoo" />
                    <p className="text-p">SAVE CHANGES</p>
                </button>
                <button className="containersss" onClick={() => setModalShow(true)} >
                    <BiGrid className="logoo" />
                    <p className="text-p">NEW</p>
                </button>
                <button className="containersss" onClick={handleReload} >
                    <TfiReload  className="logoo" />
                    <p className="text-p">RELOAD</p>
                </button>
            </Navbar>


            <div className="pagee">
                <h3 style={{ backgroundColor: 'green', alignItems: 'center', textAlign: 'center' }}>{reload}</h3>

                <div className="table">
                    <table>
                        <thead>
                            <tr >
                                <th style={{width:"50px"}}>ID</th>
                                <th style={{width:"200px"}}>Category</th>
                                <th style={{width:"200px"}}>Group</th>


                            </tr>
                        </thead>
                        <tbody>

                          
                            {data.length > 0 ? (
                                data.map((e) => (
                                  
                                    <tr key={e.ID} style={{border:"none", borderBottom:"2px solid lightgrey",padding:"0 5px", width:"100%",height:"40px",cursor: 'pointer'}} onClick={() => handleEditClick(e)}>
                                        <td>{e.ID}</td>
                                        <td>{e.category}</td>
                                        
                                        <select 
                                            onChange={(event) => {

                                                let newData =  [{...e, group_id: parseInt(event.target.value)}] ;
                                               
                                                setData([...data], ...newData)
                                            }}
                                            
                                            
                                            style={{border:"none",padding:"5px 5px", width:"100%",height:"40px",backgroundColor:"#8fd8ec"}}
                                          
                                        >
                                            <option value={e.group_id} >
                                               
                                                select a groups
                                            </option>

                                            {groups.map((MainGroup, index) => (
                                                <option selected={MainGroup.value == e.group_id} key={index} value={MainGroup.value}>{MainGroup.label}</option>
                                            ))}

                                        </select>
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
                        title={"Add Department"}
                        show={modalShow}
                        handleClose={handleClose}>
                        <ModalBody>
                            <h3 style={{ color: 'darkred', textAlign: 'center' }}>{notification}</h3>

                            <div >
                                <div >
                                    <div className="form-group" >
                                        <p>coption</p>
                                        <input value={department.category} placeholder='coption' className="input" onChange={(e) => {
                                            
                                            setDepartment({ ...department, category: e.target.value })
                                        }} />

                                    </div>
                                
                                    <div className="form-group">
                                        <p>Group</p>
                                        <select value={department.Main_Group || ''}
                                            onChange={(e) => {
                                              
                                                setDepartment({ ...department, Main_Group: e.target.value })
                                            }}
                                            className="input"
                                        >
                                            <option value="">
                                                select a groups
                                            </option>
                                            {groups.map((MainGroup, index) => (
                                                <option key={index} value={MainGroup.value}>{MainGroup.label}</option>
                                            ))}
                                        </select>


                                    </div>


                                </div>
                            </div>

                        </ModalBody>
                        <ModalHeader>
                            <input value={" save"} type="submit" style={{ backgroundColor: 'blue', outline: "none", border: "none", color: "white", width: '250px', textAlign: 'center', alignItems: 'center', padding: "13px 10px", borderRadius: "8px" }} onClick={(e) => addGroup(e)}

                            />
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

export default Department