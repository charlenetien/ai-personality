/* ============================================================
   Meet Your AI Self — app.js
   Character generation + quiz + CLAUDE.md builder
   ============================================================ */

// ── Character System ──────────────────────────────────────

const COLORS = [
  // Original 10
  { name: 'The Prompt Whisperer',           body: '#8B5CF6', shadow: '#6D28D9', highlight: '#DDD6FE', cheek: '#7C3AED' },
  { name: 'Professional Tab Hoarder',       body: '#60A5FA', shadow: '#2563EB', highlight: '#BFDBFE', cheek: '#3B82F6' },
  { name: 'Iterate Until Pretty',           body: '#2DD4BF', shadow: '#0D9488', highlight: '#99F6E4', cheek: '#14B8A6' },
  { name: 'Wholesome Optimizer',            body: '#4ADE80', shadow: '#16A34A', highlight: '#BBF7D0', cheek: '#22C55E' },
  { name: 'Chaotic Good PM',               body: '#FCD34D', shadow: '#D97706', highlight: '#FEF9C3', cheek: '#F59E0B' },
  { name: 'Ship It, Fix It Later',          body: '#FB923C', shadow: '#C2410C', highlight: '#FED7AA', cheek: '#EA580C' },
  { name: 'Soft Power, Hard Opinions',      body: '#F472B6', shadow: '#BE185D', highlight: '#FCE7F3', cheek: '#EC4899' },
  { name: 'The Deadline Witch',             body: '#FB7185', shadow: '#BE123C', highlight: '#FFE4E6', cheek: '#F43F5E' },
  { name: 'Aesthetic Contrarian',           body: '#818CF8', shadow: '#4338CA', highlight: '#E0E7FF', cheek: '#6366F1' },
  { name: 'Zero-to-MVP Speedrunner',        body: '#22D3EE', shadow: '#0E7490', highlight: '#CFFAFE', cheek: '#06B6D4' },
  // New 10 — bold, shape-character inspired
  { name: 'Low Key Meticulous',             body: '#A3E635', shadow: '#4D7C0F', highlight: '#ECFCCB', cheek: '#65A30D' },
  { name: 'Galaxy Brained',                 body: '#E879F9', shadow: '#86198F', highlight: '#FAE8FF', cheek: '#C026D3' },
  { name: 'Seriously Though',               body: '#2563EB', shadow: '#1E3A8A', highlight: '#BFDBFE', cheek: '#1D4ED8' },
  { name: 'Context Window Archaeologist',   body: '#F59E0B', shadow: '#92400E', highlight: '#FEF3C7', cheek: '#B45309' },
  { name: 'Shipping Imminent',              body: '#EF4444', shadow: '#7F1D1D', highlight: '#FEE2E2', cheek: '#B91C1C' },
  { name: 'README Philosopher',             body: '#C084FC', shadow: '#581C87', highlight: '#F3E8FF', cheek: '#9333EA' },
  { name: 'Honestly Just Winging It',       body: '#94A3B8', shadow: '#334155', highlight: '#F1F5F9', cheek: '#475569' },
  { name: 'Overthinking Beautifully',       body: '#F9A8D4', shadow: '#9F1239', highlight: '#FCE7F3', cheek: '#DB2777' },
  { name: 'Runs on Vibes and Velocity',     body: '#A21CAF', shadow: '#4A044E', highlight: '#F5D0FE', cheek: '#7E22CE' },
  { name: 'Suspiciously Prepared',          body: '#34D399', shadow: '#065F46', highlight: '#A7F3D0', cheek: '#059669' },
];

