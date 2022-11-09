const { MarkovMachine } = require("./markov");

test("testMakeChain", () => {
  const chains = new MarkovMachine("the cat in the hat").chains;
  expect(chains).toBeInstanceOf(Object);
});
