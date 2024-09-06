import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { Link ,useParams} from "react-router-dom";
import { FaCubes } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";




function Basket() {
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sum, setSum] = useState(0);
    const { cartid } = useParams();
    const [totalPrice, setTotalPrice] = useState(0);
    

    const fetchData = async (cartid) => {
        try {
            const response = await axios.get('http://localhost/api/outputProductBasket.php', {
                params: { cartid } // cartid'yi sorgu parametresi olarak ekleyin
            });
           
            setData(response.data);
        
        } catch (error) {
            setError('Ürünler yüklenirken bir hata oluştu.');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }

    };
    useEffect(() => {
        if (data.length > 0) {
            const total = data.reduce((acc, product) => acc + product.total_price, 0);
            setSum(total);
        }
    }, [data]); // `data` değiştiğinde bu `useEffect` tetiklenecek


    
    
    const handleOrder = async () => {
        console.log("vvvv", data);
        console.log("Sepet verileri ve toplam fiyat", {totalPrice: sum ,cartid:cartid});
        try{
            const response=await fetch('http://localhost/api/updateCart.php',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ totalPrice: sum ,cartid: cartid })
            })
            if (!response.ok) {
                throw new error('Network response was not ok.');
            }
            const data = await response.json();
            console.log('Basket updated successfully:', data);
           
        }catch(error){
            console.log('Error adding to basket:', error);
        }

    };
    


    useEffect(() => {
        
        if (cartid) {
            fetchData(cartid); 
        }
        


    }, [cartid])




    return (
        <div >
            <div style={{ backgroundColor: '#d7ecf5', justifyContent: 'flex-end', padding: '5px 5px 2px', display: 'flex', height: '40px' }}>
                <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', flex: 1, fontSize: '20px' }}>
                    <IoSearchSharp style={{ backgroundColor: 'white', height: '30px', marginTop: '5px' }} />
                    <input placeholder="Search" style={{ border: 'none', outline: 'none', height: '20px', marginTop: '5px' }} />
                </div>
                <Link style={{ fontSize: '25px', padding: '5px 5px' }} to="/orderRequest"><FaRegUser /></Link>
                <Link style={{ fontSize: '25px', padding: '5px 5px' }} to={`/products/${cartid}`}>
                    <FaCubes />
                </Link>
                <Link style={{ fontSize: '25px', padding: '5px 5px' }} to="/orderList">
                    <FaTruck />
                </Link>

            </div>

            <div style={{ color: 'white', textAlign: 'center', textDecoration: 'underline' }}>
                <h1 >SHOP CART</h1>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>


                {data.map(product => (
                    <div key={product.ID} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', width: '200px', textAlign: 'center', backgroundColor: '#f0f5f6', margin: '5px' }}>
                        <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{product.product_name}</h3>
                        <p>ÜRÜN FİYATI: {product.price} TL</p>
                        <p>{product.quantity} TANE</p>
                        <p>TOPLAM TUTAR: {product.total_price} TL</p>
                    </div>
                ))}


                <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', width: '200px', textAlign: 'center', backgroundColor: '#f0f5f6', margin: '5px' }}>
                    <h2 style={{ color: 'red', marginTop: '0', height: '100px' }}>SİPARİŞ ÖZETİ</h2>
                    <h5>Toplam TUTAR: {sum}</h5>
                    <button style={{ marginTop: '10px' }} onClick={handleOrder}>
                        <h5>Siparişi Onayla</h5>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Basket