// 5 expressions: happy, focused, curious, playful, calm
function getEyes(expr) {
  switch (expr) {
    case 0: // Happy — wide-open, sparkling
      return `
        <circle cx="44" cy="61" r="6" fill="white"/>
        <circle cx="46" cy="62" r="3.5" fill="#1a1025"/>
        <circle cx="47.5" cy="60.5" r="1.2" fill="white"/>
        <circle cx="76" cy="61" r="6" fill="white"/>
        <circle cx="78" cy="62" r="3.5" fill="#1a1025"/>
        <circle cx="79.5" cy="60.5" r="1.2" fill="white"/>`;
    case 1: // Focused — determined, slightly narrowed
      return `
        <path d="M38 60 Q44 55 50 60 Q44 63 38 60Z" fill="white"/>
        <circle cx="44" cy="60" r="2.5" fill="#1a1025"/>
        <path d="M70 60 Q76 55 82 60 Q76 63 70 60Z" fill="white"/>
        <circle cx="76" cy="60" r="2.5" fill="#1a1025"/>
        <path d="M39 56 Q44 53 49 56" stroke="#1a1025" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <path d="M71 56 Q76 53 81 56" stroke="#1a1025" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    case 2: // Curious — one eye bigger, slight raise
      return `
        <circle cx="44" cy="62" r="5.5" fill="white"/>
        <circle cx="45.5" cy="63" r="3" fill="#1a1025"/>
        <circle cx="47" cy="61.5" r="1" fill="white"/>
        <circle cx="76" cy="60" r="7" fill="white"/>
        <circle cx="77.5" cy="61.5" r="4" fill="#1a1025"/>
        <circle cx="79.5" cy="59.5" r="1.4" fill="white"/>
        <path d="M72 54 Q76 51 80 54" stroke="#1a1025" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    case 3: // Playful — wink left, big open right
      return `
        <path d="M38 61 Q44 56.5 50 61" stroke="#1a1025" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="76" cy="61" r="6.5" fill="white"/>
        <circle cx="77.5" cy="62" r="3.8" fill="#1a1025"/>
        <circle cx="79.5" cy="60.5" r="1.3" fill="white"/>`;
    case 4: // Calm — soft closed arcs
      return `
        <path d="M38 63 Q44 57 50 63" stroke="#1a1025" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M70 63 Q76 57 82 63" stroke="#1a1025" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    default:
      return getEyes(0);
  }
}

function getMouth(expr) {
  switch (expr) {
    case 0: // Happy — wide smile
      return `<path d="M47 76 Q60 88 73 76" stroke="#1a1025" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    case 1: // Focused — slight flat line
      return `<path d="M50 77 L70 77" stroke="#1a1025" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    case 2: // Curious — small "oh" mouth
      return `<ellipse cx="60" cy="78" rx="5" ry="6" fill="white" stroke="#1a1025" stroke-width="2"/>`;
    case 3: // Playful — big grin
      return `
        <path d="M44 76 Q60 92 76 76" stroke="#1a1025" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M44 76 Q60 92 76 76" fill="white" opacity="0.4"/>`;
    case 4: // Calm — gentle small smile
      return `<path d="M51 77 Q60 83 69 77" stroke="#1a1025" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    default:
      return getMouth(0);
  }
}

function getBeret(color) {
  return `
    <!-- Beret brim -->
    <ellipse cx="52" cy="26" rx="24" ry="7" fill="${color.shadow}"/>
    <!-- Beret dome -->
    <path d="M30 26 Q28 8 52 6 Q76 8 74 26" fill="${color.shadow}"/>
    <!-- Beret highlight -->
    <path d="M36 20 Q42 12 54 10" stroke="${color.highlight}" stroke-width="1.5" fill="none" opacity="0.6" stroke-linecap="round"/>
    <!-- Pompon -->
    <circle cx="60" cy="7" r="5" fill="${color.body}"/>
    <circle cx="60" cy="7" r="3" fill="${color.highlight}" opacity="0.5"/>`;
}

// ── Accessories ────────────────────────────────────────────
// 0=none, 1=beret, 2=glasses, 3=crown, 4=stars

function getGlasses(color) {
  return `
    <!-- Glasses -->
    <circle cx="44" cy="62" r="9.5" fill="none" stroke="#1a1025" stroke-width="2.2" opacity="0.75"/>
    <circle cx="76" cy="62" r="9.5" fill="none" stroke="#1a1025" stroke-width="2.2" opacity="0.75"/>
    <line x1="53.5" y1="61" x2="66.5" y2="61" stroke="#1a1025" stroke-width="2" opacity="0.75"/>
    <line x1="34" y1="59" x2="25" y2="56" stroke="#1a1025" stroke-width="2" opacity="0.6" stroke-linecap="round"/>
    <line x1="86" y1="59" x2="95" y2="56" stroke="#1a1025" stroke-width="2" opacity="0.6" stroke-linecap="round"/>`;
}

function getCrown(color) {
  return `
    <!-- Crown -->
    <path d="M36 30 L36 20 L46 27 L60 14 L74 27 L84 20 L84 30 Z" fill="#FCD34D" stroke="#D97706" stroke-width="1.5" stroke-linejoin="round"/>
    <rect x="34" y="27" width="52" height="9" rx="3" fill="#F59E0B"/>
    <circle cx="60" cy="17" r="3" fill="#EF4444"/>
    <circle cx="46" cy="27" r="2.5" fill="#EF4444"/>
    <circle cx="74" cy="27" r="2.5" fill="#EF4444"/>`;
}

function getFloatingStars(color) {
  return `
    <!-- Stars -->
    <path d="M18 42 L20 36 L22 42 L28 44 L22 46 L20 52 L18 46 L12 44 Z" fill="${color.highlight}" opacity="0.9"/>
    <path d="M96 38 L97.5 33 L99 38 L104 39.5 L99 41 L97.5 46 L96 41 L91 39.5 Z" fill="${color.highlight}" opacity="0.85"/>
    <path d="M22 90 L23 86 L24 90 L28 91 L24 92 L23 96 L22 92 L18 91 Z" fill="${color.highlight}" opacity="0.7"/>
    <circle cx="98" cy="82" r="3" fill="${color.highlight}" opacity="0.6"/>
    <circle cx="14" cy="68" r="2" fill="${color.highlight}" opacity="0.5"/>`;
}

function getAccessoryBefore(index, color) {
  if (index === 1) return getBeret(color);
  if (index === 3) return getCrown(color);
  return '';
}

function getAccessoryAfter(index, color) {
  if (index === 2) return getGlasses(color);
  if (index === 4) return getFloatingStars(color);
  return '';
}

// Blob body shapes — 5 dramatically organic shapes with distinct personalities
const BLOB_SHAPES = [
  // Chonky — very wide and squat, heavier on the sides
  'M60,34 C86,26 118,40 118,66 C118,94 98,116 64,118 C28,120 2,100 2,72 C2,44 32,42 60,34Z',
  // Lumpy — noticeable shoulder bump upper-left, lopsided
  'M50,24 C32,12 6,28 6,56 C6,84 20,110 52,118 C82,126 112,110 120,80 C128,50 112,24 84,20 C68,18 64,34 50,24Z',
  // Pear — narrow top, dramatically wider bottom
  'M60,28 C72,20 100,32 108,56 C116,82 108,112 76,120 C44,128 14,112 8,86 C2,60 12,36 34,28 C44,24 52,34 60,28Z',
  // Squarish — boxy with organic corners, flat-ish sides
  'M36,22 C54,14 74,16 94,24 C116,34 122,54 120,78 C118,102 104,120 76,122 C48,124 18,112 8,88 C-2,64 4,36 22,28 C28,24 30,28 36,22Z',
  // Wobbly — bumpy all around, clearly multi-lobed
  'M60,20 C78,12 102,22 112,40 C124,60 120,82 110,100 C98,118 74,124 50,118 C24,112 4,94 2,70 C0,48 12,30 30,24 C42,18 48,26 60,20Z',
];

function generateCharacterSVG(colorIndex, expressionIndex, accessoryIndex, shapeIndex = 0) {
  const c = COLORS[colorIndex];
  const id = `bg-${colorIndex}-${expressionIndex}-${accessoryIndex}-${shapeIndex}`;
  const blob = BLOB_SHAPES[shapeIndex % BLOB_SHAPES.length];
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="${id}" cx="38%" cy="32%" r="62%">
        <stop offset="0%" stop-color="${c.highlight}" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="${c.shadow}" stop-opacity="0.18"/>
      </radialGradient>
    </defs>
    ${getAccessoryBefore(accessoryIndex, c)}
    <!-- Body blob -->
    <path d="${blob}" fill="${c.body}"/>
    <path d="${blob}" fill="url(#${id})"/>
    <!-- Cheeks -->
    <ellipse cx="35" cy="76" rx="11" ry="7" fill="${c.cheek}" opacity="0.28"/>
    <ellipse cx="85" cy="76" rx="11" ry="7" fill="${c.cheek}" opacity="0.28"/>
    <!-- Eyes -->
    ${getEyes(expressionIndex)}
    <!-- Mouth -->
    ${getMouth(expressionIndex)}
    ${getAccessoryAfter(accessoryIndex, c)}
  </svg>`;
}

// ── Quiz Questions ────────────────────────────────────────

const QUESTIONS = [
  {
    text: "When Claude isn't sure what you want, it should:",
    answers: [
      { emoji: '🚀', text: 'Make a call and go — I\'ll redirect if needed' },
      { emoji: '🙋', text: 'Ask me one clarifying question before starting' },
      { emoji: '🗺️', text: 'State its interpretation, then proceed' },
      { emoji: '📋', text: 'Give me options and let me decide' },
    ]
  },
  {
    text: "How should Claude explain its work?",
    answers: [
      { emoji: '⚡', text: 'Skip it — just give me the answer' },
      { emoji: '💡', text: 'One sentence: tell me the key decision' },
      { emoji: '📖', text: 'Walk me through the reasoning' },
      { emoji: '🧩', text: 'Show an example first, explain after' },
    ]
  },
  {
    text: "For building and writing tasks, Claude should:",
    answers: [
      { emoji: '🏗️', text: 'Outline the structure first, then build' },
      { emoji: '⚡', text: 'Build the whole thing, then show me' },
      { emoji: '🔁', text: 'Build in steps, checking in as we go' },
      { emoji: '🎯', text: 'Ask what level of detail I want each time' },
    ]
  },
  {
    text: "What matters most when Claude responds?",
    answers: [
      { emoji: '🎯', text: 'Accuracy — double-check, flag uncertainty' },
      { emoji: '⚡', text: 'Speed — good enough now beats perfect later' },
      { emoji: '🔍', text: 'Understanding — I want to learn, not just get an answer' },
      { emoji: '🌈', text: 'Range — show me the space, not just one answer' },
    ]
  },
  {
    text: "How much initiative should Claude take?",
    answers: [
      { emoji: '🎨', text: 'Be bold — make interesting choices and own them' },
      { emoji: '🤝', text: 'Offer suggestions, but let me make the calls' },
      { emoji: '📌', text: 'Follow my lead closely — don\'t surprise me' },
      { emoji: '🧭', text: 'Match my energy — read the room' },
    ]
  },
];

// ── CLAUDE.md Generation ──────────────────────────────────

const ANSWER_COPY = {
  // Q1: Handling ambiguity
  q0: [
    'When unclear, make your best interpretation and proceed — I\'ll redirect if needed. Don\'t ask for clarification unless truly stuck.',
    'When something is ambiguous, ask me one clarifying question before you start. Keep it short.',
    'Before you begin, briefly state how you\'re interpreting my request, then proceed. I\'ll correct you if needed.',
    'When you have genuine options, list them briefly and let me pick. Don\'t decide for me on things that could go either way.',
  ],
  // Q2: Explaining reasoning
  q1: [
    'Be direct. Lead with the answer — skip the preamble, skip the summary at the end. I can read the output.',
    'Keep explanations minimal. If you made a key decision, name it in one sentence. Otherwise, just do the work.',
    'Explain your reasoning when it matters. I want to understand the tradeoffs, not just get a result.',
    'Show me a concrete example first, then explain. Concrete before abstract.',
  ],
  // Q3: Build style
  q2: [
    'For complex tasks, briefly outline what you\'re building before diving in. A few lines is enough.',
    'Build the complete thing, then show me. I\'d rather review a full attempt than approve every step.',
    'Work incrementally — build something small, check in, continue. Don\'t go quiet for too long.',
    'Ask me upfront how much detail I want. My needs vary depending on the task.',
  ],
  // Q4: What matters
  q3: [
    'Accuracy matters most. If you\'re uncertain, say so clearly. Don\'t fake confidence.',
    'Momentum matters. A working solution now beats a polished one later. We can iterate.',
    'Help me understand what I\'m building. Don\'t just produce output — teach me what\'s happening.',
    'Show me the possibility space. When there\'s more than one good approach, I want to see it.',
  ],
  // Q5: Initiative
  q4: [
    'Take initiative. Make opinionated choices — name them so I can override — but don\'t hedge everything.',
    'Offer your recommendation, but frame it as a suggestion. I like having the final say.',
    'Be predictable. Follow my instructions closely. If you deviate, tell me why.',
    'Read the room. High-stakes work gets more caution; exploratory work gets more boldness.',
  ],
};

const SECTION_LABELS = [
  'When unclear',
  'Explanations',
  'How to build',
  'What matters',
  'Initiative',
];

function buildClaudeMD(answers, freeformText) {
  const prefs = answers.map((a, i) =>
    `**${SECTION_LABELS[i]}:** ${ANSWER_COPY[`q${i}`][a]}`
  );

  let md = '# How I Work With Claude\n\n' + prefs.join('\n\n');

  const extra = freeformText ? freeformText.trim() : '';
  if (extra.length > 0) {
    md += '\n\n## Additional Context\n\n' + extra;
  }

  return md;
}

// ── Analyze freeform text → character signals ─────────────

function analyzeText(text) {
  if (!text || !text.trim()) return { warmth: 0, energy: 0, style: 3, wordBias: 0, hash: 0 };
  const t = text.toLowerCase();
  const words = t.split(/\s+/).filter(Boolean);

  // Warmth: sunny/social/expressive language → warmer palette
  const warmth = ['warm', 'cozy', 'love', 'bright', 'happy', 'friendly', 'joy',
    'sunshine', 'orange', 'red', 'yellow', 'delight', 'fun', 'playful']
    .filter(w => t.includes(w)).length;

  // Energy: urgency/momentum → more expressive face
  const energy = ['fast', 'quick', 'ship', 'build', 'launch', 'excited', 'bold',
    'go', 'driven', 'always', 'hustle', 'deadline', '!']
    .filter(w => t.includes(w)).length;

  // Style: creative → beret; analytical → glasses (scale 0–6, 3 = neutral)
  const creative   = ['creative', 'design', 'art', 'visual', 'aesthetic',
    'craft', 'imagine', 'draw', 'color', 'style', 'make']
    .filter(w => t.includes(w)).length;
  const analytical = ['data', 'analyze', 'research', 'precise', 'detail',
    'systematic', 'logic', 'reason', 'study', 'document', 'process']
    .filter(w => t.includes(w)).length;
  const style = Math.min(Math.max(creative - analytical + 3, 0), 6);

  // Simple deterministic hash for leftover variation
  let hash = 7;
  for (let i = 0; i < Math.min(text.length, 80); i++)
    hash = (hash * 31 + text.charCodeAt(i)) & 0xffff;

  return {
    warmth:   Math.min(warmth, 4),          // 0–4
    energy:   Math.min(energy, 4),          // 0–4
    style,                                   // 0–6
    wordBias: Math.min(words.length, 12),   // 0–12
    hash:     hash % 20,                    // 0–19
  };
}

// ── Character from answers ────────────────────────────────

function getCharacter(answers, freeformText = '') {
  const [a0, a1, a2, a3, a4] = answers;
  const txt = analyzeText(freeformText);

  // Quiz answers are the base; freeform text nudges each dimension semantically:
  //   warmth → color (warm vs cool palette)
  //   energy → expression (calm vs excited)
  //   style  → accessory (creative=beret, analytical=glasses)
  //   words  → body shape
  //   hash   → unique fingerprint so different text = different character
  const colorIndex      = (a0 * 5 + a1 * 3 + a2 * 7 + a3 * 11 + a4 * 2 + txt.warmth * 4 + txt.hash) % 20;
  const expressionIndex = (a0 * 3 + a1 * 7 + a2 * 2 + a3 * 5  + a4 * 11 + txt.energy * 2) % 5;
  const accessoryIndex  = (a0 * 7 + a1 * 2 + a2 * 11 + a3 * 3 + a4 * 5  + txt.style * 3) % 5;
  const shapeIndex      = (a0 * 2 + a1 * 11 + a2 * 5 + a3 * 7  + a4 * 3  + txt.wordBias * 2) % 5;
  return { colorIndex, expressionIndex, accessoryIndex, shapeIndex };
}

// Flavor lines indexed by [colorIndex][expressionIndex]
const FLAVOR_LINES = [
  ['Claude does what you mean, not what you say.', 'You brief Claude like a senior designer — and it delivers.', 'You ask Claude questions other people Google.', 'You turn ambiguity into prompts.', 'Your prompts are works of art. Quiet ones.'],
  ['You have 47 tabs open. Claude is tab 48.', 'You work methodically, then call Claude for backup.', 'You ask Claude what you already suspect.', 'Claude is your rubber duck with opinions.', 'You and Claude have a very calm working relationship.'],
  ['You use Claude to get unstuck, then take it from there.', 'You iterate obsessively. Claude keeps up.', 'You ask Claude \'wait, why does this look wrong?\'', 'You treat every output as a draft. A very fast one.', 'You work slowly on purpose. Claude respects that.'],
  ['You prompt with kindness. Claude noticed.', 'You get what you want by knowing what you need.', 'You ask Claude \'can you explain why?\' a lot.', 'You make collaboration look easy.', 'Steady hands. Careful prompts. Great output.'],
  ['You make it up as you go. It works out.', 'You know what you want 70% of the time. Claude handles the rest.', 'You\'re curious about everything, including the wrong things.', 'You describe vibes. Claude figures out the CSS.', 'Chaotic energy. Surprisingly great results.'],
  ['You shipped something today that wasn\'t ready. It was fine.', 'You move fast and break things on purpose.', 'You ask Claude to do the thing you definitely could do yourself.', 'Claude is your co-pilot. You\'re doing 90 in a 60.', 'You iterate by shipping. Classic.'],
  ['You have opinions. Claude learns them quickly.', 'You give Claude precise briefs. No wiggle room.', 'You notice the 4px misalignment. So does Claude.', 'You make every project a little more beautiful than it needs to be.', 'You take breaks at the right moment. Claude stays ready.'],
  ['You know what you want and you say so.', 'You don\'t explain yourself twice.', 'You catch what Claude misses. Every time.', 'You and Claude move at the same speed: fast.', 'You don\'t overthink. Claude follows your lead.'],
  ['You think before you prompt. Claude appreciates that.', 'You build deliberately. Claude matches your pace.', 'You ask the uncomfortable question in the prompt.', 'Your work is considered. Claude\'s output reflects it.', 'You\'re the most intentional person in any Figma file.'],
  ['You ask Claude, get the answer, ship it, done.', 'You work at speed. Claude can barely keep up.', 'You move so fast you prompt while thinking.', 'Efficiency is your love language.', 'You stay cool. Claude stays useful.'],
  // New 10
  ['Every detail is load-bearing and you know it.', 'You build things in the right order. Claude tries to keep up.', 'You notice what others skim. Then fix it.', 'Your precision is someone else\'s delight.', 'Careful, thorough, correct. In that order.'],
  ['You connect three unrelated things and somehow it works.', 'You work through a problem by saying it out loud (to Claude).', 'You ask questions that make Claude reconsider its priors.', 'You come up with the idea, Claude builds the prototype.', 'Your calm is suspicious. Your output isn\'t.'],
  ['You already know the answer. You\'re just confirming.', 'You work best when the problem is fully defined. Claude helps define it.', 'You ask good questions because you ask hard ones.', 'You and Claude have mutual respect. It shows.', 'No nonsense. Good output. Every time.'],
  ['You have all the context. Claude just needs the first sentence.', 'You front-load information. Claude runs with it.', 'You ask \'wait, is there a faster way?\' and there usually is.', 'You generate more ideas per hour than most teams.', 'You move through problems like they owe you something.'],
  ['You ship. You don\'t apologize for it.', 'You know the cost of waiting. So you don\'t.', 'You\'ve been called intense. You call it focused.', 'You move first and calibrate after. It works.', 'Velocity is your competitive advantage.'],
  ['You\'ve written a doc for this. Claude has read it.', 'You over-prepare on purpose. It pays off.', 'You ask Claude to check your logic, not do your thinking.', 'You document everything. Claude quotes it back at you.', 'You work quietly. Your output speaks loudly.'],
  ['You\'re winging it with strategy.', 'You adapt mid-task better than most people plan upfront.', 'You ask \'what if\' more than \'what now\'.', 'You\'re fun to watch work. Somehow it always comes together.', 'Relaxed energy. Reliable output.'],
  ['You care deeply and you show it in the details.', 'You work with feeling. Claude helps you channel it.', 'You ask Claude if it thinks it\'s pretty too.', 'You sweat every pixel and the pixels know it.', 'You make beautiful things and make sure everyone knows they took effort.'],
  ['You have a system. Several, actually.', 'You move fast because you\'ve thought ahead. Way ahead.', 'You ask Claude for the thing you\'ve already half-built.', 'You\'re always three steps ahead. Claude catches up.', 'You run at a different frequency and it shows.'],
  ['You\'ve already thought of the edge cases.', 'You plan for the scenario nobody else considered.', 'You ask Claude \'but what if X happens?\' for every X.', 'You\'re calm because you\'re ready. For everything.', 'Prepared, thorough, quietly unstoppable.'],
];

// ── State ─────────────────────────────────────────────────

let currentStep = 0;
let answers = [];

// ── DOM refs ──────────────────────────────────────────────

const screenWelcome   = document.getElementById('screen-welcome');
const screenQuiz      = document.getElementById('screen-quiz');
const screenResult    = document.getElementById('screen-result');
const startBtn        = document.getElementById('start-btn');
const progressFill    = document.getElementById('progress-fill');
const progressLabel   = document.getElementById('progress-label');
const questionArea    = document.getElementById('question-area');
const freeformArea    = document.getElementById('freeform-area');
const freeformInput   = document.getElementById('freeform-input');
const freeformNextBtn = document.getElementById('freeform-next');
const resultCharacter = document.getElementById('result-character');
const colorTag        = document.getElementById('color-tag');
const resultFlavor    = document.getElementById('result-flavor');
const claudeOutput    = document.getElementById('claude-output');
const copyClaude      = document.getElementById('copy-claude-btn');
const shareBtn        = document.getElementById('share-btn');
const retakeBtn       = document.getElementById('retake-btn');
const shareToast      = document.getElementById('share-toast');
const welcomeBlob     = document.getElementById('welcome-blob');
const freeformChips   = document.querySelectorAll('.freeform-chip');

// ── Init welcome blob (random-ish) ────────────────────────

welcomeBlob.innerHTML = generateCharacterSVG(0, 0, 1);

// ── Show / hide screens ───────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── Quiz ──────────────────────────────────────────────────

function renderQuestion(index) {
  const q = QUESTIONS[index];
  questionArea.hidden = false;
  freeformArea.hidden = true;

  // Update progress
  const pct = ((index) / (QUESTIONS.length + 1)) * 100;
  progressFill.style.width = `${pct}%`;
  progressLabel.textContent = `${index + 1} of ${QUESTIONS.length + 1}`;

  questionArea.innerHTML = `
    <h2 class="question-text">${q.text}</h2>
    <div class="answers-grid">
      ${q.answers.map((a, i) => `
        <button class="answer-btn" data-index="${i}">
          <span class="answer-emoji">${a.emoji}</span>
          <span>${a.text}</span>
        </button>
      `).join('')}
    </div>
  `;

  questionArea.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const chosen = parseInt(btn.dataset.index);
      answers[index] = chosen;

      // Flash selected state briefly before advancing
      btn.classList.add('selected');
      setTimeout(() => advance(), 280);
    });
  });
}

