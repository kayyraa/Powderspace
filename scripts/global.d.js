globalThis.Selection = null;
globalThis.GridSize = 16;

globalThis.Display = {
    Particle: { Count: 0 },
    Performance: { Fps: 0, Performance: 0 }
};

globalThis.Control = {
    Particle: { 
        Clear: () => {
            document.querySelector(".ParticleContainer").innerHTML = "";
        }
    },
};

globalThis.AmbientTemperature = 22;

globalThis.Selector = document.querySelector(".Selector");
globalThis.ParticleContainer = document.querySelector(".ParticleContainer");

globalThis.OrderSelector = document.querySelector(".OrderSelector");
globalThis.NewMaterialButton = document.querySelector(".NewMaterialButton");

globalThis.Characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

globalThis.SnapToNumber = (Number, Snap) => Math.floor(Number / Snap) * Snap;

globalThis.Random = (Max, Min) => Math.random() * Math.floor(Math.random() * (Max - Min + 1) + Min);

globalThis.IsPlaceOccupied = (X = 0, Y = 0) => {
    const GridSize = window.GridSize;

    X = SnapToNumber(X, GridSize);
    Y = SnapToNumber(Y, GridSize);

    return Array.from(document.querySelector(".ParticleContainer").children).some(Particle => {
        const ParticleX = Math.round(parseInt(Particle.style.left) / GridSize) * GridSize;
        const ParticleY = Math.round(parseInt(Particle.style.top) / GridSize) * GridSize;
        return ParticleX === X && ParticleY === Y;
    });
}

globalThis.Clamp = (Number, Min, Max) => Math.min(Math.max(Number, Min), Max);

