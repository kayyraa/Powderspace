import * as Api from "./api.js";

const Offset = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [0.5, -1],
    [-0.5, 1],
    [1, 0.5],
    [1, -0.5],
    [-1, 0.5],
    [-1, -0.5]
];

const Container = Api.ParticleContainer;
function Update() {
    window.Display.Particle.Count = Container.children.length;
    Array.from(Container.children).forEach(Particle => {
        const Properties = JSON.parse(Particle.getAttribute("Properties"));

        const Position = [
            parseFloat(Particle.style.left || 0),
            parseFloat(Particle.style.top || 0)
        ];

        const Mass = Properties.Density;

        let ParticleTemp = parseFloat(Particle.getAttribute("Temp"));
        const AmbientTemp = window.AmbientTemperature;
        const SpecificHeat = Properties.SpecificHeat;

        const ParticleHeat = Mass * SpecificHeat * (ParticleTemp - AmbientTemp);
        const ParticleEnergy = ParticleHeat;

        Particle.setAttribute("Energy", ParticleEnergy);
        Particle.setAttribute("Temp", ParticleTemp);

        Array.from(Container.children).forEach(OtherParticle => {
            if (OtherParticle === Particle) return;

            const ParticleLeft = Position[0];
            const ParticleTop = Position[1];
            const ParticleRight = ParticleLeft + window.GridSize;
            const ParticleBottom = ParticleTop + window.GridSize;

            const OtherParticleLeft = parseFloat(OtherParticle.style.left);
            const OtherParticleTop = parseFloat(OtherParticle.style.top);
            const OtherParticleRight = OtherParticleLeft + window.GridSize;
            const OtherParticleBottom = OtherParticleTop + window.GridSize;

            if ((ParticleRight < OtherParticleLeft ||
                ParticleLeft > OtherParticleRight ||
                ParticleBottom < OtherParticleTop ||
                ParticleTop > OtherParticleBottom)) return;
            const NewPositionX = ParticleLeft + window.GridSize;
            const NewPositionY = ParticleTop + window.GridSize;
            if (!IsPlaceOccupied(NewPositionX, NewPositionY)) return;

            const OtherTemp = parseFloat(OtherParticle.getAttribute("Temp"));

            const AverageTemp = (ParticleTemp + OtherTemp) / 2;
            Particle.setAttribute("Temp", AverageTemp);
            OtherParticle.setAttribute("Temp", AverageTemp);
        });

        Offset.forEach(Item => {
            if (!IsPlaceOccupied(Item[0], Item)) return;
            const Neighbor = document.elementFromPoint(
                Math.floor((Position[0] + (Item[0] * window.GridSize)) * window.GridSize) / window.GridSize,
                Math.floor((Position[1] + (Item[1] * window.GridSize)) * window.GridSize) / window.GridSize
            );
            if (!Neighbor) return;
            if (!Neighbor.classList.contains("Particle")) return;
            if (ParticleTemp === ParticleTemp) return;

            const NeighborTemp = parseFloat(Neighbor.getAttribute("Temp"));

            const AverageTemp = (ParticleTemp + NeighborTemp) / 2;
            Particle.setAttribute("Temp", AverageTemp);
            Neighbor.setAttribute("Temp", AverageTemp);
        });

        if (Properties.Type.includes("Powder")) {
            const NewPosY = Position[1] + window.GridSize;
            Position[1] = NewPosY;

            const CanDrop = (NewPosY + window.GridSize) <= window.innerHeight && !IsPlaceOccupied(Position[0], NewPosY);
            if (CanDrop) Particle.style.top = `${SnapToNumber(NewPosY, window.GridSize)}px`;
        }

        if (Properties.Type.includes("Powder")) {
            const NewPosY = Position[1] + window.GridSize;
            Position[1] = NewPosY;

            const CanDrop = (NewPosY + window.GridSize) <= window.innerHeight && !IsPlaceOccupied(Position[0], NewPosY);
            if (CanDrop) Particle.style.top = `${SnapToNumber(NewPosY, window.GridSize)}px`;
        } else if (Properties.Type.includes("Liquid")) {
            const NewPosY = Position[1] + window.GridSize;

            const CanDrop = (NewPosY + window.GridSize <= Container.clientHeight) &&
                !IsPlaceOccupied(Position[0], NewPosY + window.GridSize);

            if (CanDrop) {
                Particle.style.top = `${SnapToNumber(NewPosY, window.GridSize)}px`;
            } else {
                const LeftPosX = Position[0] - window.GridSize;
                const RightPosX = Position[0] + window.GridSize;
                const CanMoveLeft = !IsPlaceOccupied(LeftPosX, Position[1]);
                const CanMoveRight = !IsPlaceOccupied(RightPosX, Position[1]);

                if (CanMoveLeft && CanMoveRight) {
                    const RandomDirection = Math.random() < 0.5 ? LeftPosX : RightPosX;
                    Particle.style.left = `${Clamp(SnapToNumber(Math.min(RandomDirection, Container.clientWidth), window.GridSize), 0, Container.clientWidth)}px`;
                } else if (CanMoveLeft) {
                    Particle.style.left = `${Clamp(SnapToNumber(Math.min(LeftPosX, Container.clientWidth), window.GridSize), 0, Container.clientWidth)}px`;
                } else if (CanMoveRight) {
                    Particle.style.left = `${Clamp(SnapToNumber(Math.min(RightPosX, Container.clientWidth), window.GridSize), 0, Container.clientWidth)}px`;
                }
            }
        } else if (Properties.Type.includes("Gas")) {
            const NewPosY = Position[1] - window.GridSize;
            const CanLevitate = (NewPosY - window.GridSize) <= window.innerHeight && !IsPlaceOccupied(Position[0], NewPosY);
            if (CanLevitate) {
                Particle.style.top = `${SnapToNumber(NewPosY, window.GridSize)}px`;
            }
        }

        if (Position[1] >= (Container.clientHeight + (window.GridSize - (window.GridSize / 2))) - window.GridSize) Position[1] = (Container.clientHeight + (window.GridSize - (window.GridSize / 2))) - (window.GridSize + window.GridSize / 2);
    });

    requestAnimationFrame(Update);
}

document.addEventListener("DOMContentLoaded", Update);