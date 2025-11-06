/* TOGGLE MENU */
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


/* CLICK OUTSIDE TO CLOSE */
document.addEventListener('click', (event) =>
{
    const clickInside = sidebar.contains(event.target) || openButton.contains(event.target);

    if (!clickInside)
    {
        closeSidebar();
    }
})


/* SHOW DESCRIPTION */
const howToPlayButton = document.querySelector('.sidebar-how-to-play-button');
const newGameButton = document.querySelector('.sidebar-new-game-button');
const aboutButton = document.querySelector('.sidebar-about-button');


howToPlayButton.addEventListener('click', (event) => {toggleDescription(event.target)});
newGameButton.addEventListener('click', (event) => {toggleDescription(event.target)});
aboutButton.addEventListener('click', (event) => {toggleDescription(event.target)});

function getDescription(button)
{
    const description = document.createElement('div');
    description.classList.add('sidebar-item-description');

    if (button === 'howToPlay')
    {
        const text = document.createElement('p');

        text.textContent = `De 2 a 5 times.
        Cada time com 2 a 3 pessoas.
        
        Principais regras:
        Round 1 = livre
        Round 2 = 1 palavra
        Round 3 = mímica`;

        description.appendChild(text);
    }
    else if (button === 'newGame')
    {
        const text = document.createElement('p');

        text.textContent = `De 2 a 5 times.
        Cada time com 2 a 3 pessoas.
        
        Principais regras:
        Round 1 = livre
        Round 2 = 1 palavra
        Round 3 = mímica`  

        description.appendChild(text);
    }
    else if (button === 'about')
    {
        const text = document.createElement('p');

        text.textContent = `De 2 a 5 times.
        Cada time com 2 a 3 pessoas.
        
        Principais regras:
        Round 1 = livre
        Round 2 = 1 palavra
        Round 3 = mímica`

        description.appendChild(text);
    }

    return description;
}

function toggleDescription(target)
{
    let parameter = '';

    if (target.classList.contains('sidebar-how-to-play-button'))
    {
        parameter = 'howToPlay';
    }
    else if (target.classList.contains('sidebar-new-game-button'))
    {
        parameter = 'newGame';
    }
    else if (target.classList.contains('sidebar-about-button'))
    {
        parameter = 'about';
    }

    console.log(parameter);


    let targetDescription = target.querySelector('.sidebar-item-description');

    if (targetDescription)
    {
        console.log('on');
        targetDescription.remove();
    }
    else
    {
        console.log('off');
        target.appendChild(getDescription(parameter));
    }
}