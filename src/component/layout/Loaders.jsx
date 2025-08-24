import React from 'react'
import { Grid,Skeleton, Stack } from '@mui/material'
import { BouncingSkelton } from '../styles/StyledComponent'
 const LayoutLoader=()=>{
    return (
          <Grid container height ={"calc(100vh-4rem)"} spacing={"1rem"}>
<Grid item 
sm={4}
 md={3} 
 sx={{display:{xs:"none",sm:"block"},
}} height={"100%"}><Skeleton variant="rectangular" height={"100vh"}/></Grid>
<Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}> 
    <Stack spcing={"1rem"}>
        {Array.from({length:10}).map((_,index)=>(
 <Skeleton key={index} variant="rectangular" height={"100"}/>
        ))}
    </Stack>
   </Grid>
<Grid item md={4} lg={3} height={"100%"}
sx={{
    display:{xs:"none",md:"block"},
    padding:"2rem",
    // bgcolor:"rgba(0,0,0,0.85)"
}}><Skeleton variant="rectangular" height={"100vh"}/></Grid>
    
    </Grid>
    )
}

const TypingLoader=()=>{
return <Stack
spacing={"0.5rem"}
direction={"row"}
padding={"0.5rem"}
justifyContent={"center"}
>
<BouncingSkelton variant='circular'
width={15}
 height={15}
 style={{
    animationDelay:"0.1s"
 }}
 />

 <BouncingSkelton variant='circular'
width={15}
 height={15}
 style={{
    animationDelay:"0.2s"
 }}
 />
 <BouncingSkelton variant='circular'
width={15}
 height={15}
 style={{
    animationDelay:"0.4s"
 }}
 />

  <BouncingSkelton variant='circular'
width={15}
 height={15}
 style={{
    animationDelay:"0.6s"
 }}
 />

</Stack>
}

export{TypingLoader,LayoutLoader}

