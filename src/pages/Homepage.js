import React, {useState} from 'react';
import {AppBar, Button, TextField, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@material-ui/styles";
import {useNavigate} from "react-router-dom";
import appBarLogo from "../../src/pictures/appbarimg.png"

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 100,
        width: "100%",
        justifyContent: "center",
        backgroundColor:"grey",
    },
    container: {
        display:"flex",
        flexDirection:"row",
        width:"100%",
        height:"100vh",
        backgroundColor:"#252525",
        justifyContent:"center",
        alignItems:"center",
    },
    appBar: {
        backgroundImage: "linear-gradient(to right, black, #333333)",
        background: "#000000",
        display: "flex",
        flexDirection: "row",
        justifyContent:"center",
        alignItems: "center",
        height:"97px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        paddingTop: 110,
        justifyContent: "center",
        "& .MuiFormLabel-root": {
            color: "#C7AD66",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#C7AD66",
        },
        "& .MuiOutlinedInput-input":{
            color: "#ddcb7f",
            textAlign:"center",
            textTransform: "uppercase",
        },
        "& .MuiButton-root": {
            color: "#000000",
            marginTop:20,
            backgroundColor:"#ddcb7f",
            fontWeight:"bold",
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: "#C7AD66",
            },
            '&:hover fieldset': {
                borderColor: "#C7AD66",
            },
            '&.Mui-focused fieldset': {
                borderColor: "#C7AD66",
            },
        },
    },
    inputField: {
        display: "flex",
        width: 200,
        justifyContent: "center",
        backgroundColor:"#404040",
        borderRadius:"10px",
        borderColor:"black",
    },
});

export default function Homepage() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [input, setInput] = useState('');

    return (
        <>
            <div className={classes.container}>
                <AppBar position="fixed">
                    <Toolbar className={classes.appBar}>
                        <Typography variant="h6" color="inherit" component="div">
                            <img
                                src={appBarLogo}
                                alt={"Kahoochines"}
                                onClick={home}
                            />
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.form}>
                    <TextField className={classes.inputField} id="inputField" label="Unesite kod igre"
                               variant="outlined"
                               onChange={e => setInput(e.target.value)}/>
                    <Button onClick={onClick}> Kreni </Button>
                </div>
            </div>
        </>
    );

    function onClick() {
        navigate("/controller/" + input);
    }

    function home() {
        navigate("/");
    }
}
