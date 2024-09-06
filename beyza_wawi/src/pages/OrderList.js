
import React, { useEffect, useState } from "react";
import { SlBasket } from "react-icons/sl";

import axios from "axios";
import '../css/Business.css'
import '../css/Header.css'
import { Link,useNavigate} from "react-router-dom";


function Order() {
    const [data, setData] = useState([]);
    const showNum = 10;
    const [page, setPage] = useState(0);
    const [sum, setSum] = useState(0);
   
    const navigate = useNavigate();


    const fetchData = () => {

        axios.get('http://localhost/api/orderList.php').then((res) => {
            setSum(res.data.length);
            
            setData(
                res.data.slice((page + 1) * showNum - 10, (page + 1) * showNum)

            );
        })

    }
    
    const getCart = async (ID) => { //?
        try {
            const response = await fetch('http://localhost/api/outputCart.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
    
            const result = await response.json();
            console.log('Last cart ID:', result.ID);


            
             navigate(`/basket/${ID}`);
            
        } catch (error) {
            console.error('Error fetching last cart ID:', error);
        }
    };
    
    
    

    useEffect(() => {

        fetchData();
      

    })

    



    return (

        <div>
            <div className="pagee">


                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th style={{textAlign:'center'}}>ID</th>
                                <th style={{textAlign:'center'}}>Company Name</th>
                                <th style={{textAlign:'center'}}>Customer Number</th>
                                <th style={{textAlign:'center'}}>Date</th>
                                <th style={{textAlign:'center'}}>Price</th>
                                <th style={{textAlign:'center'}}>Products</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((e) => (
                                    <tr key={e.ID}>
                                        <td style={{textAlign:'center'}}>{e.uniq_id}</td>
                                        <td style={{textAlign:'center'}}>{e.Company}</td>
                                        <td style={{textAlign:'center'}}>{e.ID+10}</td>
                                        <td style={{textAlign:'center'}}>{e.date}</td>
                                        {(e.totalPrice)==null ?(
                                            <td style={{textAlign:'center'}}>(onaylanmamış sepet)</td>
                                            
                                        ):(
                                            <td style={{textAlign:'center'}}>{e.totalPrice} TL</td>
                                        )}
                                        
                                        <td style={{textAlign:'center'}}><Link style={{fontSize:'25px'}} onClick={()=>getCart(e.ID)}>< SlBasket /></Link></td>
                                        
                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td style={{ textAlign: 'center' }}> no data</td>
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
        </div>
    )
}

export default Order