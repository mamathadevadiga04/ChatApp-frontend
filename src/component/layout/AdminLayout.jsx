import {
    Close as CloseIcon,
    Dashboard as DashboardIcon,
    ExitToApp as ExitToAppIcon,
    Groups as GroupsIcon,
    ManageAccounts as ManageAccountsIcon,
    Menu as MenuIcon,
    Message as MessageIcon
} from '@mui/icons-material';
import { Box, Drawer, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { grayColor } from '../../constants/color';
import { adminLogout } from '../../redux/thunks/admin';
import { Link } from "../styles/StyledComponent";

 

const adminTabs=[{
    name:"DashBoard",
    path:"/admin/dashboard",
    icon:<DashboardIcon/>
},
{
    name:"Chats",
    path:"/admin/chats",
    icon:<GroupsIcon/>
},
{
    name:"Users",
    path:"/admin/users",
    icon:<ManageAccountsIcon/>
},
{
    name:"Messages",
    path:"/admin/messages",
    icon:<MessageIcon/>
},
];

const SideBar=({w="100%"})=>{
    const location=useLocation();
    const dispatch=useDispatch();
const logoutHandler=()=>{
 dispatch(adminLogout());
}

    return( <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant='h3' textTransform={"uppercase"}>PingMe</Typography>  
    <Stack spacing={"1rem"}>
{
    adminTabs.map((tab)=>(
    <Link key={tab.path} to={tab.path}
    sx={
        location.pathname===tab.path &&{
       bgcolor:"black",
            color:"white",
            ":hover":{color:"black"}
        }
    }
    >
<Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
{tab.icon}
<Typography fontSize={"1.5rem"}>
    {tab.name}
</Typography>
</Stack>
    </Link>
    ))
}
<Link onClick={logoutHandler}>
<Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
<ExitToAppIcon/>
<Typography fontSize={"1.5rem"}>
  Logout
</Typography>
</Stack>
    </Link>

    </Stack>
    
    </Stack>
    ) 
};

const AdminLayout = ({children}) => {
    const {isAdmin}=useSelector((state)=>state.auth)
const [isMobile,setIsMobile]=useState(false);
    const handleMobile=()=>setIsMobile(!isMobile);
      
const handleClose=()=>setIsMobile(false);
    
if(!isAdmin)return <Navigate to="/admin"/>
  return (
    <Grid container minHeight={"100vh"}>
<Box 
sx={{
    dosplay:{xs:"block",md:"none"},
    position:"fixed",
    right:"1rem",
    top:"1rem"
}}
>
<IconButton onClick={handleMobile}>
{
    isMobile?<CloseIcon/>:<MenuIcon/>
}


</IconButton>
</Box>

        <Grid
        item md={4} lg={3}
        sx={{display:{xs:"none",md:"block"}}}
        >
<SideBar/>
        </Grid>
<Grid
item md={8} lg={9} xs={12} 
        sx={{bgcolor:grayColor}}
>
{children}
</Grid>
<Drawer open ={isMobile} onClose={handleClose}>
<SideBar w="50vw"/>
</Drawer>

    </Grid>
  )
}

export default AdminLayout
