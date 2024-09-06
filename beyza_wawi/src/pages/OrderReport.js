import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/Business.css'
import '../css/Header.css'
import { TiMediaRecordOutline } from "react-icons/ti";
import { TiMediaRecord } from "react-icons/ti";


function OrderReport() {
    const [data, setData] = useState([]);
    const showNum = 10;
    const [page, setPage] = useState(0);
    const [sum, setSum] = useState(0);

    const fetchData = () => {
        axios.get('http://localhost/api/OrderReport.php').then((res) => {
            setSum(res.data.length);
            
            setData(
                res.data.slice((page + 1) * showNum - 10, (page + 1) * showNum)
            );
        })
    }




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
                                <th style={{ textAlign: 'center' }}>Status</th>
                                <th style={{ textAlign: 'center' }}>Customer</th>
                                <th style={{ textAlign: 'center' }}>Number of Products</th>
                                <th style={{ textAlign: 'center' }}>Order Number</th>
                                <th style={{ textAlign: 'center' }}>Creation Date</th>
                                <th style={{ textAlign: 'center' }}>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((e) => (
                                    <tr key={e.uniq_id}>
                                        {(e.totalPrice) == null ? (
                                            <td style={{ textAlign: 'center' }}><TiMediaRecordOutline /></td>
                                        ) : (
                                            <td style={{ textAlign: 'center' }}><TiMediaRecord /></td>
                                        )}
                                        <td style={{ textAlign: 'center' }}>{e.Company}</td>
                                        <td style={{ textAlign: 'center' }}>{e.quantity}</td>
                                        <td style={{ textAlign: 'center' }}>{e.customer_id + 10}</td>
                                        <td style={{ textAlign: 'center' }}>{e.date}</td>
                                        {(e.totalPrice) == null ? (

                                            <td style={{ textAlign: 'center' }}> 0 TL</td>

                                        ) : (
                                            <td style={{ textAlign: 'center' }}>{e.totalPrice} TL</td>
                                        )}
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


export default OrderReport