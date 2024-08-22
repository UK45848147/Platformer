import {Character} from "@/components/characters/Character";
import {Pillar} from "@/components/obstacles/Pillar";
import {Score} from "@/components/game/Score";
import {GameOver} from "@/components/game/GameOver";
import useGameEngine from "@/game_engine/game_engine";
import {CHAR_HEIGHT, CHAR_WIDTH, GAME_HEIGHT, GAME_WIDTH} from "@/constants/game";
import useCharacter from "@/game_engine/character";
import {generatePosition, generateHeight} from "@/utils/character";

export const USER_GENERATED_OBSTACLES = [
    { id: 1, position: generatePosition(), Component: Pillar, height: generateHeight() },
    { id: 3, position: generatePosition(1.2), Component: Pillar, height: generateHeight() },
    { id: 5, position: generatePosition(1.4), Component: Pillar, height: generateHeight() },
    { id: 7, position: generatePosition(1.6), Component: Pillar, height: generateHeight() }
]

export const Game = () => {
    const { charRef, charCoords, jumpClicked } = useCharacter();
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
        }}>
            <Character width={CHAR_WIDTH} height={CHAR_HEIGHT} ref={charRef} jumpClicked={jumpClicked}/>
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
