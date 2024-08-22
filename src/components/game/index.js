import {Character} from "@/components/characters/Character";
import {Pillar} from "@/components/obstacles/Pillar";
import {Score} from "@/components/game/Score";
import {GameOver} from "@/components/game/GameOver";
import useGameEngine from "@/game_engine/game_engine";
import {CHAR_HEIGHT, CHAR_WIDTH, GAME_HEIGHT, GAME_WIDTH} from "@/constants/game";
import useCharacter from "@/game_engine/character";
import {generatePosition, generateHeight} from "@/utils/character";

export const OBSTACLE_LENGTH = 30;

const generateObstacles = (count) => {
    const obstacles = [];
    for (let i = 0; i < count; i++) {
        obstacles.push({
            id: i * 2 + 1,
            position: generatePosition(i * 0.35 + 1),
            Component: Pillar,
            height: generateHeight()
        });
    }
    return obstacles;
}

export const USER_GENERATED_OBSTACLES = generateObstacles(OBSTACLE_LENGTH);



export const Game = () => {
    const { charRef, charCoords, jumpClicked, bottomPosition } = useCharacter();
    const { points, isGameOver, obstacleRefs, obstacles } = useGameEngine({
        charCoords
    });

    return (
        <div style={{
            // position: 'relative',
            width: `${GAME_WIDTH}px`,
            // height: `${GAME_HEIGHT}px`,
            overflow: 'hidden',
            backgroundColor: '#ddd',
            display: 'flex',
            justifyContent: 'space-evenly'
        }}>
            <Character width={CHAR_WIDTH} height={CHAR_HEIGHT} ref={charRef} jumpClicked={jumpClicked} bottomPosition={bottomPosition}/>
            {obstacles.map((obstacle) => (
                <div>
                    <obstacle.Component
                        key={`bottom-${obstacle.id}`}
                        ref={(el) => (obstacleRefs.current[obstacle.id] = el)}
                        position={obstacle.position}
                        bottom={0}
                        height={obstacle.height}
                    />
                    <obstacle.Component
                        key={`top-${obstacle.id}`}
                        ref={(el) => (obstacleRefs.current[obstacle.id+1] = el)}
                        position={obstacle.position}
                        top={0}
                        height={GAME_HEIGHT - obstacle.height}
                    />
                </div>
            ))}
            {isGameOver && <GameOver/>}
            <Score points={parseInt(points / 10)}/>
        </div>
    );
}
