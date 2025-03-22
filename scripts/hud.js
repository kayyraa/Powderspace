ParticleContainer.style.height = `${SnapToNumber(window.innerHeight, window.GridSize)}px`;
ParticleContainer.style.top = `calc(100% - ${SnapToNumber(window.innerHeight, window.GridSize)}px)`;

let Order = "[A-Z]";
Materials.forEach(Material => {
    const Node = document.createElement("div");
    Node.innerHTML = `<div>${Material.Name}</div>`;
    Selector.appendChild(Node);

    const Tooltip = document.createElement("div");
    Tooltip.innerHTML = `
        <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        "><header style="font-size: 24px">${Material.Name}</header><span style="font-size: 24px">${Material.Symbol.replaceAll("[", "<sup>").replaceAll("]", "</sup>").replaceAll("(", "<sub>").replaceAll(")", "</sub>")}</span></div>
        <hr style="border-color: rgb(${Material.Color[0]}, ${Material.Color[1]}, ${Material.Color[2]}${Material.Color[3] ? `, ${Material.Color[3]}` : ""})">
        <div style="
            display: flex;
            flex-direction: column;
        ">
            <div style="display: flex; flex-direction: row; justify-content: space-between; gap: 4px;">
                <span>Potential of Hydrogen:</span>
                <span>${Material.PotentialHydrogen.toFixed(1)}</span>
            </div>
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
                        <span style="display: flex; flex-direction: row; justify-content: space-between; flex-wrap: wrap; align-items: center;">${Material.Reaction.Equation.split(" ").map(Part => `<span>${Part.replaceAll("[", "<sup>").replaceAll("]", "</sup>").replaceAll("(", "<sub>").replaceAll(")", "</sub>")}</span>`).join("")}</span>
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

        width: calc(20em - 10px);
        height: fit-content;

        margin: 4px;
        padding: 12px;

        opacity: 0;

        box-sizing: border-box;
        border: 1px solid rgb(${Material.Color[0]}, ${Material.Color[1]}, ${Material.Color[2]});

        background-color: rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(2px);

        z-index: 4;

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
    const Index = Characters.indexOf(Material.Name[0].toUpperCase());
    Node.style.order = (Order === "[A-Z]") ? Index : Characters.length - Index;

    Node.addEventListener("click", () => {
        window.Selection = Material;
        Array.from(Selector.children).forEach(Node => Node.removeAttribute("active"));
        Node.setAttribute("active", "");
    });
});

NewMaterialButton.addEventListener("click", () => {
    const MaterialHeaderContainer = document.createElement("div");
    MaterialHeaderContainer.innerHTML = `
        <span>Header</span>
        <input style="width: calc(100% - 1em - 4px);" placeholder="Material Name">
        <input style="width: calc(100% - 1em - 4px);" placeholder="Material Symbol: H(2)O => H₂O, H[2]O => H²O">
    `;
    MaterialHeaderContainer.style = `
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 100%;
    `;

    const MaterialPhysicalContainer = document.createElement("div");
    MaterialPhysicalContainer.innerHTML = `
        <span>Physical</span>
        <input style="width: calc(100% - 1em - 4px);" placeholder="Material Potential of Hydrogen">
        <input style="width: calc(100% - 1em - 4px);" placeholder="Material Specific Heat">
        <input style="width: calc(100% - 1em - 4px);" placeholder="Material Density">
        <hr>
        <input style="width: calc(100% - 1em - 4px);" placeholder="Material Frozen State">
        <input style="width: calc(100% - 1em - 4px);" placeholder="Material Molten State">
        <input style="width: calc(100% - 1em - 4px);" placeholder="Material Evaporated State">
        <hr>
        <input type="number" step="any" style="width: calc(100% - 1em - 4px);" placeholder="Material Freezing Point">
        <input type="number" step="any" style="width: calc(100% - 1em - 4px);" placeholder="Material Melting Point">
        <input type="number" step="any" style="width: calc(100% - 1em - 4px);" placeholder="Material Evaporation Point">
        <hr>
        <input type="string" style="width: calc(100% - 1em - 4px);" placeholder="Material Reaction Type">
        <input type="string" style="width: calc(100% - 1em - 4px);" placeholder="Material Reaction Products">
        <input type="string" style="width: calc(100% - 1em - 4px);" placeholder="Material Reaction Equation">
        <input type="number" step="any" style="width: calc(100% - 1em - 4px);" placeholder="Material Reaction Energy">
        <hr>
        <div style="width: calc(100% - 1em - 4px); padding: 4px 8px 4px 8px;" button>Create New Material</div>
    `;
    MaterialPhysicalContainer.style = `
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 100%;
    `;
    
    new Prompt({
        Title: "New Material",
        Nodes: [MaterialHeaderContainer, MaterialPhysicalContainer]
    }, [".Content", {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        position: "absolute",
        left: "0",
        top: "2em",
        width: "100%",
        height: "calc(100% - 2em - 1em)",

        overflowX: "hidden",
        overflowY: "auto",
    }]).Append();
});

OrderSelector.addEventListener("click", () => {
    Order = (Order === "[A-Z]") ? "[Z-A]" : "[A-Z]";

    OrderSelector.querySelector("div").innerHTML = Order;
    Array.from(Selector.children).forEach(Node => {
        if (Node === OrderSelector) return;
        if (!Node.hasAttribute("Properties")) return;
        const Index = String.Characters.indexOf(JSON.parse(Node.getAttribute("Properties")).Name[0].toUpperCase());
        Node.style.order = (Order === "[A-Z]") ? Index : String.Characters.length - Index;
    });
});

function GetNestedValue(Path, Obj) {
    return Path.split(".").reduce((Acc, Key) => Acc && Acc[Key], Obj);
}

let LastTime = performance.now();
let Frame = 0;

function Update() {
    Frame++;

    document.querySelectorAll("[display]").forEach(Node => {
        Node.textContent = `${Node.getAttribute("prefix") || ""}${GetNestedValue(Node.getAttribute("display"), window.Display)}${Node.getAttribute("suffix") || ""}`;
    });

    document.querySelectorAll("[control]").forEach(Node => {
        Node.addEventListener(Node.getAttribute("control").split(":")[0], () => GetNestedValue(Node.getAttribute("control").split(":")[1], window.Control)());
    });

    document.querySelectorAll("[Change]").forEach(Node => {
        const Changes = Node.getAttribute("Change").split(";");
        const Original = Node.getAttribute("Original");
        Changes.forEach(Change => {
            const ChangeAttribute = Change.split(":");
            Node.addEventListener(ChangeAttribute[0], () => {
                Node[ChangeAttribute[1]] = ChangeAttribute.slice(2).join(":").replace("{self}", Original);
            });
        });
    });

    const Now = performance.now();
    const DeltaTime = Now - LastTime;
    window.Display.Performance.Fps = Math.round((Frame / DeltaTime) * 1000);
    window.Display.Performance.Performance = Math.floor((window.Display.Performance.Fps / 60) * 100);
    Frame = 0;
    LastTime = Now;

    requestAnimationFrame(Update);
}

document.addEventListener("DOMContentLoaded", Update);