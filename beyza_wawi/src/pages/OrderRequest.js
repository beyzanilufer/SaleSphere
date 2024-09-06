import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTruck } from "react-icons/fa";
import { Link , useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import '../css/Header.css'


function OrderRequest() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
  
    

    const fetchData = () => {
        try {
            axios.get('http://localhost/api/output.php').then((res) => {

                setData(res.data);

            })
        } catch {
            setError('Müşteriler yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }


    }


    const handleClick = (customer) => {
        console.log(customer)

        sessionStorage.setItem("pageTitle", customer.Company);

        console.log(customer.ID)
       
        fetch('http://localhost/api/addCart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => response.json())
            .then(res => {
                console.log('Customer added with ID:', res.last_insert_id);
                navigate(`/products/${res.last_insert_id}`)
            })
          

    };




    useEffect(() => {
        if (loading) {
            <p>Yükleniyor...</p>

        } else if (error) {
            <p>{error}</p>
            return
        }

        fetchData();

    }, [])



    return (
        <div>



            <div style={{ backgroundColor: '#d7ecf5', justifyContent: 'flex-end', padding: '5px 5px 2px', display: 'flex', height: '30px' }}>
                <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', flex: 1, fontSize: '20px' }}>
                    <IoSearchSharp style={{ backgroundColor: 'white', height: '30px' }} />
                    <input placeholder="Search" style={{ border: 'none', outline: 'none' }} />
                </div>
                <Link style={{ fontSize: '20px' }} to="/orderList">
                    <FaTruck />
                </Link>

            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '8px 4px', textAlign: 'center', justifyContent: 'center' }}>
                {data.map(customer => (
                    <Link onClick={() => handleClick(customer)}
                        //to="/products/10554054545"
                        /*to={`/products/${customer.ID}`} */


                        style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '20px 8px', textAlign: 'center', textDecoration: 'none' }}>
                        <div key={customer.ID} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', width: '200px', textAlign: 'center', backgroundColor: '#f0f5f6' }}>

                            <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{customer.Company}</h3>
                            <p style={{ color: '#555' }}>{customer.City}</p>
                            <p style={{ color: 'black' }}>{customer.First_Name} {customer.Last_Name}</p>
                        </div>
                    </Link>
                ))}
            </div>

             




        </div>
    )
}

export default OrderRequest