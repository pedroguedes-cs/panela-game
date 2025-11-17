import { GAME_CONSTANTS } from "./GameConstants.js";
import { Screen } from "./Screen.js";
import { Team } from "../entities/Team.js";
import { Player } from "../entities/Player.js";
import { WordBank } from "../entities/WordBank.js";
import { Settings } from "../entities/Settings.js";
import { Session } from "../entities/Session.js";


export class GameState
{
    #teams = [];
    #wordBank = null;
    #settings = null;
    #session = null;

    constructor(teamInstances = [], wordBankInstance = null, settingInstance = null, sessionInstance = null)
    {
        this.#teams = teamInstances;
        this.#wordBank = wordBankInstance;
        this.#settings = settingInstance;
        this.#session = sessionInstance;

        if (teamInstances.length === 0)
        {
            this.addTeam();
        }
        if (!wordBankInstance)
        {
            this.#wordBank = new WordBank();
        }
        if (!settingInstance)
        {
            this.#settings = new Settings();
        }
        if (!sessionInstance)
        {
            this.#session = new Session();
        }
    }

    /*=====[GETTERS COPY]=====*/
    getTeamsCopy()
    {
        return this.#teams.map((team) => {return team.getPlayers().map((player) => {return player.getName()})});
    }
    getSettingsCopy()
    {
        return {
            turnTime: this.#settings.getTurnTime(),
            wordsPerPlayer: this.#settings.getWordsPerPlayer()
        }
    }
    getSessionCopy()
    {
        return {
            screenId: this.#session.getScreenId(),
            round: this.#session.getRound(),
            teamIndex: this.#session.getTeamIndex(),
            playerIndex: this.#session.getPlayerIndex(),
            remainingTurnTime: this.#session.getRemainingTurnTime()
        }
    }

    /*=====[SESSION]=====*/
    setScreenId(screenId)
    {
        this.#session.setScreenId(screenId);
    }
    setRemainingTurnTime(remainingTurnTime)
    {
        this.#session.setRemainingTurnTime(remainingTurnTime);
    }

    /*=====[HOME]=====*/
    addTeam()
    {

    }
    deleteTeam()
    {

    }
    addPlayer()
    {

    }
    deletePlayer()
    {

    }
    renamePlayer()
    {
        
    }

    /*=====[SETTINGS]=====*/
    /*=====[WORD INPUT]=====*/
    /*=====[ROUND]=====*/
    /*=====[TURN]=====*/
    /*=====[SCORE]=====*/
    /*=====[NEW GAME]=====*/


    
    
    /*=====[TEAM]=====
    addTeam()
    {
        this.#teams.push([]);
    }
    deleteTeam(teamIndex)
    {
        this.#teams.splice(teamIndex, 1);
    }

    /*=====[PLAYER]=====
    addPlayer(teamIndex, player)
    {
        this.#teams[teamIndex].addPlayer(player);
    }
    deletePlayer(teamIndex, playerIndex)
    {
        this.#teams[teamIndex].deletePlayer(playerIndex);
    }
    setPlayerName(teamIndex, playerIndex, newName)
    {
        this.#teams[teamIndex].getPlayer(playerIndex).setName(newName);
    }

    /*=====[SESSION]=====
    getScreenId()
    {
        return this.#session.getScreenId();
    }
    getRemainingTurnTime()
    {
        return this.#session.getRemainingTurnTime();
    }
    setScreenId(screenId)
    {
        this.#session.setScreenId(screenId);
    }
    setRemainingTurnTime(remainingTurnTime)
    {
        this.#session.setRemainingTurnTime(remainingTurnTime);
    }

    /*=====[SETTINGS]=====
    goToSettings()
    {
        this.#teams.forEach((team) => {
            team.setCurrentPlayerIndex(0);
        })
    }
    setTurnTime(turnTime)
    {
        this.#settings.setTurnTime(turnTime);
    }
    setWordsPerPlayer(wordsPerPlayer)
    {
        this.#settings.setWordsPerPlayer(wordsPerPlayer);
    }

    /*=====[WORDS INPUT]=====
    goToWordsInput()
    {
        this.#teams.forEach((team) => {
            team.getPlayers.forEach((player) => {
                player.setWordsSize(this.#settings.getWordsPerPlayer())
            })
        })
    }
    setPlayerWords(teamIndex, playerIndex, words)
    {
        this.#teams[teamIndex].getPlayers()[playerIndex].setWords(words);
    }

    /*=====[GAME]=====
    fillWordBank()
    {
        this.#teams.forEach((team) => {
            team.getPlayers.forEach((player) => {
                player.getWords().forEach((word) => {
                    this.#wordBank.addWord(word);
                })
            })
        })  
    }
    startRound()
    {
        if (this.#session.getRound() === 1)
        {
            this.fillWordBank();
        }
        this.#wordBank.resetAllGuessedFlags();
    }
    startTurn()
    {
        this.#wordBank.shuffleWords();
    }
    endTurn()
    {
        /* TODO: SESSION DATA 
        return;
    }
    pickWord()
    {
        return this.#wordBank.pickWord();
    }
    guessedWord()
    {
        this.#wordBank.markAsGuessed();
    }
    getScore()
    {
        const score = this.#teams.map((team, index) => {
            let teamScore = {...team.getScore()};
            teamScore.teamIndex = index;
            return teamScore
        })
        score.sort((a, b) => {return b.pointsTotal - a.pointsTotal});
        return score;
    }
    newGame()
    {
        /* TODO: RESET THINGS 
        return;
    }*/

    /*=====[LOCAL STORAGE]=====*/
    saveGameState()
    {
        const gameStateToJSON = {
            teams: this.#teams.map((team) => {return team.toJSON()}),
            wordBank: this.#wordBank.toJSON(),
            settings: this.#settings.toJSON(),
            session: this.#session.toJSON()
        }

        localStorage.setItem('gameState', JSON.stringify(gameStateToJSON));
    }
    static loadGameState()
    {
        const gameStateFromStorage = JSON.parse(localStorage.getItem('gameState'));

        if (!gameStateFromStorage)
        {
            return new GameState();
        }

        const teamsFromJSON = gameStateFromStorage.teams.map((json) => {return Team.fromJSON(json)});
        const wordBankFromJSON = WordBank.fromJSON(gameStateFromStorage.wordBank);
        const settingsFromJSON = Settings.fromJSON(gameStateFromStorage.settings);
        const sessionFromJSON = Session.fromJSON(gameStateFromStorage.session);

        return new GameState(teamsFromJSON, wordBankFromJSON, settingsFromJSON, sessionFromJSON);
    }
}


