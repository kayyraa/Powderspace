import * as Api from "./api.js";
import * as Readonly from "./readonly.js";

let Order = "[A-Z]";
Readonly.Materials.forEach(Material => {
    const Node = document.createElement("div");
    Node.innerHTML = `<div>${Material.Name}</div>`;
    Api.Selector.appendChild(Node);

    const Tooltip = document.createElement("div");
    Tooltip.innerHTML = `
        <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        "><header style="font-size: 24px">${Material.Name}</header><span style="font-size: 24px">${Material.Symbol.replaceAll("[", "<sup>").replaceAll("]", "</sup>")}</span></div>
        <hr style="border-color: rgb(${Material.Color[0]}, ${Material.Color[1]}, ${Material.Color[2]})">
        <div style="
            display: flex;
            flex-direction: column;
        ">
            <div style="display: flex; flex-direction: row; justify-content: space-between; gap: 4px;">
                <span>Specific heat:</span>
                <span>${Material.SpecificHeat.toFixed(3)} J/g</span>
            </div>
            <div style="display: flex; flex-direction: row; justify-content: space-between; gap: 4px;">
                <span>Density:</span>
                <span>${Material.Density.toFixed(3)} g/cm3</span>
            </div>
            <hr style="width: 100%; border-color: rgb(${Material.Color[0]}, ${Material.Color[1]}, ${Material.Color[2]})">
            <div style="display: flex; flex-direction: row; justify-content: space-between; gap: 4px;">
                <span>Frozen state:</span>
                <span>${Material.FrozenState}</span>
            </div>
            <div style="display: flex; flex-direction: row; justify-content: space-between; gap: 4px;">
                <span>Molten state:</span>
                <span>${Material.MoltenState}</span>
            </div>
            <div style="display: flex; flex-direction: row; justify-content: space-between; gap: 4px;">
                <span>Evaporated state:</span>
                <span>${Material.EvaporatedState}</span>
            </div>
            <hr style="width: 100%; border-color: rgb(${Material.Color[0]}, ${Material.Color[1]}, ${Material.Color[2]})">
            <div style="display: flex; flex-direction: row; justify-content: space-between; gap: 4px;">
                <span>Freezing point:</span>
                <span>${Material.FreezingPoint.toFixed(1)}⁰C</span>
            </div>
            <div style="display: flex; flex-direction: row; justify-content: space-between; gap: 4px;">
                <span>Melting point:</span>
                <span>${Material.MeltingPoint.toFixed(1)}⁰C</span>
            </div>
            <div style="display: flex; flex-direction: row; justify-content: space-between; gap: 4px;">
                <span>Evaporation point:</span>
                <span>${Material.EvaporationPoint.toFixed(1)}⁰C</span>
            </div>
            <hr style="width: 100%; border-color: rgb(${Material.Color[0]}, ${Material.Color[1]}, ${Material.Color[2]})">
            <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 4px;">
                <div style="display: flex; flex-direction: row; justify-content: space-between; gap: 4px;">
                    <span>Reactive:</span>
                    <span>${Material.Reaction ? "YES" : "NO"}</span>
                </div>    
                ${Material.Reaction ?
                    `   
                        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;"><span>Reaction type:</span><span>${Material.Reaction.Type}</span></div>
                        <span style="display: flex; flex-direction: row; justify-content: space-between; flex-wrap: wrap; align-items: center;">${Material.Reaction.Equation.split(" ").map(Part => `<span>${Part.replaceAll("[", "<sup>").replaceAll("]", "</sup>")}</span>`).join("")}</span>
                        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;"><span>Energy:</span><span>${Material.Reaction.Energy} Joules</span></div>
                    `
                    : ""
                }
            </div>
        </div>
    `;
    Tooltip.style = `
        position: absolute;
        left: 0;
        top: 0;

        width: 18em;
        height: fit-content;

        margin: 4px;
        padding: 8px;

        opacity: 0;

        box-sizing: border-box;
        border: 1px solid rgb(${Material.Color[0]}, ${Material.Color[1]}, ${Material.Color[2]});

        pointer-events: none;

        transition: opacity 0.25s ease;
    `;
    document.body.appendChild(Tooltip);

    ["mouseenter", "touchstart"].forEach(Event => {
        Node.addEventListener(Event, () => {
            Tooltip.style.opacity = "1";
            Tooltip.style.pointerEvents = "auto";
        });
    });
    ["mouseleave", "touchend", "touchcancel"].forEach(Event => {
        Node.addEventListener(Event, () => {
            Tooltip.style.opacity = "0";
            Tooltip.style.pointerEvents = "none";
        });
    });

    Node.setAttribute("Properties", JSON.stringify(Material));
    const Index = String.Characters.indexOf(Material.Name[0].toUpperCase());
    Node.style.order = (Order === "[A-Z]") ? Index : String.Characters.length - Index;

    Node.addEventListener("click", () => {
        window.Selection = Material;
        Array.from(Api.Selector.children).forEach(Node => Node.removeAttribute("active"));
        Node.setAttribute("active", "");
    });
});

Api.OrderSelector.addEventListener("click", () => {
    Order = (Order === "[A-Z]") ? "[Z-A]" : "[A-Z]";

    Api.OrderSelector.querySelector("div").innerHTML = Order;
    Array.from(Api.Selector.children).forEach(Node => {
        if (Node === Api.OrderSelector) return;
        const Index = String.Characters.indexOf(JSON.parse(Node.getAttribute("Properties")).Name[0].toUpperCase());
        Node.style.order = (Order === "[A-Z]") ? Index : String.Characters.length - Index;
    });
});