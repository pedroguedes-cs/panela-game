import { GAME_CONSTANTS } from "./GameConstants.js";
import { GameState } from "./GameState.js";
import { GameEvents } from "./GameEvents.js";
import { Screen } from "./Screen.js";
import { Player } from "../entities/Player.js";

export class GameController
{
    #gameState;

    constructor(gameState)
    {
        this.#gameState = gameState;
    }

    /*=====[HOME]=====*/
    getTeamsInfo()
    {

    }
    /*
    getTeamsWithMaxPlayers()
    {

    }
    getInvalidTeams()
    {

    }
    hasEnoughTeams()
    {

    }
    hasMaxTeams()
    {

    }*/
    tryAddTeam()
    {

    }
    tryDeleteTeam()
    {

    }
    tryAddPlayer()
    {

    }
    tryDeletePlayer()
    {

    }
    tryRenamePlayer()
    {

    }
    tryGoSettings()
    {

    }


    /*=====[SETTINGS]=====*/
    getSettingsInfo()
    {
        
    }
    trySetTurnTime()
    {

    }
    trySetWordsPerPlayer()
    {

    }
    tryGoBackHome()
    {

    }
    tryGoWordsInput()
    {

    }

    /*=====[WORDS INPUT]=====*/


    /*=====[SCREEN MANAGER]=====*/
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