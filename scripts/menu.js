import { homeHowToPlayButton } from "./home.js";

/* TOGGLE MENU */
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const openButton = document.querySelector('.hamburguer-menu-icon-wrapper');
const closeButton = document.querySelector('.close-menu-icon-wrapper');

const howToPlayButton = document.querySelector('.sidebar-how-to-play-button');
const newGameButton = document.querySelector('.sidebar-new-game-button');
const aboutButton = document.querySelector('.sidebar-about-button');

openButton.addEventListener('click', openSidebar);
closeButton.addEventListener('click', closeSidebar);

export function openSidebar()
{
    openButton.classList.add('hamburguer-menu-icon-wrapper-hidden');
    sidebar.classList.add('sidebar-open');
    overlay.classList.add('overlay-show');
}

function closeSidebar()
{
    openButton.classList.remove('hamburguer-menu-icon-wrapper-hidden');
    sidebar.classList.remove('sidebar-open');
    overlay.classList.remove('overlay-show');

    howToPlayButton.querySelector('.sidebar-item-description').classList.remove('sidebar-item-description-open');
    newGameButton.querySelector('.sidebar-item-description').classList.remove('sidebar-item-description-open');
    aboutButton.querySelector('.sidebar-item-description').classList.remove('sidebar-item-description-open');
}


/* CLICK OUTSIDE TO CLOSE */
document.addEventListener('click', (event) =>
{
    const clickInside = sidebar.contains(event.target) || openButton.contains(event.target) || homeHowToPlayButton.contains(event.target);

    if (!clickInside)
    {
        closeSidebar();
    }
})


/* SHOW DESCRIPTION */
howToPlayButton.addEventListener('click', (event) => {toggleDescription(event.target)});
newGameButton.addEventListener('click', (event) => {toggleDescription(event.target)});
aboutButton.addEventListener('click', (event) => {toggleDescription(event.target)});

export function toggleDescription(target)
{
    const sidebarDescription = target.querySelector('.sidebar-item-description');

    if (sidebarDescription)
    {
        sidebarDescription.classList.toggle('sidebar-item-description-open');
    }
}