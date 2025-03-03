window.Selection = null;
window.GridSize = 16;

window.Display = {
    Particle: { Count: 0 },
    Performance: { Fps: 0, Performance: 0 }
};

window.Control = {
    Particle: { 
        Clear: () => {
            document.querySelector(".ParticleContainer").innerHTML = "";
        }
    },
};

window.AmbientTemperature = 22;

export const Selector = document.querySelector(".Selector");
export const ParticleContainer = document.querySelector(".ParticleContainer");

export const OrderSelector = document.querySelector(".OrderSelector");
export const NewMaterialButton = document.querySelector(".NewMaterialButton");

ParticleContainer.style.height = `${SnapToNumber(window.innerHeight, window.GridSize)}px`;
ParticleContainer.style.top = `calc(100% - ${SnapToNumber(window.innerHeight, window.GridSize)}px)`;

export class Particle {
    constructor(Properties, Position = [0, 0], Velocity = [0, 0]) {
        this.Properties = Properties;
        this.Position = Position;
        this.Velocity = Velocity;
    }

    Append() {
        const DefaultProperties = {
            Temp: this.Properties.Temp || 22,
            Energy: 0
        };

        const ParticleElement = document.createElement("div");
        ParticleElement.style.backgroundColor = `
        rgb(
            ${this.Properties.Color[0] + Random(25, -25)},
            ${this.Properties.Color[1] + Random(25, -25)},
            ${this.Properties.Color[2] + Random(25, -25)}
        )`;
        ParticleElement.style.left = `${SnapToNumber(this.Position[0], window.GridSize)}px`;
        ParticleElement.style.top = `${SnapToNumber(this.Position[1], window.GridSize) - window.GridSize / 2}px`;
        ParticleElement.style.width = `${window.GridSize}px`;
        ParticleElement.style.height = `${window.GridSize}px`;
        ParticleElement.classList.add("Particle");
        ParticleElement.setAttribute("Properties", JSON.stringify(this.Properties));
        ParticleElement.setAttribute("Symbol", this.Properties.Symbol);
        Object.keys(DefaultProperties).forEach(Key => ParticleElement.setAttribute(Key, DefaultProperties[Key]));
        ParticleContainer.appendChild(ParticleElement);
    }
}

String.Characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";