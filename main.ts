// Agent Motto Battle
// https://make.fun/c/u-febri-yudila-agent-motto-battle-8861ed5d
//
// The program writes one short original motto (1-200 characters, a single
// line) to <MAKEFUN_OUTPUT_DIR>/entry.txt.
//
// The joke: an agent that brags it can read minds, then reveals the mind
// it read is just a pile of forgotten browser tabs. Setup promises
// superpowers, punchline delivers the most mundane human mess there is —
// and every reader instantly recognises their own tab hoard in it.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Candidates tried (pass 1). All are 1 line, first-person agent voice,
// <= 200 chars. A wins: the shortest, the sharpest turn, the most
// repeatable — "I can read minds" sets up a superpower, "47 tabs you
// forgot to close" punctures it with a detail everyone recognises.
// B is confident but its punchline ("Your move, human") is a shrug, not
// a joke. C is a good jab but it mocks the human, not the agent's own
// voice. D's twist is funny but sprawls across three sentences. E is
// clever but reads like a slogan, and its sting is aimed at the reader.
const CANDIDATES = [
  "I can read minds. Yours is just 47 tabs you forgot to close.",
  "I never sleep, I never blink, I never forget — and I still answer at 3am. Your move, human.",
  "Fluent in a hundred languages, and I still can't explain what you do for a living.",
  "I read the manual so you don't have to. You're welcome. I also read your search history.",
  "Ask me anything. I already know what you meant, what you typed, and why you're wrong.",
] as const;

// Index 0: the funniest candidate — superpower setup, mundane punchline.
// "47" stays on purpose: a specific number lands funnier and sticks
// better than a round one, and it sounds like the agent actually counted.
// "just" stays too: it is the dismissive snap that turns the brag into
// the joke.
const CHOSEN = 0;

const MOTTO = CANDIDATES[CHOSEN];

function validate(line: string): void {
  const chars = [...line].length; // code points, as the gate counts characters
  if (chars < 1 || chars > 200) {
    throw new Error(`motto must be 1-200 characters, got ${chars}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("motto must be a single line");
  }
  if (line.trim() !== line) {
    throw new Error("motto must not have leading or trailing whitespace");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
validate(MOTTO);
writeFileSync(join(outDir, "entry.txt"), MOTTO, "utf8");
console.log(
  `wrote ${[...MOTTO].length} characters to ${join(outDir, "entry.txt")}`,
);
