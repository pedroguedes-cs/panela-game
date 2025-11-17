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
        const teamsData = this.#gameState.getTeamsCopy();
        const hasMaxTeamsData = teamsData.length >= GAME_CONSTANTS.MAX_TEAMS;
        const hasEnoughTeamsData = teamsData.length >= GAME_CONSTANTS.MIN_TEAMS;

        const invalidTeamsIndexData = [];
        
        teamsData.forEach((team, index) => {
            const invalidSize = team.length < GAME_CONSTANTS.MIN_PLAYERS_PER_TEAM;
            const hasInvalidNames = team.some((player) => {return player.trim() === ''});

            if (invalidSize || hasInvalidNames)
            {
                invalidTeamsIndexData.push(index);
            }
        })

        return {
            teams: teamsData,
            hasMaxTeams: hasMaxTeamsData,
            hasEnoughTeams: hasEnoughTeamsData,
            invalidTeamsIndex: invalidTeamsIndexData
        }

    }
    tryAddTeam()
    {
        const teams = this.#gameState.getTeamsCopy();

        if (teams.length < GAME_CONSTANTS.MAX_TEAMS)
        {
            this.#gameState.addTeam();
            GameEvents.dispatchEvent('teamsUpdated');
            this.#gameState.saveGameState();
        }
    }
    tryDeleteTeam(teamIndex)
    {
        this.#gameState.deleteTeam(teamIndex);
        GameEvents.dispatchEvent('teamsUpdated');
        this.#gameState.saveGameState();
    }
    tryAddPlayer(teamIndex)
    {
        const teams = this.#gameState.getTeamsCopy();

        if (teams[teamIndex].length < GAME_CONSTANTS.MAX_PLAYERS_PER_TEAM)
        {
            this.#gameState.addPlayer(teamIndex);
            GameEvents.dispatchEvent('teamsUpdated');
            this.#gameState.saveGameState();
        }    
    }
    tryDeletePlayer(teamIndex, playerIndex)
    {
        this.#gameState.deletePlayer(teamIndex, playerIndex);
        GameEvents.dispatchEvent('teamsUpdated');
        this.#gameState.saveGameState();
    }
    tryRenamePlayer(teamIndex, playerIndex, newName)
    {
        this.#gameState.renamePlayer(teamIndex, playerIndex, newName.trim());
        this.#gameState.saveGameState();
    }
    checkTeams()
    {
        const teamsInfo = this.getTeamsInfo();

        if (teamsInfo.hasEnoughTeams && teamsInfo.invalidTeamsIndex.length === 0)
        {
            return true;
        }

        return false;
    }
    tryGoSettings()
    {
        isValid = this.checkTeams();

        if (isValid)
        {
            this.showScreen(Screen.SETTINGS);
        }
        else
        {
            GameEvents.dispatchEvent('invalidTeams');
        }
    }


    /*=====[SETTINGS]=====*/
    getSettingsInfo()
    {
        return this.#gameState.getSettingsCopy();
    }
    trySetTurnTime(turnTime)
    {
        this.#gameState.setTurnTime(turnTime);
        this.#gameState.saveGameState();
    }
    trySetWordsPerPlayer(wordsPerPlayer)
    {
        this.#gameState.setWordsPerPlayer(wordsPerPlayer);
        this.#gameState.saveGameState();
    }
    tryGoBackHome()
    {
        this.showScreen(Screen.HOME);
    }
    tryGoWordsInput()
    {
        this.#gameState.goToWordsInput();
        this.showScreen(Screen.WORDS_INPUT);
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
            this.#gameState.setScreenId(screenId);
            this.#gameState.saveGameState();
            return true;
        }
        else
        {
            console.log(`couldnt change to screen ${screenId}`);
            return false;
        }
    }
}