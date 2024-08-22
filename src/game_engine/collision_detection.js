import {useCallback} from 'react';
import {CHAR_HEIGHT, CHAR_WIDTH} from "@/constants/game";

export default function useCollisionDetection({ charCoords, obstacleRefs }) {
    
    return useCallback(() => {
        const COLLISION_PADDING = 30;

        const obstaclePairs = [];
        const obstacleValues = Object.values(obstacleRefs.current);
        for (let i = 0; i < obstacleValues.length; i += 2) {
            obstaclePairs.push([obstacleValues[i], obstacleValues[i + 1]]);
        }

        return obstaclePairs.some(([bottomObstable, topObstacle]) => {
            // if (!bottomObstable || !topObstacle) return false;

            // const bottomRect = bottomObstable.getBoundingClientRect()
            // const topRect = topObstacle.getBoundingClientRect();

            // const hasCollidedWithBottom = charCoords.y + CHAR_HEIGHT >= bottomRect.y &&
            //                   charCoords.x <= bottomRect.x + bottomRect.width - COLLISION_PADDING &&
            //                   charCoords.x + CHAR_WIDTH - COLLISION_PADDING >= bottomRect.x;

            // const hasCollidedWithTop = charCoords.y <= topRect.y + topRect.height &&
            //                         charCoords.x <= topRect.x + topRect.width - COLLISION_PADDING &&
            //                         charCoords.x + CHAR_WIDTH - COLLISION_PADDING >= topRect.x;

            // if (hasCollidedWithBottom || hasCollidedWithTop) {
            //     return true;
            // }

            return false;
        });
    }, [charCoords.x, charCoords.y, obstacleRefs]);
}
