import React, { useEffect } from 'react'
import { useState } from 'react'
import "./ListFriend.scss"
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { renew } from '../../redux/message'
const ListFriend = ({handleCreateRoom,socket}) => {
  
    const [inputValue, setInputValue] = useState("")
    const [listfriend,setListFriend] = useState([])
    const [listSearch,setListSearch] = useState([])
    const [search, setSearch] = useState(false)
    const accessToken = useSelector((state)=>state.user.current.accessToken)
    const userId = useSelector((state)=>state.user.current._id)
    // console.log("accessToken",accessToken);
    // console.log("userId", userId)
    const dispatch = useDispatch();
    const getRoomById = () => {
      // console.log(process.env.REACT_APP_SERVER_PATH+"room/"+userId);
      axios.get(process.env.REACT_APP_SERVER_PATH+"room/"+userId,{ headers: {"Authorization" : `Bearer ${accessToken}`} }).then((res)=>{
        setListFriend(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    const handleChangeInput = (e)=>{
      setInputValue(e.target.value)
      setSearch(true);
      if(e.target.value !=="")
      {
        axios.get(process.env.REACT_APP_SERVER_PATH+"user/find?username="+inputValue, { headers: {"Authorization" : `Bearer ${accessToken}`} })
      .then((res)=>{
        setListSearch(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
      }
      else{
        getRoomById();
        setSearch(false)
      }
    }
    
    
    useEffect(()=>{
     getRoomById();
     
    },[])
    
  return (
  
    <div className='listFriend'>
            <div className='search'>
                <div className='search__input'>
                <input value={inputValue} onChange = {handleChangeInput}  placeholder="Search Friend"></input>
                </div>
               
            </div>
           {/* {
           listfriend.length !==0 &&   listfriend.map((item,index)=> <div className={search? 'friend__list displayNone': 'friend__list'}>
            <div className='friend__item'>
                <div className='friend__avatar'>
                    <img src={item.users[0].avatar} alt="avatar"></img>
                </div>
                <p>{item.users[0].username}</p>
            </div>
        </div>)
           } */}
           {
             listSearch.map((item,index)=> <div className={search? 'friend__list': 'friend__list displayNone'}>
            <div className='friend__item' onClick={(e)=>{
             
              handleCreateRoom(e.target.getAttribute("value"),userId)
            }} key={index} value={item._id}>
                <div className='friend__avatar' value={item._id}>
                    <img value={item._id} src={item.avatar} alt="avatar"></img>
                </div>
                <p value={item._id}>{item.username}</p>
            </div>
        </div>)
           }
    </div>
  )
}

export default ListFriend