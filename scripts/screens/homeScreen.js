import { gameController, gameEvents } from "../main.js";
import { EVENTS } from "../core/Events.js";
import { SCREENS } from "../core/Screens.js";
import { ICONS } from "../icons/Icons.js";
import { icon } from "../icons/iconBuilder.js";


/*=====[HTML ELEMENTS]=====*/
let createdTeamsWrapper;
let addTeamButton;
let invalidInputMessage;
/*let homeHowToPlayButton; [menu screen] */
let homeContinueButton;

/*=====[INIT]=====*/
export function initHomeScreen()
{
    getElementsHomeScreen();
    addListenersHomeScreen();
}

/*=====[SETUP]=====*/
function getElementsHomeScreen()
{
    createdTeamsWrapper = document.querySelector('.created-teams-wrapper');
    addTeamButton = document.querySelector('.add-team-button');
    invalidInputMessage = document.querySelector('.teams-input-invalid-message');
    /*homeHowToPlayButton = document.querySelector('.home-screen-how-to-play-button');[menu screen] */
    homeContinueButton = document.querySelector('.home-screen-continue-button');   
}
function addListenersHomeScreen()
{
    addTeamButton.addEventListener('click', onAddTeam);
    /*homeHowToPlayButton.addEventListener('click', onHowToPlay); [menu screen] */
    homeContinueButton.addEventListener('click', onContinue);

    gameEvents.addEventListener(EVENTS.TEAMS_UPDATED, renderHomeScreen); 
    gameEvents.addEventListener(EVENTS.INVALID_TEAMS, renderError);
    gameEvents.addEventListener(EVENTS.SHOW_SCREEN, (event) => {onShowScreen(event.detail.screenId)})
}

/*=====[EVENT HANDLERS]=====*/
function onAddTeam()
{
    gameController.tryAddTeam();
}
function onDeleteTeam(teamIndex)
{
    gameController.tryDeleteTeam(teamIndex);
}
function onAddPlayer(teamIndex)
{
    gameController.tryAddPlayer(teamIndex);
}
function onDeletePlayer(teamIndex, playerIndex)
{
    gameController.tryDeletePlayer(teamIndex, playerIndex);
}
function onRenamePlayer(teamIndex, playerIndex, newName)
{
    hideError();
    gameController.tryRenamePlayer(teamIndex, playerIndex, newName);
}
function onContinue()
{
    gameController.tryGoSettings();
}
function onShowScreen(screenId)
{
    if (screenId === SCREENS.HOME)
    {
        renderHomeScreen();
    }
}

