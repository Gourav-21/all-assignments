import { CircularProgress } from "@mui/material";

export default function Loading(){
    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',width:"100vw",height:"100vh",}}>
            <CircularProgress />
        </div>
    )
}