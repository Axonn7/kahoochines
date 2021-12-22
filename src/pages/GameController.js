import React from 'react';
import {Button} from "@mui/material";
import {useParams} from "react-router-dom";

export default function GameController() {
    let {gameId} = useParams();
    console.log(gameId);
    let player = 0;
    let ws = new WebSocket('wss://rainy-carpal-leptoceratops.glitch.me');
    ws.binaryType = "arraybuffer"


    ws.onopen = (event) => {
        console.log(event.data)
        console.log("Connection is open");
        let data = [1, gameId.charCodeAt(0), gameId.charCodeAt(1), gameId.charCodeAt(2), gameId.charCodeAt(3)];
        let viewByteArray = new Uint8Array(data);
        console.log(viewByteArray);
        ws.send(viewByteArray);

        console.log("request to join the game sent, data: " + viewByteArray);
    };

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
            <Button onMouseDown={() => handleEvent(player, 0, 1, gameId, ws)}
                    onMouseUp={() => handleEvent(player, 0, 0, gameId, ws)}>Nazad</Button>

            <Button onMouseDown={() => handleEvent(player, 1, 1, gameId, ws)}
                    onMouseUp={() => handleEvent(player, 1, 0, gameId, ws)}>Naprijed</Button>

            <Button onMouseDown={() => handleEvent(player, 2, 1, gameId, ws)}
                    onMouseUp={() => handleEvent(player, 2, 0, gameId, ws)}>Lijevo</Button>

            <Button onMouseDown={() => handleEvent(player, 3, 1, gameId, ws)}
                    onMouseUp={() => handleEvent(player, 3, 0, gameId, ws)}>Desno</Button>

            <Button onMouseDown={() => handleEvent(player, 4, 1, gameId, ws)}
                    onMouseUp={() => handleEvent(player, 4, 0, gameId, ws)}>Pucaj</Button>

        </>
    );
}