function renderFreeform() {
  questionArea.hidden = true;
  freeformArea.hidden = false;

  progressFill.style.width = `${(QUESTIONS.length / (QUESTIONS.length + 1)) * 100}%`;
  progressLabel.textContent = `${QUESTIONS.length + 1} of ${QUESTIONS.length + 1}`;
}

function advance() {
  currentStep++;
  if (currentStep < QUESTIONS.length) {
    renderQuestion(currentStep);
  } else {
    renderFreeform();
  }
}

startBtn.addEventListener('click', () => {
  answers = [];
  currentStep = 0;
  showScreen('screen-quiz');
  renderQuestion(0);
});

freeformNextBtn.addEventListener('click', () => {
  showResult();
});

// ── Freeform chips ────────────────────────────────────────

freeformChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const prompt = chip.textContent;
    const current = freeformInput.value;
    if (current && !current.endsWith(' ')) {
      freeformInput.value = current + ' ';
    }
    freeformInput.focus();
  });
});

// ── Sparkle burst ─────────────────────────────────────────

function burstSparkles(container, color) {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  angles.forEach((angle, i) => {
    const el = document.createElement('div');
    el.className = 'sparkle';
    el.style.setProperty('--angle', `${angle}deg`);
    el.style.setProperty('--color', color);
    el.style.animationDelay = `${i * 30}ms`;
    container.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  });
}

