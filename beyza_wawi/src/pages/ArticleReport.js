import React, { useEffect, useState } from "react";
import '../css/Business.css'
import '../css/Header.css'
import axios from "axios";


function ArticleReport() {
    const [data, setData] = useState([]);
    const showNum = 10;
    const [page, setPage] = useState(0);
    const [sum, setSum] = useState(0);

    const fetchData = () => {
        axios.get('http://localhost/api/articleReport.php').then((res) => {
            setSum(res.data.length);
            setData(
                res.data.slice((page + 1) * showNum - 10, (page + 1) * showNum)
            );
        })
    }

    useEffect(() => {
        fetchData();
    });




    return (


        <div>
            <div className="pagee">
                <div className="table">
                    <table>
                        <thead>
                            <tr >
                                <th style={{textAlign:'center'}}>Company</th>
                                <th style={{textAlign:'center'}}>Product Number</th>
                                <th style={{textAlign:'center'}}>Article</th>
                                <th style={{textAlign:'center'}}>Barcode</th>
                                <th style={{textAlign:'center'}}>Sales quantity</th>
                                <th style={{textAlign:'center'}}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((e) => (
                                    <tr key={e.ID}>
                                        <td style={{textAlign:'center'}}>{e.Company}</td>
                                        <td style={{textAlign:'center'}}>{e.product_id}</td>
                                        <td style={{textAlign:'center'}}>{e.product_name}</td>
                                        <td style={{textAlign:'center'}}>{e.barcode}</td>
                                        <td style={{textAlign:'center'}}>{e.quantity}</td>
                                        <td style={{textAlign:'center'}}>{e.total_price}</td>
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


export default ArticleReport