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