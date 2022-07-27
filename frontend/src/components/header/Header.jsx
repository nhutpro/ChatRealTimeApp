import React from 'react'
import "./Header.scss"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/user'
const Header = () => {
    const avatar = useSelector((state)=> state.user.current.avatar)
 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");

    }
  return (
    <div className="header">
        <div className='header__start'>Trần Nhựt</div>
        <div className='header__end'>
            <div className='avatar__box'>
                <img src={avatar} alt = "avatar"></img>
            </div>
            <div>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </div>
    </div>
  )
}

export default Header