
import { Box, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { Link } from "../styles/StyledComponent"
import AvatarCard from './AvatarCard'
import {motion} from "framer-motion"
const Chatitem=({
  avatar=[],
  name,
    _id,
    groupChat=false,
sameSender,
newMessageAlert,
index=0,
isOnline,
handleDeleteChat
}) =>{
  return (
  <Link
  sx={
    {
      padding:"0"
    }
  }
  to={`/chat/${_id}`}
  onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}>

    <motion.div
    initial={{opacity:0,y:"-100%"}}
    whileInView={{opacity:1,y:0}}
    transition={{delay:index*0.1}}
    style={
      {
      display:"flex",
      gap:"1rem",
      alignItems:"center",
      padding:"1rem",
      backgroundColor:sameSender?"black":"unset",
      color:sameSender?"white":"unset",
      position:"relative",
      }
    }>
   <AvatarCard avatar={avatar}/>
<Stack>
    <Typography>
{name}
    </Typography>
    {
      newMessageAlert&&(
        <Typography>
          {
            newMessageAlert.count
          }
          New Message
        </Typography>
      )
    }
</Stack>


  {isOnline&&(
   
    <Box 
    sx={{
      width:"10px",
      height:"10px",
    backgroundColor:"green",
      borderRadius:"50%",
      position:"absolute",
      top:"50%",
      right:"1rem",
      transform:"translateY(-50%)",
    }}
    
    />
  )
}
    </motion.div>
  </Link>
  )
}

export default memo(Chatitem)
