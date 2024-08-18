import {GAME_WIDTH} from "@/constants/game";

export const generatePosition = (modifier = 1) => {
    return typeof window !== "undefined" ? GAME_WIDTH * modifier : 0
}
