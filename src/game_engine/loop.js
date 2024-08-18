import { useEffect } from 'react';

const GAME_MOVEMENT_INTERVAL_MS = 30;
const CHANGE_ON_INTERVAL_PX = 10;
export default function useActivateGameLoop({ isGameOver, isPaused, setObstacles, activeObstacleIndex, setActiveObstacleIndex }) {
    useEffect(() => {
        if (isGameOver || isPaused) return;

        const intervalId = setInterval(() => {
            setObstacles((prevObstacles) =>
                prevObstacles.map((obstacle, index) => {
                    if (index === activeObstacleIndex && obstacle.position <= 0) {
                        setActiveObstacleIndex((prevIndex) => (prevIndex + 1) % prevObstacles.length);
                        return { ...obstacle, position: window.innerWidth };
                    }
                    return obstacle.position <= 0
                        ? { ...obstacle, position: window.innerWidth }
                        : { ...obstacle, position: obstacle.position - CHANGE_ON_INTERVAL_PX };
                })
            );
        }, GAME_MOVEMENT_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [isGameOver, isPaused, activeObstacleIndex, setObstacles, setActiveObstacleIndex]);
}
