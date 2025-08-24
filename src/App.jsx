import React,{lazy, Suspense} from 'react'
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import ProtectRoute from './component/auth/ProtectRoute';
const Home=lazy(()=>import("./pages/Home"));
const Login=lazy(()=>import("./pages/Login"));
const Chat=lazy(()=>import("./pages/Chat"));
const Groups=lazy(()=>import("./pages/Groups"))
import axios from "axios";
import { LayoutLoader } from './component/layout/Loaders';
import { useEffect } from 'react';
import { server } from './constants/config';
import {useDispatch, useSelector}from "react-redux"
import {userExists, userNotExists} from "./redux/reducer/auth"
import {Toaster} from "react-hot-toast"
import { SocketProvider } from './socket';

const AdminLogin =lazy(()=>import("./pages/admin/AdminLogin"));
const DashBoard =lazy(()=>import("./pages/admin/DashBoard"));
const MessageManagement =lazy(()=>import("./pages/admin/MessageManagement"));
const ChatManagement =lazy(()=>import("./pages/admin/ChatManagement"));
const UserManagement =lazy(()=>import("./pages/admin/UserManagement"));
const NotFound=lazy(()=>import ("./pages/NotFound"))


const App = () => {
  const {user,loader}=useSelector(state=>state.auth)
const dispatch=useDispatch();
useEffect(()=>{
axios
.get(`${server}/api/v1/user/me`,{withCredentials:true})
.then(({data})=>dispatch(userExists(data.user)))
.catch((err)=>dispatch(userNotExists()));
},[dispatch])

  return loader?(
    <LayoutLoader/>
  ):(
  <BrowserRouter>
<Suspense fallback={<LayoutLoader/>}>

<Routes>
  <Route element={<SocketProvider>
    <ProtectRoute user={user}/>
  </SocketProvider>}>
  <Route path="/"element={ <Home/>}/>
  <Route path="/chat/:chatId"element={<Chat/>}/>
  <Route path="/groups"element={<Groups/>}/>
  </Route>
  <Route path="/login" element={<ProtectRoute user={!user} redirect="/">
  <Login/>
  </ProtectRoute>
  }/>
   <Route path="/admin" element={<AdminLogin/>}/>
 <Route path="/admin/dashboard" element={<DashBoard/>}/>
<Route path="/admin/chats" element={<ChatManagement/>}/>
<Route path="/admin/users" element={<UserManagement/>}/>
<Route path="/admin/Messages" element={<MessageManagement/>}/>


<Route path="*" element={<NotFound/>}/>

</Routes>
</Suspense>

<Toaster position="bottom-center"/>
  </BrowserRouter>
  )
}

export default App
