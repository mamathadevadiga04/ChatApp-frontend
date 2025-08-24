import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import {sampleUsers} from "../../constants/sampleData"
 import UserItem from "../shared/UserItem";
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useAddGroupMemberMutation, useAvailableFriendsQuery } from '../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../../redux/reducer/misc';


 const AddMemberDialog = ({chatId}) => {

  const dispatch=useDispatch();
const {isAddMember}=useSelector((state)=>state.misc)
const{isLoading,data,isError,error}=useAvailableFriendsQuery(chatId)

const [selectedMembers,setSelectedMembers]=useState([]);
const [addMembers,isLoadingaddMembers]=useAsyncMutation(useAddGroupMemberMutation);
  
const selectMemberHandler=(id)=>{
    setSelectedMembers(prev=>
      prev.includes(id)?prev.filter((curr)=>curr!==id)
      :[...prev,id])
    
  };
 
    
  const closeHandler=()=>{
dispatch(setIsAddMember(false))
  };
  const addMemberSubmitHandler=()=>{
    addMembers("adding members",{members:selectedMembers,chatId})
    closeHandler();
  }

useErrors([{isError,error}])



  return <Dialog open={isAddMember} onClose={closeHandler}>
<Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
<DialogTitle textAlign={"center"}>Add member</DialogTitle>
    <Stack spacing={"1rem"}>

{isLoading?(<Skeleton/>):
data?.friends?.length>0?(
    data?.friends?.map((i)=>(
        <UserItem key={i._id} 
        user={i}
         handler={selectMemberHandler}
         isAdded={selectedMembers.includes(i._id)}
         />
    ))

):(<Typography textAlign={"cenetr"}>No Friends</Typography>)
}

    </Stack>
    <Stack direction={"row"} alignContent={"space-evenly"} alignItems={"center"} >
         <Button color="error" onClick={closeHandler}>Cancel</Button>
    <Button onClick={addMemberSubmitHandler} variant='contained' disabled={isLoadingaddMembers}>Submit Changes</Button>
    </Stack>
</Stack>
   </Dialog>
  
}

export default AddMemberDialog
