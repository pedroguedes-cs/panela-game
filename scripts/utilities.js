export function createSVG(viewBox, pathData)
{
    const svgNamespace = 'http://www.w3.org/2000/svg';

    const svg = document.createElementNS(svgNamespace, 'svg');

    svg.setAttribute('xmlns', svgNamespace);
    svg.setAttribute('viewBox', viewBox);

    const path = document.createElementNS(svgNamespace, 'path');
    path.setAttribute("d", pathData);

    svg.appendChild(path);

    return svg;
}