globalThis.Particle = class {
    constructor(Properties, Position = [0, 0], Velocity = [0, 0]) {
        this.Properties = Properties;
        this.Position = Position;
        this.Velocity = Velocity;
    }

    Append() {
        const DefaultProperties = {
            Temperature: this.Properties.Temperature || 22,
            Energy: 0
        };

        const ParticleElement = document.createElement("div");
        ParticleElement.style.backgroundColor = `
        rgb(
            ${this.Properties.Color[0] + Random(25, -25)},
            ${this.Properties.Color[1] + Random(25, -25)},
            ${this.Properties.Color[2] + Random(25, -25)}
            ${this.Properties.Color[3] ? `, ${this.Properties.Color[3]}` : ""}
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

globalThis.Prompt = class {
    /**
    * ⚠️ **Warning:** This class dynamically creates and manipulates DOM elements.  
    * Ensure proper cleanup to avoid memory leaks.
    * 
    * 🏗️ Class: `Prompt`
    * A draggable, customizable prompt window that can contain multiple nodes.
    * 
    * 🏷️ Constructor:
    * @param {{ Title: string, Nodes: HTMLElement[] }} [Prompt={ Title: "", Nodes: [] }]  
    * The prompt configuration, including a title and an array of nodes to display.
    * 
    * @param {[string, Object<string, string>]} [Style=["", {}]]  
    * The styling configuration. If `Style[0]` is `"self"`, styles apply to the prompt itself;  
    * otherwise, `Style[0]` is used as a selector for styling a specific child element.
    * 
    * 📜 Properties:
    * - **Title** (`string`) - The title of the prompt.
    * - **Nodes** (`HTMLElement[]`) - The elements inside the prompt.
    * - **Style** (`[string, Object<string, string>]`) - The style configuration.
    * - **Prompt** (`HTMLElement | null`) - The created prompt element.
    * 
    * 🛠️ Methods:
    * 
    * 🔹 `Append(): HTMLElement`
    * Creates and appends the prompt to the document body.
    * - Adds a draggable top bar.
    * - Applies styles based on the `Style` property.
    * - Appends `Nodes` inside the `.Content` container.
    * - Returns the created prompt element.
    * 
    * 🔹 `Remove(): void`
    * Removes the prompt from the document if it exists.
    */
    constructor(Prompt = { Title: "", Nodes: [] }, Style = ["", {}]) {
        this.Title = Prompt.Title;
        this.Nodes = Prompt.Nodes;
        this.Style = Style;
        this.Prompt = null;
    }

    Append() {
        const Prompt = document.createElement("div")
        Prompt.setAttribute("class", "Prompt");
        if (this.Style[0] === undefined || this.Style[0] === "self") Object.keys(this.Style[1]).forEach(Key => Prompt.style[Key] = this.Style[1][Key]);

        Prompt.innerHTML = `
            <div class="Topbar">
                <span>${this.Title}</span>
                <span button>X</span>
            </div>
            <div class="Content"></div>
        `;

        document.body.appendChild(Prompt);
        this.Prompt = Prompt;

        Prompt.setAttribute("style", `
            position: absolute;
            left: ${window.innerWidth / 2}px;
            top: ${window.innerHeight / 2}px;
        `);

        this.Style[0] ? this.Style[0] !== "self" ? Object.keys(this.Style[1]).forEach(Key => Prompt.querySelector(this.Style[0]).style[Key] = this.Style[1][Key]) : "" : "";
        Prompt.querySelector("span[button]").addEventListener("click", () => Prompt.remove());

        this.Nodes.forEach(Node => {
            if (!(Node instanceof HTMLElement)) return;
            this.Prompt.querySelector(".Content").appendChild(Node);
        });

        let Dragging = false;
        let StartX = 0;
        let StartY = 0;

        Prompt.querySelector(".Topbar").addEventListener("mousedown", (Event) => {
            Dragging = true;
            StartX = Event.clientX - parseInt(Prompt.style.left);
            StartY = Event.clientY - parseInt(Prompt.style.top);
        });

        document.addEventListener("mousemove", (Event) => {
            if (!Dragging) return;
            Prompt.style.left = `${Event.clientX - StartX}px`;
            Prompt.style.top = `${Event.clientY - StartY}px`;
        });

        document.addEventListener("mouseup", () => Dragging = false);

        return Prompt;
    }

    Remove() {
        if (!this.Prompt) return;
        this.Prompt.remove();
    }
}

globalThis.Format = class {
    constructor(Value = 0, Plugins = {}) {
        this.Value = Value;
        this.Plugins = Plugins;
    }

    Time() {
        if (!this.Plugins["Time"]) return;
        const Format = this.Plugins["Time"].Format;
        const Time = this.Value;

        const DateObj = new Date(parseInt(Time) * 1000);
        const Now = new Date();
        const DiffInSeconds = Math.floor((Now - DateObj) / 1000);

        const Values = {
            Seconds: DiffInSeconds,
            Minutes: Math.floor(DiffInSeconds / 60),
            Hours: Math.floor(DiffInSeconds / 3600),
            Days: Math.floor(DiffInSeconds / 86400),
            Weeks: Math.floor(DiffInSeconds / 604800),
            Months: Math.floor(DiffInSeconds / 2592000),
            Years: Math.floor(DiffInSeconds / 31536000)
        };

        const Units = Format.split(">").map(Unit => Unit.trim()).filter(Unit => Unit in Values);

        let SelectedUnit = "Seconds";
        for (let I = 0; I < Units.length; I++) {
            if (Values[Units[I]] >= 1) SelectedUnit = Units[I];
            else break;
        }

        const Value = Values[SelectedUnit];
        const Label = `${SelectedUnit.replace(SelectedUnit[SelectedUnit.length - 1], "")}${Value > 1 ? "s" : ""}`;

        return `${Value} ${Label.toLowerCase()} ${Format.split(" ")[1]}`;
    }

    Currency() {
        if (!this.Plugins["Currency"]) return;
        const Currency = this.Plugins["Currency"].Format.split("+");
        const Value = this.Value;

        return new Intl.NumberFormat(Currency[0], {
            style: "currency",
            currency: Currency[1],
            minimumFractionDigits: Currency[2]
        }).format(Value);
    }
}

globalThis.GetReactionProducts = (Reactants) => {
    let ElementCount = {};

    const ParseCompound = (Compound) => {
        let Elements = Compound.match(/[A-Z][a-z]?\d*/g) || [];
        return Elements.map(E => {
            let Match = E.match(/([A-Z][a-z]?)(\d*)/);
            return { Element: Match[1], Count: Match[2] ? parseInt(Match[2]) : 1 };
        });
    };

    Reactants.forEach(Compound => {
        ParseCompound(Compound).forEach(({ Element, Count }) => {
            ElementCount[Element] = (ElementCount[Element] || 0) + Count;
        });
    });

    let Products = [];

    CompoundDiagram.forEach(([E1, E2, C1, C2, Compound]) => {
        let MinCount = Math.min(
            Math.floor((ElementCount[E1] || 0) / C1),
            Math.floor((ElementCount[E2] || 0) / C2)
        );

        if (MinCount > 0) {
            Products.push(MinCount > 1 ? `${Compound}${MinCount}` : Compound);
            ElementCount[E1] -= MinCount * C1;
            ElementCount[E2] -= MinCount * C2;
        }
    });

    Object.keys(ElementCount).forEach(Element => {
        if (ElementCount[Element] > 0) {
            Products.push(Element + (ElementCount[Element] > 1 ? ElementCount[Element] : ""));
        }
    });

    return Products;
};

globalThis.Uuid = (Length = 16) => {
    if ((Length & (Length - 1)) !== 0 || Length < 2) return "";

    return Array.from({ length: Length }, () =>
        Math.floor(Math.random() * 16).toString(16)
    ).reduce((Acc, Char, Index) =>
        Acc + (Index && Index % (Length / 2) === 0 ? "-" : "") + Char, ""
    );
};

globalThis.ProceedReaction = (Part0, Part1) => {
    if (Part0 === Part1) return;

    const Properties0 = JSON.parse(Part0.getAttribute("Properties"));
    const Properties1 = JSON.parse(Part1.getAttribute("Properties"));

    const Symbol0 = Properties0.Symbol.replaceAll("(", "").replaceAll(")", "");
    const Symbol1 = Properties1.Symbol.replaceAll("(", "").replaceAll(")", "");

    const ReactionProducts = GetReactionProducts([Symbol0, Symbol1]);

    Properties0.Symbol = ReactionProducts.join("");
    Part0.setAttribute("Symbol", Properties0.Symbol);
    Part0.setAttribute("Properties", JSON.stringify(Properties0));

    Part1.remove();
};