/*=====[RENDER]=====*/
function renderHomeScreen()
{
    hideError();
    createdTeamsWrapper.innerHTML = '';

    const teamsInfo = gameController.getTeamsInfo();

    teamsInfo.teams.forEach((team, index) => {
        const hasMaxPlayers = teamsInfo.teamsWithMaxPlayers.includes(index);
        createdTeamsWrapper.appendChild(createTeamInputElement(team, index, hasMaxPlayers));
    })

    if (teamsInfo.hasMaxTeams)
    {
        addTeamButton.classList.add('add-team-button-hidden');
    }
    else
    {
        addTeamButton.classList.remove('add-team-button-hidden');
    }
}
function createTeamInputElement(teamArray, teamIndex, hasMaxPlayers)
{
    const teamInput = document.createElement('div');
    teamInput.classList.add('team-input');
    teamInput.dataset.teamIndex = teamIndex;

    /* TEAM HEADER */
    const teamInputHeader = document.createElement('div');
    teamInputHeader.classList.add('team-input-header');

    const teamName = document.createElement('p');
    teamName.classList.add('team-name');
    teamName.textContent = `Team ${teamIndex + 1}`;

    const deleteTeamIcon = icon(ICONS.deleteTeam, ['delete-team-icon']);
    deleteTeamIcon.dataset.teamIndex = teamIndex;
    deleteTeamIcon.addEventListener('click', (event) => {

        const teamIndex = Number(event.currentTarget.dataset.teamIndex);
        onDeleteTeam(teamIndex);

    })

    teamInputHeader.append(teamName, deleteTeamIcon);

    /* TEAM INPUTS */
    const playersInput = document.createElement('div');
    playersInput.classList.add('players-input-wrapper');

    teamArray.forEach((playerName, playerIndex) => {
        playersInput.appendChild(createPlayerInputElement(teamIndex, playerIndex, playerName));
    })

    /* APPENDING */
    teamInput.append(teamInputHeader, playersInput);

    /* ADD PLAYER BUTTON */
    if (!hasMaxPlayers)
    {
        const addPlayerButton = document.createElement('button');
        addPlayerButton.classList.add('add-player-button');
        addPlayerButton.dataset.teamIndex = teamIndex;

        addPlayerButton.addEventListener('click', (event) => {

            const teamIndex = Number(event.currentTarget.dataset.teamIndex);
            onAddPlayer(teamIndex);

        })

        const addIcon = icon(ICONS.addPlayer, ['add-player-button-icon']);

        const buttonSpan = document.createElement('span');
        buttonSpan.classList.add('add-player-button-text');
        buttonSpan.textContent = 'Add Player';

        addPlayerButton.append(addIcon, buttonSpan);

        teamInput.append(addPlayerButton);
    }
    
    return teamInput;
}
function createPlayerInputElement(teamIndex, playerIndex, playerName)
{
    const playerInput = document.createElement('div');
    playerInput.classList.add('player-input');

    const input = document.createElement('input');
    input.classList.add('player-name-input');
    input.type = 'text';
    input.value = playerName;
    input.placeholder = 'Player name';
    input.dataset.teamIndex = teamIndex;
    input.dataset.playerIndex = playerIndex;

    input.addEventListener('blur', (event) => {

        const teamIndex = Number(event.currentTarget.dataset.teamIndex);
        const playerIndex = Number(event.currentTarget.dataset.playerIndex);
        const newName = input.value;

        onRenamePlayer(teamIndex, playerIndex, newName);
    })


    const deletePlayerIcon = icon(ICONS.deletePlayer, ['delete-player-icon']);
    deletePlayerIcon.dataset.teamIndex = teamIndex;
    deletePlayerIcon.dataset.playerIndex = playerIndex;

    deletePlayerIcon.addEventListener('click', (event) => {

        const teamIndex = Number(event.currentTarget.dataset.teamIndex);
        const playerIndex = Number(event.currentTarget.dataset.playerIndex);
        
        onDeletePlayer(teamIndex, playerIndex);

    })

    playerInput.append(input, deletePlayerIcon);
    return playerInput;
}
function renderError()
{
    const teamsInfo = gameController.getTeamsInfo();

    Array.from(createdTeamsWrapper.children).forEach((child, index) => {

        if (teamsInfo.invalidTeamsIndex.includes(index))
        {
            child.classList.add('team-input-invalid');
        }
    })

    if (!teamsInfo.hasEnoughTeams)
    {
        addTeamButton.classList.add('add-team-button-invalid');
    }

    invalidInputMessage.classList.add('teams-input-invalid-message-show');
    
}
function hideError()
{
    Array.from(createdTeamsWrapper.children).forEach((child) => {
        child.classList.remove('team-input-invalid');
    })

    addTeamButton.classList.remove('add-team-button-invalid');

    invalidInputMessage.classList.remove('teams-input-invalid-message-show');
}






