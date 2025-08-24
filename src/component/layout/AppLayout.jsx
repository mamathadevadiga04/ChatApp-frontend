import { Box, Drawer, Grid, Skeleton } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/events';
import { useErrors, useSocketEvents } from '../../hooks/hook';
import { getOrSaveFromStorage } from '../../lib/features';
import { useMyChatsQuery } from '../../redux/api/api';
import { incrementNotification, setNewMessageAlert } from '../../redux/reducer/chat';
import { setIsDeleteMenu, setIsMobile, setSelectDeleteChat } from '../../redux/reducer/misc';
import { getSocket } from '../../socket';
import DeleteChatMenu from '../dialogs/deleteChatMenu';
import Title from '../shared/Title';
import Chatlist from '../specific/Chatlist';
import Profile from '../specific/Profile';
import Header from './Header';
import { useState } from 'react';


const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
     const deleteMenuAnchor =useRef(null);
     const [onlineUsers,setOnlineUses]=useState([])
    const socket=getSocket();
    const navigate=useNavigate();

    
const dispatch=useDispatch();

    const {isMobile}=useSelector((state)=>state.misc);
    const {user}=useSelector((state)=>state.auth)
const {newMessagesAlert}=useSelector((state)=>state.chat)


    const {isLoading,data,isError,error,refetch}=useMyChatsQuery("")

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);


useErrors([{isError,error}]);

    const handleDeleteChat = (e,_id, groupChat) => {
    dispatch(setIsDeleteMenu(true))
    dispatch(setSelectDeleteChat({chatId:_id,groupChat}))
    deleteMenuAnchor.current=e.currentTarget;
     
      
    };

const handleMobileClose=()=>dispatch(setIsMobile(false));



const newMessageAlertHandler=useCallback((data)=>{

  if (data.chatId === chatId) return;
dispatch(setNewMessageAlert(data));


},[chatId])



const newRequestHandler=useCallback(()=>{
dispatch(incrementNotification());
},[dispatch])

const refetchListener=useCallback(()=>{
refetch();
navigate("/");
},[refetch,navigate])

const onlineUserListener=useCallback((data)=>{

setOnlineUses(data)
},[])


const eventArr={[NEW_MESSAGE_ALERT]:newMessageAlertHandler,
  [NEW_REQUEST]:newRequestHandler,
  [REFETCH_CHATS]:refetchListener,
  [ONLINE_USERS]:onlineUserListener
};

useSocketEvents(socket,eventArr)

    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor.current}/>
     
{
  isLoading?<Skeleton/>:(
    <Drawer open={isMobile} onClose={handleMobileClose}>
         <Chatlist
         w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
             newMessagesAlert={newMessagesAlert}
           onlineUsers={onlineUsers}
           />
    </Drawer>
  )
}

        <Grid
          container
          sx={{
            height: 'calc(100vh - 4rem)',
            overflow: 'hidden', // Prevent scrollbars
          }}
        >
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: 'none', sm: 'block' },
              height: '100%',
              overflow: 'hidden',
            }}
          >
            {
              isLoading?(
                <Skeleton/>
              ):(
                <Chatlist
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
         newMessagesAlert={newMessagesAlert}
                 onlineUsers={onlineUsers}
            />
              )
            }
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            sx={{
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <WrappedComponent {...props} chatId={chatId}   user={user} />
          </Grid>

          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: 'none', md: 'block' },
              padding: '2rem',
              bgcolor: 'rgba(7, 4, 4, 0.85)',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ height: '100%' }}>
              <Profile user={user} />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
