import React, { useState, useEffect } from "react";
import axios from "axios";
import { SlBasket } from "react-icons/sl";
import { IoIosSave } from "react-icons/io";
import { FaTruck } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import Badge from '@mui/material/Badge';



function Products() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [sum, setSum] = useState(0);
    const [temp, setTemp] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [c, setC] = useState(0);
    const { cartid } = useParams();


    const handleIncrement = (product) => {

        let newData = [...data];



        newData[product.unique_id - 1].quantity++;
        newData[product.unique_id - 1].cartid = cartid;
        newData[product.unique_id - 1].total_price = newData[product.unique_id - 1].quantity * product.price;
        setData(newData);
        setTemp(prevSum => prevSum + 1);
        setTotalPrice(prevSum => prevSum + product.price);


    };
    const handleDecrement = (product) => {
        let newData = [...data];
        if (newData[product.unique_id - 1].quantity > 0) {
            newData[product.unique_id - 1].quantity--;
            newData[product.unique_id - 1].cartid = cartid;
            //newData[product.unique_id - 1].total_price = totalPrice;
            setTotalPrice(prevSum => prevSum - product.price);

            // Güncellenmiş verileri setData ile güncelle
            newData[product.unique_id - 1].total_price = newData[product.unique_id - 1].quantity * product.price;
            setData(newData);
            setTemp(prevSum => prevSum - 1);
        }


    };
    



console.log(data)

    const addBasket = async (product) => {
        const totalQuantity = data.reduce((sum, a) => sum + a.quantity, 0);
        setC(totalQuantity);


        setSum(temp);
        console.log(temp)

        console.log(totalPrice)

        console.log("product", product)

        try {
            const response = await fetch('http://localhost/api/addBasket.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                throw new error('Network response was not ok.');
            }
            const data = await response.json();
            console.log('Basket updated successfully:', data);
        } catch (error) {
            console.error('Error adding to basket:', error);
        }
    };

    const quani = async (cartid) => {

        console.log("cartid:", cartid)
        try {
            const response = await fetch('http://localhost/api/quantity.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cartid: cartid })

            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');

            }
            const data = await response.json();
            setData(data)
            console.log("gelen data:", data)
            const totalQuantity = data.reduce((sum, a) => sum + a.quantity, 0);
            setC(totalQuantity);

        } catch (error) {
            console.error('Error adding to basket:', error);
        }
    }


    useEffect(() => {


        quani(cartid)


    }, [cartid])





    useEffect(() => {

        console.log(data)
    }, [data])


    return (
        <div>

            <div style={{ backgroundColor: '#d7ecf5', justifyContent: 'flex-end', padding: '5px 5px 2px', display: 'flex', height: '40px' }}>
                <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', fontSize: '30px', marginBottom: '10px' }}>
                    <Link to="/orderRequest">
                        <FaRegUser style={{ padding: ' 5px 5px' }} />
                    </Link>

                    
                    
                    <Link to={`/basket/${cartid}`} >

                        <Badge badgeContent={c} color="error" style={{ marginRight: '5px' }}>
                            <SlBasket />
                        </Badge>

                    </Link>




                </div>

            </div>


            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '20px 8px', textAlign: 'center', textDecoration: 'none' }}>
                {data.map(product => (
                    <div key={product.ID} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', width: '200px', textAlign: 'center', backgroundColor: '#f0f5f6' }}>

                        <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{product.ID}</h3>
                        <p style={{ color: 'black' }}>{product.product_name}</p>
                        {product.price > 0 ? (
                            <p style={{ color: '#555' }}>{product.price} TL</p>
                        ) : (
                            <p style={{ color: 'red', fontSize: '15px' }}>fiyat yok</p>
                        )}



                        <div style={{ marginBottom: '12px' }}>
                            <CiCircleMinus onClick={() => handleDecrement(product)} style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }} />
                           
                            <span>{product.quantity}</span>

                            <CiCirclePlus onClick={() => handleIncrement(product)} style={{ fontSize: '20px', color: 'rgb(6, 130, 47)', cursor: 'pointer' }} />

                        </div>

                        <button onClick={() => addBasket(product)} style={{ fontSize: '25px', backgroundColor: 'green', padding: '3px', borderRadius: '7px', color: 'black' }}>
                            <SlBasket />
                        </button>





                    </div>
                ))}
            </div>






        </div>
    )
}

export default Products