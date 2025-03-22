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

const Container = ParticleContainer;
function Update() {
    window.Display.Particle.Count = Container.children.length;
    Array.from(Container.children).forEach(Particle => {
        const Properties = JSON.parse(Particle.getAttribute("Properties"));

        const Position = [
            parseFloat(Particle.style.left || 0),
            parseFloat(Particle.style.top || 0)
        ];

        const Mass = Properties.Density;

        let ParticleTemperature = parseFloat(Particle.getAttribute("Temperature"));
        const SpecificHeat = Properties.SpecificHeat;

        const ParticleHeatEnergy = Mass * SpecificHeat * (ParticleTemperature - AmbientTemperature);
        const ParticleEnergy = ParticleTemperature;

        Array.from(Container.children).forEach(OtherParticle => {
            if (OtherParticle === Particle) return;

            const ParticleLeft = Position[0];
            const ParticleTop = Position[1];
            const ParticleRight = ParticleLeft + GridSize;
            const ParticleBottom = ParticleTop + GridSize;

            const OtherParticleLeft = parseFloat(OtherParticle.style.left);
            const OtherParticleTop = parseFloat(OtherParticle.style.top);
            const OtherParticleRight = OtherParticleLeft + GridSize;
            const OtherParticleBottom = OtherParticleTop + GridSize;

            if ((ParticleRight < OtherParticleLeft ||
                ParticleLeft > OtherParticleRight ||
                ParticleBottom < OtherParticleTop ||
                ParticleTop > OtherParticleBottom)) return;
            const NewPositionX = ParticleLeft + GridSize;
            const NewPositionY = ParticleTop + GridSize;
            if (!IsPlaceOccupied(NewPositionX, NewPositionY)) return;

            const OtherTemperature = parseFloat(OtherParticle.getAttribute("Temp"));

            const AverageTemperature = (ParticleTemperature + OtherTemperature) / 2;
            Particle.setAttribute("Temperature", AverageTemperature);
            OtherParticle.setAttribute("Temperature", AverageTemperature);

            ProceedReaction(Particle, OtherParticle);
        });

        if (Properties.Type.includes("Powder")) {
            const NewPosY = Position[1] + GridSize;
            Position[1] = NewPosY;

            const CanDrop = (NewPosY + GridSize) <= window.innerHeight && !IsPlaceOccupied(Position[0], NewPosY);
            if (CanDrop) Particle.style.top = `${SnapToNumber(NewPosY, GridSize)}px`;
        }

        if (Properties.Type.includes("Powder")) {
            const NewPosY = Position[1] + GridSize;
            Position[1] = NewPosY;

            const CanDrop = (NewPosY + GridSize) <= window.innerHeight && !IsPlaceOccupied(Position[0], NewPosY);
            if (CanDrop) Particle.style.top = `${SnapToNumber(NewPosY, GridSize)}px`;
        } else if (Properties.Type.includes("Liquid")) {
            const NewPosY = Position[1] + GridSize;

            const CanDrop = (NewPosY + GridSize <= Container.clientHeight) &&
                !IsPlaceOccupied(Position[0], NewPosY + GridSize);

            if (CanDrop) {
                Particle.style.top = `${SnapToNumber(NewPosY, GridSize)}px`;
            } else {
                const LeftPosX = Position[0] - GridSize;
                const RightPosX = Position[0] + GridSize;
                const CanMoveLeft = !IsPlaceOccupied(LeftPosX, Position[1]);
                const CanMoveRight = !IsPlaceOccupied(RightPosX, Position[1]);

                if (CanMoveLeft && CanMoveRight) {
                    const RandomDirection = Math.random() < 0.5 ? LeftPosX : RightPosX;
                    Particle.style.left = `${Clamp(SnapToNumber(Math.min(RandomDirection, Container.clientWidth), GridSize), 0, Container.clientWidth)}px`;
                } else if (CanMoveLeft) {
                    Particle.style.left = `${Clamp(SnapToNumber(Math.min(LeftPosX, Container.clientWidth), GridSize), 0, Container.clientWidth)}px`;
                } else if (CanMoveRight) {
                    Particle.style.left = `${Clamp(SnapToNumber(Math.min(RightPosX, Container.clientWidth), GridSize), 0, Container.clientWidth)}px`;
                }
            }
        } else if (Properties.Type.includes("Gas")) {
            const NewPosY = Position[1] - GridSize;
            const CanLevitate = (NewPosY - GridSize) <= window.innerHeight && !IsPlaceOccupied(Position[0], NewPosY);
            if (CanLevitate) {
                Particle.style.top = `${SnapToNumber(NewPosY, GridSize)}px`;
            }
        }

        if (Position[1] >= (Container.clientHeight + (GridSize - (GridSize / 2))) - GridSize) Position[1] = (Container.clientHeight + (GridSize - (GridSize / 2))) - (GridSize + GridSize / 2);

        Particle.setAttribute("Energy", ParticleEnergy);
        Particle.setAttribute("Temperature", ParticleTemperature);
    });

    requestAnimationFrame(Update);
}

document.addEventListener("DOMContentLoaded", Update);