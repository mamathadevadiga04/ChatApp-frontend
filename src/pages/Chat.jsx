import React, { Fragment, useEffect, useRef, useState } from 'react'
import AppLayout from '../component/layout/AppLayout'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { grayColor } from '../constants/color';
import {  AttachFile  as AttachFileIcon,NoStroller,Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../component/styles/StyledComponent';
import { orange } from '@mui/material/colors';
import FileMenu from '../component/dialogs/FileMenu';
import MessageComponenet from '../component/shared/MessageComponenet';
import { getSocket } from '../socket';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import {useInfiniteScrollTop} from "6pp";
import { useCallback } from 'react';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducer/misc';
import { removeNewMessagesAlert } from '../redux/reducer/chat';
import { TypingLoader } from '../component/layout/Loaders';
import { useNavigate } from 'react-router-dom';


const chat = ({chatId,user}) => {

const conatainRef=useRef(null);
const socket=getSocket();
const dispatch=useDispatch();
const navigate=useNavigate();

const [message,setMessage]=useState("");
const [messages,setMessages]=useState([])
const [page,setPage]=useState(1);
const [fileMenuAnchor,setFileMenuAnchor]=useState(null)

const [iamTyping,setIamTyping]=useState(false);
const[userTyping,setUserTyping]=useState(false);
const typingTimeout=useRef(null);
const bottomRef=useRef(null);
const chatDetails=useChatDetailsQuery({chatId,skip:!chatId})

const oldMessagesChunk=useGetMessagesQuery({chatId,page})

const {data:oldMessages,setData:setoldMessages}=useInfiniteScrollTop(
  conatainRef,
oldMessagesChunk.data?.totalPages,
page,
setPage,
oldMessagesChunk.data?.messages
);

const errors=[{isError:chatDetails.isError,error:chatDetails.error},
  {isError:oldMessagesChunk.isError,error:oldMessagesChunk.error}
]


const members=chatDetails.data?.chat?.members;

const messageOnChange=(e)=>{
  setMessage(e.target.value);
  if(!iamTyping){
 socket.emit(START_TYPING,{members,chatId});
  setIamTyping(true);
}

if(typingTimeout.current) clearTimeout(typingTimeout.current);
 typingTimeout.current=setTimeout(()=>{
  socket.emit(STOP_TYPING,{members,chatId})
  setIamTyping(false)
},[2000]);

}


const handleFileOpen=(e)=>{
dispatch(setIsFileMenu(true));
setFileMenuAnchor(e.currentTarget)
}

const submitHandler=(e)=>{
e.preventDefault();
if(!message.trim())return;
//emitting message to the server
socket.emit(NEW_MESSAGE,{chatId,members,message})
setMessage("")
}
useEffect(()=>{
  socket.emit(CHAT_JOINED,{userId:user._id,members})
dispatch(removeNewMessagesAlert(chatId))

return ()=>{
  setMessage("");
setMessages([]);
setoldMessages([]);
setPage(1);
socket.emit(CHAT_LEAVED,user._id)
};
},[chatId])



useEffect(()=>{
if(bottomRef.current) bottomRef.current.scrollIntoView({behavior:"smooth"})
},[messages]);

useEffect(()=>{
if(!chatDetails.data?.chat)return navigate("/")
},[chatDetails.data])


const newMessagesHandler=useCallback((data)=>{
if(data.chatId!==chatId)return;

//  console.log(data)
  setMessages((prev)=>[...prev,data.message])
},[chatId])

const startTypingListener=useCallback((data)=>{
if(data.chatId!==chatId)return;
setUserTyping(true);
},[chatId])


const stopTypingListener=useCallback((data)=>{
if(data.chatId!==chatId)return;
setUserTyping(false)
},[chatId])

const alertListener=useCallback((data)=>{

  if(data.chatId!==chatId) return;
  const  messageForAlert={
        content:message,
        sender:{
            _id:"hthsert5hyt",
            name:"Admin",
        },
        chat:chatId,
        createdAt:new Date().toISOString(),
    }
setMessages((prev)=>[...prev,messageForAlert]);
},[chatId])


const eventArr={
  [ALERT]:alertListener,
  [NEW_MESSAGE]:newMessagesHandler,
  [START_TYPING]:startTypingListener,
  [STOP_TYPING]:stopTypingListener,
};

useSocketEvents(socket,eventArr)
useErrors(errors)
  
const allMessages=[...oldMessages,...messages]

return  chatDetails.isLoading?<Skeleton/>:(
    <Fragment>
  <Stack ref={conatainRef}
  boxSizing={"border-box"}
  padding={"1rem"}
  spacing={"1rem"}
  bgcolor={grayColor}
height={"90%"}
sx={{
  overflowX:"hidden",
  overflowY:"auto",
}}
  >



 {allMessages.map((i)=>(
    <MessageComponenet key={i._id} message={i} user={user}/>
 ))
}

{
  userTyping&&<TypingLoader/>
}
<div ref={bottomRef}/>

  </Stack>
  <form
  style={{
    height:"10%"
  }}
  onSubmit={submitHandler}
  >
    <Stack direction={"row"} height={"100%"}
    padding={"1rem"}
    alignItems={"center"}
    position={"relative"}
    >
      <IconButton
      sx={{
     
     marginRight:"1.5rem",
     rotate:"30deg",
      }}
   onClick={handleFileOpen}
      >
        <AttachFileIcon/>
      </IconButton>
      <InputBox placeholder='Type Message Here' value={message}
      onChange={messageOnChange}
      />
      <IconButton type="submit"
      sx={{
        rotate:"-30deg",
        bgcolor:"orange",
color:"white",
 marginLeft:"1rem",
 padding:"0.5rem",
 "&:hover":{
  bgcolor:"error.dark",
 }

      }}
      >
        <SendIcon/>
      </IconButton>
    </Stack>

  </form>

<FileMenu anchorEl={fileMenuAnchor} chatId={chatId}/>
    </Fragment>
  
  )
}

export default AppLayout()(chat)