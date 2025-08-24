import React, { lazy, Suspense, useState } from 'react'
import {AppBar,Backdrop,Badge,Box, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import { orange } from "../../constants/color"
import {Group as GroupIcon,
    Menu as MenuIcon,
    Search as SearchIcon
    ,Add as AddIcon,
Logout as LogoutIcon,
Notifications as NotificationsIcon} from "@mui/icons-material"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../constants/config';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/reducer/auth';
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducer/misc';
import { resetNotificationCount } from '../../redux/reducer/chat';


const SearchDialog=lazy(()=>import("../specific/Search"))
const NotificationDialog=lazy(()=>import("../specific/Notifications"))
const NewGroupDialog=lazy(()=>import("../specific/NewGroup"))

const Header = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {isSearch,isNotification,isNewGroup}=useSelector((state)=>state.misc)
        const {notificationCount}=useSelector((state)=>state.chat)

    const handleMobile=()=>dispatch(setIsMobile(true))
    const openSearchDialog =()=>dispatch(setIsSearch(true))
    
    const openNewgroup =()=>{
        dispatch(setIsNewGroup(true))
    }
        
    const NavigateToGroup =()=>{
       navigate("/groups");
    };
    const LogoutHandler =async()=>{
       try{
const {data}=await axios.get(`${server}/api/v1/user/logout`,{
    withCredentials:true,
})
dispatch(userNotExists());
toast.success(data.message);
       }catch(error){
        toast.error(err?.response?.data?.message||"something went wrong")
       }
    };
    const openNotifications =()=>{
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount())
    }
  return <>

  <Box sx={{flexGrow:1}} height={"4rem"}>
    <AppBar position="static" sx={{
        bgcolor:orange,
    }}>
<Toolbar>
<Typography
variant="h6"
sx={{
    display:{xs:"none",sm:"block"},
}}
>
    chat
</Typography>
<Box sx={{
    display:{xs:"block",sm:"none"},
}}>
<IconButton color="inherit" onClick={handleMobile}><MenuIcon/></IconButton>

</Box>
<Box sx={{
    flexGrow:1
}}/>

<Box>
   <IconBtn
   title={"Search"}
   icon={<SearchIcon/>}
   onClick={openSearchDialog}/>

<IconBtn
   title={"New Group"}
   icon={<AddIcon/>}
   onClick={openNewgroup}/>
   
    <IconBtn
   title={"Mangage Group"}
   icon={<GroupIcon/>}
   onClick={NavigateToGroup}/>

<IconBtn
   title={"Notifications"}
   icon={<NotificationsIcon/>}
   onClick={openNotifications}
   value={notificationCount}/>

<IconBtn
   title={"Logout"}
   icon={<LogoutIcon/>}
   onClick={LogoutHandler}/>

</Box>

</Toolbar>
        </AppBar>


 {isSearch &&(
    <Suspense fallback={<Backdrop open/>}>
 <SearchDialog/>
 </Suspense>)}

 {isNotification &&
 (    <Suspense fallback={<Backdrop open/>}>
 <NotificationDialog/>
 </Suspense>)}

 {isNewGroup &&
 (    <Suspense fallback={<Backdrop open/>}>
 <NewGroupDialog/>
 </Suspense>)}
 </Box>
  </>
}
const IconBtn=({title,icon,onClick,value})=>{
    return (
        <Tooltip title={title}>
            <IconButton color="inherit" size="large" onClick={onClick}>
              {value?<Badge badgeContent={value} color='error'>{icon}</Badge>:icon}
            </IconButton>
        </Tooltip>
    )
}
export default Header
