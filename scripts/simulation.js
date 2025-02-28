import * as Api from "./api.js";

const Offset = [
    [ 1,    0 ],
    [-1,    0 ],
    [ 0,    1 ],
    [ 0,   -1 ],
    [ 0.5, -1 ],
    [-0.5,  1 ],
    [ 1,   0.5],
    [ 1,  -0.5],
    [-1,   0.5],
    [-1,  -0.5]
];

const Container = Api.ParticleContainer;
function Update() {
    Array.from(Container.children).forEach(Particle => {
        const Properties = JSON.parse(Particle.getAttribute("Properties"));
        const ParticleDensity = Properties.Density;
        const ParticleRadius = Properties.Radius || 1;

        const Position = [
            parseFloat(Particle.style.left || 0),
            parseFloat(Particle.style.top || 0)
        ];

        const Volume = Math.pow(window.GridSize, 2);
        const Mass = ParticleDensity * Volume;

        const ParticleHeat = Mass * Properties.SpecificHeat;
        const ParticlePotentialEnergy = Mass * window.Gravity * Position[1];
        const ParticleEnergy = ParticleHeat + ParticlePotentialEnergy;

        const ParticleTemp = parseFloat(Particle.getAttribute("Temp"));

        Array.from(Container.children).forEach(OtherParticle => {
            if (OtherParticle !== Particle) {
                const ParticleLeft = parseFloat(Particle.style.left);
                const ParticleTop = parseFloat(Particle.style.top);
                const ParticleRight = ParticleLeft + Particle.offsetWidth;
                const ParticleBottom = ParticleTop + Particle.offsetHeight;
        
                const OtherParticleLeft = parseFloat(OtherParticle.style.left);
                const OtherParticleTop = parseFloat(OtherParticle.style.top);
                const OtherParticleRight = OtherParticleLeft + OtherParticle.offsetWidth;
                const OtherParticleBottom = OtherParticleTop + OtherParticle.offsetHeight;
        
                if (!(ParticleRight < OtherParticleLeft || 
                      ParticleLeft > OtherParticleRight || 
                      ParticleBottom < OtherParticleTop || 
                      ParticleTop > OtherParticleBottom)) {
        
                    const NewPositionX = ParticleLeft + window.GridSize;
                    const NewPositionY = ParticleTop + window.GridSize;
        
                    if (IsPlaceOccupied(NewPositionX, NewPositionY)) {
                        const OtherTemp = parseFloat(OtherParticle.getAttribute("Temp"));

                        const AverageTemp = (ParticleTemp + OtherTemp) / 2;
                        Particle.setAttribute("Temp", AverageTemp);
                        OtherParticle.setAttribute("Temp", AverageTemp);
                    }
                }
            }
        });

        Offset.forEach(Item => {
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

            if ((NewPosY + window.GridSize) <= window.innerHeight && !IsPlaceOccupied(Position[0], NewPosY)) {
                Particle.style.top = `${SnapToNumber(NewPosY, window.GridSize)}px`;
            }
        }

        if (Properties.Type.includes("Powder")) {
            const NewPosY = Position[1] + window.GridSize;
            Position[1] = NewPosY;

            if ((NewPosY + window.GridSize) <= window.innerHeight - window.GridSize && !IsPlaceOccupied(Position[0], NewPosY)) {
                Particle.style.top = `${SnapToNumber(NewPosY, window.GridSize)}px`;
            }
        } else if (Properties.Type.includes("Liquid")) {
            const NewPosY = Position[1] + window.GridSize;
            if (NewPosY + Particle.offsetHeight <= Container.clientHeight && !IsPlaceOccupied(Position[0], NewPosY) && Position[1] < 688) {
                Particle.style.top = `${NewPosY}px`;
            } else {
                const LeftPosX = Position[0] - window.GridSize;
                const RightPosX = Position[0] + window.GridSize;

                const CanMoveLeft = !IsPlaceOccupied(LeftPosX, Position[1]);
                const CanMoveRight = !IsPlaceOccupied(RightPosX, Position[1]);

                if (CanMoveLeft) Particle.style.left = `${SnapToNumber(LeftPosX, window.GridSize)}px`;
                else if (CanMoveRight) Particle.style.left = `${SnapToNumber(RightPosX, window.GridSize)}px`;
            }
        } else if (Properties.Type.includes("Gas")) {
            const NewPosY = Position[1] - window.GridSize;
            if (NewPosY + Particle.offsetHeight <= Api.ParticleContainer.clientHeight && !IsPlaceOccupied(Position[0], NewPosY)) {
                Particle.style.top = `${SnapToNumber(NewPosY, window.GridSize)}px`;
            }
        }

        if (Position[1] >= (Container.clientHeight + (window.GridSize - (window.GridSize / 2))) - window.GridSize) Position[1] = (Container.clientHeight + (window.GridSize - (window.GridSize / 2))) - (window.GridSize + window.GridSize / 2);
    });

    requestAnimationFrame(Update);
}

document.addEventListener("DOMContentLoaded", Update);