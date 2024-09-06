import React, { useEffect, useState } from "react";
import { BiExport } from "react-icons/bi";
import { IoIosSave } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import Navbar from "../component/Navbar";
import { LiaCubesSolid } from "react-icons/lia";
import axios from "axios";
import '../css/Business.css'
import FormModal, { ModalBody } from "../component/FormModal";
import { ModalHeader } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import MainGroup from "./MainGroup";


function Groups() {
    const [data, setData] = useState([]);
    const showNum = 10;
    const [page, setPage] = useState(0);
    const [sum, setSum] = useState(0);
    const [reload, setReload] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [notification, setNotification] = useState("");
    const [group, setGroup] = useState({});
    const [mainGroups, setMainGroups] = useState([]);




    const fetchData = () => {
        axios.get('http://localhost/api/outputMain.php').then((res) => {


            const options = res.data.map((group) => ({
                value: group.ID,
                label: group.group_name
            }));

           

            setMainGroups(options);

        })
    }

    const getData = () => {
        axios.get('http://localhost/api/outputGroup.php').then((res) => {
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
        setGroup({
            Group: '',

        })
    } 

    const addGroup = (e) => {
        console.log("group",group);
        e.preventDefault()
        /*if ((!group.name)) {

            setNotification("Please fill in the field.");

            return;
        }*/
        fetch('http://localhost/api/addGroup.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group)
        })
            .then(response => response.json())
            .then(group => {
                setNotification(group.message)
                setGroup({
                    Group: '',

                })
                handleClose();
                getData();
                
            })


    }
    console.log("zszsz",group)

    const handleEditClick = (item) => {
        console.log("zz",item);
        
        setGroup(item);
        
        setModalShow(true);
    };



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


    useEffect(()=>{
        console.log("data", data)
    },[data])


    return (


        <div>
            <Navbar>
                <button className="containersss">
                    <BiExport className="logoo" />
                    <p className="text-p">EXPORT</p>
                </button>
                <button className="containersss" >
                    <IoIosSave className="logoo" />
                    <p className="text-p">SAVE CHANGES</p>
                </button>
                <button className="containersss" variant="primary" onClick={() => setModalShow(true)}>
                    <LiaCubesSolid className="logoo" />
                    <p className="text-p">NEW</p>
                </button>
                <button className="containersss" onClick={handleReload} >
                    <TfiReload className="logoo" />
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
                                <th style={{width:"200px"}}>Group</th>
                                <th style={{width:"200px"}}>Main Group</th>


                            </tr>
                        </thead>
                        <tbody>

                            {
                                console.log("iii",data)
                            }
                            {data.length > 0 ? (
                                data.map((e) => (
                                  
                                    <tr key={e.grup_id} style={{border:"none", borderBottom:"2px solid lightgrey",padding:"0 5px", width:"100%",height:"40px",cursor: 'pointer'}  } onClick={() => handleEditClick(e)}>
                                        <td>{e.grup_id}</td>
                                        <td>{e.name}</td>
                                        
                                        <select 
                                            onChange={(event) => {
                                                let newData =  [{...e, main_group_id: parseInt(event.target.value)}] ;
                                               
                                                setData([...data], ...newData)
                                            }}
                                            style={{border:"none",padding:"5px 5px", width:"100%",height:"40px",backgroundColor:"#8fd8ec"}}
                                        >
                                            <option value={e.main_group_id} >
                                                select a groups
                                            </option>

                                            {mainGroups.map((MainGroup, index) => (
                                                <option selected={MainGroup.value == e.main_group_id} key={index} value={MainGroup.value}>{MainGroup.label}</option>
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
                        title={"Add New Group"}
                        show={modalShow}
                        handleClose={() => setModalShow(false)}>
                        <ModalBody>
                            <h3 style={{ color: 'darkred', textAlign: 'center' }}>{notification}</h3>

                            <div >
                                <div >
                                    <div className="form-group" >
                                        <p>Name</p>
                                        <input value={group.name} className="input" onChange={(e) => {
                                            setGroup({ ...group, name: e.target.value })
                                        }} />


                                    </div>
                                
                                    <div className="form-group">
                                        <p>Group</p>
                                        <select value={group.Main_Group || ''}
                                            onChange={(e) => {
                                             
                                                setGroup({ ...group, Main_Group: e.target.value })
                                            }}
                                            className="input"
                                        >
                                            <option value="">
                                                select a groups
                                            </option>
                                            {mainGroups.map((MainGroup, index) => (
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

export default Groups