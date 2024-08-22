import { useEffect, useRef, useState } from 'react';
import {CHAR_HEIGHT, GAME_HEIGHT} from "@/constants/game";

const JUMP_HEIGHT_PX = 100;

const useCharacterMovement = ({
    jump,
    setJump,
    charCoords,
    handleJumpClick,
    handleComeDown,
    spacePressed,
    setSpacePressed
}) => {

    useEffect(() => {
        let jumpTimeout;
        if (jump) {
            jumpTimeout = setTimeout(() => {
                setJump(false)
                handleComeDown(); //do this AFTER the number of milliseconds specified by setTimeout
            }, 300);
        }
        return () => {
            clearTimeout(jump)
        }
    }, [jump, setJump]);


    useEffect(() => {
        const handleSpacebarDown = (e) => {
            if (e.code === 'Space') { 
                setSpacePressed(true);// Removed check for if dino is on the ground
                setJump(true); //this sets jumpClicked to true
                handleJumpClick();
            }
        };

        const handleSpacebarUp = (e) => {
            if (e.code === 'Space') {
                setSpacePressed(true);
            }
        };
        window.addEventListener('keydown', handleSpacebarDown);
        window.addEventListener('keyup', handleSpacebarUp);

        return () => {
            window.removeEventListener('keydown', handleSpacebarDown);
            window.removeEventListener('keyup', handleSpacebarUp)
        }
    }, [jump, charCoords.y, setJump]); // Include dinoCoords.y in the dependency array
}

export default function useCharacter() {
    // const halfHeight = window.innerHeight/2;
    const charRef = useRef(null);
    const [charCoords, setCharCoords] = useState({ x: 200, y: 300 });
    const [jumpClicked, setJumpClicked] = useState(false)
    const [bottomPosition, setBottomPosition] = useState(350);
    const [spacePressed, setSpacePressed] = useState(false);

    const updatedCharCoords = charCoords.y;
    
    const handleJumpClick = () => {
        // Increase the bottom position by JUMP_HEIGHT_PX
        setBottomPosition(window.innerHeight - updatedCharCoords + JUMP_HEIGHT_PX)
    }

    const handleComeDown = () => {
        setBottomPosition(0)
    }

    useCharacterMovement({ jump: jumpClicked, setJump: setJumpClicked, charCoords, handleJumpClick, handleComeDown, spacePressed, setSpacePressed })

    
    useEffect(() => {
        if (charRef.current) {
            const rect = charRef.current.getBoundingClientRect();
            const x = rect.x + window.pageXOffset;
            const y = rect.y + window.pageYOffset;
            setCharCoords({ x, y });
        }

        const animateJump = () => {
            if (charRef.current) {
                const rect = charRef.current.getBoundingClientRect();
                const x = rect.x + window.pageXOffset;
                const y = rect.y + window.pageYOffset;
                setCharCoords({ x, y });
                requestAnimationFrame(animateJump);
            }
        };

        if (jumpClicked) {
            animateJump();
        }

        return () => {
            cancelAnimationFrame(requestAnimationFrame);
        };
    }, [jumpClicked, charRef]);

    return { charRef, charCoords, jumpClicked, setCharCoords, bottomPosition };
}
