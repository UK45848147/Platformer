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
                width: '35px',
                height: '50px',
                backgroundColor: 'red',
            }}
        ></div>
    );
});


const generatePosition = (modifier = 1) => {
    return typeof window !== "undefined" ? window.innerWidth * modifier : 0
}

export default function Home() {
    const [jump, setJump] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // New state to manage game pause
    const dinoRef = useRef(null);
    const [dinoCoords, setDinoCoords] = useState({x: 200, y: 300}); // Set initial Y to 300
    const [points, setPoints] = useState(0);

    const obstacleRefs = useRef({});

    const [obstacles, setObstacles] = useState([
        { id: 1, position: generatePosition() },
        { id: 2, position: generatePosition(1.2) },
        { id: 3, position: generatePosition(1.5) },
        { id: 4, position: generatePosition(2) }
    ]);
    const [activeObstacleIndex, setActiveObstacleIndex] = useState(0);

    const GAME_HEIGHT = 350;
    const DINO_HEIGHT = 50;
    const DINO_WIDTH = 50;
    const INITIAL_Y = 280;

    const detectCollision = useCallback(() => {
        const COLLISION_PADDING = 10;

        return Object.values(obstacleRefs.current).some((obstacleRef) => {
            if (!obstacleRef) return false;

            const rect = obstacleRef.getBoundingClientRect();
            const x = rect.x + window.pageXOffset;
            const y = rect.y + window.pageYOffset;

            if (
                dinoCoords.y + DINO_HEIGHT >= y &&
                dinoCoords.x <= x + DINO_WIDTH - COLLISION_PADDING &&
                dinoCoords.x + DINO_WIDTH - COLLISION_PADDING >= x
            ) {
                return true;
            }

            return false;
        });
    }, [dinoCoords, obstacles]);

    useEffect(() => {
        if (isGameOver || isPaused) return;

        // every 50 ms
        const intervalId = setInterval(() => {
            setObstacles((prevObstacles) =>
                prevObstacles.map((obstacle, index) => {
                    if (index === activeObstacleIndex && obstacle.position <= 0) {
                        setActiveObstacleIndex((prevIndex) => (prevIndex + 1) % prevObstacles.length);
                        return { ...obstacle, position: window.innerWidth };
                    }
                    return obstacle.position <= 0 ? { ...obstacle, position: window.innerWidth } : { ...obstacle, position: obstacle.position - 10 };
                })
            );
        }, 50);

        return () => clearInterval(intervalId);
    }, [isGameOver, isPaused]);

    useEffect(() => {
        if (!isGameOver && !isPaused) {
            setPoints(points + 1);
        }
        if (detectCollision()) {
            setIsGameOver(true);
        }
    }, [dinoCoords, obstacles, isPaused]);

    useEffect(() => {
        if (dinoRef.current) {
            const rect = dinoRef.current.getBoundingClientRect();
            const x = rect.x + window.pageXOffset;
            const y = rect.y + window.pageYOffset;
            setDinoCoords({x, y});
        }

        const animateJump = () => {
            if (dinoRef.current) {
                const rect = dinoRef.current.getBoundingClientRect();
                const x = rect.x + window.pageXOffset;
                const y = rect.y + window.pageYOffset;
                setDinoCoords({x, y});
                requestAnimationFrame(animateJump);
            }
        };

        if (jump) {
            animateJump();
        }

        return () => {
            cancelAnimationFrame(requestAnimationFrame);
        };
    }, [jump, dinoRef]);

    useEffect(() => {
        let jumpTimeout;
        if (jump) {
            jumpTimeout = setTimeout(() => {
                setJump(false);
            }, 300);
        }
        return () => clearTimeout(jumpTimeout);
    }, [jump]);

    useEffect(() => {
        const handleSpacebar = (e) => {
            if (e.code === 'Space' && !jump && dinoCoords.y > INITIAL_Y) { // Check if the dino is on the ground
                setJump(true);
            }
        };
        window.addEventListener('keydown', handleSpacebar);
        return () => window.removeEventListener('keydown', handleSpacebar);
    }, [jump, dinoCoords.y]); // Include dinoCoords.y in the dependency array

    // Add the following useEffect to handle pause/resume
    useEffect(() => {
        const handleBlur = () => {
            setIsPaused(true);
        };

        const handleFocus = () => {
            setIsPaused(false);
        };

        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

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
                    <Dino width={DINO_WIDTH} height={DINO_HEIGHT} ref={dinoRef} jump={jump} />
                    {obstacles.map((obstacle) => (
                        <Obstacle
                            key={obstacle.id}
                            ref={(el) => (obstacleRefs.current[obstacle.id] = el)}
                            position={obstacle.position}
                        />
                    ))}
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
