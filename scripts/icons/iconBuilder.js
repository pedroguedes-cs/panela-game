import { icons } from "./icons.js";

function getIconByName(iconName)
{
    const icon = icons[iconName];

    if (!icon)
    {
        console.warn(`'${iconName}' icon not found`);
        return null;
    }

    return icon;

}

function createSVG(icon, iconClassList = [])
{
    if (!icon)
    {
        console.warn(`Cant create a icon from null`);
        return null;
    }

    const svgNamespace = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNamespace, 'svg');

    svg.setAttribute('xmlns', svgNamespace);
    svg.setAttribute('viewBox', icon.viewBox);
    const path = document.createElementNS(svgNamespace, 'path');
    path.setAttribute("d", icon.path);
    svg.appendChild(path);

    iconClassList.forEach((iconClass) => {svg.classList.add(iconClass)})

    return svg;
}

export function icon(iconName, iconClassList = [])
{
    return createSVG(getIconByName(iconName), iconClassList);
}

