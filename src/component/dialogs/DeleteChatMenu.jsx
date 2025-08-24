import React, { useEffect } from 'react'
import{Menu,Stack, Typography} from "@mui/material"
import { useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducer/misc';
import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../../hooks/hook';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api';

const DeleteChatMenu = ({dispatch,deleteMenuAnchor}) => {
   
  const navigate=useNavigate();
  const {isDeleteMenu,selectDeleteChat}=useSelector((state)=>state.misc);
  const [deleteChat,_,deleteChatData]=useAsyncMutation(useDeleteChatMutation)
  const [leaveGroup,__,leaveGroupData]=useAsyncMutation(useLeaveGroupMutation)
  const isGroup=selectDeleteChat.groupChat;

  const closeHandler=()=>{
dispatch(setIsDeleteMenu(false));
deleteMenuAnchor.current=null
  }

const leaveGroupHandler=()=>{
closeHandler();
leaveGroup("leave group..",selectDeleteChat.chatId)
};
const deleteChatHandler=()=>{
  
closeHandler();
deleteChat("deleting chat..",selectDeleteChat.chatId)

}

useEffect(()=>{
if(deleteChatData||leaveGroupData) navigate("/");


},[deleteChatData,leaveGroupData])


  return (
<Menu open={isDeleteMenu} 
onClose={closeHandler}
 anchorEl={deleteMenuAnchor}
 anchorOrigin={{
  vertical:"bottom",
  horizontal:"right",
 }}
 transformOrigin={{
  vertical:"center",
  horizontal:"center"
 }}
 >

<Stack 
 sx={{
  width:"10rem",
  
  padding:"0.5rem",
  cursor:"pointer",
 }}
 direction={"row"}
 alignItems={"center"}
 spacing={"0.5rem"}
onClick={isGroup?leaveGroupHandler:deleteChatHandler}
> 
{
  selectDeleteChat.groupChat?(<><ExitToAppIcon/><Typography>Leave Group</Typography></>):
  (<><DeleteIcon/><Typography>Delete Chat</Typography></>)
}
</Stack>

</Menu>
  )
}

export default DeleteChatMenu
