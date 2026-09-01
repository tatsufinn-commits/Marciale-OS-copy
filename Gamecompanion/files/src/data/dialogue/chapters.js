/**
 * Dialogue Data — Build 23 / Build 51 Branching Dialogue Trees
 * Loaded per data-driven architecture from 06-DIALOGUE-BIBLE.md.
 */
export const dialogueTrees = {
  'ch1_vaela_meeting': {
    id: 'ch1_vaela_meeting',
    title: 'The First Meeting (Chapter 1)',
    initialNode: 'node_1',
    nodes: {
      'node_1': {
        id: 'node_1',
        speaker: 'narrator',
        speakerName: 'Narrator',
        text: 'Village square, Loom’s Rest. Two older youths are taunting a small girl with pointed ears. She clutches her arms, staring at the ground.',
        choices: [
          {
            text: 'Step forward and shout: "Hey! Leave her alone!"',
            nextNode: 'node_compassionate',
            effects: { affinity: 5, alignment: 'compassionate' }
          },
          {
            text: 'Step between them calmly: "She is with me. Move along."',
            nextNode: 'node_pragmatic',
            effects: { affinity: 5, alignment: 'pragmatic' }
          },
          {
            text: 'Cast a minor water burst at their feet to scare them off.',
            nextNode: 'node_reckless',
            effects: { affinity: 3, alignment: 'reckless' }
          }
        ]
      },
      'node_compassionate': {
        id: 'node_compassionate',
        speaker: 'vaela',
        speakerName: 'Vaela',
        text: 'The bullies scurry away. The girl looks up timidly, her emerald eyes trembling. "Y-you didn’t have to do that... but thank you. I am Vaela."',
        choices: [
          {
            text: '"I’m Cael. Nobody should be treated like that."',
            nextNode: 'node_end',
            effects: { gold: 50, xp: 100 }
          }
        ]
      },
      'node_pragmatic': {
        id: 'node_pragmatic',
        speaker: 'vaela',
        speakerName: 'Vaela',
        text: 'The bullies grumble and disperse. Vaela exhales softly. "You handled that with authority. My name is Vaela... are you an apprentice Weaver?"',
        choices: [
          {
            text: '"Just someone who follows through on what’s right."',
            nextNode: 'node_end',
            effects: { gold: 50, xp: 100 }
          }
        ]
      },
      'node_reckless': {
        id: 'node_reckless',
        speaker: 'vaela',
        speakerName: 'Vaela',
        text: 'The bullies slip on the wet cobblestones and flee in panic. Vaela stifles a small gasp, then a faint smile. "Aether magic without incantation? That was bold... I’m Vaela."',
        choices: [
          {
            text: '"Effective though, wasn’t it? Glad you’re safe."',
            nextNode: 'node_end',
            effects: { gold: 50, xp: 100 }
          }
        ]
      },
      'node_end': {
        id: 'node_end',
        speaker: 'narrator',
        speakerName: 'Narrator',
        text: 'Vaela nods with newfound resolve. A strong bond has begun to form between Weavers. Vaela has joined your quest journal!',
        choices: []
      }
    }
  },

  'ch2_orin_lesson': {
    id: 'ch2_orin_lesson',
    title: 'Master Orin’s Lesson (Chapter 2)',
    initialNode: 'node_1',
    nodes: {
      'node_1': {
        id: 'node_1',
        speaker: 'orin',
        speakerName: 'Master Orin',
        text: 'Remember Cael: Aether is not a weapon to be swung mindlessly. It is a thread to be woven. Show me your control.',
        choices: [
          {
            text: '"Focus on steady harmonic resonance."',
            nextNode: 'node_success',
            effects: { xp: 150 }
          },
          {
            text: '"Channel raw destructive firepower!"',
            nextNode: 'node_power',
            effects: { gold: 75 }
          }
        ]
      },
      'node_success': {
        id: 'node_success',
        speaker: 'orin',
        speakerName: 'Master Orin',
        text: 'Splendid form. The mana circulates without resistance. You have the true patience of an ancient Weaver.',
        choices: []
      },
      'node_power': {
        id: 'node_power',
        speaker: 'orin',
        speakerName: 'Master Orin',
        text: 'Powerful, yes, but turbulent. Power without control will fray the weave in deep dungeons. Still, your spirit is fierce.',
        choices: []
      }
    }
  }
};
