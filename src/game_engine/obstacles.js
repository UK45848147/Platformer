import { useState } from 'react';
import {USER_GENERATED_OBSTACLES} from "@/components/game";

// add in componets from out of this and generate the below
// TODO: Update these to be spread by pixels instead of % so its alw
export default function useObstacles() {
    const [obstacles, setObstacles] = useState(USER_GENERATED_OBSTACLES);
    const [activeObstacleIndex, setActiveObstacleIndex] = useState(0);

    return { obstacles, setObstacles, activeObstacleIndex, setActiveObstacleIndex };
}
