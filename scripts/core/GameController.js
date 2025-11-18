import { GAME_CONSTANTS } from "./GameConstants.js";
import { GameState } from "./GameState.js";
import { EVENTS } from "./Events.js";
import { gameEvents } from "../main.js";
import { SCREENS } from "./Screens.js";
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

        const teamsWithMaxPlayersData = [];
        const invalidTeamsIndexData = [];
        
        teamsData.forEach((team, index) => {
            const invalidSize = team.length < GAME_CONSTANTS.MIN_PLAYERS_PER_TEAM;
            const hasInvalidNames = team.some((player) => {return player.trim() === ''});

            if (invalidSize || hasInvalidNames)
            {
                invalidTeamsIndexData.push(index);
            }

            const hasMaxPlayers = team.length === GAME_CONSTANTS.MAX_PLAYERS_PER_TEAM;

            if (hasMaxPlayers)
            {
                teamsWithMaxPlayersData.push(index);
            }
        })

        return {
            teams: teamsData,
            hasMaxTeams: hasMaxTeamsData,
            hasEnoughTeams: hasEnoughTeamsData,
            teamsWithMaxPlayers: teamsWithMaxPlayersData,
            invalidTeamsIndex: invalidTeamsIndexData
        }

    }
    tryAddTeam()
    {
        const teams = this.#gameState.getTeamsCopy();

        if (teams.length < GAME_CONSTANTS.MAX_TEAMS)
        {
            this.#gameState.addTeam();
            gameEvents.dispatchEvent(new Event(EVENTS.TEAMS_UPDATED));
            this.#gameState.saveGameState();
        }
    }
    tryDeleteTeam(teamIndex)
    {
        this.#gameState.deleteTeam(teamIndex);
        gameEvents.dispatchEvent(new Event(EVENTS.TEAMS_UPDATED));
        this.#gameState.saveGameState();
    }
    tryAddPlayer(teamIndex)
    {
        const teams = this.#gameState.getTeamsCopy();

        if (teams[teamIndex].length < GAME_CONSTANTS.MAX_PLAYERS_PER_TEAM)
        {
            this.#gameState.addPlayer(teamIndex);
            gameEvents.dispatchEvent(new Event(EVENTS.TEAMS_UPDATED));
            this.#gameState.saveGameState();
        }    
    }
    tryDeletePlayer(teamIndex, playerIndex)
    {
        this.#gameState.deletePlayer(teamIndex, playerIndex);
        gameEvents.dispatchEvent(new Event(EVENTS.TEAMS_UPDATED));
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
        const isValid = this.checkTeams();

        if (isValid)
        {
            this.showScreen(SCREENS.SETTINGS);
        }
        else
        {
            gameEvents.dispatchEvent(new Event(EVENTS.INVALID_TEAMS));
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
        this.showScreen(SCREENS.HOME);
    }
    tryGoWordsInput()
    {
        this.#gameState.goToWordsInput();
        this.showScreen(SCREENS.WORDS_INPUT);
    }

    /*=====[WORDS INPUT]=====*/


    /*=====[SCREEN MANAGER]=====*/
    initScreen()
    {
        const screen = this.#gameState.getSessionCopy().screenId;
        this.showScreen(screen);
    }
    showScreen(screenId)
    {
        document.querySelectorAll('section:not(.section-hidden)').forEach((section) => {
            section.classList.add('section-hidden');
        })

        const screen = document.getElementById(screenId);

        if (screen)
        {
            screen.classList.remove('section-hidden');
            gameEvents.dispatchEvent(new CustomEvent(EVENTS.SHOW_SCREEN, {
                detail: {
                    screenId: screenId
                }
            }))
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