import React, { useEffect, useState } from "react";



function Cartitems(){

    const [data,setData]=useState([]);



    const fetchData = () => {
        try {
            axios.get('http://localhost/api/outputProductBasket.php').then((res) => {

                setData(res.data);
                console.log(res.data);
            })
        } catch {
            setError('ürünler yüklenirken bir hata oluştu.');
        } 

    }

    useEffect(()=>{
        fetchData();
        
    },[])



    return(

        <div>

            gfıudckj
        </div>
    )
}


export default Cartitems