import { GAME_CONSTANTS } from "./GameConstants.js";
import { Screen } from "./Screen.js";
import { Team } from "../entities/Team.js";
import { Player } from "../entities/Player.js";
import { PlayersSequence } from "../entities/PlayersSequence.js";
import { WordBank } from "../entities/WordBank.js";
import { Settings } from "../entities/Settings.js";
import { Session } from "../entities/Session.js";


export class GameState
{
    #teams = [];
    #wordBank = null;
    #settings = null;
    #session = null;

    constructor(teams = [], wordBank = null, settings = null, session = null)
    {
        this.#teams = teams;
        this.#wordBank = wordBank;
        this.#settings = settings;
        this.#session = session;
    }

    /*=====[GETTERS]=====*/
    getTeams()
    {
        return this.#teams;
    }
    getWordBank()
    {
        return this.#wordBank;
    }
    getSettings()
    {
        return this.#settings;
    }
    getSession()
    {
        return this.#session;
    }
    
    /*=====[TEAM]=====*/
    addTeam(team)
    {
        this.#teams.push(team);
    }
    deleteTeam(teamIndex)
    {
        this.#teams.splice(teamIndex, 1);
    }

    /*=====[PLAYER]=====*/
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

    /*=====[SESSION]=====*/
    setScreenId(screenId)
    {
        this.#session.setScreenId(screenId);
    }
    setRemainingTurnTime(remainingTurnTime)
    {
        this.#session.setRemainingTurnTime(remainingTurnTime);
    }

    /*=====[SETTINGS]=====*/
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

    /*=====[WORDS INPUT]=====*/
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

    /*=====[GAME]=====*/
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
        /* TODO: SESSION DATA */
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
        /* TODO: RESET THINGS */
        return;
    }

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


