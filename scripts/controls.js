import * as Api from "./api.js";

let Mouse = {};
["mousedown", "touchstart"].forEach(Event => {
    Api.ParticleContainer.addEventListener(Event, (Event) => {
        if (Event.type === "touchstart") {
            Mouse.clientX = Event.touches[0].clientX;
            Mouse.clientY = Event.touches[0].clientY;
        } else {
            Mouse.clientX = Event.clientX;
            Mouse.clientY = Event.clientY;
        }
        Mouse.Holding = true;
    });
});

["mouseup", "touchend"].forEach(Event => document.addEventListener(Event, () => Mouse.Holding = false));
["mousemove", "touchmove"].forEach(Event => document.addEventListener(Event, (Event) => {
    if (Event.type === "touchmove") {
        Mouse.clientX = Event.touches[0].clientX;
        Mouse.clientY = Event.touches[0].clientY;
    } else {
        Mouse.clientX = Event.clientX;
        Mouse.clientY = Event.clientY;
    }
}));

function Update() {
    if (Mouse.Holding) {
        if (!window.Selection) return;
        const Position = [Mouse.clientX, Mouse.clientY];
        if (!IsPlaceOccupied(Position[0], Position[1])) new Api.Particle(window.Selection, Position, [0, 0]).Append();
    }

    requestAnimationFrame(Update);
}

Update();