import { homeHowToPlayButton } from "./homeScreen.js";


/*=====[HTML ELEMENTS]=====*/
let sidebar;
let overlay;
let openMenuButton;
let closeMenuButton;
let howToPlayButton;
let newGameButton;
let confirmNewGameButton;
let cancelNewGameButton;
let aboutButton;
let lightModeButton;
let lightMode;

/*=====[INIT]=====*/
function initMenu()
{
    getElementsMenu();
    addListenersMenu();
    loadLightMode();
    applyLightMode();
}

/*=====[SETUP]=====*/
function getElementsMenu()
{
    sidebar = document.querySelector('.sidebar');
    overlay = document.querySelector('.overlay');
    openMenuButton = document.querySelector('.hamburguer-menu-icon-wrapper');
    closeMenuButton = document.querySelector('.close-menu-icon-wrapper');
    howToPlayButton = document.querySelector('.sidebar-how-to-play-button');
    newGameButton = document.querySelector('.sidebar-new-game-button');
    confirmNewGameButton = document.querySelector('.confirm-new-game-button');
    cancelNewGameButton = document.querySelector('.cancel-new-game-button');
    aboutButton = document.querySelector('.sidebar-about-button');
    lightModeButton = document.querySelector('.lightmode-icon-wrapper');
}
function addListenersMenu()
{
    openMenuButton.addEventListener('click', onToggleSidebar);
    closeMenuButton.addEventListener('click', onToggleSidebar);
    document.addEventListener('click', (event) => {onClickOutsideSidebar(event.target)});

    howToPlayButton.addEventListener('click', (event) => {onToggleDescription(event.target)});
    newGameButton.addEventListener('click', (event) => {onToggleDescription(event.target)});
    aboutButton.addEventListener('click', (event) => {onToggleDescription(event.target)});

    confirmNewGameButton.addEventListener('click', onNewGame);
    cancelNewGameButton.addEventListener('click', onCancelNewGame);

    lightModeButton.addEventListener('click', onToggleLightMode)
}
function loadLightMode()
{
    lightMode = JSON.parse(localStorage.getItem('lightMode'));

    if (!lightMode)
    {
        lightMode = true;
    }
}

/*=====[EVENT HANDLERS]=====*/
function onToggleSidebar()
{
    toggleSidebar();
}
function onClickOutsideSidebar(target)
{
    const sidebarIsOpen = sidebar.classList.contains('sidebar-open');
    const clickInside = sidebar.contains(target) || openMenuButton.contains(target) || homeHowToPlayButton.contains(target);

    if (sidebarIsOpen && !clickInside)
    {
        toggleSidebar();
    }
}
function onToggleDescription(target)
{
    toggleDescription();
}
function onCancelNewGame()
{
    toggleDescription(newGameButton)
}
function onNewGame()
{
    // TODO
}
function onToggleLightMode()
{
    toggleLightMode();
}

/*=====[UI ACTIONS]=====*/
function toggleSidebar()
{
    const isOpen = sidebar.classList.contains('sidebar-open');

    if (isOpen)
    {
        sidebar.classList.remove('sidebar-open');
        overlay.classList.remove('overlay-show');
        openMenuButton.classList.remove('hamburguer-menu-icon-wrapper-hidden');

        howToPlayButton.querySelector('.sidebar-item-description').classList.remove('sidebar-item-description-open');
        newGameButton.querySelector('.sidebar-item-description').classList.remove('sidebar-item-description-open');
        aboutButton.querySelector('.sidebar-item-description').classList.remove('sidebar-item-description-open');
    }
    else
    {
        sidebar.classList.add('sidebar-open');
        overlay.classList.add('overlay-show');
        openMenuButton.classList.add('hamburguer-menu-icon-wrapper-hidden');
    } 
}
function toggleDescription(target)
{
    const sidebarDescription = target.querySelector('.sidebar-item-description');

    if (sidebarDescription)
    {
        sidebarDescription.classList.toggle('sidebar-item-description-open');
    }
}
function toggleLightMode()
{
    if (lightMode)
    {
        lightMode = false;
    }
    else
    {
        lightMode = true;
    }

    saveLightMode();
    applyLightMode();
}
function applyLightMode()
{
    if (lightMode)
    {
       document.body.classList.remove('dark-mode');
    }
    else
    {
        document.body.classList.add('dark-mode');
    }
}
function saveLightMode()
{
    localStorage.setItem('lightMode', JSON.stringify(lightMode));
}