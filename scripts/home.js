import { gameState, saveGameState } from "./gameState.js";
import { createSVG } from "./utilities.js";
import { openSidebar, toggleDescription } from "./menu.js";

/* variables */
const maxTeams = 5;
const maxPlayersPerTeam = 3;

/* html elements */
const createdTeamsWrapper = document.querySelector('.created-teams-wrapper');
const addTeamButton = document.querySelector('.add-team-button');
export const homeHowToPlayButton = document.querySelector('.home-screen-how-to-play-button');
const homePlayButton = document.querySelector('.home-screen-play-button');

/* RENDER */
function renderHomeScreenTeams()
{
    createdTeamsWrapper.innerHTML = '';

    if (gameState.teams.length === 0)
    {
        addTeam();
    }
    else
    {
        gameState.teams.forEach((team, index) => {
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

    /* TEAM HEADER */
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

    /* TEAM INPUTS */
    const playersInput = document.createElement('div');
    playersInput.classList.add('players-input-wrapper');

    if (teamArray.length === 0)
    {
        playersInput.appendChild(generatePlayerInput(teamIndex, '', 0));
    }
    else
    {
        teamArray.forEach((playerName, playerIndex) => {
            playersInput.appendChild(generatePlayerInput(teamIndex, playerName, playerIndex));
        })
    }


    /* ADD PLAYER BUTTON */
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


    /* APPENDING */
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



/* ACTIONS */

/* event listeners */
addTeamButton.addEventListener('click', () => {
    addTeam();
})

homeHowToPlayButton.addEventListener('click', () => {
    openSidebar();
    toggleDescription(document.querySelector('.sidebar-how-to-play-button'));
})



function addPlayer(teamIndex)
{
    gameState.teams[teamIndex].push('');
    saveGameState();
    renderHomeScreenTeams();
}
function deletePlayer(teamIndex, playerIndex)
{
    gameState.teams[teamIndex].splice(playerIndex, 1);
    saveGameState();
    renderHomeScreenTeams();
}
function addTeam()
{
    gameState.teams.push(['']);
    saveGameState();
    renderHomeScreenTeams();
}
function deleteTeam(teamIndex)
{
    gameState.teams.splice(teamIndex, 1);
    saveGameState();
    renderHomeScreenTeams();
}
function startPlay()
{

}
function saveTeams()
{

}


renderHomeScreenTeams();