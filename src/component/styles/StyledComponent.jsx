import {keyframes, Skeleton, styled} from "@mui/material"
import {Link as LinkedComponent} from "react-router-dom";
import { grayColor } from "../../constants/color";
export const VisuallyHiddenInput=styled("input")({
    border:0,
    clip:"rect(0 0 0 0)",
    height:1,
    margin:-1,
    overflow:"hidden",
    padding:0,
    position:"absolute",
    whiteSpace:"nowrap",
    width:1,
});
export const Link=styled(LinkedComponent)`
text-decoration:none;
color:black;
padding:1rem;
&:hover{
    background-color:#f0f0f0;
};`

export const InputBox=styled("input")`

width:100%;
height:100%;
border:none;
outline:none;
padding:0 3rem;
border-radius:1.5rem;
font-size:1.5rem;
background-color:${grayColor};

`;


export const SearchField=styled("input")`
width:20vmax;
border:none;
outline:none;
padding:1rem 2rem;
border-radius:1.5rem;
font-size:1.5rem;
background-color:${grayColor};

`;
export const CurveButton=styled("button")`
border:none;
outline:none;
padding:1rem 2rem;
border-radius:1.5rem;
font-size:1.5rem;
cursor:pointer;
color:white;
background-color:black;
&:hover{
    background-color:rgba(0,0,0,0.8);
}`
const bounceAnimation=keyframes`
0% {transform:scale(1);}
50%{transform:scale(1.5);}
100%{tarnsform:scale(1);}
`;


export  const BouncingSkelton=styled(Skeleton)(()=>({
   animation:`${bounceAnimation} 1s infinite`,
}))
