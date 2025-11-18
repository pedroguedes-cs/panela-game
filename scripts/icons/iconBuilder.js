import { ICONS } from "./Icons.js";


export function icon(iconFromIconsBank, iconClassList = [])
{
    if (!iconFromIconsBank)
    {
        console.warn(`Cant create a icon from null`);
        return null;
    }

    const svgNamespace = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNamespace, 'svg');

    svg.setAttribute('xmlns', svgNamespace);
    svg.setAttribute('viewBox', iconFromIconsBank.viewBox);
    const path = document.createElementNS(svgNamespace, 'path');
    path.setAttribute("d", iconFromIconsBank.path);
    svg.appendChild(path);

    iconClassList.forEach((iconClass) => {svg.classList.add(iconClass)})

    return svg;
}

