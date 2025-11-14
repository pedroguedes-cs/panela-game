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
let descriptionsButtons;
let lightModeButton;
let lightMode;
let homeHowToPlayButton;

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
    descriptionsButtons = [howToPlayButton, newGameButton, aboutButton];
    lightModeButton = document.querySelector('.lightmode-icon-wrapper');
    homeHowToPlayButton = document.querySelector('.home-screen-how-to-play-button');
}
function addListenersMenu()
{
    openMenuButton.addEventListener('click', toggleSidebar);
    closeMenuButton.addEventListener('click', toggleSidebar);
    document.addEventListener('click', (event) => {clickOutsideSidebar(event.target)});

    descriptionsButtons.forEach((button) => {
        button.addEventListener('click', (event) => {toggleDescription(event.currentTarget)});
    })

    confirmNewGameButton.addEventListener('click', onNewGame);
    cancelNewGameButton.addEventListener('click', () => {toggleDescription(newGameButton)});

    lightModeButton.addEventListener('click', toggleLightMode)
}
function loadLightMode()
{
    lightMode = JSON.parse(localStorage.getItem('lightMode'));

    if (lightMode === null)
    {
        lightMode = true;
    }
}

/*=====[EVENT HANDLERS]=====*/
function onNewGame()
{
    // TODO: game controller
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

        closeAllDescriptions();
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
function closeAllDescriptions()
{
    descriptionsButtons.forEach((button) => {
        const description = button.querySelector('.sidebar-item-description');
        if (description)
        {
            description.classList.remove('sidebar-item-description-open');
        }
    })
}
function clickOutsideSidebar(target)
{
    const sidebarIsOpen = sidebar.classList.contains('sidebar-open');
    const clickInside = sidebar.contains(target) || openMenuButton.contains(target) || homeHowToPlayButton.contains(target);

    if (sidebarIsOpen && !clickInside)
    {
        toggleSidebar();
    }
}
function toggleLightMode()
{
    lightMode = !lightMode;
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
