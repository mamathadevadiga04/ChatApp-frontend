import React from 'react'
import AdminLayout from '../../component/layout/AdminLayout'
import { Box, Container, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon , Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material'
import moment from "moment"
import { CurveButton, SearchField } from '../../component/styles/StyledComponent'
import { DoughnutChart, LineChart } from '../../component/specific/Charts'
import { useFetchData } from '6pp'
import { server } from '../../constants/config'
import { LayoutLoader } from '../../component/layout/Loaders'
import { useErrors } from '../../hooks/hook'


const DashBoard = () => {
const { loading, data, error } = useFetchData({
  url: `${server}/api/v1/admin/stats`,
  key: "dashboard-stats",
  credentials: "include",
});


const {stats}=data||{};
useErrors([{
    isError:error,
    error:error
}])

    const Appbar=(
    <Paper elevation={3}
    sx={{
        padding:"2rem",
        margin:"2rem 0",
        borderRadius:"1rem"
    }}>
       <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{fontSize:"3rem"}}/>
       <SearchField  placeholder='search...'/>
<CurveButton>Search</CurveButton>
<Box flexGrow={1}/>
<Typography>  
        {moment().format("MMMM Do YYYY")}
</Typography>
<NotificationsIcon/>
        </Stack> 
        </Paper>
        )

        const Widgets=<Stack direction={{
            xs:"column",
            sm:"row"
        }}
        spacing={"2rem"}
        justifyContent="space-evenly"
        alignItems={"center"}
        margin={"2rem 0"}
        >
            <Widget title={"Users"} value={stats?.usersCount} Icon={<PersonIcon/>}/>
            <Widget title={"Chats"} value={stats?.TotalChatsCount} Icon={<GroupIcon/>}/>
            <Widget title={"Messages"} value={stats?.messagesCount} Icon={<MessageIcon/>}/>
        </Stack>



  return (
  <AdminLayout>
{
    loading?<Skeleton/>:
    <Container component="main">
{
    Appbar
}

<Stack direction={{
    xs:"column",
    lg:"row",
}} spacing={"2rem"} flexWrap={"wrap"} justifyContent={"center"}
alignItems={{
    xs:"center",
    lg:"strech",
}}
sx={{gap:"2rem"}}
>
    <Paper
    elevation={3}
    sx={{
        padding:"2rem 3.5rem",
        borderRadius:"1rem",
        width:"100%",
        maxWidth:"45rem",
      
    }}
    >
<Typography variant='h4' margin={"2rem 0"}>Last Messages</Typography>
<LineChart value={stats?.messagesChart||[]}/>
    </Paper>
 <Paper
 elevation={3}
    sx={{
        padding:"1rem",
        borderRadius:"1rem",
        width:"100%",
        maxWidth:"25rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:{xs:"100%",sm:"50%"},
        position:"relative",
       
    }}
 >
<DoughnutChart labels={["Single Chats","Group chats"]}
value={[
  (stats?.TotalChatsCount || 0) - (stats?.groupsCount || 0),
  stats?.groupsCount || 0
]}/>
<Stack
position={"absolute"}
direction={"row"}
justifyContent={"center"}
alignItems={"center"}
spacing={"0.5rem"}
width={"100%"}
height={"100%"}
>
<GroupIcon/>
<Typography>Vs</Typography>
<PersonIcon/>
</Stack>
 </Paper>
</Stack>
{
  Widgets  
}
</Container>
}

  </AdminLayout>
    
)
}

const Widget=({title,value,Icon})=>(
<Paper
sx={{
    padding:"2rem",
    margin:"2rem 0",
    borderRadius:"1.5rem",
    width:"20rem",
}}
>
    <Stack alignItems={"center"} spacing={"1rem"}>
        <Typography
       sx={{
      color:"rgba(0,0,0,0.7)",
        borderRadius:"50%",
        width:"5rem",
        maxWidth:"25rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"5rem",
        border:"5px solid black"
    }}
        >
{value}
        </Typography>
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          {Icon}
          <Typography>{title}</Typography>  
        </Stack>
    </Stack>
</Paper>

)

export default DashBoard
