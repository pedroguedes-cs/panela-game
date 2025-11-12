import { GAME_CONSTANTS } from "./GameConstants.js";
import { Screen } from "./Screen.js";

export class GameState
{
    #teams = [];
    #playersSequence = null;
    #wordBank = null;
    #settings = {
        turnTime: GAME_CONSTANTS.TURN_TIME_DEFAULT,
        wordsPerPlayer: GAME_CONSTANTS.WORDS_PER_PLAYER_DEFAULT
    }
    #session = {
        screenId: Screen.HOME,
        roundCounter: 1,
        remainingTurnTime: 0
    }

    constructor()
    {
        
    }

}


/*export let gameState = loadGameState();

export function saveGameState()
{
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGameState()
{
    let saved = JSON.parse(localStorage.getItem('gameState'));

    if (!saved)
    {
        saved = 
        {
            teams: [],
            allWords: [],
            settings: 
            {
                turnDuration: 60,
                wordsPerPlayer: 4
            },
            session:
            {
                screenId: 'home',
                roundNumber: 1,
                remainingWords: [],
                currentTurn:
                {
                    teamIndex: 0,
                    playerIndex: 0,
                    remainingTime: 0
                }
            }
        }
    }

    return saved;
}*/
