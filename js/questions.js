// Question bank. Each daily puzzle draws 5 questions from here.
// lat/lng should point at the venue itself (stadium, track, course...).
// Fields: sport, level (1 easy, 2 medium, 3 hard — how hard the place is to pin),
//         q (question), answer (place shown after guessing),
//         lat, lng, year, fact (short trivia shown on reveal).
window.QUESTIONS = [
  // ───────────── Football ─────────────
  {
    sport: "football", level: 1,
    q: "Liverpool came back from 3-0 down at half-time to beat AC Milan in the 2005 Champions League final. Where?",
    answer: "Atatürk Olympic Stadium, Istanbul",
    lat: 41.0745, lng: 28.7656, year: 2005,
    fact: "Jerzy Dudek's 'spaghetti legs' helped Liverpool win the shoot-out 3-2."
  },
  {
    sport: "football", level: 2,
    q: "Manchester United scored twice in injury time to beat Bayern Munich in the 1999 Champions League final. Where?",
    answer: "Camp Nou, Barcelona",
    lat: 41.3809, lng: 2.1228, year: 1999,
    fact: "Sheringham and Solskjær scored in the 91st and 93rd minutes to seal the treble."
  },
  {
    sport: "football", level: 1,
    q: "Where did Greece shock Portugal to win the Euro 2004 final?",
    answer: "Estádio da Luz, Lisbon",
    lat: 38.7527, lng: -9.1847, year: 2004,
    fact: "Angelos Charisteas headed the only goal. Greece had also beaten Portugal in the opening game."
  },
  {
    sport: "football", level: 2,
    q: "Denmark only qualified for Euro 1992 as a late replacement — and then won it. Where was the final?",
    answer: "Ullevi, Gothenburg",
    lat: 57.7058, lng: 11.9873, year: 1992,
    fact: "Denmark replaced Yugoslavia ten days before the tournament and beat Germany 2-0 in the final."
  },
  {
    sport: "football", level: 1,
    q: "England's only World Cup triumph came in 1966. Where was the final played?",
    answer: "Wembley Stadium, London",
    lat: 51.556, lng: -0.2796, year: 1966,
    fact: "Geoff Hurst scored a hat-trick — a feat only matched in a men's final by Kylian Mbappé in 2022."
  },
  {
    sport: "football", level: 3,
    q: "Antonín Panenka chipped the decisive penalty to win Euro 1976 for Czechoslovakia. In which stadium?",
    answer: "Red Star Stadium (Marakana), Belgrade",
    lat: 44.7833, lng: 20.4647, year: 1976,
    fact: "It was the first major international final decided by a penalty shoot-out."
  },
  {
    sport: "football", level: 2,
    q: "Zinedine Zidane's career ended with a red card for a headbutt in the 2006 World Cup final. Where?",
    answer: "Olympiastadion, Berlin",
    lat: 52.5147, lng: 13.2395, year: 2006,
    fact: "Italy went on to beat France 5-3 on penalties."
  },
  {
    sport: "football", level: 3,
    q: "Goalkeeper Helmuth Duckadam saved four penalties as Steaua Bucharest won the 1986 European Cup. Where?",
    answer: "Estadio Ramón Sánchez-Pizjuán, Seville",
    lat: 37.384, lng: -5.9705, year: 1986,
    fact: "Barcelona were the 'home' favourites — they missed all four of their penalties."
  },
  {
    sport: "football", level: 3,
    q: "Red Star Belgrade became European champions in 1991, beating Marseille on penalties. Where was the final?",
    answer: "Stadio San Nicola, Bari",
    lat: 41.0847, lng: 16.84, year: 1991,
    fact: "The stadium was designed by architect Renzo Piano for the 1990 World Cup."
  },
  {
    sport: "football", level: 3,
    q: "José Mourinho's Porto won the 2004 Champions League final against Monaco. Where was it played?",
    answer: "Arena AufSchalke, Gelsenkirchen",
    lat: 51.5546, lng: 7.0676, year: 2004,
    fact: "Porto won 3-0; Mourinho joined Chelsea a few days later."
  },
  {
    sport: "football", level: 3,
    q: "Iceland knocked England out of Euro 2016 with a famous 2-1 win. Where?",
    answer: "Allianz Riviera, Nice",
    lat: 43.7051, lng: 7.1926, year: 2016,
    fact: "Iceland's 'Viking clap' with their fans became the image of the tournament."
  },
  {
    sport: "football", level: 2,
    q: "Inter Milan completed a historic treble by winning the 2010 Champions League final. Where?",
    answer: "Santiago Bernabéu, Madrid",
    lat: 40.4531, lng: -3.6883, year: 2010,
    fact: "Diego Milito scored both goals against Bayern Munich."
  },
  {
    sport: "football", level: 2,
    q: "Ademola Lookman's hat-trick ended Bayer Leverkusen's 51-game unbeaten run in the 2024 Europa League final. Where?",
    answer: "Aviva Stadium, Dublin",
    lat: 53.3352, lng: -6.2285, year: 2024,
    fact: "It was Atalanta's first ever European trophy."
  },
  {
    sport: "football", level: 2,
    q: "Spain won Euro 2008, their first major title in 44 years, by beating Germany in the final. Where?",
    answer: "Ernst-Happel-Stadion, Vienna",
    lat: 48.2072, lng: 16.4206, year: 2008,
    fact: "Fernando Torres scored the only goal, starting Spain's golden era."
  },
  {
    sport: "football", level: 2,
    q: "Spain thrashed Italy 4-0 in the Euro 2012 final, the biggest win in a Euro final. Where?",
    answer: "Olympic Stadium, Kyiv",
    lat: 50.4333, lng: 30.5217, year: 2012,
    fact: "Spain became the first team to win three major tournaments in a row (Euro, World Cup, Euro)."
  },
  {
    sport: "football", level: 2,
    q: "David Trezeguet's golden goal won Euro 2000 for France against Italy. Where?",
    answer: "De Kuip, Rotterdam",
    lat: 51.8939, lng: 4.5231, year: 2000,
    fact: "Italy were seconds away from winning before Wiltord equalised in stoppage time."
  },
  {
    sport: "football", level: 2,
    q: "West Germany beat Johan Cruyff's Netherlands in the 1974 World Cup final. Where?",
    answer: "Olympiastadion, Munich",
    lat: 48.1731, lng: 11.5466, year: 1974,
    fact: "The Dutch scored a penalty before any German player had even touched the ball."
  },
  {
    sport: "football", level: 2,
    q: "West Germany beat Argentina 1-0 in the 1990 World Cup final. Where?",
    answer: "Stadio Olimpico, Rome",
    lat: 41.9339, lng: 12.4547, year: 1990,
    fact: "Franz Beckenbauer became only the second man to win the World Cup as player and coach."
  },
  {
    sport: "football", level: 3,
    q: "Galatasaray became the first Turkish club to win a European trophy, beating Arsenal in the 2000 UEFA Cup final. Where?",
    answer: "Parken Stadium, Copenhagen",
    lat: 55.7025, lng: 12.5722, year: 2000,
    fact: "Gheorghe Hagi was sent off, but Galatasaray still won 4-1 on penalties."
  },
  {
    sport: "football", level: 3,
    q: "The Faroe Islands beat Austria 1-0 in their first ever competitive match (1990). Their 'home' game was played in another country. Where?",
    answer: "Landskrona, Sweden",
    lat: 55.8708, lng: 12.8301, year: 1990,
    fact: "The Faroes had no grass pitch at the time; their goalkeeper famously wore a woolly bobble hat."
  },
  {
    sport: "football", level: 3,
    q: "Hal Robson-Kanu's 'Cruyff turn' goal helped Wales beat Belgium 3-1 in the Euro 2016 quarter-final. Where?",
    answer: "Stade Pierre-Mauroy, Lille",
    lat: 50.6119, lng: 3.1305, year: 2016,
    fact: "Wales reached their first ever major semi-final."
  },
  {
    sport: "football", level: 2,
    q: "The first official international football match, Scotland vs England, was played in 1872. Where?",
    answer: "Hamilton Crescent, Partick (Glasgow)",
    lat: 55.871, lng: -4.303, year: 1872,
    fact: "It finished 0-0 and was watched by around 4,000 spectators. The ground is now a cricket club."
  },
  {
    sport: "football", level: 2,
    q: "Real Madrid won the very first European Cup final in 1956, coming back from 2-0 down to win 4-3. Where?",
    answer: "Parc des Princes, Paris",
    lat: 48.8414, lng: 2.253, year: 1956,
    fact: "Real Madrid went on to win the first five European Cups in a row."
  },
  {
    sport: "football", level: 1,
    q: "The 'Yellow Wall', Europe's largest standing terrace, is in which stadium?",
    answer: "Signal Iduna Park, Dortmund",
    lat: 51.4926, lng: 7.4519, year: 1974,
    fact: "The Südtribüne holds about 25,000 standing fans."
  },
  {
    sport: "football", level: 2,
    q: "Hungary beat England 7-1 in 1954, still England's heaviest ever defeat. Where?",
    answer: "Népstadion (now Puskás Aréna), Budapest",
    lat: 47.503, lng: 19.098, year: 1954,
    fact: "It came only six months after Hungary's famous 6-3 win at Wembley."
  },
  {
    sport: "football", level: 3,
    q: "During the 1914 Christmas Truce, British and German soldiers famously played football in no man's land. Near which town?",
    answer: "Ploegsteert / Messines, near Ypres (Belgium)",
    lat: 50.738, lng: 2.88, year: 1914,
    fact: "A memorial to the truce matches stands near Saint-Yvon, in the Ploegsteert area."
  },
  {
    sport: "football", level: 3,
    q: "Germany beat Brazil 7-1 in the 2014 World Cup semi-final. Where?",
    answer: "Estádio Mineirão, Belo Horizonte",
    lat: -19.8658, lng: -43.9711, year: 2014,
    fact: "Germany scored four goals in six minutes in the first half."
  },
  {
    sport: "football", level: 1,
    q: "Argentina beat France on penalties after a 3-3 draw in the 2022 World Cup final. Where?",
    answer: "Lusail Stadium, Qatar",
    lat: 25.4207, lng: 51.4904, year: 2022,
    fact: "Kylian Mbappé scored a hat-trick and still ended up on the losing side."
  },
  {
    sport: "football", level: 1,
    q: "Ajax won their first European Cup in 1971 and their latest Champions League in 1995. Where is the club's current home?",
    answer: "Johan Cruijff ArenA, Amsterdam",
    lat: 52.3143, lng: 4.9419, year: 1996,
    fact: "It was renamed in 2018 in honour of Johan Cruyff, who died in 2016."
  },

  // ───────────── Tennis ─────────────
  {
    sport: "tennis", level: 1,
    q: "John Isner and Nicolas Mahut played the longest tennis match ever (11 hours, 5 minutes) in 2010. Where?",
    answer: "All England Club, Wimbledon",
    lat: 51.434, lng: -0.2143, year: 2010,
    fact: "The fifth set alone finished 70-68 and lasted over three days."
  },
  {
    sport: "tennis", level: 1,
    q: "Rafael Nadal won a record 14 titles at this Grand Slam venue. Where is it?",
    answer: "Stade Roland-Garros, Paris",
    lat: 48.847, lng: 2.2494, year: 2022,
    fact: "Nadal's record there was 112 wins and just 4 defeats."
  },
  {
    sport: "tennis", level: 2,
    q: "Roger Federer played his final professional match, a doubles with Rafael Nadal, at the 2022 Laver Cup. Where?",
    answer: "The O2 Arena, London",
    lat: 51.503, lng: 0.0032, year: 2022,
    fact: "The picture of Federer and Nadal crying side by side went around the world."
  },
  {
    sport: "tennis", level: 2,
    q: "Rafael Nadal was born, still lives and has his tennis academy in which town?",
    answer: "Manacor, Mallorca",
    lat: 39.5696, lng: 3.2096, year: 2016,
    fact: "The Rafa Nadal Academy opened in Manacor in 2016."
  },

  // ───────────── Cycling ─────────────
  {
    sport: "cycling", level: 2,
    q: "Because of the Paris Olympics, the 2024 Tour de France finished outside Paris for the first time. Where?",
    answer: "Nice",
    lat: 43.695, lng: 7.265, year: 2024,
    fact: "It finished with a time trial won by Tadej Pogačar, who also won the Tour."
  },
  {
    sport: "cycling", level: 2,
    q: "Which legendary Tour de France climb is famous for its 21 numbered hairpin bends?",
    answer: "Alpe d'Huez",
    lat: 45.092, lng: 6.07, year: 1952,
    fact: "Each hairpin carries a plaque honouring past stage winners."
  },
  {
    sport: "cycling", level: 2,
    q: "The 2022 Tour de France had its Grand Départ in the most northern city ever to host the start. Which one?",
    answer: "Copenhagen",
    lat: 55.6761, lng: 12.5683, year: 2022,
    fact: "Denmark's Jonas Vingegaard went on to win that Tour."
  },

  // ───────────── Motorsport ─────────────
  {
    sport: "motorsport", level: 1,
    q: "Which Formula 1 street circuit runs through a tunnel and around a famous harbour?",
    answer: "Circuit de Monaco, Monte Carlo",
    lat: 43.7347, lng: 7.4206, year: 1929,
    fact: "Ayrton Senna won here a record six times."
  },
  {
    sport: "motorsport", level: 2,
    q: "Eau Rouge and Raidillon form one of the most famous corners in motorsport. On which circuit?",
    answer: "Spa-Francorchamps, Belgium",
    lat: 50.4372, lng: 5.9714, year: 1925,
    fact: "Michael Schumacher made his F1 debut at Spa in 1991 and won his first race there a year later."
  },
  {
    sport: "motorsport", level: 1,
    q: "The 'Temple of Speed', where the Tifosi invade the track after every Grand Prix, is where?",
    answer: "Autodromo Nazionale Monza",
    lat: 45.6156, lng: 9.2811, year: 1922,
    fact: "Monza has hosted more F1 world championship races than any other circuit."
  },
  {
    sport: "motorsport", level: 2,
    q: "The very first Formula 1 World Championship race was held in 1950 on a former RAF airfield. Where?",
    answer: "Silverstone, England",
    lat: 52.0786, lng: -1.0169, year: 1950,
    fact: "Giuseppe Farina won the race in an Alfa Romeo."
  },
  {
    sport: "motorsport", level: 2,
    q: "Niki Lauda was nearly killed in a fiery crash in 1976 — and was racing again six weeks later. Where?",
    answer: "Nürburgring Nordschleife",
    lat: 50.3356, lng: 6.9475, year: 1976,
    fact: "Jackie Stewart nicknamed the 20 km Nordschleife 'The Green Hell'."
  },
  {
    sport: "motorsport", level: 1,
    q: "Where is the world's most famous 24-hour endurance race held?",
    answer: "Circuit de la Sarthe, Le Mans",
    lat: 47.956, lng: 0.2077, year: 1923,
    fact: "Porsche hold the record for most overall wins."
  },
  {
    sport: "motorsport", level: 2,
    q: "The TT, the world's oldest and most dangerous motorcycle road race, is held on which island? (Click the start line.)",
    answer: "Snaefell Mountain Course, Douglas, Isle of Man",
    lat: 54.167, lng: -4.482, year: 1907,
    fact: "Riders average over 135 mph on a 37.7-mile lap of public roads."
  },
  {
    sport: "motorsport", level: 2,
    q: "F1 returned in 2021, after 36 years away, to a circuit among the sand dunes. Where?",
    answer: "Circuit Zandvoort, Netherlands",
    lat: 52.3888, lng: 4.5409, year: 2021,
    fact: "The track features banked corners, rare in modern F1."
  },
  {
    sport: "motorsport", level: 2,
    q: "In 1986 F1 held its first Grand Prix behind the Iron Curtain. Where?",
    answer: "Hungaroring, near Budapest",
    lat: 47.5789, lng: 19.2486, year: 1986,
    fact: "Nelson Piquet won the inaugural race in front of around 200,000 fans."
  },
  {
    sport: "motorsport", level: 3,
    q: "MotoGP's 'Cathedral of Speed' has hosted motorcycle Grands Prix every year since 1949. Where is it?",
    answer: "TT Circuit Assen, Netherlands",
    lat: 52.9614, lng: 6.5236, year: 1949,
    fact: "It's the only circuit to have held a round of every MotoGP season since the championship began."
  },
  {
    sport: "motorsport", level: 3,
    q: "Valentino Rossi won seven consecutive MotoGP races here, from 2002 to 2008. Which circuit?",
    answer: "Mugello Circuit, Scarperia",
    lat: 43.9975, lng: 11.3719, year: 2002,
    fact: "The circuit is owned by Ferrari."
  },

  // ───────────── Athletics & Olympics ─────────────
  {
    sport: "athletics", level: 2,
    q: "Roger Bannister ran the first sub-four-minute mile in 1954. Where?",
    answer: "Iffley Road track, Oxford",
    lat: 51.7488, lng: -1.2367, year: 1954,
    fact: "He clocked 3:59.4 while still a medical student."
  },
  {
    sport: "athletics", level: 2,
    q: "Usain Bolt set the 100 m world record of 9.58 seconds at the 2009 World Championships. Where?",
    answer: "Olympiastadion, Berlin",
    lat: 52.5147, lng: 13.2395, year: 2009,
    fact: "Four days later, in the same stadium, he also set the 200 m record of 19.19."
  },
  {
    sport: "athletics", level: 2,
    q: "Eliud Kipchoge became the first person to run a marathon in under two hours in 2019. In which city?",
    answer: "Prater park, Vienna",
    lat: 48.2167, lng: 16.4167, year: 2019,
    fact: "He ran 1:59:40 on a flat loop of the Prater's Hauptallee. It's not an official record."
  },
  {
    sport: "olympics", level: 1,
    q: "The first modern Olympic Games in 1896 were held in a stadium built entirely of marble. Where?",
    answer: "Panathenaic Stadium, Athens",
    lat: 37.9683, lng: 23.7411, year: 1896,
    fact: "It's the only major stadium in the world built entirely of marble."
  },
  {
    sport: "olympics", level: 2,
    q: "Where were the Ancient Olympic Games held, from 776 BC onwards?",
    answer: "Olympia, Greece",
    lat: 37.6383, lng: 21.63, year: -776,
    fact: "The Olympic flame is still lit there using the sun's rays before every Games."
  },
  {
    sport: "olympics", level: 1,
    q: "Abebe Bikila won the 1960 Olympic marathon running barefoot. Where was the finish line?",
    answer: "Arch of Constantine, Rome",
    lat: 41.8898, lng: 12.4906, year: 1960,
    fact: "He became the first sub-Saharan African to win Olympic gold."
  },
  {
    sport: "olympics", level: 2,
    q: "Emil Zátopek won the 5,000 m, 10,000 m and marathon at the same Olympics in 1952. Where?",
    answer: "Helsinki Olympic Stadium",
    lat: 60.187, lng: 24.927, year: 1952,
    fact: "It was the first marathon he had ever run."
  },
  {
    sport: "olympics", level: 2,
    q: "Romanian gymnast Nadia Comăneci scored the first perfect 10 in Olympic history in 1976. Where?",
    answer: "Montreal Forum, Canada",
    lat: 45.4899, lng: -73.5872, year: 1976,
    fact: "The scoreboard showed '1.00' because it could only display three digits."
  },

  // ───────────── Winter sports ─────────────
  {
    sport: "winter", level: 2,
    q: "The Streif, the most feared downhill in alpine skiing, hosts the Hahnenkamm race every January. Where?",
    answer: "Kitzbühel, Austria",
    lat: 47.4467, lng: 12.3917, year: 1937,
    fact: "Its 'Mausefalle' jump sends skiers flying up to 80 m."
  },
  {
    sport: "winter", level: 1,
    q: "Which iconic ski jump has hosted competitions since 1892?",
    answer: "Holmenkollbakken, Oslo",
    lat: 59.9636, lng: 10.6672, year: 1892,
    fact: "More than 100,000 spectators watched the jumping at the 1952 Winter Olympics there."
  },
  {
    sport: "winter", level: 3,
    q: "The Four Hills Tournament begins every December in which village?",
    answer: "Oberstdorf, Germany",
    lat: 47.4097, lng: 10.2789, year: 1953,
    fact: "It continues in Garmisch-Partenkirchen, Innsbruck and Bischofshofen."
  },
  {
    sport: "winter", level: 3,
    q: "The first ski jump of over 100 metres was made here in 1936; today jumpers fly over 250 metres. Where?",
    answer: "Planica, Slovenia",
    lat: 46.4797, lng: 13.7231, year: 1934,
    fact: "The first jump of over 100 m was made here in 1936."
  },
  {
    sport: "winter", level: 3,
    q: "The Vasaloppet, the world's oldest and biggest cross-country ski race, finishes in which town?",
    answer: "Mora, Sweden",
    lat: 61.007, lng: 14.543, year: 1922,
    fact: "The 90 km race from Sälen follows the route of King Gustav Vasa in 1520."
  },
  {
    sport: "winter", level: 2,
    q: "Where were the very first Winter Olympics held, in 1924?",
    answer: "Chamonix, France",
    lat: 45.9237, lng: 6.8694, year: 1924,
    fact: "At the time it was called 'International Winter Sports Week'."
  },
  {
    sport: "winter", level: 2,
    q: "Torvill and Dean scored perfect 6.0s across the board with their 'Boléro' at the 1984 Winter Olympics. Where?",
    answer: "Zetra Olympic Hall, Sarajevo",
    lat: 43.8676, lng: 18.4115, year: 1984,
    fact: "Their routine was watched by 24 million TV viewers in the UK."
  },
  {
    sport: "winter", level: 2,
    q: "What many call the best Winter Olympics ever were held in 1994, in a small town of around 25,000 people. Which one?",
    answer: "Lillehammer, Norway",
    lat: 61.1153, lng: 10.4662, year: 1994,
    fact: "Norway won more medals than any other nation: 26."
  },
  {
    sport: "winter", level: 2,
    q: "The Cresta Run, a head-first toboggan track built in 1884, is in which glamorous resort?",
    answer: "St. Moritz, Switzerland",
    lat: 46.4983, lng: 9.839, year: 1884,
    fact: "Riders reach speeds of around 130 km/h lying face-down."
  },
  {
    sport: "winter", level: 3,
    q: "The Lauberhorn is the longest downhill on the World Cup circuit. In which village is it raced?",
    answer: "Wengen, Switzerland",
    lat: 46.605, lng: 7.921, year: 1930,
    fact: "Run times are around 2.5 minutes — the longest on the World Cup."
  },
  {
    sport: "winter", level: 3,
    q: "Speed skating's most famous oval, where dozens of world records have been set, is where?",
    answer: "Thialf, Heerenveen",
    lat: 52.95, lng: 5.935, year: 1967,
    fact: "Heerenveen is in Friesland, the heartland of Dutch skating."
  },
  {
    sport: "winter", level: 3,
    q: "The legendary 200 km Elfstedentocht skating race on frozen canals starts and ends in which city?",
    answer: "Leeuwarden, Netherlands",
    lat: 53.2012, lng: 5.7999, year: 1909,
    fact: "It needs ice at least 15 cm thick everywhere; it was last held in 1997."
  },
  {
    sport: "winter", level: 2,
    q: "Finland won their first ever Ice Hockey World Championship in 1995, beating rivals Sweden in the final. Where?",
    answer: "Globen, Stockholm",
    lat: 59.2936, lng: 18.0833, year: 1995,
    fact: "Ville Peltonen scored a hat-trick in the 4-1 win."
  },

  // ───────────── Rugby ─────────────
  {
    sport: "rugby", level: 1,
    q: "Jonny Wilkinson's last-minute drop goal won England the 2003 Rugby World Cup. Where?",
    answer: "Stadium Australia, Sydney",
    lat: -33.8471, lng: 151.0634, year: 2003,
    fact: "It came with 26 seconds of extra time remaining, kicked with his weaker right foot."
  },
  {
    sport: "rugby", level: 1,
    q: "The largest dedicated rugby union stadium in the world is where?",
    answer: "Twickenham Stadium, London",
    lat: 51.456, lng: -0.3415, year: 1909,
    fact: "It's nicknamed 'The Cabbage Patch' because the land was a market garden."
  },
  {
    sport: "rugby", level: 1,
    q: "A national rugby stadium with a retractable roof, right in a city centre, hosted the 1999 Rugby World Cup final. Where?",
    answer: "Principality (Millennium) Stadium, Cardiff",
    lat: 51.4782, lng: -3.1826, year: 1999,
    fact: "It opened in time to host the 1999 Rugby World Cup final."
  },

  // ───────────── Golf ─────────────
  {
    sport: "golf", level: 1,
    q: "Which course is known as 'The Home of Golf'?",
    answer: "Old Course, St Andrews",
    lat: 56.3433, lng: -2.803, year: 1552,
    fact: "Golf has been played there since at least the 15th century."
  },
  {
    sport: "golf", level: 3,
    q: "In 1997 the Ryder Cup was held in continental Europe for the first time. Where?",
    answer: "Valderrama, Sotogrande (Spain)",
    lat: 36.295, lng: -5.3, year: 1997,
    fact: "Seve Ballesteros captained Europe to victory."
  },
  {
    sport: "golf", level: 3,
    q: "Jean van de Velde famously waded into the Barry Burn and threw away the 1999 Open. Where?",
    answer: "Carnoustie, Scotland",
    lat: 56.497, lng: -2.715, year: 1999,
    fact: "He needed only a double bogey on the last hole to win, but made a triple."
  },
  {
    sport: "golf", level: 3,
    q: "The very first Open Championship was played in 1860 on a 12-hole course. Where?",
    answer: "Prestwick Golf Club, Scotland",
    lat: 55.495, lng: -4.615, year: 1860,
    fact: "Willie Park Sr. won; the prize was a red leather belt."
  },

  // ───────────── Cricket ─────────────
  {
    sport: "cricket", level: 1,
    q: "Which ground is known as 'The Home of Cricket'?",
    answer: "Lord's Cricket Ground, St John's Wood",
    lat: 51.5297, lng: -0.1729, year: 1814,
    fact: "Lord's has a noticeable slope: about 2.5 m from one side to the other."
  },
  {
    sport: "cricket", level: 1,
    q: "Australia's first Test win in 1882 led to a mock obituary for English cricket — and the birth of The Ashes. Where was it?",
    answer: "The Oval, Kennington (London)",
    lat: 51.4837, lng: -0.115, year: 1882,
    fact: "The Sporting Times wrote that 'the body will be cremated and the ashes taken to Australia'."
  },

  // ───────────── Other sports ─────────────
  {
    sport: "boxing", level: 3,
    q: "Tyson Fury ended Wladimir Klitschko's nine-year reign as heavyweight champion in 2015. Where?",
    answer: "Esprit Arena, Düsseldorf",
    lat: 51.2617, lng: 6.7331, year: 2015,
    fact: "Klitschko had been unbeaten for over 11 years."
  },
  {
    sport: "darts", level: 1,
    q: "The PDC World Darts Championship is held every winter at the 'People's Palace'. Where?",
    answer: "Alexandra Palace, London",
    lat: 51.5942, lng: -0.131, year: 2008,
    fact: "In 2024, 16-year-old Luke Littler reached the final there on his debut."
  },
  {
    sport: "snooker", level: 2,
    q: "The World Snooker Championship has been held at the same theatre since 1977. Where?",
    answer: "Crucible Theatre, Sheffield",
    lat: 53.38, lng: -1.467, year: 1977,
    fact: "Ronnie O'Sullivan and Stephen Hendry have each won seven world titles in the modern era."
  },
  {
    sport: "horse racing", level: 1,
    q: "Where is the Grand National, the world's most famous steeplechase, run?",
    answer: "Aintree Racecourse, Liverpool",
    lat: 53.477, lng: -2.945, year: 1839,
    fact: "Red Rum won it a record three times (1973, 1974, 1977)."
  },
  {
    sport: "horse racing", level: 1,
    q: "Twice every summer, riders race bareback around a medieval piazza in the Palio. In which city?",
    answer: "Piazza del Campo, Siena",
    lat: 43.3184, lng: 11.3316, year: 1633,
    fact: "A horse can win without its rider (a 'cavallo scosso')."
  },
  {
    sport: "equestrian", level: 3,
    q: "The famous horse trials — and the sport of badminton — take their name from a country estate. Where?",
    answer: "Badminton House, Gloucestershire",
    lat: 51.544, lng: -2.284, year: 1949,
    fact: "Badminton the racket sport was popularised by guests at the house in the 1870s."
  }
];
