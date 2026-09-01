// Build 7 first playable stage. Later zones/stages stay data-driven.
export const stages = Object.freeze({
  'fittoa-1': {
    id: 'fittoa-1', zoneId: 'fittoa', name: 'Fittoa Outskirts', displayStage: 1, totalWaves: 10,
    waves: [
      [{ id: 'slime', count: 1 }], [{ id: 'slime', count: 2 }], [{ id: 'goblin', count: 1 }],
      [{ id: 'slime', count: 2 }, { id: 'goblin', count: 1 }], [{ id: 'goblin', count: 2 }],
      [{ id: 'wolf', count: 1 }, { id: 'slime', count: 1 }], [{ id: 'goblin_thief', count: 2 }],
      [{ id: 'orc', count: 1 }, { id: 'goblin', count: 1 }], [{ id: 'orc', count: 1 }, { id: 'wolf', count: 2 }],
      [{ id: 'orc_warrior', count: 1 }]
    ]
  }
});
