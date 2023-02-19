import React from "react";
import {TextField} from "@mui/material";

export default function SearchComponent(props) {

    return (
            <div style={{display:"flex", flexDirection:"row", alignItems:"center",  minWidth:"400px"}}>
            <p style={{fontFamily:"Arial", position:"relative"}}>Straßennamen eingeben: </p>
            <TextField hiddenLabel disabled={props.favoriteMode} id="searchField" variant="standard" sx={{backgroundColor: props.favoriteMode ? "rgb(240,240,240)" : "white", marginLeft:"10px", marginRight:"10px"}}
                       onChange={(e => props.setSearchInput(e.target.value))}/>
            </div>
    )
}