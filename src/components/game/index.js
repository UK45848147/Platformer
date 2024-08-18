import {Character} from "@/components/characters/Character";
import {Wheat} from "@/components/obstacles/Wheat";
import {Score} from "@/components/game/Score";
import {GameOver} from "@/components/game/GameOver";
import useGameEngine from "@/game_engine/game_engine";
import {CHAR_HEIGHT, CHAR_WIDTH, GAME_HEIGHT, GAME_WIDTH} from "@/constants/game";
import useCharacter from "@/game_engine/character";
import {generatePosition, generatePositionWithPixels} from "@/utils/character";
import {Tractor} from "@/components/obstacles/Tractor";
import {Windmil} from "@/components/obstacles/Windmil";
import {Tree} from "@/components/obstacles/Tree";

const COMPONENTS = [Wheat, Tractor, Windmil, Tree];

export function generateUserGeneratedObstacles(count) {
    const obstacles = [];
    let currentModifier = 1;

    for (let i = 1; i <= count; i++) {
        // console.log(obstacles, i)
        const randomComponent = COMPONENTS[Math.floor(Math.random() * COMPONENTS.length)];
        let newPosition = generatePosition(currentModifier);
        if (obstacles.length > 0 && (newPosition - obstacles[i-2].position) < 300) {
            console.log("TOO LONG")
            currentModifier += 0.5;
            newPosition =  generatePosition(currentModifier)
        }

        obstacles.push({
            id: i,
            position: generatePosition(currentModifier),
            Component: randomComponent,
        });

        currentModifier += Math.random() * 0.3 + 0.2;
    }

    return obstacles;
}

// export const USER_GENERATED_OBSTACLES = generateUserGeneratedObstacles(10);

export const Game = () => {
    const { charRef, charCoords, jumpClicked } = useCharacter();
    const { points, isGameOver, obstacleRefs, obstacles } = useGameEngine({
        charCoords
    });

    console.log("LEN", obstacles.length)

    return (
        <div style={{
            position: 'relative',
            width: `${GAME_WIDTH}px`,
            height: `${GAME_HEIGHT}px`,
            overflow: 'hidden',
            backgroundColor: '#ddd',
            display: 'flex',
        }}>
            <Character width={CHAR_WIDTH} height={CHAR_HEIGHT} ref={charRef} jumpClicked={jumpClicked}/>
            {obstacles.map((obstacle) => (
                <obstacle.Component
                    key={obstacle.id}
                    ref={(el) => (obstacleRefs.current[obstacle.id] = el)}
                    position={obstacle.position}
                />
            ))}
            {isGameOver && <GameOver/>}
            <Score points={parseInt(points / 10)}/>
        </div>
    );
}
