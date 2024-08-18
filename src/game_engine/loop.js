import { useEffect } from 'react';
import {GAME_WIDTH} from "@/constants/game";

const GAME_MOVEMENT_INTERVAL_MS = 1;
const CHANGE_ON_INTERVAL_PX = 4;
export default function useActivateGameLoop({ isGameOver, isPaused, setObstacles, activeObstacleIndex, setActiveObstacleIndex, lastObstaclePosition }) {
    useEffect(() => {
        if (isGameOver || isPaused) return;

        const intervalId = setInterval(() => {
            setObstacles((prevObstacles) =>
                prevObstacles.map((obstacle, index) => {
                    if (index === activeObstacleIndex && obstacle.position <= 0) {
                        setActiveObstacleIndex((prevIndex) => (prevIndex + 1) % prevObstacles.length);
                        return { ...obstacle, position: GAME_WIDTH + lastObstaclePosition };
                    }
                    return obstacle.position <= 0
                        ? { ...obstacle, position: GAME_WIDTH + lastObstaclePosition }
                        : { ...obstacle, position: obstacle.position - CHANGE_ON_INTERVAL_PX };
                })
            );
        }, GAME_MOVEMENT_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [isGameOver, isPaused, activeObstacleIndex, setObstacles, setActiveObstacleIndex]);
}
