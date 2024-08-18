import { useState } from 'react';

const generatePosition = (modifier = 1) => {
    return typeof window !== "undefined" ? window.innerWidth * modifier : 0
}

// add in componets from out of this and generate the below
// TODO: Update these to be spread by pixels instead of % so its alw
export default function useObstacles() {
    const [obstacles, setObstacles] = useState([
        { id: 1, position: generatePosition() },
        { id: 2, position: generatePosition(1.2) },
        { id: 3, position: generatePosition(1.4) },
        { id: 4, position: generatePosition(1.6) }
    ]);
    const [activeObstacleIndex, setActiveObstacleIndex] = useState(0);

    return { obstacles, setObstacles, activeObstacleIndex, setActiveObstacleIndex };
}