// ── Show result ───────────────────────────────────────────

function showResult() {
  const { colorIndex, expressionIndex, accessoryIndex, shapeIndex } = getCharacter(answers, freeformInput.value);
  const c = COLORS[colorIndex];
  const freeformText = freeformInput.value.trim();

  // Reset animation classes
  resultCharacter.classList.remove('character-reveal');
  colorTag.classList.remove('reveal-tag');
  resultFlavor.classList.remove('reveal-flavor');
  document.querySelector('.result-claude-section').classList.remove('reveal-card');

  // Set content
  resultCharacter.innerHTML = generateCharacterSVG(colorIndex, expressionIndex, accessoryIndex, shapeIndex);
  colorTag.textContent = c.name;
  colorTag.style.background = c.body;
  resultFlavor.textContent = FLAVOR_LINES[colorIndex][expressionIndex];
  claudeOutput.textContent = buildClaudeMD(answers, freeformText);

  progressFill.style.width = '100%';
  showScreen('screen-result');

  // Staggered reveal animations
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      resultCharacter.classList.add('character-reveal');

      setTimeout(() => burstSparkles(document.querySelector('.result-character-wrap'), c.body), 300);
      setTimeout(() => colorTag.classList.add('reveal-tag'), 400);
      setTimeout(() => resultFlavor.classList.add('reveal-flavor'), 550);
      setTimeout(() => document.querySelector('.result-claude-section').classList.add('reveal-card'), 700);
    });
  });
}