/*import { gameState, saveGameState } from "./gameState.js";
import { showScreen } from "./screenManager.js";
import { createSVG } from "./utilities.js";
import { openSidebar, toggleDescription } from "./menu.js";

/* variables 
const maxTeams = 5;
const maxPlayersPerTeam = 3;

/* html elements 
const createdTeamsWrapper = document.querySelector('.created-teams-wrapper');
const addTeamButton = document.querySelector('.add-team-button');
export const homeHowToPlayButton = document.querySelector('.home-screen-how-to-play-button');
const homeContinueButton = document.querySelector('.home-screen-continue-button');
const invalidInputMessage = document.querySelector('.teams-input-invalid-message');

/* LOAD 
function loadHomeScreenTeams()
{
    createdTeamsWrapper.innerHTML = '';
    invalidInputMessage.classList.remove('teams-input-invalid-message-show');
    addTeamButton.classList.remove('add-team-button-invalid');

    if (gameState.teams.length === 0)
    {
        addTeam();
    }
    else
    {
        gameState.teams.forEach((team, index) => {
            if (team.length === 0)
            {
                team.push('');
            }
            
            createdTeamsWrapper.appendChild(generateTeamInput(team, index));

            const addPlayerButton = createdTeamsWrapper.children[index].querySelector('.add-player-button');

            if (gameState.teams[index].length >= maxPlayersPerTeam)
            {
                addPlayerButton.classList.add('add-player-button-hidden');
            }
            else
            {
                addPlayerButton.classList.remove('add-player-button-hidden');
            }
        })
    }

    if (gameState.teams.length >= maxTeams)
    {
        addTeamButton.classList.add('add-team-button-hidden');
    }
    else
    {
        addTeamButton.classList.remove('add-team-button-hidden');
    }
}
function generateTeamInput(teamArray, teamIndex)
{
    const teamInput = document.createElement('div');
    teamInput.classList.add('team-input');
    teamInput.dataset.teamIndex = teamIndex;

    /* TEAM HEADER 
    const teamInputHeader = document.createElement('div');
    teamInputHeader.classList.add('team-input-header');

    const teamName = document.createElement('p');
    teamName.classList.add('team-name');
    teamName.textContent = `Team ${teamIndex + 1}`;

    const deleteTeamIcon = createSVG('0 0 640 640', 'M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z');
    deleteTeamIcon.classList.add('delete-team-icon');
    deleteTeamIcon.dataset.teamIndex = teamIndex;
    deleteTeamIcon.addEventListener('click', (event) => {
        deleteTeam(event.currentTarget.dataset.teamIndex);
    })

    teamInputHeader.append(teamName, deleteTeamIcon);

    /* TEAM INPUTS 
    const playersInput = document.createElement('div');
    playersInput.classList.add('players-input-wrapper');

    teamArray.forEach((playerName, playerIndex) => {
        playersInput.appendChild(generatePlayerInput(teamIndex, playerName, playerIndex));
    })

    /* ADD PLAYER BUTTON 
    const addPlayerButton = document.createElement('button');
    addPlayerButton.classList.add('add-player-button');
    addPlayerButton.dataset.teamIndex = teamIndex;
    addPlayerButton.addEventListener('click', (event) => {
        addPlayer(event.currentTarget.dataset.teamIndex);
    })

    const addIcon = createSVG('0 0 640 640', 'M136 192C136 125.7 189.7 72 256 72C322.3 72 376 125.7 376 192C376 258.3 322.3 312 256 312C189.7 312 136 258.3 136 192zM48 546.3C48 447.8 127.8 368 226.3 368L285.7 368C384.2 368 464 447.8 464 546.3C464 562.7 450.7 576 434.3 576L77.7 576C61.3 576 48 562.7 48 546.3zM544 160C557.3 160 568 170.7 568 184L568 232L616 232C629.3 232 640 242.7 640 256C640 269.3 629.3 280 616 280L568 280L568 328C568 341.3 557.3 352 544 352C530.7 352 520 341.3 520 328L520 280L472 280C458.7 280 448 269.3 448 256C448 242.7 458.7 232 472 232L520 232L520 184C520 170.7 530.7 160 544 160z');
    addIcon.classList.add('add-player-button-icon');

    const buttonSpan = document.createElement('span');
    buttonSpan.classList.add('add-player-button-text');
    buttonSpan.textContent = 'Add Player';

    addPlayerButton.append(addIcon, buttonSpan);


    /* APPENDING 
    teamInput.append(teamInputHeader, playersInput, addPlayerButton);
    return teamInput;
}
function generatePlayerInput(teamIndex, playerName, playerIndex)
{
    const playerInput = document.createElement('div');
    playerInput.classList.add('player-input');

    const input = document.createElement('input');
    input.classList.add('player-name-input');
    input.type = 'text';
    input.value = playerName;
    input.placeholder = 'Player name';
    input.dataset.teamIndex = teamIndex;
    input.dataset.playerIndex = playerIndex;
    input.addEventListener('input', () => {
        removeErrorMessages();
        gameState.teams[teamIndex][playerIndex] = input.value;
        saveGameState();
    })

    const deletePlayerIcon = createSVG('0 0 640 640', 'M136 192C136 125.7 189.7 72 256 72C322.3 72 376 125.7 376 192C376 258.3 322.3 312 256 312C189.7 312 136 258.3 136 192zM48 546.3C48 447.8 127.8 368 226.3 368L285.7 368C384.2 368 464 447.8 464 546.3C464 562.7 450.7 576 434.3 576L77.7 576C61.3 576 48 562.7 48 546.3zM472 232L616 232C629.3 232 640 242.7 640 256C640 269.3 629.3 280 616 280L472 280C458.7 280 448 269.3 448 256C448 242.7 458.7 232 472 232z');
    deletePlayerIcon.classList.add('delete-player-icon');
    deletePlayerIcon.dataset.teamIndex = teamIndex;
    deletePlayerIcon.dataset.playerIndex = playerIndex;
    deletePlayerIcon.addEventListener('click', (event) => {
        deletePlayer(event.currentTarget.dataset.teamIndex, event.currentTarget.dataset.playerIndex);
    })

    playerInput.append(input, deletePlayerIcon);
    return playerInput;
}
*/

