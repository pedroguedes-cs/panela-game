import { GAME_CONSTANTS } from "./GameConstants.js";
import { Screen } from "./Screen.js";

export class GameController
{
    #gameState;

    constructor(gameState)
    {
        this.#gameState = gameState;
    }

    /* GETTERS */
    getGameState()
    {
        return this.#gameState;
    }

    /* SCREEN MANIPULATION */
    showScreen(screenId)
    {
        document.querySelectorAll('section:not(.section-hidden)').forEach((section) => {
            section.classList.add('section-hidden');
        })

        const screen = document.getElementById(screenId);

        if (screen)
        {
            screen.classList.remove('section-hidden');

            /* TODO: update gameState */

            return true;
        }
        else
        {
            console.log(`couldnt change to screen ${screenId}`);
            return false;
        }
    }
}