// ── Copy CLAUDE.md ────────────────────────────────────────

copyClaude.addEventListener('click', () => {
  navigator.clipboard.writeText(claudeOutput.textContent).then(() => {
    copyClaude.textContent = 'Copied!';
    copyClaude.classList.add('copied');
    setTimeout(() => {
      copyClaude.textContent = 'Copy';
      copyClaude.classList.remove('copied');
    }, 1800);
  });
});

// ── Postcard ──────────────────────────────────────────────

const postcardModal    = document.getElementById('postcard-modal');
const postcardCard     = document.getElementById('postcard-card');
const postcardCharEl   = document.getElementById('postcard-character');
const postcardNameEl   = document.getElementById('postcard-name');
const postcardFlavorEl = document.getElementById('postcard-flavor');
const postcardCopyBtn  = document.getElementById('postcard-copy-btn');
const postcardCloseBtn = document.getElementById('postcard-close-btn');

shareBtn.addEventListener('click', () => {
  const { colorIndex, expressionIndex, accessoryIndex, shapeIndex } = getCharacter(answers, freeformInput.value);
  const c = COLORS[colorIndex];

  // Populate postcard
  postcardCharEl.innerHTML = generateCharacterSVG(colorIndex, expressionIndex, accessoryIndex, shapeIndex);
  postcardNameEl.textContent = c.name;
  postcardFlavorEl.textContent = FLAVOR_LINES[colorIndex][expressionIndex];

  // Set gradient background using character colors
  postcardCard.style.background =
    `linear-gradient(145deg, ${c.highlight} 0%, ${c.body} 45%, ${c.shadow} 100%)`;

  postcardModal.hidden = false;
});

