import { useState } from "react";
import { SelectionPage } from "@/components/characterPage/selectionPage";
import {Game} from "@/components/game";

export default function Home() {
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        setGameStarted(true);
    };

    return (
        
        <div>
            {!gameStarted ? (
                <SelectionPage onStart={startGame} />
            ) : (
            <div style={{
                height: '100vh',
                width: '100vw',
                backgroundColor: '#ddd',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Game />
            </div>)}
        </div>
    );
}
