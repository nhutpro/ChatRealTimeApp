import React from 'react'
import {useDispatch} from "react-redux";
import { logout } from '../../redux/user';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");

    }
  return (
    <div>
        <p>welcome home</p>
        <button onClick={handleLogout}>logout</button>
    </div>

  )
}

export default Home