import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { memo, Suspense, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AvatarCard from '../component/shared/AvatarCard';
import { Link } from '../component/styles/StyledComponent';

import { lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutLoader } from '../component/layout/Loaders';
import UserItem from '../component/shared/UserItem';
import { bgGradient } from '../constants/color';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api';
import { setIsAddMember } from '../redux/reducer/misc';
const AddMemberDialog=lazy(()=>import ("../component/dialogs/AddMemberDialog"))
const ConfirmDeleteDialog=lazy(()=>import ("../component/dialogs/ConfirmDeleteDialog"))


const Groups = () => {

  const chatId=useSearchParams()[0].get("group");
  const navigate=useNavigate();
const dispatch=useDispatch();

const {isAddMember}=useSelector((state)=>state.misc)
const myGroups=useMyGroupsQuery("")

const groupDetails=useChatDetailsQuery(
  {chatId,populate:true},
  {skip:!chatId}
);
const [updateGroup,isLoadingGroupName]=useAsyncMutation(useRenameGroupMutation);

const [removeMember,isLoadingRemoveMember]=useAsyncMutation(useRemoveGroupMemberMutation);
const [deleteGroup,isLoadingDeleteGroup]=useAsyncMutation(useDeleteChatMutation);

const navigateBack=()=>{
  navigate("/")
};
const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false);
const [isEdit,setIsEdit]=useState(false);
const [groupName,setGroupName]=useState("")
const [groupNameUpdatedValue,setIsGroupNameUpdatedValue]=useState("")
const [confirmDeleteDialog,setConfirmDeleteDialog]=useState(false);
const [members,setMembers]=useState([]);

const errors=[{
  isError:myGroups.isError,
  error:myGroups.error,
},{
    isError:groupDetails.isError,
  error:groupDetails.error,
}]
useErrors(errors)



useEffect(()=>{
  const groupData=groupDetails.data;
      if (groupData) {
   setGroupName(groupData.chat.name);
      setIsGroupNameUpdatedValue(groupData.chat.name)
setMembers(groupData.chat.members);
      }
 return () => {
      setGroupName("");
      setIsGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };

},[groupDetails.data])

const handleMobile=()=>{
  setIsMobileMenuOpen((prev)=>!prev)
}
const handleMobilClose=()=>{
  setIsMobileMenuOpen(false);
}
const updateGroupNmae=()=>{
  setIsEdit(false);
  updateGroup("updating group name",{
    chatId,
    name:groupNameUpdatedValue,
  })
 
};
const openConfirmDeleteHandler=()=>{
setConfirmDeleteDialog(true)
 
};

const closeConfirmDeleteHandler=()=>{
  setConfirmDeleteDialog(false);
  
};
const deleteHandler=()=>{
deleteGroup("deleting group..",chatId)
  closeConfirmDeleteHandler();
  navigate("/groups")
}

const openAddMember=()=>{
  dispatch(setIsAddMember(true));
}
const removeMemberHandler=(userId)=>{
removeMember("removing member...",{chatId,userId})
 
}

useEffect(()=>{
if(chatId)
{
  setGroupName(`group name ${chatId}`);
setIsGroupNameUpdatedValue(`group name ${chatId}`)

}
return ()=>{
  setGroupName("");
  setIsGroupNameUpdatedValue("");
  setIsEdit(false);
}
},[chatId])

  const IconBtns=(
  <>
   <Box
   sx={{
      display:{
        xs:"block",
        sm:"none",
        position:"fixed",
        right:"1rem",
        top:"1rem"
      }
    }}
   >
  
  <IconButton onClick={handleMobile}>
    <MenuIcon/>
    </IconButton>
  
   
   </Box>

  <Tooltip title="back">
    <IconButton
    sx={{
      position:"absolute",
      top:"2rem",
      left:"2rem",
      bgcolor:"#1c1c1c",
      color:"white",
      ":hover":{
        bgcolor:"rgba(0,0,0,0.7)"
      }
    }}
    onClick={navigateBack}
    >
      <KeyboardBackspaceIcon/>
    </IconButton>
  </Tooltip>
  
  </>);
  const GroupName=(
  <Stack direction={"row"}
  alignItems={"center"}
  justifyContent={"cenetr"}
  spacing={"1rem"}
  padding={"3rem"}
  >
    {isEdit?(
      <>
   <TextField value={groupNameUpdatedValue}
   onChange={(e)=>setIsGroupNameUpdatedValue(e.target.value)}
   />
   <IconButton onClick={updateGroupNmae} disabled={isLoadingGroupName}>
    <DoneIcon/>
   </IconButton>
    </>)
    
    :(
    <>
    <Typography variant='h4'>
     {groupName}
    </Typography>
    <IconButton onClick={()=>setIsEdit(true)} disabled={isLoadingGroupName}><EditIcon/></IconButton>
    </>
    )}
  </Stack>
  );
  const ButtonGroup=
  (<Stack
  direction={{
        xs:"column-reverse",
    sm:"row",

  }}
  spacing={'1rem'}
  justifyContent={"center"}
  alignItems={"center"}
  p={{
       xs:"0",
    sm:"1rem",
 
    md:"1rem 4rem"
  }}
  >
  
    <Button size="large" color="error" startIcon={<DeleteIcon/>} onClick={openConfirmDeleteHandler}>DELETE GROUP</Button>
    <Button size="large" variant="contained" startIcon={<AddIcon/>} onClick={openAddMember}>ADD MEMBER</Button>

  </Stack>
  )
  return myGroups.isLoading?<LayoutLoader/>:( <Grid container height={"100vh"}>
    <Grid item
    sx={{
      display:{
        xs:"none",
        sm:"block",

      },
      backgroundImage:bgGradient,
    }}
    sm={4}
   
    >
<GroupList myGroups={myGroups?.data?.groups} chatId={chatId}/>

    </Grid>
    <Grid item xs={12}
    sm={8}
    sx={{
      display:"flex",
      flexDirection:"column",
      alignItems:"cenetr",
      position:"relative",
      padding:"1rem 3rem"
    }}
    >
{IconBtns}

  {groupName &&
  <>
  { GroupName}
<Typography
margin={"2rem"}
alignSelf={"flex-start"}
  variant="body1">
Members
</Typography>
<Stack
maxWidth={"45rem"}
width={"100%"}
boxSizing={"border-box"}
padding={{
  sm:"1rem",
  xs:"0",
  md:"1 rem 4rem"
}}
spacing={"2rem"}
height={"50vh"}
overflow={"auto"}
>

  {
    isLoadingRemoveMember?(<CircularProgress/>):
    members.map((i)=>(
      <UserItem user={i}
       key={i._id} 
      isAdded 
      styling={{
      boxShadow:"0 0 0.5rem rgba(0,0,0,0.2)",
      padding:"1rem 2rem",
      borderRadius:"1rem"
      }}
      handler={removeMemberHandler}
      />
    ))
  }
</Stack>
{
  ButtonGroup
}
  </>
  }
    </Grid>

{
isAddMember&&
<Suspense fallback={<Backdrop open/>}>
<AddMemberDialog chatId={chatId}/></Suspense>
}


{
  confirmDeleteDialog&&(
   <Suspense fallback={<Backdrop open/>}>
<ConfirmDeleteDialog open={confirmDeleteDialog}
handleClose={closeConfirmDeleteHandler}
deleteHandler={deleteHandler}
/>
  </Suspense>
)}

<Drawer 
sx={{
  display:{
    xs:"block",
    sm:"none",
  },
 
}}
open={isMobileMenuOpen} onClose={handleMobilClose}>
<GroupList w={"50vw"} myGroups={myGroups?.data?.groups} chatId={chatId}/>
</Drawer>
  </Grid>
  )
}

const GroupList=({w="100%",myGroups=[],chatId})=>{
return (
<Stack width={w} sx={{backgroundImage:bgGradient
  ,height:"100vh",
  overflowY:"auto",
  padding:"1rem"
  }}>
  {
    myGroups.length>0?(
      myGroups.map((group)=><GroupListItem group={group} chatId={chatId} key={group._id}/>)
    ):(
      <Typography textAlign={"cenetr"} padding={"1rem"}>No groups</Typography>
    )
  }
</Stack>
)
};
const GroupListItem=memo(({group,chatId})=>{
const {name,avatar,_id}=group;
console.log(group); // Make sure 'name' exists
return (<Link to={`?group=${_id}`}
onClick={(e)=>{
  if(chatId===_id) e.preventDefault();
}}
>
<Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
  <AvatarCard avatar={avatar}/>
    <Typography>
      {name}
    </Typography>

</Stack>
</Link>
)
})



export default Groups
