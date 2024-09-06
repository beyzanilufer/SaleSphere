
import '../css/Login.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../src/img/indir.jpg";

function Login({ setIsLogin }) {

  const [data, setData] = useState({
    username: '',
    password: ''
  })
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();



  const getData = async () => {
    if ((!data.username) || (!data.password)) {
      setNotification("Please fill in the fields!!!");

      return
    }
    const response = await fetch('http://localhost/api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result.success);
    if (result.success) {
      setNotification('Login successful!');
      setIsLogin(false);
      navigate('/home');
      sessionStorage.setItem("username", data.username)
    } else {
      setNotification(result.message);
      setData({
        username: '',
        password: ''
      })
    }


  }

  const addData = () => {
    if ((!data.username) || (!data.password)) {
      setNotification("Please fill in the fields!!!");
      //alert('Please fill in the fields!!!');

      return
    }
    fetch('http://localhost/api/addusers.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        setNotification(data.message)
        setData({
          username: '',
          password: ''
        })
      })

  }


  useEffect(() => {

    if (notification) {
      const timee = setTimeout(() => {
        setNotification('');
      }, 2000);
      return () => clearTimeout(timee);
    }

    
  }, [data, notification])


  return (
    <div className='login'>
      <div className="App">



        <h5>Username</h5>
        <input value={data.username} placeholder='username' onChange={(e) => {
          setData({ ...data, username: e.target.value })
        }} />
        <h5>Password</h5>
        <input value={data.password} placeholder='password' onChange={(e) => {
          setData({ ...data, password: e.target.value })
        }} />
        <br />
        <button onClick={() => addData()}>Kaydol</button>
        <button onClick={() => getData()}>giriş</button>

        <h3 style={{ color: 'darkred' }}>{notification}</h3>


      </div>
    </div>
  );
}

export default Login;