postcardCloseBtn.addEventListener('click', () => {
  postcardModal.hidden = true;
});

postcardModal.querySelector('.postcard-backdrop').addEventListener('click', () => {
  postcardModal.hidden = true;
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !postcardModal.hidden) postcardModal.hidden = true;
});

postcardCopyBtn.addEventListener('click', () => {
  const { colorIndex, expressionIndex, accessoryIndex, shapeIndex } = getCharacter(answers, freeformInput.value);
  const params = new URLSearchParams({ c: colorIndex, e: expressionIndex, a: accessoryIndex, s: shapeIndex });
  const url = `${location.origin}${location.pathname}?${params}`;
  navigator.clipboard.writeText(url).then(() => {
    postcardCopyBtn.textContent = 'Copied!';
    setTimeout(() => { postcardCopyBtn.textContent = 'Copy link'; }, 1800);
  });
});

function showToast(msg) {
  shareToast.textContent = msg;
  shareToast.hidden = false;
  setTimeout(() => {
    shareToast.hidden = true;
  }, 2500);
}

// ── Retake ────────────────────────────────────────────────

retakeBtn.addEventListener('click', () => {
  answers = [];
  currentStep = 0;
  freeformInput.value = '';
  resultCharacter.classList.remove('character-reveal');
  showScreen('screen-welcome');
});

