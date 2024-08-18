import {useCallback} from 'react';
import {CHAR_HEIGHT, CHAR_WIDTH} from "@/constants/game";

export default function useCollisionDetection({ charCoords, obstacleRefs }) {
    return useCallback(() => {
        const COLLISION_PADDING = 30;

        return Object.values(obstacleRefs.current).some((obstacleRef) => {
            if (!obstacleRef) return false;

            const rect = obstacleRef.getBoundingClientRect();
            const x = rect.x + window.pageXOffset;
            const y = rect.y + window.pageYOffset;

            if (
                charCoords.y + CHAR_HEIGHT >= y &&
                charCoords.x <= x + CHAR_WIDTH - COLLISION_PADDING &&
                charCoords.x + CHAR_HEIGHT - COLLISION_PADDING >= x
            ) {
                return true;
            }

            return false;
        });
    }, [charCoords.x, charCoords.y, obstacleRefs]);
}
