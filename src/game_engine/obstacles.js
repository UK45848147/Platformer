import { useState } from 'react';
import {generatePositionWithPixels} from "@/utils/character";
import {Wheat} from "@/components/obstacles/Wheat";
import {Tractor} from "@/components/obstacles/Tractor";
import {Tree} from "@/components/obstacles/Tree";

export const USER_GENERATED_OBSTACLES = [
    { id: 1, position: generatePositionWithPixels(), Component: Wheat },
    { id: 2, position: generatePositionWithPixels(500), Component: Tractor },
    { id: 3, position: generatePositionWithPixels(1000), Component: Tree },
    { id: 4, position: generatePositionWithPixels(1300), Component: Tree },
    { id: 5, position: generatePositionWithPixels(1600), Component: Tree },
    // { id: 6, position: generatePosition(2.4), Component: Windmil },
    // { id: 7, position: generatePosition(2.7), Component: Tree },
    // { id: 8, position: generatePosition(3), Component: Wheat },
    // { id: 9, position: generatePosition(3.2), Component: Tractor },
    // { id: 10, position: generatePosition(3.5), Component: Windmil },
]
export default function useObstacles() {
    const [obstacles, setObstacles] = useState(USER_GENERATED_OBSTACLES);
    const [activeObstacleIndex, setActiveObstacleIndex] = useState(0);

    return { obstacles, setObstacles, activeObstacleIndex, setActiveObstacleIndex };
}
