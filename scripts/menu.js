const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const openButton = document.querySelector('.hamburguer-menu-icon-wrapper');
const closeButton = document.querySelector('.close-menu-icon-wrapper');

openButton.addEventListener('click', openSidebar);
closeButton.addEventListener('click', closeSidebar);

function openSidebar()
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
}