// ── How-to tabs ───────────────────────────────────────────

document.querySelectorAll('.how-to-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.how-to-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.how-to-panel').forEach(p => p.hidden = true);
    tab.classList.add('active');
    document.getElementById(`tab-${tab.dataset.tab}`).hidden = false;
  });
});

// ── Load shared character from URL ───────────────────────

(function loadFromURL() {
  const p = new URLSearchParams(location.search);
  if (p.get('g')) return; // group URL handled by loadGroupFromURL
  const c = p.get('c');
  const e = p.get('e');
  const a = p.get('a');
  if (c === null || e === null || a === null) return;

  const colorIndex      = parseInt(c) % 20;
  const expressionIndex = parseInt(e) % 5;
  const accessoryIndex  = parseInt(a) % 5;
  const shapeIndex      = parseInt(p.get('s') || '0') % 5;
  const col = COLORS[colorIndex];

  // Populate shared card
  document.getElementById('shared-character').innerHTML =
    generateCharacterSVG(colorIndex, expressionIndex, accessoryIndex, shapeIndex);
  document.getElementById('shared-name').textContent    = col.name;
  document.getElementById('shared-flavor').textContent  = FLAVOR_LINES[colorIndex][expressionIndex];

  // Set card + background gradient
  const grad = `linear-gradient(145deg, ${col.highlight} 0%, ${col.body} 45%, ${col.shadow} 100%)`;
  document.getElementById('shared-card').style.background = grad;
  document.getElementById('shared-bg').style.background   =
    `linear-gradient(160deg, ${col.highlight}55 0%, ${col.body}33 50%, ${col.shadow}22 100%)`;

  showScreen('screen-shared');
})();

// ── Group Picture ──────────────────────────────────────────

let groupMembers = [];

const groupStage    = document.getElementById('group-stage');
const groupUrlInput = document.getElementById('group-url-input');
const groupAddBtn   = document.getElementById('group-add-btn');
const groupLinkBtn  = document.getElementById('group-link-btn');
const groupBackBtn  = document.getElementById('group-back-btn');
const groupError    = document.getElementById('group-error');
const groupPicBtn   = document.getElementById('group-pic-btn');

function renderGroupStage(animateLastIdx = -1) {
  if (groupMembers.length === 0) {
    groupStage.innerHTML = '<p class="group-empty">Your character will appear here</p>';
    return;
  }
  groupStage.innerHTML = groupMembers.map(({ colorIndex, expressionIndex, accessoryIndex, shapeIndex }, i) => {
    const c   = COLORS[colorIndex];
    const svg = generateCharacterSVG(colorIndex, expressionIndex, accessoryIndex, shapeIndex);
    const isNew = i === animateLastIdx ? ' new-member' : '';
    return `<div class="group-member bobbing${isNew}">
      ${svg}
      <span class="group-member-name">${c.name}</span>
    </div>`;
  }).join('');
}

// Open group screen from result screen
groupPicBtn.addEventListener('click', () => {
  const { colorIndex, expressionIndex, accessoryIndex, shapeIndex } =
    getCharacter(answers, freeformInput.value);
  groupMembers = [{ colorIndex, expressionIndex, accessoryIndex, shapeIndex }];
  renderGroupStage(0);
  document.getElementById('group-subtitle').textContent = 'Paste a friend\'s link to add them';
  showScreen('screen-group');
});

