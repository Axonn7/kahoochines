import React, {useEffect, useState} from 'react';
import {Alert, AppBar, Button, Snackbar, Toolbar, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import appBarLogo from "../pictures/appbarimg.png";

const useStyles = makeStyles({
    root: {
        display: "flex",
        marginBottom: 100,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        backgroundColor: "grey",
    },
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
        backgroundColor: "#252525",
        justifyContent: "center",
        alignItems: "center",
        "& .MuiButton-root": {
            height: "14vw",
            width: "14vw",
            color: "#000000",
            marginTop: 20,
            backgroundColor: "#ddcb7f",
            fontWeight: "bold",
            fontSize: 50,
            borderRadius: 100,
            marginLeft: 30,
            marginRight: 30,
        },
        "& .MuiToolbar-root": {
            minHeight:60,
            height: "5vh",
        }
    },
    appBar: {
        backgroundImage: "linear-gradient(to right, black, #333333)",
        background: "#000000",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    gamepadContainer: {
        width: "100%",
        position: "fixed",
        bottom: 25,
    },
    topRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bottomRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    img: {
        marginTop:10,
    },
    toast:{
      marginTop: "5vh",
    },
});

export default function GameController() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [alert, setAlert] = useState(false);
    let {gameId} = useParams();
    console.log(gameId);
    let player = 0;
    let ws = new WebSocket('wss://rainy-carpal-leptoceratops.glitch.me');
    ws.binaryType = "arraybuffer"

    useEffect(() => {
        ws.onopen = (event) => {
            console.log("Connection is open");
            let data = [1, gameId.charCodeAt(0), gameId.charCodeAt(1), gameId.charCodeAt(2), gameId.charCodeAt(3)];
            let viewByteArray = new Uint8Array(data);
            console.log(viewByteArray);
            ws.send(viewByteArray);

            console.log("request to join the game sent, data: " + viewByteArray);
        };
        // eslint-disable-next-line
    }, [gameId])

    useEffect(() => {
        if(player === 0) {
            setAlert(true);
        } else {
            setAlert(false);
        }
    }, [player])

    ws.onmessage = (message) => {
        if (message.data[1] !== 0) {
            player = message.data[1];
            console.log("Player value assigned: ", message.data[1])
        }
    };

    ws.onerror = (message) => {
        console.log("Error: " + message);
    }

    function handleEvent(playerId, buttonId, commandId, gameId, ws) {
        if (player !== 0) {
            let data = [1, playerId, buttonId, commandId, gameId.charCodeAt(0), gameId.charCodeAt(1), gameId.charCodeAt(2), gameId.charCodeAt(3)];
            let viewByteArray = new Uint8Array(data);
            console.log(viewByteArray);
            ws.send(viewByteArray);
        } else {
            console.log(playerId, buttonId, commandId, gameId);
            console.log("No player assigned.")
        }
    }

    return (
        <>
            <meta name="viewport" content="user-scalable=no"/>
            <div className={classes.container}>
                <Snackbar
                    className={classes.toast}
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                    open={alert}
                    autoHideDuration={5000}
                    onClose={() => setAlert(false)}
                >
                    <Alert variant="filled" severity="error">
                        Neispravan kod, tražena igra ne postoji.
                    </Alert>
                </Snackbar>
                <AppBar position="fixed">
                    <Toolbar className={classes.appBar}>
                        <Typography variant="h6" color="inherit" component="div">
                            <img
                                className={classes.img}
                                src={appBarLogo}
                                alt={"Kahoochines"}
                                onClick={home}
                            />
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.gamepadContainer}>
                    <div className={classes.topRow}>
                        <Button onTouchStart={() => handleEvent(player, 1, 1, gameId, ws)}
                                onTouchEnd={() => handleEvent(player, 1, 0, gameId, ws)}>↑</Button>

                        <Button onTouchStart={() => handleEvent(player, 3, 1, gameId, ws)}
                                onTouchEnd={() => handleEvent(player, 3, 0, gameId, ws)}>→</Button>
                    </div>
                    <div className={classes.bottomRow}>
                        <div>
                            <Button onTouchStart={() => handleEvent(player, 4, 1, gameId, ws)}
                                    onTouchEnd={() => handleEvent(player, 4, 0, gameId, ws)}>✴</Button>
                            <Button onTouchStart={() => handleEvent(player, 2, 1, gameId, ws)}
                                    onTouchEnd={() => handleEvent(player, 2, 0, gameId, ws)}>←</Button>
                        </div>


                        <div>
                            <Button onTouchStart={() => handleEvent(player, 0, 1, gameId, ws)}
                                    onTouchEnd={() => handleEvent(player, 0, 0, gameId, ws)}>↓</Button>

                            <Button onTouchStart={() => handleEvent(player, 4, 1, gameId, ws)}
                                    onTouchEnd={() => handleEvent(player, 4, 0, gameId, ws)}>✴</Button>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );


    function home() {
        navigate("/");
    }
}
