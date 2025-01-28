export const RarityTiers = [
  { name: "normal", min: 0, max: 10 },
  { name: "uncommon", min: 11, max: 100 },
  { name: "rare", min: 101, max: 999 },
  { name: "super rare", min: 1000, max: 9999 },
  { name: "ultra-rare", min: 10000, max: 1e6 },
  { name: "mythic", min: 1e6, max: 1e9 },
  { name: "phantom", min: 1e11, max: 1e16 },
  { name: "ününün", min: 1e99, max: 1e128 },
];

export const Cards = {
  metaCard: {
    id: "metaCard",
    name: "Meta Card",
    rarity: 0,
    description: "A card about cards",
    tooltip: "Provides +1 card per pack"
  },
  powerCard: {
    id: "powerCard",
    name: "Power Card",
    rarity: 0,
    description: "The card overflows with power",
    tooltip: "Increases your card opening power"
  },
  moreCats: {
    id: "moreCats",
    name: "More Cats",
    rarity: 101,
    description: "Who doesnt want more cats?!",
    tooltip: "nah this doesnt actually do anything yet :D"
  },  
};
