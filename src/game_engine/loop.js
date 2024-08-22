import { useEffect, useState } from 'react';
import { OBSTACLE_LENGTH } from '@/components/game';

const GAME_MOVEMENT_INTERVAL_MS = 1;
const CHANGE_ON_INTERVAL_PX = 4;
export default function useActivateGameLoop({ isGameOver, isPaused, setObstacles, activeObstacleIndex, setActiveObstacleIndex, lastObstaclePosition }) {
    const [changeOnIntervalPx, setChangeOnIntervalPx] = useState(CHANGE_ON_INTERVAL_PX);

    useEffect(() => {
        if (isGameOver || isPaused) return;

        const intervalId = setInterval(() => {
            setObstacles((prevObstacles) =>
                prevObstacles.map((obstacle, index) => {
                    if (index === activeObstacleIndex && obstacle.position <= 0) {
                        setActiveObstacleIndex((prevIndex) => (prevIndex + 1) % prevObstacles.length);
                        return { ...obstacle, position: lastObstaclePosition };
                    }
                    return obstacle.position <= 0
                        ? { ...obstacle, position: lastObstaclePosition }
                        : { ...obstacle, position: obstacle.position - changeOnIntervalPx };
                })
            );
            if (activeObstacleIndex == 0) {
                setChangeOnIntervalPx((prevValue) => prevValue + 0.0001);
            }
        }, GAME_MOVEMENT_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [isGameOver, isPaused, activeObstacleIndex, setObstacles, setActiveObstacleIndex, changeOnIntervalPx]);

    console.log()
    return changeOnIntervalPx;
}
