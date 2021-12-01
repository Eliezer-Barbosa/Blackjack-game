const App = () => {
  const deck = [
    { stamp: "A", value: 11 },
    { stamp: "J", value: 10 },
    { stamp: "Q", value: 10 },
    { stamp: "K", value: 10 },
    { stamp: "2", value: 2 },
    { stamp: "3", value: 3 },
    { stamp: "4", value: 4 },
    { stamp: "5", value: 5 },
    { stamp: "6", value: 6 },
    { stamp: "7", value: 7 },
    { stamp: "8", value: 8 },
    { stamp: "9", value: 9 },
    { stamp: "10", value: 10 },
  ];

  const packOfCards = () => {
    return Array(4)
      .fill([...deck])
      .reduce((a, b) => a.concat(b));
  };

  const getACard = () => {
    const card =
      packOfCards()[Math.floor(Math.random() * packOfCards().length)];
    return card;
  };

  console.log(getACard())

  return null
};

export default App;
