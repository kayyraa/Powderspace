export const Materials = [
    {
        Name: "Aluminium",
        Symbol: "Al",
        Color: [140, 140, 140],

        SpecificHeat: 0.9,
        FreezingPoint: 660,
        MeltingPoint: 660.32,
        EvaporationPoint: 2327,

        Type: "Solid",

        FrozenState: "Solid",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 2.7,

        Reaction: {
            Type: "Exothermic",
            Reactants: ["Al", "O"],
            Products: ["Al2O3"],
            Equation: "Al + O[3] → Al[2]O[3]",
            Energy: 450
        }
    },
    {
        Name: "Beryllium",
        Symbol: "Be",
        Color: [215, 217, 215],

        SpecificHeat: 1.825,
        FreezingPoint: 1286,
        MeltingPoint: 1287,
        EvaporationPoint: 2469,

        Type: "Solid",

        FrozenState: "Solid",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 1.848,

        Reaction: {
            Type: "Exothermic",
            Reactants: ["Be", "O"],
            Products: ["BeO"],
            Equation: "Be + O[2] → BeO",
            Energy: 790
        }
    },
    {
        Name: "Tin",
        Symbol: "Sn",
        Color: [160, 160, 160],

        SpecificHeat: 0.227,
        FreezingPoint: 231,
        MeltingPoint: 231.9,
        EvaporationPoint: 2602,

        Type: "Solid",

        FrozenState: "Solid",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 7.31,

        Reaction: {
            Type: "Exothermic",
            Reactants: ["Sn", "O"],
            Products: ["SnO"],
            Equation: "Sn + O[2] → SnO[2]",
            Energy: 900
        }
    },
    {
        Name: "Titanium",
        Symbol: "Ti",
        Color: [100, 100, 100],

        SpecificHeat: 0.523,
        FreezingPoint: 1659,
        MeltingPoint: 1660,
        EvaporationPoint: 3287,

        Type: "Solid",

        FrozenState: "Solid",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 4.54
    },
    {
        Name: "Iron",
        Symbol: "Fe",
        Color: [120, 120, 120],

        SpecificHeat: 0.442,
        FreezingPoint: 1811,
        MeltingPoint: 1812,
        EvaporationPoint: 2861,

        Type: "Solid",

        FrozenState: "Solid",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 7.87
    },
    {
        Name: "Copper",
        Symbol: "Cu",
        Color: [198, 131, 70],

        SpecificHeat: 0.385,
        FreezingPoint: 1084,
        MeltingPoint: 1085,
        EvaporationPoint: 2562,

        Type: "Solid",

        FrozenState: "Solid",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 8.96,
    },
    {
        Name: "Lithium",
        Symbol: "Li",
        Color: [80, 80, 80],

        SpecificHeat: 3.58,
        FreezingPoint: 180,
        MeltingPoint: 180.5,
        EvaporationPoint: 1342,

        Type: "Solid",

        FrozenState: "Solid",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 0.534,
    },
    {
        Name: "Copper Sulfate",
        Symbol: "CuSO[4]",
        Color: [1, 144, 238],

        SpecificHeat: 0.49,
        FreezingPoint: 199,
        MeltingPoint: 200,
        EvaporationPoint: 250,

        Type: "Powder",

        FrozenState: "Powder",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 0.534,
    },
    {
        Name: "Potassium Dichromate",
        Symbol: "K[2]Cr[2]O[7]",
        Color: [125, 83, 73],

        SpecificHeat: 0.28,
        FreezingPoint: 397,
        MeltingPoint: 398,
        EvaporationPoint: 400,

        Type: "Powder",

        FrozenState: "Powder",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 2.68,

        Reaction: {
            Type: "Exothermic",
            Reactants: ["K[2]Cr[2]O[7]", "SO[2]", "H[2]O"],
            Products: ["Cr[2]O[3]", "K[2]SO[4]"],
            Equation: "K[2]Cr[2]O[7] + SO[2] + H[2]O → Cr[2]O[3] + K[2]SO[4]",
            Energy: 1450
        }
    },
    {
        Name: "Potassium Permanganate",
        Symbol: "KMnO[4]",
        Color: [139, 0, 255],

        SpecificHeat: 0.754,
        FreezingPoint: 239,
        MeltingPoint: 240,
        EvaporationPoint: 400,

        Type: "Powder",

        FrozenState: "Powder",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 2.7,

        Reaction: {
            Type: "Exothermic",
            Reactants: ["2KMnO[4]", "10H[2]SO[4]", "3C"],
            Products: ["2MnSO[4]", "K[2]SO[4]", "3CO[2]", "8H[2]O"],
            Equation: "2KMnO[4] + 10H[2]SO[4] + 3C → 2MnSO[4] + K[2]SO[4] + 3CO[2] + 8H[2]O",
            Energy: 2550
        }
    },
    {
        Name: "Sodium Bicarbonate",
        Symbol: "NaHCo[3]",
        Color: [230, 230, 230],

        SpecificHeat: 0.84,
        FreezingPoint: 269,
        MeltingPoint: 270,
        EvaporationPoint: 851,

        Type: "Powder",

        FrozenState: "Powder",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 2.16,

        Reaction: {
            Type: "Endothermic",
            Reactants: ["NaHCO[3]"],
            Products: ["Na[2]CO[3]", "CO[2]", "H[2]O"],
            Equation: "2NaHCO[3] → Na[2]CO[3] + CO[2] + H[2]O",
            Energy: 480
        }
    }
];