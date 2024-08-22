import { useState } from "react";

export const SelectionPage = ({ onStart }) => {

    const [character, setCharacter] = useState({ name: 'Luigi', imgSrc: 'images/luigi.png' });

    const changeCharacter = (character) => {
        switch (character) {
            case 'Luigi':
                setCharacter({ name: 'Luigi', imgSrc: './luigi.png' });
                break;
            case 'Yoshi':
                setCharacter({ name: 'Yoshi', imgSrc: './yoshi5.png' });
                break;
            case 'Peach':
                setCharacter({ name: 'Peach', imgSrc: './peach.png' });
                break;
            case 'Wario':
                setCharacter({ name: 'Wario', imgSrc: './wario4.png' });
                break;
            default:
                setCharacter({ name: 'Luigi', imgSrc: './luigi.png' });
        }
    };

    return(
        <div>
            <div id="container">
                <div id="image">
                    <h1 id="name">Select your character</h1>
                    <img id="img" src={character.imgSrc} alt={character.name} />
                </div>
                <div id="controls">
                    <button id="Luigi" onClick={() => changeCharacter('Luigi')}>Luigi</button>
                    <button id="Yoshi" onClick={() => changeCharacter('Yoshi')}>Yoshi</button>
                    <button id="Peach" onClick={() => changeCharacter('Peach')}>Peach</button>
                    <button id="Wario" onClick={() => changeCharacter('Wario')}>Wario</button>
                </div>
            </div>
            <div id="info">
                <h2>Character Selection for Platform Game</h2>
                <p>Select a character by using the buttons above</p>
                <button onClick={onStart} >Go</button>
            </div>
        </div>
    );
}