import { useFetchData } from '6pp';
import { Avatar, Box, Skeleton, Stack } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import AdminLayout from '../../component/layout/AdminLayout';
import RenderAttachment from '../../component/shared/RenderAttachment';
import Table from "../../component/shared/Table";
import { server } from '../../constants/config';
import { useErrors } from '../../hooks/hook';
import { fileFormat, transformImage } from '../../lib/features';
const columns=[{
  field:"id",
  headername:"ID",
  headerClassName:"table-header",
  width:200,
},

{
  field:"attachments",
  headerName:"Attachments",
  headerClassName:"table-header",
  width:200,
  renderCell:(params)=>{
  const {attachments}=params.row;
  return attachments?.length>0?attachments.map((i)=>{
const url=i.url;
const file=fileFormat(url);
return <Box>
  <a href={url}
download
target="_blank"
style={{
  color:"black"
}}
>
  {RenderAttachment(file,url)}
  </a>
</Box>

  })
  :"No attachments"
  
   
  
},
},
{
  field:"content",
  headerName:"Content",
  headerClassName:"table-header",
  width:400,
},
{
  field:"sender",
  headerName:"Sent By",
  headerClassName:"table-header",
  width:200,
  renderCell:(params)=>(
  <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
<Avatar alt={params.row.sender.name} src={params.row.sender.avatar}/>
  <span>{params.row.sender.name}</span>
    </Stack>
  ),
},
{
  field:"chat",
  headerName:"Chat",
  headerClassName:"table-header",
  width:150,
},
{
  field:"groupChat",
  headerName:"Group Chat",
  headerClassName:"table-header",
  width:100,
  renderCell: (params) => (
    <span>{params.row.groupChat ? "true" : "false"}</span>
  ),
},

{
  field:"createdAt",
  headerName:"Time",
  headerClassName:"table-header",
  width:250,
},

];
const MessageManagement = () => {

const { loading, data, error } = useFetchData({
  url: `${server}/api/v1/admin/messages`,
  key: "dashboard-messages",
  credentials: "include",
});

useErrors([

{  isError:error,
  error:error,
}
])


  const [rows,setRows]=useState([]);
useEffect(()=>{
  if(data){
  setRows(
    data.messages.map((i)=>({
  ...i,
  id:i._id,
  sender:{
    name:i.sender.name,
    avatar:transformImage(i.sender.avatar,50),
  },
  createdAt:moment(i.createdAt).format("MMMM Do YYYY,h:mm:ss a"),
  }))
  )};
},[data])
  return (
   <AdminLayout>
    loading?(
          <Skeleton/>
        ):
        (
         <Table heading={"All Messages"} columns={columns} rows={rows} rowHeight={200}/>
        )
 
   </AdminLayout>
  )
}

export default MessageManagement

