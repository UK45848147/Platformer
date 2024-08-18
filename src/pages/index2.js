import Head from "next/head";
import {forwardRef, useCallback, useEffect, useRef, useState} from "react";

// eslint-disable-next-line react/display-name
const Dino = forwardRef(({ jump, isJumping, height, width }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                bottom: jump ? '200px' : '0px', // 100px is the jump height
                left: '50%', // Center horizontally
                transform: 'translateX(-50%)', // Adjust for perfect centering
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: 'green',
                transition: 'bottom 0.3s ease',
            }}
        ></div>
    );
});

// eslint-disable-next-line react/display-name
const Obstacle = forwardRef(({ position }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                right: `${position}px`,
                bottom: '0px',
                width: '20px',
                height: '50px',
                backgroundColor: 'red',
            }}
        ></div>
    );
});


export default function Home() {
    const [jump, setJump] = useState(false);
    const [obstaclePosition, setObstaclePosition] = useState(typeof window !== "undefined"?window.innerWidth : 0);
    const [isGameOver, setIsGameOver] = useState(false);
    const dinoRef = useRef(null);
    const obstacleRef = useRef(null);
    const [obstacleCoords, setObstacleCoords] = useState({x: 0, y: 0}); // New state for storing obstacle coordinates
    const [dinoCoords, setDinoCords] = useState({x: 200, y: 0}); // New state for storing obstacle coordinates
    const [points, setPoints] = useState(0);


    const [obstacles, setObstacles] = useState([
        { id: 1, position: typeof window !== "undefined" ? window.innerWidth : 0 },
        { id: 2, position: typeof window !== "undefined" ? window.innerWidth * 1.5 : 0 }
    ]);
    const [activeObstacleIndex, setActiveObstacleIndex] = useState(0);


    const GAME_HEIGHT = 350;
    const DINO_HEIGHT = 50;
    const DINO_WIDTH = 50;

    const detectCollision = () => {
        const COLLISION_PADDING = 30; // Adjust this value as needed

        if (dinoCoords.y + DINO_HEIGHT >= obstacleCoords.y &&
            dinoCoords.x <= obstacleCoords.x + DINO_WIDTH - COLLISION_PADDING &&
            dinoCoords.x + DINO_WIDTH - COLLISION_PADDING >= obstacleCoords.x) {
            console.log("IN HERE");
            return true;
        }

        // Check for collision when the obstacle is ahead of the dinosaur
        if (dinoCoords.y + DINO_HEIGHT >= obstacleCoords.y &&
            dinoCoords.x + DINO_WIDTH - COLLISION_PADDING >= obstacleCoords.x &&
            dinoCoords.x <= obstacleCoords.x + DINO_WIDTH - COLLISION_PADDING) {
            console.log("22IN HERE");
            return true;
        }

        return false;

    };

    useEffect(() => {
        if (!isGameOver) {
            setPoints(points + 1)
        }
        // This effect runs whenever dinoCoords or obstacleCoords change
        if (detectCollision()) {
            setIsGameOver(true)
            console.log('Game Over');
            // Handle game over logic here
        }
    }, [dinoCoords, obstacleCoords]);

    useEffect(() => {
        const updateAndLogCoordinates = () => {
            if (obstacleRef.current) {
                const rect = obstacleRef.current.getBoundingClientRect();
                const x = rect.x + window.pageXOffset;
                const y = rect.y + window.pageYOffset;
                setObstacleCoords({x, y});
                // console.log(`Obstacle Coordinates: X=${x}, Y=${y}`);
            }
        };

        // Call the function initially and whenever obstaclePosition changes
        updateAndLogCoordinates();

    }, [obstaclePosition]); // Dependency on obstaclePosition

    // Update coordinates whenever obstaclePosition changes

    useEffect(() => {
        if (dinoRef.current) {
            const rect = dinoRef.current.getBoundingClientRect();
            const x = rect.x + window.pageXOffset;
            const y = rect.y + window.pageYOffset;
            setDinoCords({x, y});
        }
        const animateJump = () => {
            // this breaks the game if its removed
            if (dinoRef.current) {
                const rect = dinoRef.current.getBoundingClientRect();
                const x = rect.x + window.pageXOffset;
                const y = rect.y + window.pageYOffset;
                setDinoCords({x, y});
                requestAnimationFrame(animateJump); // Continuously call this function
            }
        };

        if (jump) {
            animateJump();
        }

        return () => {
            cancelAnimationFrame(requestAnimationFrame); // Cleanup on component unmount
        };
    }, [jump, dinoRef]);

    useEffect(() => {
        let jumpTimeout;
        if (jump) {
            jumpTimeout = setTimeout(() => setJump(false), 300); // Dino returns after 300ms
        }
        return () => clearTimeout(jumpTimeout);
    }, [jump]);

    useEffect(() => {
        if (isGameOver) return;

        const intervalId = setInterval(() => {
            setObstaclePosition((prev) => {
                if (prev <= 0) return window.innerWidth; // Reset obstacle position
                return prev - 10; // Move obstacle left
            });
        }, 50);

        return () => clearInterval(intervalId);
    }, [isGameOver]);

    useEffect(() => {
        const handleSpacebar = (e) => {
            if (e.code === 'Space' && !jump) {
                setJump(true);
            }
        };
        window.addEventListener('keydown', handleSpacebar);
        return () => window.removeEventListener('keydown', handleSpacebar);
    }, [jump]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main>
            <div style={{
                position: 'relative',
                width: '100%',
                height: `${GAME_HEIGHT}px`,
                overflow: 'hidden',
                backgroundColor: '#ddd'
            }}>
                <Dino width={DINO_WIDTH} height={DINO_HEIGHT} ref={dinoRef} jump={jump} isJumping={jump}/>
                <Obstacle ref={obstacleRef} position={obstaclePosition}/>
                {isGameOver && <div
                    style={{position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)'}}>Game
                    Over</div>}
                <div
                    style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>{points}</div>
            </div>
        </main>
    </>
  );
}
