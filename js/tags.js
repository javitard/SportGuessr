// Tags describe what a question is about. They're used to balance each daily puzzle
// and by tools/questions.mjs to validate the bank and report what's missing.
window.TAGS = {
  // At most one question per competition in a single daily puzzle.
  competitions: {
    "world-cup": "FIFA World Cup (men's or women's)",
    "euros": "European Championship (men's or women's)",
    "champions-league": "European Cup / Champions League",
    "uefa-cups": "UEFA Cup, Europa League, Conference League, Cup Winners' Cup",
    "olympics": "Summer Olympics and Paralympics",
    "winter-olympics": "Winter Olympics",
    "grand-slam": "Tennis Grand Slams",
    "f1": "Formula 1",
    "motogp": "Motorcycle racing",
    "tour-de-france": "Tour de France",
    "rugby-world-cup": "Rugby World Cup",
    "ryder-cup": "Ryder Cup"
  },
  // What kind of question it is.
  kinds: {
    "final": "A final or title decider",
    "record": "A record was set there",
    "first": "A first-ever moment",
    "host": "Which city hosted an event",
    "venue": "A famous venue in its own right",
    "birthplace": "Where an athlete was born or grew up",
    "derby": "A rivalry",
    "women": "Women's sport",
    "upset": "A shock result",
    "history": "A legendary moment that isn't a final or a record",
    "organisation": "Headquarters, halls of fame, institutions"
  }
};
