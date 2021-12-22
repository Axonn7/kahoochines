import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";


export default function Homepage() {
    const navigate = useNavigate();
    const [input, setInput] = useState('');

    return (
        <>
            <TextField id="inputField" label="Unesite naziv igre" variant="outlined"
                       onChange={e => setInput(e.target.value)}/>
            <Button onClick={onClick}> Kreni </Button>
        </>
    );

    function onClick() {
        navigate("/controller/" + input);
    }
}
