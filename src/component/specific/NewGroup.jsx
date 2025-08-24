import { useInputValidation } from '6pp';
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from 'react-redux';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { setIsNewGroup } from '../../redux/reducer/misc';
import toast from 'react-hot-toast';
const NewGroup = () => {

  const {isNewGroup}=useSelector((state)=>state.misc);
  const dispatch=useDispatch();
  const {isError,isLoading,error,data}=useAvailableFriendsQuery();
const [newGroup,isLoadingNewGroup]=useAsyncMutation(useNewGroupMutation)
  const groupName=useInputValidation("")

const [selectedMembers,setSelectedMembers]=useState([]);


const errors=[
  {
    isError,
    error,
  }
]

useErrors(errors);

const submitHandler=()=>{
  if(!groupName.value) return toast.error("Group name id required");
  if(selectedMembers.length<2)
    return toast.error("please select atleast 3 members");

  newGroup("Creating new group..",{name:groupName.value,members:selectedMembers})
  closeHandler();
}
  const selectMemberHandler=(id)=>{
    setSelectedMembers(prev=>
      prev.includes(id)?prev.filter((curr)=>curr!==id)
      :[...prev,id])
    
  };

const closeHandler=()=>{

dispatch(setIsNewGroup(false))

}

  return (
    <Dialog open={isNewGroup} onClose={closeHandler} >
<Stack p={{xs:"1rem",sm:"3rem"}} width={"25rem"} spacing="2rem">
  <DialogTitle textAlign={"center"} variant="h4"> New Group</DialogTitle>
  <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/> 
    <Typography variant='body1'>
      Members
    </Typography>
  <Stack>
    {
    isLoading?(<Skeleton/>):(
      data?.friends?.map((user)=>(
       <UserItem user={user} 
       key={user._id} 
       handler={selectMemberHandler}
       isAdded={selectedMembers.includes(user._id)}
       />
      ))
    )}
  </Stack>
    <Stack direction={"row"} justifyContent={"space-evenly"}>
<Button variant="contained" color="error" size="large" onClick={closeHandler}>Cancel</Button>
<Button variant="contained" size="large" onClick={submitHandler} disabled={isLoadingNewGroup}>Create</Button>
    </Stack>
</Stack>
  </Dialog>
  )
}

export default NewGroup
