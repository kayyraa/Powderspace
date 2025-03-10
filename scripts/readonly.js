export const Materials = [
    {
        Name: "Aluminium",
        Symbol: "Al",
        Color: [140, 140, 140],

        PotentialHydrogen: 7,
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
            Equation: "Al + O(3) → Al(2)O(3)",
            Energy: 450
        }
    },
    {
        Name: "Beryllium",
        Symbol: "Be",
        Color: [215, 217, 215],

        PotentialHydrogen: 5.5,
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
            Equation: "Be + O(2) → BeO",
            Energy: 790
        }
    },
    {
        Name: "Tin",
        Symbol: "Sn",
        Color: [160, 160, 160],

        PotentialHydrogen: 7,
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
            Equation: "Sn + O(2) → SnO(2)",
            Energy: 900
        }
    },
    {
        Name: "Titanium",
        Symbol: "Ti",
        Color: [100, 100, 100],

        PotentialHydrogen: 7,
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

        PotentialHydrogen: 7,
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

        PotentialHydrogen: 7,
        SpecificHeat: 0.385,
        FreezingPoint: 1084,
        MeltingPoint: 1085,
        EvaporationPoint: 2562,

        Type: "Solid",

        FrozenState: "Solid",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 8.96
    },
    {
        Name: "Lithium",
        Symbol: "Li",
        Color: [80, 80, 80],

        PotentialHydrogen: 13,
        SpecificHeat: 3.58,
        FreezingPoint: 180,
        MeltingPoint: 180.5,
        EvaporationPoint: 1342,

        Type: "Solid",

        FrozenState: "Solid",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 0.534
    },
    {
        Name: "Copper Sulfate",
        Symbol: "CuSO(4)",
        Color: [1, 144, 238],

        PotentialHydrogen: 4,
        SpecificHeat: 0.49,
        FreezingPoint: 199,
        MeltingPoint: 200,
        EvaporationPoint: 250,

        Type: "Powder",

        FrozenState: "Powder",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 0.534
    },
    {
        Name: "Copper Nitrate",
        Symbol: "CuNO(3)",
        Color: [64, 164, 182],

        PotentialHydrogen: 4.5,
        SpecificHeat: 0.46,
        FreezingPoint: 113,
        MeltingPoint: 114.5,
        EvaporationPoint: 170,

        Type: "Powder",

        FrozenState: "Powder",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 3.05,

        Reaction: {
            Type: "Exothermic",
            Reactants: ["CuNO(3)", "HNO(3)"],
            Products: ["Cu(NO(3))₂", "H₂O"],
            Equation: "CuNO(3) + HNO(3) → CuNO(3) + H(2)O + CO(2)",
            Energy: 1200
        }
    },
    {
        Name: "Potassium Dichromate",
        Symbol: "K(2)Cr(2)O(7)",
        Color: [125, 83, 73],

        PotentialHydrogen: 4.1,
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
            Reactants: ["K(2)Cr(2)O(7)", "SO(2)", "H(2)O"],
            Products: ["Cr(2)O(3)", "K(2)SO(4)"],
            Equation: "K(2)Cr(2)O(7) + SO(2) + H(2)O → Cr(2)O(3) + K(2)SO(4)",
            Energy: 1450
        }
    },
    {
        Name: "Potassium Permanganate",
        Symbol: "KMnO(4)",
        Color: [100, 0, 175],

        PotentialHydrogen: 7.2,
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
            Reactants: ["2KMnO(4)", "10H(2)SO(4)", "3C"],
            Products: ["2MnSO(4)", "K(2)SO(4)", "3CO(2)", "8H(2)O"],
            Equation: "2KMnO(4) + 10H(2)SO(4) + 3C → 2MnSO(4) + K(2)SO(4) + 3CO(2) + 8H(2)O",
            Energy: 2550
        }
    },
    {
        Name: "Sodium Bicarbonate",
        Symbol: "NaHCO(3)",
        Color: [230, 230, 230],

        PotentialHydrogen: 8.3,
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
            Reactants: ["NaHCO(3)"],
            Products: ["Na(2)CO(3)", "CO(2)", "H(2)O"],
            Equation: "2NaHCO(3) → Na(2)CO(3) + CO(2) + H(2)O",
            Energy: 480
        }
    },
    {
        Name: "Sulfuric Acid",
        Symbol: "H(2)SO(4)",
        Color: [230, 230, 230],

        PotentialHydrogen: 2.75,
        SpecificHeat: 1.38,
        FreezingPoint: 10,
        MeltingPoint: 10.31,
        EvaporationPoint: 325,

        Type: "Liquid",

        FrozenState: "Solid",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 1.85,

        Reaction: {
            Type: "Exothermic",
            Reactants: ["H(2)SO(4)", "H(2)O"],
            Products: ["H(3)O(+)", "HSO(4)[-]"],
            Equation: "H(2)SO(4) → H(2)O + H(3)O[+] + HSO(4)[-]",
            Energy: 880
        }
    },
    {
        Name: "Nitric Acid",
        Symbol: "HNO(3)",
        Color: [230, 230, 230],

        PotentialHydrogen: 3.01,
        SpecificHeat: 0.85,
        FreezingPoint: -41.5,
        MeltingPoint: -41.6,
        EvaporationPoint: 83,

        Type: "Liquid",

        FrozenState: "Solid",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 1.55,

        Reaction: {
            Type: "Exothermic",
            Reactants: ["HNO(3)", "Au"],
            Products: ["Au(III)[+e]", "HNO(3)[-]"],
            Equation: "HNO(3) + Au → Au[III][+] + HNO(3)[-]",
            Energy: 1450
        }
    },
    ,
    {
        Name: "Hydrochloric Acid",
        Symbol: "HCl",
        Color: [230, 230, 230],

        PotentialHydrogen: 2.9,
        SpecificHeat: 4.18,
        FreezingPoint: -45,
        MeltingPoint: -44,
        EvaporationPoint: 108,

        Type: "Liquid",

        FrozenState: "Solid",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 1.18,
    },
    {
        Name: "Water",
        Symbol: "H(2)O",
        Color: [230, 230, 230],

        PotentialHydrogen: 7,
        SpecificHeat: 4.184,
        FreezingPoint: -5,
        MeltingPoint: 0,
        EvaporationPoint: 100,

        Type: "Liquid",

        FrozenState: "Solid",
        MoltenState: "Liquid",
        EvaporatedState: "Gas",

        Density: 1
    }
];