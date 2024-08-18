import { useState } from 'react';
import {generatePositionWithPixels} from "@/utils/character";
import {Wheat} from "@/components/obstacles/Wheat";
import {Tractor} from "@/components/obstacles/Tractor";
import {Tree} from "@/components/obstacles/Tree";
import {Windmil} from "@/components/obstacles/Windmil";

function getRandomComponent() {
    const components = [Wheat, Tractor, Tree, Windmil];
    return components[Math.floor(Math.random() * components.length)];
}

function generateObstacles(count) {
    const obstacles = [];
    let previousPosition = 0;

    for (let i = 1; i <= count; i++) {
        const position = previousPosition + Math.floor(Math.random() * 200) + 500;

        obstacles.push({
            id: i,
            position: generatePositionWithPixels(position),
            Component: getRandomComponent()
        });

        previousPosition = position;
    }

    return obstacles;
}

export const USER_GENERATED_OBSTACLES = generateObstacles(20);

export default function useObstacles() {
    const [obstacles, setObstacles] = useState(USER_GENERATED_OBSTACLES);
    const [activeObstacleIndex, setActiveObstacleIndex] = useState(0);

    return { obstacles, setObstacles, activeObstacleIndex, setActiveObstacleIndex };
}