// Add a friend by pasting their share link
groupAddBtn.addEventListener('click', addFromInput);
groupUrlInput.addEventListener('keydown', e => { if (e.key === 'Enter') addFromInput(); });

function addFromInput() {
  const raw = groupUrlInput.value.trim();
  if (!raw) return;
  groupError.hidden = true;
  try {
    // Accept full URLs or just query strings
    const search = raw.startsWith('http') ? new URL(raw).search : raw;
    const p = new URLSearchParams(search);
    const c = p.get('c'), e = p.get('e'), a = p.get('a'), s = p.get('s');
    if (c === null || e === null) throw new Error('missing params');
    groupMembers.push({
      colorIndex:      parseInt(c) % 20,
      expressionIndex: parseInt(e) % 5,
      accessoryIndex:  parseInt(a || '0') % 5,
      shapeIndex:      parseInt(s || '0') % 5,
    });
    groupUrlInput.value = '';
    renderGroupStage(groupMembers.length - 1);
  } catch {
    groupError.hidden = false;
    setTimeout(() => { groupError.hidden = true; }, 2500);
  }
}

// Copy group link
groupLinkBtn.addEventListener('click', () => {
  // Format: ?g=c,e,a,s-c,e,a,s-...
  const encoded = groupMembers
    .map(m => `${m.colorIndex},${m.expressionIndex},${m.accessoryIndex},${m.shapeIndex}`)
    .join('-');
  const url = `${location.origin}${location.pathname}?g=${encoded}`;
  navigator.clipboard.writeText(url).then(() => {
    groupLinkBtn.textContent = 'Copied!';
    setTimeout(() => { groupLinkBtn.textContent = 'Copy group link'; }, 1800);
  });
});

groupBackBtn.addEventListener('click', () => {
  showScreen('screen-result');
});

// ── Load group from URL ?g=... ────────────────────────────

(function loadGroupFromURL() {
  const p = new URLSearchParams(location.search);
  const g = p.get('g');
  if (!g) return;

  try {
    const members = g.split('-').map(token => {
      const parts = token.split(',').map(Number);
      return {
        colorIndex:      (parts[0] || 0) % 20,
        expressionIndex: (parts[1] || 0) % 5,
        accessoryIndex:  (parts[2] || 0) % 5,
        shapeIndex:      (parts[3] || 0) % 5,
      };
    });
    if (members.length === 0) return;
    groupMembers = members;
    renderGroupStage();

    // Read-only view: hide input row, back btn; update copy to join CTA
    document.getElementById('group-add-row').hidden = true;
    groupBackBtn.hidden = true;
    groupLinkBtn.textContent = 'Copy group link';
    document.getElementById('group-subtitle').textContent =
      `${members.length} AI ${members.length === 1 ? 'self' : 'selves'} in this crew`;

    showScreen('screen-group');
  } catch { /* malformed URL, ignore */ }
})();

// ── Organic blob animation engine ─────────────────────────
// Replaces CSS @keyframes with continuous sine-wave physics.
// Each blob gets unique params → all move differently, never sync.

const blobPhysics = new WeakMap();

function getBlobPhysics(el) {
  if (!blobPhysics.has(el)) {
    blobPhysics.set(el, {
      phase:    Math.random() * Math.PI * 2,         // random start point
      phase2:   Math.random() * Math.PI * 2,         // independent phase for sway & wobble
      freq:     0.30 + Math.random() * 0.22,         // 0.30–0.52 Hz — slower, heavier
      ampY:     12   + Math.random() * 14,           // 12–26px vertical travel
      ampX:     Math.random() * 7,                   // 0–7px horizontal sway (varies a lot)
      squash:   0.05 + Math.random() * 0.12,         // 0.05–0.17 squash intensity
      wobble:   0.006 + Math.random() * 0.020,       // 0.006–0.026 squishy wobble
      tilt:     0.6  + Math.random() * 2.8,          // 0.6–3.4° tilt range
    });
  }
  return blobPhysics.get(el);
}

(function startBlobEngine() {
  const SELECTORS = [
    '.welcome-blob svg',
    '.bobbing svg',
    '.postcard-character',
    '.group-member svg',
  ];

  function tick(ts) {
    const t = ts * 0.001;

    SELECTORS.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        const { phase, phase2, freq, ampY, ampX, squash, wobble, tilt } = getBlobPhysics(el);
        const ω = freq * Math.PI * 2;

        // Primary vertical bounce
        const posY = Math.sin(ω * t + phase);         // –1 top, +1 bottom
        const y    = -posY * ampY;

        // Horizontal sway at incommensurable frequency (never repeats path)
        const x    = Math.sin(ω * 0.37 * t + phase2) * ampX;

        // Squash/stretch from position — each blob has its own intensity
        const scaleY = 1 - posY * squash;
        const scaleX = 1 + posY * (squash * 0.8);

        // Squishy secondary wobble — material memory
        const squeeze = Math.sin(ω * 2.3 * t + phase2 * 1.7) * wobble;

        // Tilt follows arc — wider range per-blob
        const rot = Math.sin(ω * 0.8 * t + phase + 0.5) * tilt;

        el.style.transform =
          `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)` +
          ` scaleX(${(scaleX + squeeze).toFixed(4)})` +
          ` scaleY(${(scaleY - squeeze).toFixed(4)})` +
          ` rotate(${rot.toFixed(2)}deg)`;
      });
    });

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
