export const SETTLEMENT_DATA = {
  types: {
    lotr: ["Fortified Border Citadel", "Hidden Sylvan Outpost", "Stone-Walled Trading Thorp", "Monastic Sanctuary"],
    witcher: ["Mud-Drenched River Hamlet", "Lawless Logging Camp", "Militia-Controlled Keep", "Isolated Peasant Parish"],
    symbaroum: ["Palisaded Explorer Outpost", "Corrupt Frontier Colony", "Sun-Priest Mission Station", "Barbarian Clan Hold"],
    elden: ["Crumbled Keep of Lost Grace", "Subterranean Hollow Village", "Ruined Church Settlement", "Frenzied Village Camp"]
  },
  
  hooks: {
    lotr: "Built completely out of gleaming white stone, featuring an ancient withered tree at its high courtyard center.",
    witcher: "Surrounded by a sharp, rowan-wood palisade stuck with beast skulls. The stench of boiled cabbage and wet dog hangs constantly in the air.",
    symbaroum: "Constructed entirely from dark charcoal timber harvested from the forbidden depths of Davokar forest. Strange moss grows on every roof.",
    elden: "Erected beneath the roots of a giant, luminous golden bough that sheds glowing leaves over shattered stone architecture."
  },

  crises: {
    lotr: [
      "A black-shadow sickness has taken hold of the livestock, making them panic at twilight.",
      "An ancient, sealed tomb-vault beneath the wall has cracked open, leaking cold malice.",
      "The local regent has stopped eating, claiming a dark eye watches them from any mirror."
    ],
    witcher: [
      "A swarm of rot-fiends has infested the village well. The water causes black boils.",
      "A corrupt tax collector from the capital arrived with six cutthroats, seizing all winter grain.",
      "Children have been disappearing into the marshland whenever the fog rolls in early."
    ],
    symbaroum: [
      "A terrifying Blight-Beast has been stalking the perimeter walls, leaving paths of melted, black grass.",
      "Three local treasure hunters returned from a deep ruin carrying a golden chalice; they have now morphed into mindless, aggressive abominations.",
      "The local Earth-Priest has declared a martial lockdown to root out hidden witch-worshipers."
    ],
    elden: [
      "The villagers have succumbed to the Flame of Frenzy, weeping yellow fire from their eyes.",
      "A broken, grafting-mad Scion has claimed the local windmill, demanding limbs as tribute.",
      "The guidance of grace has completely vanished from the area, making the dead rise without rest."
    ]
  },

  npcs: {
    lotr: [
      "Eldrin, a weary veteran ranger who secretly guards a broken lineage heirloom.",
      "Maegor, an elven scholar who has spent eighty years searching for a lost song stanza.",
      "Galdor, a stubborn dwarf smith who refuses to forge weapons for anyone but a true oath-bearer."
    ],
    witcher: [
      "Orik, a toothless village elder who knows exactly which monster lives in the swamp, but demands coin for every word.",
      "Vesna, a cynical herbalist who treats both local peasants and outlaw bandits without bias.",
      "Father Jarek, a zealous priest who blames every misfortune on foreign magic and non-humans."
    ],
    symbaroum: [
      "Captain Marvello, a scarred treasure-hunter captain looking for desperate swords to venture into the deep canopy.",
      "Kaelen, an Ordo Magica scholar obsessed with analyzing a weeping, purple stone chunk.",
      "Althea, a native barbarian guide who knows the paths but explicitly refuses to step near old ruins."
    ],
    elden: [
      "Sir Kenneth, a castaway finger-reader crone who mutters maddening prophecies about a shattered ring.",
      "Gideon, a traveling merchant sitting beside a dying donkey, selling cracked pots and stale rowa raisins.",
      "An unnamed Albinauric, crawling through the mud, desperately seeking a missing silver medallion half."
    ]
  },

  services: [
    "A makeshift tavern serving sour dross-ale and roasted root vegetables.",
    "A primitive iron-forge capable of repairing weapons and shoeing pack mules.",
    "A small shrine offering blessings against curses, rot, and shadow-sickness.",
    "A shady fur-trader willing to buy illegal artifacts or antiquities under the table.",
    "An apothecary stockroom selling dried anti-venom herbs and low-grade poultices."
  ]
};