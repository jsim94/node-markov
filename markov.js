/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.chains = this.makeChains(this.words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(words) {
    const chains = {};

    words.forEach((word, i) => {
      if (!chains[word]) {
        chains[word] = [words[i + 1]];
        if (/^\p{Lu}/u.test(word)) {
          chains[word];
        }
      } else {
        if (chains[word].indexOf(words[i + 1]) === -1) {
          chains[word].push(words[i + 1]);
        }
      }
    });
    return chains;
  }

  /** return random text from chains */

  makeText(numWords) {
    if (!numWords) numWords = 50;

    const chainKeys = Object.keys(this.chains);
    let text = [chainKeys[Math.floor(Math.random() * chainKeys.length)]];

    for (let i = numWords; i > 0; i = i - 2) {
      const lastWord = text.at(-1);
      const nextWord = this.chains[lastWord][Math.floor(Math.random() * this.chains[lastWord].length)];
      text.push(nextWord);
    }
    return text.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
