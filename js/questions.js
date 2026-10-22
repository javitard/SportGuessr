// Question bank. Each daily puzzle draws 5 questions from here.
// Rule: the question must never name the place (or anything right next to it).
// lat/lng should point at the venue itself (stadium, track, course...).
// Fields: sport, level (1 easy, 2 medium, 3 hard — how hard the place is to pin),
//         q (question), answer (place shown after guessing),
//         lat, lng, year, fact (short trivia shown on reveal),
//         es: { q, answer, fact } — Spanish version of the texts.
window.QUESTIONS = [
  // ───────────── Football ─────────────
  {
    sport: "football", level: 1,
    q: "Liverpool came back from 3-0 down at half-time to beat AC Milan in the 2005 Champions League final. Where?",
    answer: "Atatürk Olympic Stadium, Istanbul",
    lat: 41.0745, lng: 28.7656, year: 2005,
    fact: "Jerzy Dudek's 'spaghetti legs' helped Liverpool win the shoot-out 3-2.",
    es: {
      q: "El Liverpool remontó un 3-0 al descanso para ganar al AC Milan en la final de la Champions de 2005. ¿Dónde?",
      answer: "Estadio Olímpico Atatürk, Estambul",
      fact: "Las 'piernas de espagueti' de Jerzy Dudek ayudaron al Liverpool a ganar la tanda de penaltis 3-2."
    }
  },
  {
    sport: "football", level: 2,
    q: "Manchester United scored twice in injury time to beat Bayern Munich in the 1999 Champions League final. Where?",
    answer: "Camp Nou, Barcelona",
    lat: 41.3809, lng: 2.1228, year: 1999,
    fact: "Sheringham and Solskjær scored in the 91st and 93rd minutes to seal the treble.",
    es: {
      q: "El Manchester United marcó dos goles en el descuento para ganar al Bayern de Múnich en la final de la Champions de 1999. ¿Dónde?",
      answer: "Camp Nou, Barcelona",
      fact: "Sheringham y Solskjær marcaron en los minutos 91 y 93 para cerrar el triplete."
    }
  },
  {
    sport: "football", level: 1,
    q: "Where did Greece shock Portugal to win the Euro 2004 final?",
    answer: "Estádio da Luz, Lisbon",
    lat: 38.7527, lng: -9.1847, year: 2004,
    fact: "Angelos Charisteas headed the only goal. Greece had also beaten Portugal in the opening game.",
    es: {
      q: "¿Dónde sorprendió Grecia a Portugal para ganar la final de la Eurocopa 2004?",
      answer: "Estádio da Luz, Lisboa",
      fact: "Angelos Charisteas marcó de cabeza el único gol. Grecia también había ganado a Portugal en el partido inaugural."
    }
  },
  {
    sport: "football", level: 2,
    q: "Denmark only qualified for Euro 1992 as a late replacement — and then won it. Where was the final?",
    answer: "Ullevi, Gothenburg",
    lat: 57.7058, lng: 11.9873, year: 1992,
    fact: "Denmark replaced Yugoslavia ten days before the tournament and beat Germany 2-0 in the final.",
    es: {
      q: "Dinamarca se clasificó para la Eurocopa de 1992 como sustituta de última hora… y la ganó. ¿Dónde se jugó la final?",
      answer: "Ullevi, Gotemburgo",
      fact: "Dinamarca sustituyó a Yugoslavia diez días antes del torneo y ganó 2-0 a Alemania en la final."
    }
  },
  {
    sport: "football", level: 1,
    q: "England's only World Cup triumph came in 1966. Where was the final played?",
    answer: "Wembley Stadium, London",
    lat: 51.556, lng: -0.2796, year: 1966,
    fact: "Geoff Hurst scored a hat-trick — a feat only matched in a men's final by Kylian Mbappé in 2022.",
    es: {
      q: "El único Mundial de Inglaterra llegó en 1966. ¿Dónde se jugó la final?",
      answer: "Estadio de Wembley, Londres",
      fact: "Geoff Hurst marcó un hat-trick, algo que en una final masculina solo ha igualado Kylian Mbappé en 2022."
    }
  },
  {
    sport: "football", level: 3,
    q: "Antonín Panenka chipped the decisive penalty to win Euro 1976 for Czechoslovakia. In which stadium?",
    answer: "Red Star Stadium (Marakana), Belgrade",
    lat: 44.7833, lng: 20.4647, year: 1976,
    fact: "It was the first major international final decided by a penalty shoot-out.",
    es: {
      q: "Antonín Panenka picó el penalti decisivo que dio la Eurocopa de 1976 a Checoslovaquia. ¿En qué estadio?",
      answer: "Estadio Estrella Roja (Marakana), Belgrado",
      fact: "Fue la primera gran final internacional decidida en una tanda de penaltis."
    }
  },
  {
    sport: "football", level: 2,
    q: "Zinedine Zidane's career ended with a red card for a headbutt in the 2006 World Cup final. Where?",
    answer: "Olympiastadion, Berlin",
    lat: 52.5147, lng: 13.2395, year: 2006,
    fact: "Italy went on to beat France 5-3 on penalties.",
    es: {
      q: "La carrera de Zinedine Zidane terminó con una roja por un cabezazo en la final del Mundial de 2006. ¿Dónde?",
      answer: "Olympiastadion, Berlín",
      fact: "Italia acabó ganando a Francia 5-3 en los penaltis."
    }
  },
  {
    sport: "football", level: 3,
    q: "Goalkeeper Helmuth Duckadam saved four penalties as Steaua Bucharest won the 1986 European Cup. Where?",
    answer: "Estadio Ramón Sánchez-Pizjuán, Seville",
    lat: 37.384, lng: -5.9705, year: 1986,
    fact: "Barcelona were the 'home' favourites — they missed all four of their penalties.",
    es: {
      q: "El portero Helmuth Duckadam paró cuatro penaltis y el Steaua de Bucarest ganó la Copa de Europa de 1986. ¿Dónde?",
      answer: "Estadio Ramón Sánchez-Pizjuán, Sevilla",
      fact: "El Barcelona, casi como local, era el gran favorito y falló sus cuatro penaltis."
    }
  },
  {
    sport: "football", level: 3,
    q: "Red Star Belgrade became European champions in 1991, beating Marseille on penalties. Where was the final?",
    answer: "Stadio San Nicola, Bari",
    lat: 41.0847, lng: 16.84, year: 1991,
    fact: "The stadium was designed by architect Renzo Piano for the 1990 World Cup.",
    es: {
      q: "El Estrella Roja de Belgrado se proclamó campeón de Europa en 1991 ganando al Olympique de Marsella en los penaltis. ¿Dónde fue la final?",
      answer: "Estadio San Nicola, Bari",
      fact: "El estadio lo diseñó el arquitecto Renzo Piano para el Mundial de 1990."
    }
  },
  {
    sport: "football", level: 3,
    q: "José Mourinho's Porto won the 2004 Champions League final against Monaco. Where was it played?",
    answer: "Arena AufSchalke, Gelsenkirchen",
    lat: 51.5546, lng: 7.0676, year: 2004,
    fact: "Porto won 3-0; Mourinho joined Chelsea a few days later.",
    es: {
      q: "El Oporto de José Mourinho ganó la final de la Champions de 2004 al Mónaco. ¿Dónde se jugó?",
      answer: "Arena AufSchalke, Gelsenkirchen",
      fact: "El Oporto ganó 3-0; Mourinho fichó por el Chelsea pocos días después."
    }
  },
  {
    sport: "football", level: 3,
    q: "Iceland knocked England out of Euro 2016 with a famous 2-1 win. Where?",
    answer: "Allianz Riviera, Nice",
    lat: 43.7051, lng: 7.1926, year: 2016,
    fact: "Iceland's 'Viking clap' with their fans became the image of the tournament.",
    es: {
      q: "Islandia eliminó a Inglaterra de la Eurocopa 2016 con una famosa victoria por 2-1. ¿Dónde?",
      answer: "Allianz Riviera, Niza",
      fact: "El 'aplauso vikingo' de los jugadores islandeses con su afición fue la imagen del torneo."
    }
  },
  {
    sport: "football", level: 2,
    q: "Inter Milan completed a historic treble by winning the 2010 Champions League final. Where?",
    answer: "Santiago Bernabéu, Madrid",
    lat: 40.4531, lng: -3.6883, year: 2010,
    fact: "Diego Milito scored both goals against Bayern Munich.",
    es: {
      q: "El Inter de Milán completó un triplete histórico ganando la final de la Champions de 2010. ¿Dónde?",
      answer: "Santiago Bernabéu, Madrid",
      fact: "Diego Milito marcó los dos goles contra el Bayern de Múnich."
    }
  },
  {
    sport: "football", level: 2,
    q: "Ademola Lookman's hat-trick ended Bayer Leverkusen's 51-game unbeaten run in the 2024 Europa League final. Where?",
    answer: "Aviva Stadium, Dublin",
    lat: 53.3352, lng: -6.2285, year: 2024,
    fact: "It was Atalanta's first ever European trophy.",
    es: {
      q: "El hat-trick de Ademola Lookman acabó con la racha de 51 partidos sin perder del Bayer Leverkusen en la final de la Europa League de 2024. ¿Dónde?",
      answer: "Aviva Stadium, Dublín",
      fact: "Fue el primer título europeo de la historia del Atalanta."
    }
  },
  {
    sport: "football", level: 2,
    q: "Spain won Euro 2008, their first major title in 44 years, by beating Germany in the final. Where?",
    answer: "Ernst-Happel-Stadion, Vienna",
    lat: 48.2072, lng: 16.4206, year: 2008,
    fact: "Fernando Torres scored the only goal, starting Spain's golden era.",
    es: {
      q: "España ganó la Eurocopa 2008, su primer gran título en 44 años, venciendo a Alemania en la final. ¿Dónde?",
      answer: "Ernst-Happel-Stadion, Viena",
      fact: "Fernando Torres marcó el único gol y arrancó la época dorada de España."
    }
  },
  {
    sport: "football", level: 2,
    q: "Spain thrashed Italy 4-0 in the Euro 2012 final, the biggest win in a Euro final. Where?",
    answer: "Olympic Stadium, Kyiv",
    lat: 50.4333, lng: 30.5217, year: 2012,
    fact: "Spain became the first team to win three major tournaments in a row (Euro, World Cup, Euro).",
    es: {
      q: "España goleó 4-0 a Italia en la final de la Eurocopa 2012, la mayor victoria en una final de la Eurocopa. ¿Dónde?",
      answer: "Estadio Olímpico, Kiev",
      fact: "España fue la primera selección en ganar tres grandes torneos seguidos (Eurocopa, Mundial y Eurocopa)."
    }
  },
  {
    sport: "football", level: 2,
    q: "David Trezeguet's golden goal won Euro 2000 for France against Italy. Where?",
    answer: "De Kuip, Rotterdam",
    lat: 51.8939, lng: 4.5231, year: 2000,
    fact: "Italy were seconds away from winning before Wiltord equalised in stoppage time.",
    es: {
      q: "El gol de oro de David Trezeguet dio la Eurocopa 2000 a Francia contra Italia. ¿Dónde?",
      answer: "De Kuip, Róterdam",
      fact: "Italia estaba a segundos de ganar cuando Wiltord empató en el descuento."
    }
  },
  {
    sport: "football", level: 2,
    q: "West Germany beat Johan Cruyff's Netherlands in the 1974 World Cup final. Where?",
    answer: "Olympiastadion, Munich",
    lat: 48.1731, lng: 11.5466, year: 1974,
    fact: "The Dutch scored a penalty before any German player had even touched the ball.",
    es: {
      q: "La RFA ganó a la Holanda de Johan Cruyff en la final del Mundial de 1974. ¿Dónde?",
      answer: "Olympiastadion, Múnich",
      fact: "Holanda marcó de penalti antes de que ningún alemán hubiera tocado el balón."
    }
  },
  {
    sport: "football", level: 2,
    q: "West Germany beat Argentina 1-0 in the 1990 World Cup final. Where?",
    answer: "Stadio Olimpico, Rome",
    lat: 41.9339, lng: 12.4547, year: 1990,
    fact: "Franz Beckenbauer became only the second man to win the World Cup as player and coach.",
    es: {
      q: "La RFA ganó 1-0 a Argentina en la final del Mundial de 1990. ¿Dónde?",
      answer: "Estadio Olímpico, Roma",
      fact: "Franz Beckenbauer fue el segundo hombre en ganar el Mundial como jugador y como seleccionador."
    }
  },
  {
    sport: "football", level: 3,
    q: "Galatasaray became the first Turkish club to win a European trophy, beating Arsenal in the 2000 UEFA Cup final. Where?",
    answer: "Parken Stadium, Copenhagen",
    lat: 55.7025, lng: 12.5722, year: 2000,
    fact: "Gheorghe Hagi was sent off, but Galatasaray still won 4-1 on penalties.",
    es: {
      q: "El Galatasaray fue el primer club turco en ganar un título europeo, al Arsenal en la final de la Copa de la UEFA de 2000. ¿Dónde?",
      answer: "Estadio Parken, Copenhague",
      fact: "Gheorghe Hagi fue expulsado, pero el Galatasaray ganó 4-1 en los penaltis."
    }
  },
  {
    sport: "football", level: 3,
    q: "The Faroe Islands beat Austria 1-0 in their first ever competitive match (1990). Their 'home' game was played in another country. Where?",
    answer: "Landskrona, Sweden",
    lat: 55.8708, lng: 12.8301, year: 1990,
    fact: "The Faroes had no grass pitch at the time; their goalkeeper famously wore a woolly bobble hat.",
    es: {
      q: "Las Islas Feroe ganaron 1-0 a Austria en su primer partido oficial (1990). Su partido 'en casa' se jugó en otro país. ¿Dónde?",
      answer: "Landskrona, Suecia",
      fact: "Las Feroe no tenían entonces ningún campo de hierba; su portero jugó con un famoso gorro de lana."
    }
  },
  {
    sport: "football", level: 3,
    q: "Hal Robson-Kanu's 'Cruyff turn' goal helped Wales beat Belgium 3-1 in the Euro 2016 quarter-final. Where?",
    answer: "Stade Pierre-Mauroy, Lille",
    lat: 50.6119, lng: 3.1305, year: 2016,
    fact: "Wales reached their first ever major semi-final.",
    es: {
      q: "El 'giro de Cruyff' de Hal Robson-Kanu ayudó a Gales a ganar 3-1 a Bélgica en los cuartos de la Eurocopa 2016. ¿Dónde?",
      answer: "Stade Pierre-Mauroy, Lille",
      fact: "Gales alcanzó la primera semifinal de un gran torneo de su historia."
    }
  },
  {
    sport: "football", level: 2,
    q: "The first official international football match, Scotland vs England, was played in 1872. Where?",
    answer: "Hamilton Crescent, Partick (Glasgow)",
    lat: 55.871, lng: -4.303, year: 1872,
    fact: "It finished 0-0 and was watched by around 4,000 spectators. The ground is now a cricket club.",
    es: {
      q: "El primer partido internacional oficial de fútbol, Escocia contra Inglaterra, se jugó en 1872. ¿Dónde?",
      answer: "Hamilton Crescent, Partick (Glasgow)",
      fact: "Acabó 0-0 ante unos 4.000 espectadores. Hoy el campo es un club de críquet."
    }
  },
  {
    sport: "football", level: 2,
    q: "Real Madrid won the very first European Cup final in 1956, coming back from 2-0 down to win 4-3. Where?",
    answer: "Parc des Princes, Paris",
    lat: 48.8414, lng: 2.253, year: 1956,
    fact: "Real Madrid went on to win the first five European Cups in a row.",
    es: {
      q: "El Real Madrid ganó la primera final de la Copa de Europa en 1956, remontando un 2-0 para ganar 4-3. ¿Dónde?",
      answer: "Parque de los Príncipes, París",
      fact: "El Real Madrid ganó las cinco primeras Copas de Europa seguidas."
    }
  },
  {
    sport: "football", level: 1,
    q: "The 'Yellow Wall', Europe's largest standing terrace, is in which stadium?",
    answer: "Signal Iduna Park, Dortmund",
    lat: 51.4926, lng: 7.4519, year: 1974,
    fact: "The Südtribüne holds about 25,000 standing fans.",
    es: {
      q: "El 'Muro Amarillo', la mayor grada de pie de Europa, ¿en qué estadio está?",
      answer: "Signal Iduna Park, Dortmund",
      fact: "La Südtribüne tiene capacidad para unos 25.000 aficionados de pie."
    }
  },
  {
    sport: "football", level: 2,
    q: "Hungary beat England 7-1 in 1954, still England's heaviest ever defeat. Where?",
    answer: "Népstadion (now Puskás Aréna), Budapest",
    lat: 47.503, lng: 19.098, year: 1954,
    fact: "It came only six months after Hungary's famous 6-3 win at Wembley.",
    es: {
      q: "Hungría ganó 7-1 a Inglaterra en 1954, todavía la peor derrota de la historia de Inglaterra. ¿Dónde?",
      answer: "Népstadion (hoy Puskás Aréna), Budapest",
      fact: "Llegó solo seis meses después del famoso 6-3 de Hungría en Wembley."
    }
  },
  {
    sport: "football", level: 3,
    q: "During the 1914 Christmas Truce, British and German soldiers famously played football in no man's land. Near which town?",
    answer: "Ploegsteert / Messines, near Ypres (Belgium)",
    lat: 50.738, lng: 2.88, year: 1914,
    fact: "A memorial to the truce matches stands near Saint-Yvon, in the Ploegsteert area.",
    es: {
      q: "Durante la Tregua de Navidad de 1914, soldados británicos y alemanes jugaron al fútbol en tierra de nadie. ¿Cerca de qué ciudad?",
      answer: "Ploegsteert / Mesen, cerca de Ypres (Bélgica)",
      fact: "Un monumento a aquellos partidos de la tregua se alza en Saint-Yvon, en la zona de Ploegsteert."
    }
  },
  {
    sport: "football", level: 3,
    q: "Germany beat Brazil 7-1 in the 2014 World Cup semi-final. Where?",
    answer: "Estádio Mineirão, Belo Horizonte",
    lat: -19.8658, lng: -43.9711, year: 2014,
    fact: "Germany scored four goals in six minutes in the first half.",
    es: {
      q: "Alemania ganó 7-1 a Brasil en la semifinal del Mundial de 2014. ¿Dónde?",
      answer: "Estádio Mineirão, Belo Horizonte",
      fact: "Alemania marcó cuatro goles en seis minutos en la primera parte."
    }
  },
  {
    sport: "football", level: 1,
    q: "Argentina beat France on penalties after a 3-3 draw in the 2022 World Cup final. Where?",
    answer: "Lusail Stadium, Qatar",
    lat: 25.4207, lng: 51.4904, year: 2022,
    fact: "Kylian Mbappé scored a hat-trick and still ended up on the losing side.",
    es: {
      q: "Argentina ganó a Francia en los penaltis tras un 3-3 en la final del Mundial de 2022. ¿Dónde?",
      answer: "Estadio de Lusail, Catar",
      fact: "Kylian Mbappé marcó un hat-trick y aun así acabó perdiendo."
    }
  },
  {
    sport: "football", level: 1,
    q: "Ajax won their first European Cup in 1971 and their latest Champions League in 1995. Where is the club's current home?",
    answer: "Johan Cruijff ArenA, Amsterdam",
    lat: 52.3143, lng: 4.9419, year: 1996,
    fact: "It was renamed in 2018 in honour of Johan Cruyff, who died in 2016.",
    es: {
      q: "El Ajax ganó su primera Copa de Europa en 1971 y su última Champions en 1995. ¿Dónde está su estadio actual?",
      answer: "Johan Cruijff ArenA, Ámsterdam",
      fact: "Se rebautizó en 2018 en honor a Johan Cruyff, fallecido en 2016."
    }
  },
  {
    sport: "football", level: 2,
    q: "Andrés Iniesta scored the extra-time winner that made Spain world champions in 2010. Where?",
    answer: "Soccer City, Johannesburg",
    lat: -26.2348, lng: 27.9825, year: 2010,
    fact: "It was the first World Cup won by a European team outside Europe.",
    es: {
      q: "Andrés Iniesta marcó en la prórroga el gol que hizo a España campeona del mundo en 2010. ¿Dónde?",
      answer: "Soccer City, Johannesburgo",
      fact: "Fue el primer Mundial ganado por una selección europea fuera de Europa."
    }
  },
  {
    sport: "football", level: 2,
    q: "Sergio Ramos' 93rd-minute header forced extra time in the 2014 Champions League final, which Real Madrid went on to win 4-1. Where?",
    answer: "Estádio da Luz, Lisbon",
    lat: 38.7527, lng: -9.1847, year: 2014,
    fact: "It was 'La Décima', Real Madrid's tenth European Cup, won against city rivals Atlético.",
    es: {
      q: "El cabezazo de Sergio Ramos en el minuto 93 forzó la prórroga en la final de la Champions de 2014, que el Real Madrid acabó ganando 4-1. ¿Dónde?",
      answer: "Estádio da Luz, Lisboa",
      fact: "Fue 'La Décima', la décima Copa de Europa del Real Madrid, ganada al Atlético."
    }
  },
  {
    sport: "football", level: 2,
    q: "Cristiano Ronaldo's bicycle kick against Juventus in 2018 earned him a standing ovation from the home fans. Where?",
    answer: "Allianz Stadium, Turin",
    lat: 45.1096, lng: 7.6413, year: 2018,
    fact: "A few months later, Ronaldo signed for Juventus.",
    es: {
      q: "La chilena de Cristiano Ronaldo contra la Juventus en 2018 hizo que la afición local se levantara a aplaudirle. ¿Dónde?",
      answer: "Allianz Stadium, Turín",
      fact: "Unos meses después, Ronaldo fichó por la Juventus."
    }
  },
  {
    sport: "football", level: 3,
    q: "Gareth Bale's overhead kick helped Real Madrid beat Liverpool in the 2018 Champions League final. Where?",
    answer: "Olympic Stadium, Kyiv",
    lat: 50.4333, lng: 30.5217, year: 2018,
    fact: "It was Real Madrid's third Champions League title in a row.",
    es: {
      q: "La chilena de Gareth Bale ayudó al Real Madrid a ganar al Liverpool en la final de la Champions de 2018. ¿Dónde?",
      answer: "Estadio Olímpico, Kiev",
      fact: "Fue la tercera Champions seguida del Real Madrid."
    }
  },
  {
    sport: "football", level: 3,
    q: "Barcelona beat Manchester United in the 2009 Champions League final, with Lionel Messi heading the second goal. Where?",
    answer: "Stadio Olimpico, Rome",
    lat: 41.9339, lng: 12.4547, year: 2009,
    fact: "It completed Pep Guardiola's treble in his first season as coach.",
    es: {
      q: "El Barcelona ganó al Manchester United en la final de la Champions de 2009, con Leo Messi marcando el segundo gol de cabeza. ¿Dónde?",
      answer: "Estadio Olímpico, Roma",
      fact: "Cerró el triplete de Pep Guardiola en su primera temporada como entrenador."
    }
  },
  {
    sport: "football", level: 2,
    q: "Spain beat England in the Euro 2024 final to become the first four-time European champions. Where?",
    answer: "Olympiastadion, Berlin",
    lat: 52.5147, lng: 13.2395, year: 2024,
    fact: "Mikel Oyarzabal scored the winner in the 86th minute.",
    es: {
      q: "España ganó a Inglaterra en la final de la Eurocopa 2024 y fue la primera selección con cuatro Eurocopas. ¿Dónde?",
      answer: "Olympiastadion, Berlín",
      fact: "Mikel Oyarzabal marcó el gol de la victoria en el minuto 86."
    }
  },
  {
    sport: "football", level: 1,
    q: "Italy beat England on penalties in the Euro 2020 final, played in 2021. Where?",
    answer: "Wembley Stadium, London",
    lat: 51.556, lng: -0.2796, year: 2021,
    fact: "Gianluigi Donnarumma saved two penalties and was named player of the tournament.",
    es: {
      q: "Italia ganó a Inglaterra en los penaltis en la final de la Eurocopa 2020, jugada en 2021. ¿Dónde?",
      answer: "Estadio de Wembley, Londres",
      fact: "Gianluigi Donnarumma paró dos penaltis y fue elegido mejor jugador del torneo."
    }
  },
  {
    sport: "football", level: 2,
    q: "Éder's extra-time strike won Euro 2016 for Portugal. Where?",
    answer: "Stade de France, Saint-Denis",
    lat: 48.9245, lng: 2.3602, year: 2016,
    fact: "Cristiano Ronaldo went off injured in the first half and ended up coaching from the touchline.",
    es: {
      q: "El disparo de Éder en la prórroga dio la Eurocopa 2016 a Portugal. ¿Dónde?",
      answer: "Stade de France, Saint-Denis",
      fact: "Cristiano Ronaldo se retiró lesionado en la primera parte y acabó dando instrucciones desde la banda."
    }
  },
  {
    sport: "football", level: 1,
    q: "Zinedine Zidane scored two headers in the 1998 World Cup final, a 3-0 win over Brazil. Where?",
    answer: "Stade de France, Saint-Denis",
    lat: 48.9245, lng: 2.3602, year: 1998,
    fact: "The stadium was built for that World Cup.",
    es: {
      q: "Zinedine Zidane marcó dos goles de cabeza en la final del Mundial de 1998, un 3-0 a Brasil. ¿Dónde?",
      answer: "Stade de France, Saint-Denis",
      fact: "El estadio se construyó para aquel Mundial."
    }
  },
  {
    sport: "football", level: 2,
    q: "Ronaldo scored twice as Brazil beat Germany in the 2002 World Cup final. Where?",
    answer: "International Stadium Yokohama",
    lat: 35.51, lng: 139.6062, year: 2002,
    fact: "It was the first World Cup held in Asia, co-hosted by Japan and South Korea.",
    es: {
      q: "Ronaldo marcó dos goles y Brasil ganó a Alemania en la final del Mundial de 2002. ¿Dónde?",
      answer: "Estadio Internacional de Yokohama",
      fact: "Fue el primer Mundial en Asia, organizado por Japón y Corea del Sur."
    }
  },
  {
    sport: "football", level: 3,
    q: "Andriy Shevchenko scored the winning penalty in the all-Italian 2003 Champions League final between Milan and Juventus. Where?",
    answer: "Old Trafford, Manchester",
    lat: 53.4631, lng: -2.2913, year: 2003,
    fact: "It was the first Champions League final between two Italian clubs.",
    es: {
      q: "Andriy Shevchenko marcó el penalti decisivo en la final italiana de la Champions de 2003 entre el Milan y la Juventus. ¿Dónde?",
      answer: "Old Trafford, Mánchester",
      fact: "Fue la primera final de la Champions entre dos clubes italianos."
    }
  },
  {
    sport: "football", level: 1,
    q: "Which football stadium is nicknamed 'The Theatre of Dreams'?",
    answer: "Old Trafford, Manchester",
    lat: 53.4631, lng: -2.2913, year: 1910,
    fact: "The nickname was coined by Sir Bobby Charlton.",
    es: {
      q: "¿Qué estadio de fútbol es conocido como 'El Teatro de los Sueños'?",
      answer: "Old Trafford, Mánchester",
      fact: "El apodo se lo puso Sir Bobby Charlton."
    }
  },
  {
    sport: "football", level: 3,
    q: "Liverpool beat Tottenham in the 2019 Champions League final to win their sixth European Cup. Where?",
    answer: "Metropolitano Stadium, Madrid",
    lat: 40.4362, lng: -3.5995, year: 2019,
    fact: "Mohamed Salah scored a penalty in the second minute.",
    es: {
      q: "El Liverpool ganó al Tottenham en la final de la Champions de 2019 y logró su sexta Copa de Europa. ¿Dónde?",
      answer: "Estadio Metropolitano, Madrid",
      fact: "Mohamed Salah marcó de penalti en el minuto 2."
    }
  },
  {
    sport: "football", level: 3,
    q: "Kai Havertz's goal won the 2021 Champions League final for Chelsea against Manchester City. Where?",
    answer: "Estádio do Dragão, Porto",
    lat: 41.1617, lng: -8.5839, year: 2021,
    fact: "The final was moved from Istanbul because of Covid travel restrictions.",
    es: {
      q: "El gol de Kai Havertz dio al Chelsea la Champions de 2021 contra el Manchester City. ¿Dónde?",
      answer: "Estádio do Dragão, Oporto",
      fact: "La final se trasladó desde Estambul por las restricciones de viaje de la Covid."
    }
  },
  {
    sport: "football", level: 2,
    q: "Rodri's goal against Inter gave Manchester City their first Champions League in 2023. Where?",
    answer: "Atatürk Olympic Stadium, Istanbul",
    lat: 41.0745, lng: 28.7656, year: 2023,
    fact: "It completed City's first ever treble.",
    es: {
      q: "El gol de Rodri al Inter dio al Manchester City su primera Champions en 2023. ¿Dónde?",
      answer: "Estadio Olímpico Atatürk, Estambul",
      fact: "Con ella el City cerró el primer triplete de su historia."
    }
  },
  {
    sport: "football", level: 3,
    q: "PSG won their first Champions League in 2025 with a record 5-0 final win over Inter. Where?",
    answer: "Allianz Arena, Munich",
    lat: 48.2188, lng: 11.6247, year: 2025,
    fact: "It was the biggest winning margin ever in a European Cup final.",
    es: {
      q: "El PSG ganó su primera Champions en 2025 con un histórico 5-0 al Inter en la final. ¿Dónde?",
      answer: "Allianz Arena, Múnich",
      fact: "Fue la mayor goleada de la historia en una final de la Copa de Europa."
    }
  },
  {
    sport: "football", level: 3,
    q: "Bayern Munich completed a treble in 2020 by winning a Champions League final played behind closed doors during the pandemic. Where?",
    answer: "Estádio da Luz, Lisbon",
    lat: 38.7527, lng: -9.1847, year: 2020,
    fact: "Kingsley Coman, who came through PSG's academy, scored the only goal against PSG.",
    es: {
      q: "El Bayern de Múnich cerró un triplete en 2020 ganando una final de la Champions jugada a puerta cerrada por la pandemia. ¿Dónde?",
      answer: "Estádio da Luz, Lisboa",
      fact: "Kingsley Coman, formado en la cantera del PSG, marcó el único gol contra el PSG."
    }
  },
  {
    sport: "football", level: 2,
    q: "Ronald Koeman's extra-time free kick won Barcelona their first European Cup in 1992. Where?",
    answer: "Wembley Stadium, London",
    lat: 51.556, lng: -0.2796, year: 1992,
    fact: "It was the last final before the competition became the Champions League.",
    es: {
      q: "El libre directo de Ronald Koeman en la prórroga dio al Barcelona su primera Copa de Europa en 1992. ¿Dónde?",
      answer: "Estadio de Wembley, Londres",
      fact: "Fue la última final antes de que la competición pasara a llamarse Champions League."
    }
  },
  {
    sport: "football", level: 3,
    q: "Marseille beat AC Milan in 1993 to become the first French club to win the Champions League. Where?",
    answer: "Olympiastadion, Munich",
    lat: 48.1731, lng: 11.5466, year: 1993,
    fact: "Basile Boli headed the only goal just before half-time.",
    es: {
      q: "El Olympique de Marsella ganó al AC Milan en 1993 y fue el primer club francés en ganar la Champions. ¿Dónde?",
      answer: "Olympiastadion, Múnich",
      fact: "Basile Boli marcó de cabeza el único gol justo antes del descanso."
    }
  },
  {
    sport: "football", level: 2,
    q: "Diego Maradona's 'Hand of God' and 'Goal of the Century' both came in the same 1986 World Cup quarter-final against England. Where?",
    answer: "Estadio Azteca, Mexico City",
    lat: 19.3029, lng: -99.1505, year: 1986,
    fact: "The Azteca is the only stadium to have hosted two men's World Cup finals (1970 and 1986).",
    es: {
      q: "La 'Mano de Dios' y el 'Gol del Siglo' de Diego Maradona llegaron en el mismo partido, los cuartos de final del Mundial de 1986 contra Inglaterra. ¿Dónde?",
      answer: "Estadio Azteca, Ciudad de México",
      fact: "El Azteca es el único estadio que ha acogido dos finales del Mundial masculino (1970 y 1986)."
    }
  },
  {
    sport: "football", level: 3,
    q: "The oldest football club in the world still playing today was founded in 1857. In which city?",
    answer: "Sheffield (Sheffield FC)",
    lat: 53.3811, lng: -1.4701, year: 1857,
    fact: "Sheffield FC now play in the nearby town of Dronfield.",
    es: {
      q: "El club de fútbol más antiguo del mundo que sigue en activo se fundó en 1857. ¿En qué ciudad?",
      answer: "Sheffield (Sheffield FC)",
      fact: "Hoy el Sheffield FC juega en la cercana localidad de Dronfield."
    }
  },
  {
    sport: "football", level: 2,
    q: "Where was the very first World Cup final played, in 1930?",
    answer: "Estadio Centenario, Montevideo",
    lat: -34.8944, lng: -56.1528, year: 1930,
    fact: "The hosts, Uruguay, beat Argentina 4-2.",
    es: {
      q: "¿Dónde se jugó la primera final de la historia del Mundial, en 1930?",
      answer: "Estadio Centenario, Montevideo",
      fact: "La anfitriona, Uruguay, ganó 4-2 a Argentina."
    }
  },
  {
    sport: "football", level: 3,
    q: "Zinedine Zidane scored a stunning left-footed volley to win the 2002 Champions League final. Where?",
    answer: "Hampden Park, Glasgow",
    lat: 55.8258, lng: -4.2519, year: 2002,
    fact: "Real Madrid beat Bayer Leverkusen 2-1 to win their ninth European Cup.",
    es: {
      q: "Zinedine Zidane marcó una volea de zurda espectacular para ganar la final de la Champions de 2002. ¿Dónde?",
      answer: "Hampden Park, Glasgow",
      fact: "El Real Madrid ganó 2-1 al Bayer Leverkusen y logró su novena Copa de Europa."
    }
  },
  {
    sport: "football", level: 3,
    q: "A crowd of 127,000 watched Real Madrid beat Eintracht Frankfurt 7-3 in the 1960 European Cup final. Where?",
    answer: "Hampden Park, Glasgow",
    lat: 55.8258, lng: -4.2519, year: 1960,
    fact: "Ferenc Puskás scored four goals and Alfredo Di Stéfano three.",
    es: {
      q: "127.000 espectadores vieron al Real Madrid ganar 7-3 al Eintracht de Fráncfort en la final de la Copa de Europa de 1960. ¿Dónde?",
      answer: "Hampden Park, Glasgow",
      fact: "Ferenc Puskás marcó cuatro goles y Alfredo Di Stéfano, tres."
    }
  },
  {
    sport: "football", level: 3,
    q: "Gerd Müller scored twice as West Germany beat the USSR 3-0 in the Euro 1972 final. Where?",
    answer: "Heysel Stadium (now King Baudouin Stadium), Brussels",
    lat: 50.8958, lng: 4.3342, year: 1972,
    fact: "It was West Germany's first European title.",
    es: {
      q: "Gerd Müller marcó dos goles y la RFA ganó 3-0 a la URSS en la final de la Eurocopa de 1972. ¿Dónde?",
      answer: "Estadio de Heysel (hoy Rey Balduino), Bruselas",
      fact: "Fue el primer título europeo de la RFA."
    }
  },
  {
    sport: "football", level: 2,
    q: "Marco van Basten scored an impossible volley in the Euro 1988 final against the USSR. Where?",
    answer: "Olympiastadion, Munich",
    lat: 48.1731, lng: 11.5466, year: 1988,
    fact: "It is still the Netherlands' only major international title.",
    es: {
      q: "Marco van Basten marcó una volea imposible en la final de la Eurocopa de 1988 contra la URSS. ¿Dónde?",
      answer: "Olympiastadion, Múnich",
      fact: "Sigue siendo el único gran título internacional de los Países Bajos."
    }
  },
  {
    sport: "football", level: 2,
    q: "Marcelino's header won Spain their first European Championship in 1964, against the USSR. Where?",
    answer: "Santiago Bernabéu, Madrid",
    lat: 40.4531, lng: -3.6883, year: 1964,
    fact: "It was Spain's only major title until 2008.",
    es: {
      q: "El cabezazo de Marcelino dio a España su primera Eurocopa en 1964, contra la URSS. ¿Dónde?",
      answer: "Santiago Bernabéu, Madrid",
      fact: "Fue el único gran título de España hasta 2008."
    }
  },
  {
    sport: "football", level: 2,
    q: "Italy won the 1982 World Cup final, remembered for Marco Tardelli's wild celebration. Where?",
    answer: "Santiago Bernabéu, Madrid",
    lat: 40.4531, lng: -3.6883, year: 1982,
    fact: "Italy beat West Germany 3-1; Paolo Rossi was the tournament's top scorer.",
    es: {
      q: "Italia ganó la final del Mundial de 1982, recordada por la celebración desatada de Marco Tardelli. ¿Dónde?",
      answer: "Santiago Bernabéu, Madrid",
      fact: "Italia ganó 3-1 a la RFA; Paolo Rossi fue el máximo goleador del torneo."
    }
  },
  {
    sport: "football", level: 3,
    q: "Real Madrid beat Atlético on penalties in the 2016 Champions League final. Where?",
    answer: "San Siro, Milan",
    lat: 45.4781, lng: 9.124, year: 2016,
    fact: "Cristiano Ronaldo scored the winning penalty.",
    es: {
      q: "El Real Madrid ganó al Atlético en los penaltis en la final de la Champions de 2016. ¿Dónde?",
      answer: "San Siro, Milán",
      fact: "Cristiano Ronaldo marcó el penalti decisivo."
    }
  },
  {
    sport: "football", level: 3,
    q: "AC Milan thrashed Johan Cruyff's Barcelona 4-0 in the 1994 Champions League final. Where?",
    answer: "Olympic Stadium (OAKA), Athens",
    lat: 38.0362, lng: 23.7876, year: 1994,
    fact: "Dejan Savićević scored with a famous lob from outside the box.",
    es: {
      q: "El AC Milan goleó 4-0 al Barcelona de Johan Cruyff en la final de la Champions de 1994. ¿Dónde?",
      answer: "Estadio Olímpico (OAKA), Atenas",
      fact: "Dejan Savićević marcó con una famosa vaselina desde fuera del área."
    }
  },
  {
    sport: "football", level: 3,
    q: "Lars Ricken's lob helped Borussia Dortmund beat Juventus in the 1997 Champions League final. Where?",
    answer: "Olympiastadion, Munich",
    lat: 48.1731, lng: 11.5466, year: 1997,
    fact: "Ricken scored about 16 seconds after coming on as a substitute.",
    es: {
      q: "La vaselina de Lars Ricken ayudó al Borussia Dortmund a ganar a la Juventus en la final de la Champions de 1997. ¿Dónde?",
      answer: "Olympiastadion, Múnich",
      fact: "Ricken marcó unos 16 segundos después de salir del banquillo."
    }
  },
  {
    sport: "football", level: 3,
    q: "An 18-year-old Patrick Kluivert scored the winner as Ajax beat AC Milan in the 1995 Champions League final. Where?",
    answer: "Ernst-Happel-Stadion, Vienna",
    lat: 48.2072, lng: 16.4206, year: 1995,
    fact: "That young Ajax side went the whole league season unbeaten.",
    es: {
      q: "Un Patrick Kluivert de 18 años marcó el gol con el que el Ajax ganó al AC Milan en la final de la Champions de 1995. ¿Dónde?",
      answer: "Ernst-Happel-Stadion, Viena",
      fact: "Aquel joven Ajax terminó la liga sin perder ni un partido."
    }
  },
  {
    sport: "football", level: 1,
    q: "France beat Croatia 4-2 in the 2018 World Cup final. Where?",
    answer: "Luzhniki Stadium, Moscow",
    lat: 55.7158, lng: 37.5539, year: 2018,
    fact: "Kylian Mbappé, aged 19, became the second teenager to score in a World Cup final, after Pelé.",
    es: {
      q: "Francia ganó 4-2 a Croacia en la final del Mundial de 2018. ¿Dónde?",
      answer: "Estadio Luzhnikí, Moscú",
      fact: "Kylian Mbappé, con 19 años, fue el segundo adolescente en marcar en una final del Mundial, tras Pelé."
    }
  },
  {
    sport: "football", level: 3,
    q: "Robin van Persie's flying header started the Netherlands' 5-1 win over Spain at the 2014 World Cup. Where?",
    answer: "Arena Fonte Nova, Salvador",
    lat: -12.9787, lng: -38.5043, year: 2014,
    fact: "It was a rematch of the 2010 final.",
    es: {
      q: "El cabezazo en plancha de Robin van Persie inició el 5-1 de Países Bajos a España en el Mundial de 2014. ¿Dónde?",
      answer: "Arena Fonte Nova, Salvador de Bahía",
      fact: "Era la revancha de la final de 2010."
    }
  },
  {
    sport: "football", level: 2,
    q: "Mario Götze's extra-time goal won the 2014 World Cup for Germany. Where?",
    answer: "Maracanã, Rio de Janeiro",
    lat: -22.9122, lng: -43.2302, year: 2014,
    fact: "Germany became the first European team to win a World Cup in the Americas.",
    es: {
      q: "El gol de Mario Götze en la prórroga dio el Mundial de 2014 a Alemania. ¿Dónde?",
      answer: "Maracaná, Río de Janeiro",
      fact: "Alemania fue la primera selección europea en ganar un Mundial en América."
    }
  },
  {
    sport: "football", level: 3,
    q: "Paolo Rossi's hat-trick knocked Brazil out of the 1982 World Cup. Where?",
    answer: "Estadi de Sarrià, Barcelona",
    lat: 41.3936, lng: 2.1278, year: 1982,
    fact: "The stadium was demolished in 1997.",
    es: {
      q: "El hat-trick de Paolo Rossi eliminó a Brasil del Mundial de 1982. ¿Dónde?",
      answer: "Estadio de Sarrià, Barcelona",
      fact: "El estadio se derribó en 1997."
    }
  },
  {
    sport: "football", level: 3,
    q: "Zlatan Ibrahimović scored a 30-metre bicycle kick against England in 2012. Where?",
    answer: "Friends Arena (now Strawberry Arena), Solna",
    lat: 59.3727, lng: 18.0004, year: 2012,
    fact: "It won FIFA's Puskás Award for goal of the year.",
    es: {
      q: "Zlatan Ibrahimović marcó una chilena desde 30 metros contra Inglaterra en 2012. ¿Dónde?",
      answer: "Friends Arena (hoy Strawberry Arena), Solna",
      fact: "Ganó el Premio Puskás de la FIFA al mejor gol del año."
    }
  },
  {
    sport: "football", level: 2,
    q: "Olga Carmona's goal made Spain women's world champions in 2023. Where?",
    answer: "Stadium Australia, Sydney",
    lat: -33.8471, lng: 151.0634, year: 2023,
    fact: "Spain beat England 1-0 in the final.",
    es: {
      q: "El gol de Olga Carmona hizo a España campeona del mundo femenina en 2023. ¿Dónde?",
      answer: "Stadium Australia, Sídney",
      fact: "España ganó 1-0 a Inglaterra en la final."
    }
  },
  {
    sport: "football", level: 2,
    q: "Which football stadium can light up its outside red, blue or white?",
    answer: "Allianz Arena, Munich",
    lat: 48.2188, lng: 11.6247, year: 2005,
    fact: "Its shell is made of around 2,800 inflated panels.",
    es: {
      q: "¿Qué estadio de fútbol puede iluminar su fachada de rojo, azul o blanco?",
      answer: "Allianz Arena, Múnich",
      fact: "Su fachada está formada por unos 2.800 paneles hinchables."
    }
  },
  {
    sport: "football", level: 2,
    q: "Lionel Messi was born and grew up in which city?",
    answer: "Rosario, Argentina",
    lat: -32.9442, lng: -60.6505, year: 1987,
    fact: "He moved to Barcelona at the age of 13.",
    es: {
      q: "¿En qué ciudad nació y se crió Leo Messi?",
      answer: "Rosario, Argentina",
      fact: "Se fue a Barcelona con 13 años."
    }
  },
  {
    sport: "football", level: 2,
    q: "Cristiano Ronaldo was born on which island?",
    answer: "Funchal, Madeira",
    lat: 32.6669, lng: -16.9241, year: 1985,
    fact: "The island's airport is named after him.",
    es: {
      q: "¿En qué isla nació Cristiano Ronaldo?",
      answer: "Funchal, Madeira",
      fact: "El aeropuerto de la isla lleva su nombre."
    }
  },
  {
    sport: "football", level: 2,
    q: "Zinedine Zidane was born and grew up in which city?",
    answer: "Marseille, France",
    lat: 43.2965, lng: 5.3698, year: 1972,
    fact: "He grew up in the La Castellane housing estate.",
    es: {
      q: "¿En qué ciudad nació y se crió Zinedine Zidane?",
      answer: "Marsella, Francia",
      fact: "Creció en el barrio de La Castellane."
    }
  },
  {
    sport: "football", level: 2,
    q: "Where is FIFA headquartered?",
    answer: "Home of FIFA, Zurich",
    lat: 47.3815, lng: 8.5745, year: 1932,
    fact: "FIFA was founded in Paris in 1904.",
    es: {
      q: "¿Dónde tiene su sede la FIFA?",
      answer: "Home of FIFA, Zúrich",
      fact: "La FIFA se fundó en París en 1904."
    }
  },
  {
    sport: "football", level: 3,
    q: "In which small lakeside town is UEFA headquartered?",
    answer: "Nyon, Switzerland",
    lat: 46.3762, lng: 6.2324, year: 1995,
    fact: "UEFA moved there from Bern in 1995.",
    es: {
      q: "¿En qué pequeña ciudad junto a un lago tiene su sede la UEFA?",
      answer: "Nyon, Suiza",
      fact: "La UEFA se trasladó allí desde Berna en 1995."
    }
  },

  // ───────────── Tennis ─────────────
  {
    sport: "tennis", level: 1,
    q: "John Isner and Nicolas Mahut played the longest tennis match ever (11 hours, 5 minutes) in 2010. Where?",
    answer: "All England Club, Wimbledon",
    lat: 51.434, lng: -0.2143, year: 2010,
    fact: "The fifth set alone finished 70-68 and lasted over three days.",
    es: {
      q: "John Isner y Nicolas Mahut jugaron el partido de tenis más largo de la historia (11 horas y 5 minutos) en 2010. ¿Dónde?",
      answer: "All England Club, Wimbledon",
      fact: "Solo el quinto set acabó 70-68 y duró más de tres días."
    }
  },
  {
    sport: "tennis", level: 1,
    q: "Rafael Nadal won a record 14 titles at this Grand Slam venue. Where is it?",
    answer: "Stade Roland-Garros, Paris",
    lat: 48.847, lng: 2.2494, year: 2022,
    fact: "Nadal's record there was 112 wins and just 4 defeats.",
    es: {
      q: "Rafael Nadal ganó un récord de 14 títulos en la sede de este Grand Slam. ¿Dónde está?",
      answer: "Stade Roland-Garros, París",
      fact: "El balance de Nadal allí fue de 112 victorias y solo 4 derrotas."
    }
  },
  {
    sport: "tennis", level: 2,
    q: "Roger Federer played his final professional match, a doubles with Rafael Nadal, at the 2022 Laver Cup. Where?",
    answer: "The O2 Arena, London",
    lat: 51.503, lng: 0.0032, year: 2022,
    fact: "The picture of Federer and Nadal crying side by side went around the world.",
    es: {
      q: "Roger Federer jugó su último partido como profesional, un dobles con Rafael Nadal, en la Laver Cup de 2022. ¿Dónde?",
      answer: "The O2 Arena, Londres",
      fact: "La imagen de Federer y Nadal llorando juntos dio la vuelta al mundo."
    }
  },
  {
    sport: "tennis", level: 2,
    q: "Rafael Nadal was born, still lives and has his tennis academy in which town?",
    answer: "Manacor, Mallorca",
    lat: 39.5696, lng: 3.2096, year: 2016,
    fact: "The Rafa Nadal Academy opened in Manacor in 2016.",
    es: {
      q: "¿En qué localidad nació, vive y tiene su academia de tenis Rafael Nadal?",
      answer: "Manacor, Mallorca",
      fact: "La Rafa Nadal Academy abrió en Manacor en 2016."
    }
  },
  {
    sport: "tennis", level: 1,
    q: "Björn Borg and John McEnroe played their legendary 18-16 tie-break in the 1980 final. Where?",
    answer: "All England Club, Wimbledon",
    lat: 51.434, lng: -0.2143, year: 1980,
    fact: "Borg won in five sets for his fifth title in a row there.",
    es: {
      q: "Björn Borg y John McEnroe jugaron su legendario tie-break de 18-16 en la final de 1980. ¿Dónde?",
      answer: "All England Club, Wimbledon",
      fact: "Borg ganó en cinco sets su quinto título seguido allí."
    }
  },
  {
    sport: "tennis", level: 1,
    q: "Which Grand Slam tournament is the only one still played on grass?",
    answer: "All England Club, Wimbledon",
    lat: 51.434, lng: -0.2143, year: 1877,
    fact: "Players must dress almost entirely in white.",
    es: {
      q: "¿Qué torneo de Grand Slam es el único que se sigue jugando sobre hierba?",
      answer: "All England Club, Wimbledon",
      fact: "Los jugadores deben vestir casi completamente de blanco."
    }
  },
  {
    sport: "tennis", level: 2,
    q: "Novak Djokovic won one Grand Slam tournament a record 10 times. Where is it played?",
    answer: "Melbourne Park, Melbourne",
    lat: -37.8216, lng: 144.9785, year: 2023,
    fact: "His 10th title there came in 2023.",
    es: {
      q: "Novak Djokovic ganó un récord de 10 veces uno de los Grand Slam. ¿Dónde se juega?",
      answer: "Melbourne Park, Melbourne",
      fact: "Su décimo título allí llegó en 2023."
    }
  },
  {
    sport: "tennis", level: 2,
    q: "Carlos Alcaraz won his first Grand Slam in 2022 and became the youngest world No. 1 in history. Where?",
    answer: "USTA Billie Jean King National Tennis Center, New York",
    lat: 40.7498, lng: -73.8458, year: 2022,
    fact: "He was 19 years and 4 months old.",
    es: {
      q: "Carlos Alcaraz ganó su primer Grand Slam en 2022 y se convirtió en el número 1 más joven de la historia. ¿Dónde?",
      answer: "USTA Billie Jean King National Tennis Center, Nueva York",
      fact: "Tenía 19 años y 4 meses."
    }
  },
  {
    sport: "tennis", level: 2,
    q: "Rafael Nadal won Olympic singles gold in 2008. Where?",
    answer: "Olympic Green Tennis Centre, Beijing",
    lat: 39.9996, lng: 116.383, year: 2008,
    fact: "Days later he became world No. 1 for the first time.",
    es: {
      q: "Rafael Nadal ganó el oro olímpico individual en 2008. ¿Dónde?",
      answer: "Centro de Tenis Olympic Green, Pekín",
      fact: "Días después se convirtió por primera vez en número 1 del mundo."
    }
  },
  {
    sport: "tennis", level: 3,
    q: "Since 2021, the ATP Finals have been held in which city?",
    answer: "Inalpi Arena, Turin",
    lat: 45.0417, lng: 7.65, year: 2021,
    fact: "Jannik Sinner won the title there in 2024 and 2025.",
    es: {
      q: "Desde 2021, ¿en qué ciudad se celebran las ATP Finals?",
      answer: "Inalpi Arena, Turín",
      fact: "Jannik Sinner ganó allí el título en 2024 y 2025."
    }
  },
  {
    sport: "tennis", level: 3,
    q: "A clay court surrounded by marble statues, named after Nicola Pietrangeli, is part of which tournament venue?",
    answer: "Foro Italico, Rome",
    lat: 41.93, lng: 12.457, year: 1930,
    fact: "The statues were sculpted in the 1930s for the sports complex.",
    es: {
      q: "Una pista de tierra batida rodeada de estatuas de mármol, con el nombre de Nicola Pietrangeli, forma parte de ¿qué sede de torneo?",
      answer: "Foro Itálico, Roma",
      fact: "Las estatuas se esculpieron en los años 30 para el complejo deportivo."
    }
  },
  {
    sport: "tennis", level: 2,
    q: "Roger Federer was born and grew up in which city?",
    answer: "Basel, Switzerland",
    lat: 47.5596, lng: 7.5886, year: 1981,
    fact: "He won his hometown tournament 10 times and was once a ball boy there.",
    es: {
      q: "¿En qué ciudad nació y se crió Roger Federer?",
      answer: "Basilea, Suiza",
      fact: "Ganó 10 veces el torneo de su ciudad, donde de niño fue recogepelotas."
    }
  },

  // ───────────── Cycling ─────────────
  {
    sport: "cycling", level: 2,
    q: "Because of the Paris Olympics, the 2024 Tour de France finished outside Paris for the first time. Where?",
    answer: "Nice",
    lat: 43.695, lng: 7.265, year: 2024,
    fact: "It finished with a time trial won by Tadej Pogačar, who also won the Tour.",
    es: {
      q: "Por los Juegos Olímpicos de París, el Tour de Francia 2024 terminó por primera vez fuera de París. ¿Dónde?",
      answer: "Niza",
      fact: "Terminó con una contrarreloj que ganó Tadej Pogačar, también ganador del Tour."
    }
  },
  {
    sport: "cycling", level: 2,
    q: "Which legendary Tour de France climb is famous for its 21 numbered hairpin bends?",
    answer: "Alpe d'Huez",
    lat: 45.092, lng: 6.07, year: 1952,
    fact: "Each hairpin carries a plaque honouring past stage winners.",
    es: {
      q: "¿Qué mítica subida del Tour de Francia es famosa por sus 21 curvas de herradura numeradas?",
      answer: "Alpe d'Huez",
      fact: "Cada curva tiene una placa en honor a antiguos ganadores de etapa."
    }
  },
  {
    sport: "cycling", level: 2,
    q: "The 2022 Tour de France had its Grand Départ in the most northern city ever to host the start. Which one?",
    answer: "Copenhagen",
    lat: 55.6761, lng: 12.5683, year: 2022,
    fact: "Denmark's Jonas Vingegaard went on to win that Tour.",
    es: {
      q: "El Tour de Francia 2022 arrancó en la ciudad más al norte que ha acogido nunca la salida. ¿Cuál?",
      answer: "Copenhague",
      fact: "El danés Jonas Vingegaard acabó ganando aquel Tour."
    }
  },
  {
    sport: "cycling", level: 3,
    q: "Chris Froome ran up a mountain without his bike after crashing into a motorbike during the 2016 Tour. Which mountain?",
    answer: "Mont Ventoux",
    lat: 44.174, lng: 5.2789, year: 2016,
    fact: "The race jury let him keep the yellow jersey.",
    es: {
      q: "Chris Froome subió corriendo una montaña sin bici tras chocar con una moto en el Tour de 2016. ¿Qué montaña?",
      answer: "Mont Ventoux",
      fact: "El jurado de la carrera le dejó conservar el maillot amarillo."
    }
  },
  {
    sport: "cycling", level: 3,
    q: "Which mountain pass has been climbed more often than any other in Tour de France history? It first featured in 1910.",
    answer: "Col du Tourmalet",
    lat: 42.9081, lng: 0.1453, year: 1910,
    fact: "Every summer a statue of a cyclist, 'Le Géant du Tourmalet', is placed at the summit.",
    es: {
      q: "¿Qué puerto de montaña se ha subido más veces que ningún otro en la historia del Tour de Francia? Apareció por primera vez en 1910.",
      answer: "Col du Tourmalet",
      fact: "Cada verano se coloca en la cima la estatua de un ciclista, 'Le Géant du Tourmalet'."
    }
  },
  {
    sport: "cycling", level: 1,
    q: "On which famous avenue does the Tour de France traditionally finish?",
    answer: "Champs-Élysées, Paris",
    lat: 48.8698, lng: 2.3078, year: 1975,
    fact: "The tradition began in 1975.",
    es: {
      q: "¿En qué famosa avenida termina tradicionalmente el Tour de Francia?",
      answer: "Campos Elíseos, París",
      fact: "La tradición empezó en 1975."
    }
  },
  {
    sport: "cycling", level: 3,
    q: "Jasper Philipsen won the opening stage of the 2025 Tour de France, which started and finished in the same city. Where?",
    answer: "Lille",
    lat: 50.6292, lng: 3.0573, year: 2025,
    fact: "Tadej Pogačar went on to win that Tour, his fourth.",
    es: {
      q: "Jasper Philipsen ganó la primera etapa del Tour de Francia 2025, que salía y llegaba a la misma ciudad. ¿Dónde?",
      answer: "Lille",
      fact: "Tadej Pogačar acabó ganando aquel Tour, el cuarto de su carrera."
    }
  },
  {
    sport: "cycling", level: 3,
    q: "Eddy Merckx set the hour record in 1972, riding at altitude. Where?",
    answer: "Agustín Melgar Velodrome, Mexico City",
    lat: 19.4044, lng: -99.0886, year: 1972,
    fact: "He covered 49.431 km and called it the hardest ride of his life.",
    es: {
      q: "Eddy Merckx batió el récord de la hora en 1972, rodando en altitud. ¿Dónde?",
      answer: "Velódromo Agustín Melgar, Ciudad de México",
      fact: "Recorrió 49,431 km y dijo que fue el esfuerzo más duro de su vida."
    }
  },

  // ───────────── Motorsport ─────────────
  {
    sport: "motorsport", level: 1,
    q: "Which Formula 1 street circuit runs through a tunnel and around a famous harbour?",
    answer: "Circuit de Monaco, Monte Carlo",
    lat: 43.7347, lng: 7.4206, year: 1929,
    fact: "Ayrton Senna won here a record six times.",
    es: {
      q: "¿Qué circuito urbano de Fórmula 1 pasa por un túnel y rodea un famoso puerto deportivo?",
      answer: "Circuito de Mónaco, Montecarlo",
      fact: "Ayrton Senna ganó aquí un récord de seis veces."
    }
  },
  {
    sport: "motorsport", level: 2,
    q: "Eau Rouge and Raidillon form one of the most famous corners in motorsport. On which circuit?",
    answer: "Spa-Francorchamps, Belgium",
    lat: 50.4372, lng: 5.9714, year: 1925,
    fact: "Michael Schumacher made his F1 debut at Spa in 1991 and won his first race there a year later.",
    es: {
      q: "Eau Rouge y Raidillon forman una de las curvas más famosas del motor. ¿En qué circuito?",
      answer: "Spa-Francorchamps, Bélgica",
      fact: "Michael Schumacher debutó en F1 en Spa en 1991 y ganó allí su primera carrera un año después."
    }
  },
  {
    sport: "motorsport", level: 1,
    q: "The 'Temple of Speed', where the Tifosi invade the track after every Grand Prix, is where?",
    answer: "Autodromo Nazionale Monza",
    lat: 45.6156, lng: 9.2811, year: 1922,
    fact: "Monza has hosted more F1 world championship races than any other circuit.",
    es: {
      q: "El 'Templo de la Velocidad', donde los tifosi invaden la pista tras cada Gran Premio, ¿dónde está?",
      answer: "Autódromo Nacional de Monza",
      fact: "Monza ha acogido más carreras del Mundial de F1 que ningún otro circuito."
    }
  },
  {
    sport: "motorsport", level: 2,
    q: "The very first Formula 1 World Championship race was held in 1950 on a former RAF airfield. Where?",
    answer: "Silverstone, England",
    lat: 52.0786, lng: -1.0169, year: 1950,
    fact: "Giuseppe Farina won the race in an Alfa Romeo.",
    es: {
      q: "La primera carrera del Mundial de Fórmula 1 se celebró en 1950 en un antiguo aeródromo de la RAF. ¿Dónde?",
      answer: "Silverstone, Inglaterra",
      fact: "Giuseppe Farina ganó con un Alfa Romeo."
    }
  },
  {
    sport: "motorsport", level: 2,
    q: "Niki Lauda was nearly killed in a fiery crash in 1976 — and was racing again six weeks later. Where?",
    answer: "Nürburgring Nordschleife",
    lat: 50.3356, lng: 6.9475, year: 1976,
    fact: "Jackie Stewart nicknamed the 20 km Nordschleife 'The Green Hell'.",
    es: {
      q: "Niki Lauda estuvo a punto de morir en un terrible accidente con fuego en 1976… y volvió a correr seis semanas después. ¿Dónde?",
      answer: "Nürburgring Nordschleife",
      fact: "Jackie Stewart bautizó los 20 km del Nordschleife como 'el Infierno Verde'."
    }
  },
  {
    sport: "motorsport", level: 1,
    q: "Where is the world's most famous 24-hour endurance race held?",
    answer: "Circuit de la Sarthe, Le Mans",
    lat: 47.956, lng: 0.2077, year: 1923,
    fact: "Porsche hold the record for most overall wins.",
    es: {
      q: "¿Dónde se celebra la carrera de resistencia de 24 horas más famosa del mundo?",
      answer: "Circuito de La Sarthe, Le Mans",
      fact: "Porsche tiene el récord de victorias absolutas."
    }
  },
  {
    sport: "motorsport", level: 2,
    q: "The TT, the world's oldest and most dangerous motorcycle road race, is held on which island? (Click the start line.)",
    answer: "Snaefell Mountain Course, Douglas, Isle of Man",
    lat: 54.167, lng: -4.482, year: 1907,
    fact: "Riders average over 135 mph on a 37.7-mile lap of public roads.",
    es: {
      q: "El TT, la carrera de motos en carretera más antigua y peligrosa del mundo, ¿en qué isla se corre? (Marca la línea de salida).",
      answer: "Snaefell Mountain Course, Douglas, Isla de Man",
      fact: "Los pilotos superan los 217 km/h de media en una vuelta de 60,7 km por carreteras abiertas al tráfico el resto del año."
    }
  },
  {
    sport: "motorsport", level: 2,
    q: "F1 returned in 2021, after 36 years away, to a circuit among the sand dunes. Where?",
    answer: "Circuit Zandvoort, Netherlands",
    lat: 52.3888, lng: 4.5409, year: 2021,
    fact: "The track features banked corners, rare in modern F1.",
    es: {
      q: "La F1 volvió en 2021, tras 36 años de ausencia, a un circuito entre dunas. ¿Dónde?",
      answer: "Circuito de Zandvoort, Países Bajos",
      fact: "El trazado tiene curvas peraltadas, algo poco habitual en la F1 moderna."
    }
  },
  {
    sport: "motorsport", level: 2,
    q: "In 1986 F1 held its first Grand Prix behind the Iron Curtain. Where?",
    answer: "Hungaroring, near Budapest",
    lat: 47.5789, lng: 19.2486, year: 1986,
    fact: "Nelson Piquet won the inaugural race in front of around 200,000 fans.",
    es: {
      q: "En 1986 la F1 celebró su primer Gran Premio tras el Telón de Acero. ¿Dónde?",
      answer: "Hungaroring, cerca de Budapest",
      fact: "Nelson Piquet ganó la primera edición ante unos 200.000 aficionados."
    }
  },
  {
    sport: "motorsport", level: 3,
    q: "MotoGP's 'Cathedral of Speed' has hosted motorcycle Grands Prix every year since 1949. Where is it?",
    answer: "TT Circuit Assen, Netherlands",
    lat: 52.9614, lng: 6.5236, year: 1949,
    fact: "It's the only circuit to have held a round of every MotoGP season since the championship began.",
    es: {
      q: "La 'Catedral de la Velocidad' del motociclismo ha acogido Grandes Premios todos los años desde 1949. ¿Dónde está?",
      answer: "Circuito TT de Assen, Países Bajos",
      fact: "Es el único circuito que ha estado en todas las temporadas del Mundial desde su creación."
    }
  },
  {
    sport: "motorsport", level: 3,
    q: "Valentino Rossi won seven consecutive MotoGP races here, from 2002 to 2008. Which circuit?",
    answer: "Mugello Circuit, Scarperia",
    lat: 43.9975, lng: 11.3719, year: 2002,
    fact: "The circuit is owned by Ferrari.",
    es: {
      q: "Valentino Rossi ganó aquí siete carreras seguidas de MotoGP, de 2002 a 2008. ¿Qué circuito es?",
      answer: "Circuito de Mugello, Scarperia",
      fact: "El circuito es propiedad de Ferrari."
    }
  },
  {
    sport: "motorsport", level: 3,
    q: "Which F1 circuit is famous for 'Turn 8', a fast left-hander with four apexes?",
    answer: "Istanbul Park",
    lat: 40.9517, lng: 29.405, year: 2020,
    fact: "Lewis Hamilton clinched his seventh world title there in 2020.",
    es: {
      q: "¿Qué circuito de F1 es famoso por su 'curva 8', una izquierda rapidísima con cuatro vértices?",
      answer: "Istanbul Park",
      fact: "Lewis Hamilton ganó allí su séptimo título mundial en 2020."
    }
  },
  {
    sport: "motorsport", level: 3,
    q: "Lewis Hamilton won his first F1 race in 2007, on a circuit built on an island. Where?",
    answer: "Circuit Gilles Villeneuve, Montreal",
    lat: 45.5, lng: -73.5228, year: 2007,
    fact: "Its final chicane is lined by the 'Wall of Champions'.",
    es: {
      q: "Lewis Hamilton ganó su primera carrera de F1 en 2007, en un circuito construido sobre una isla. ¿Dónde?",
      answer: "Circuito Gilles Villeneuve, Montreal",
      fact: "Su última chicane está flanqueada por el 'Muro de los Campeones'."
    }
  },
  {
    sport: "motorsport", level: 3,
    q: "Fernando Alonso became F1's youngest ever champion (at the time) in 2005. Where did he clinch the title?",
    answer: "Interlagos, São Paulo",
    lat: -23.7036, lng: -46.6997, year: 2005,
    fact: "He was 24, and he won the title again in 2006.",
    es: {
      q: "Fernando Alonso se convirtió en 2005 en el campeón de F1 más joven de la historia (hasta entonces). ¿Dónde se aseguró el título?",
      answer: "Interlagos, São Paulo",
      fact: "Tenía 24 años y volvió a ser campeón en 2006."
    }
  },
  {
    sport: "motorsport", level: 3,
    q: "In 2000 Michael Schumacher won Ferrari's first drivers' title in 21 years. Where did he clinch it?",
    answer: "Suzuka Circuit",
    lat: 34.8431, lng: 136.541, year: 2000,
    fact: "It's the only figure-of-eight circuit on the F1 calendar.",
    es: {
      q: "En 2000 Michael Schumacher dio a Ferrari su primer título de pilotos en 21 años. ¿Dónde lo cerró?",
      answer: "Circuito de Suzuka",
      fact: "Es el único circuito en forma de ocho del calendario de F1."
    }
  },
  {
    sport: "motorsport", level: 2,
    q: "Max Verstappen won on his Red Bull debut in 2016, aged 18, becoming F1's youngest ever winner. Where?",
    answer: "Circuit de Barcelona-Catalunya, Montmeló",
    lat: 41.57, lng: 2.2611, year: 2016,
    fact: "The two Mercedes drivers, Hamilton and Rosberg, had crashed into each other on the first lap.",
    es: {
      q: "Max Verstappen ganó en su debut con Red Bull en 2016, con 18 años, y fue el ganador más joven de la historia de la F1. ¿Dónde?",
      answer: "Circuit de Barcelona-Catalunya, Montmeló",
      fact: "Los dos Mercedes, Hamilton y Rosberg, habían chocado entre sí en la primera vuelta."
    }
  },
  {
    sport: "motorsport", level: 2,
    q: "Where are Ferrari's headquarters and private test track?",
    answer: "Maranello (Fiorano circuit)",
    lat: 44.5333, lng: 10.8569, year: 1947,
    fact: "The Fiorano test track was built in 1972.",
    es: {
      q: "¿Dónde están la sede de Ferrari y su circuito privado de pruebas?",
      answer: "Maranello (circuito de Fiorano)",
      fact: "La pista de pruebas de Fiorano se construyó en 1972."
    }
  },
  {
    sport: "motorsport", level: 3,
    q: "Which circuit, with grandstands wrapped around the track like a stadium, has traditionally hosted MotoGP's season finale?",
    answer: "Circuit Ricardo Tormo, Cheste (Valencia)",
    lat: 39.489, lng: -0.629, year: 1999,
    fact: "It is named after Ricardo Tormo, a two-time world champion.",
    es: {
      q: "¿Qué circuito, con las gradas rodeando la pista como un estadio, acoge tradicionalmente la última carrera de MotoGP?",
      answer: "Circuit Ricardo Tormo, Cheste (Valencia)",
      fact: "Lleva el nombre de Ricardo Tormo, dos veces campeón del mundo."
    }
  },
  {
    sport: "motorsport", level: 2,
    q: "Where was F1's first ever night race held, in 2008?",
    answer: "Marina Bay Street Circuit, Singapore",
    lat: 1.2914, lng: 103.864, year: 2008,
    fact: "Fernando Alonso won it, in a race later infamous for 'Crashgate'.",
    es: {
      q: "¿Dónde se celebró la primera carrera nocturna de la historia de la F1, en 2008?",
      answer: "Circuito urbano de Marina Bay, Singapur",
      fact: "La ganó Fernando Alonso, en una carrera que luego se hizo famosa por el 'Crashgate'."
    }
  },

  // ───────────── Athletics & Olympics ─────────────
  {
    sport: "athletics", level: 2,
    q: "Roger Bannister ran the first sub-four-minute mile in 1954. Where?",
    answer: "Iffley Road track, Oxford",
    lat: 51.7488, lng: -1.2367, year: 1954,
    fact: "He clocked 3:59.4 while still a medical student.",
    es: {
      q: "Roger Bannister corrió la primera milla por debajo de cuatro minutos en 1954. ¿Dónde?",
      answer: "Pista de Iffley Road, Oxford",
      fact: "Hizo 3:59,4 cuando todavía era estudiante de Medicina."
    }
  },
  {
    sport: "athletics", level: 2,
    q: "Usain Bolt set the 100 m world record of 9.58 seconds at the 2009 World Championships. Where?",
    answer: "Olympiastadion, Berlin",
    lat: 52.5147, lng: 13.2395, year: 2009,
    fact: "Four days later, in the same stadium, he also set the 200 m record of 19.19.",
    es: {
      q: "Usain Bolt batió el récord mundial de 100 m con 9,58 en el Mundial de 2009. ¿Dónde?",
      answer: "Olympiastadion, Berlín",
      fact: "Cuatro días después, en el mismo estadio, batió también el récord de 200 m: 19,19."
    }
  },
  {
    sport: "athletics", level: 2,
    q: "Eliud Kipchoge became the first person to run a marathon in under two hours in 2019. In which city?",
    answer: "Prater park, Vienna",
    lat: 48.2167, lng: 16.4167, year: 2019,
    fact: "He ran 1:59:40 on a flat loop of the Prater's Hauptallee. It's not an official record.",
    es: {
      q: "Eliud Kipchoge fue la primera persona en correr un maratón en menos de dos horas, en 2019. ¿En qué ciudad?",
      answer: "Parque del Prater, Viena",
      fact: "Hizo 1:59:40 en un circuito llano por la Hauptallee del Prater. No cuenta como récord oficial."
    }
  },
  {
    sport: "olympics", level: 1,
    q: "The first modern Olympic Games in 1896 were held in a stadium built entirely of marble. Where?",
    answer: "Panathenaic Stadium, Athens",
    lat: 37.9683, lng: 23.7411, year: 1896,
    fact: "It's the only major stadium in the world built entirely of marble.",
    es: {
      q: "Los primeros Juegos Olímpicos modernos, en 1896, se celebraron en un estadio construido entero de mármol. ¿Dónde?",
      answer: "Estadio Panatenaico, Atenas",
      fact: "Es el único gran estadio del mundo construido íntegramente en mármol."
    }
  },
  {
    sport: "olympics", level: 2,
    q: "Where were the Ancient Olympic Games held, from 776 BC onwards?",
    answer: "Olympia, Greece",
    lat: 37.6383, lng: 21.63, year: -776,
    fact: "The Olympic flame is still lit there using the sun's rays before every Games.",
    es: {
      q: "¿Dónde se celebraban los Juegos Olímpicos de la Antigüedad, a partir del 776 a. C.?",
      answer: "Olimpia, Grecia",
      fact: "La llama olímpica se sigue encendiendo allí con los rayos del sol antes de cada edición."
    }
  },
  {
    sport: "olympics", level: 1,
    q: "Abebe Bikila won the 1960 Olympic marathon running barefoot. Where was the finish line?",
    answer: "Arch of Constantine, Rome",
    lat: 41.8898, lng: 12.4906, year: 1960,
    fact: "He became the first sub-Saharan African to win Olympic gold.",
    es: {
      q: "Abebe Bikila ganó el maratón olímpico de 1960 corriendo descalzo. ¿Dónde estaba la meta?",
      answer: "Arco de Constantino, Roma",
      fact: "Fue el primer africano subsahariano en ganar un oro olímpico."
    }
  },
  {
    sport: "olympics", level: 2,
    q: "Emil Zátopek won the 5,000 m, 10,000 m and marathon at the same Olympics in 1952. Where?",
    answer: "Helsinki Olympic Stadium",
    lat: 60.187, lng: 24.927, year: 1952,
    fact: "It was the first marathon he had ever run.",
    es: {
      q: "Emil Zátopek ganó los 5.000 m, los 10.000 m y el maratón en los mismos Juegos, en 1952. ¿Dónde?",
      answer: "Estadio Olímpico de Helsinki",
      fact: "Era el primer maratón que corría en su vida."
    }
  },
  {
    sport: "olympics", level: 2,
    q: "Romanian gymnast Nadia Comăneci scored the first perfect 10 in Olympic history in 1976. Where?",
    answer: "Montreal Forum, Canada",
    lat: 45.4899, lng: -73.5872, year: 1976,
    fact: "The scoreboard showed '1.00' because it could only display three digits.",
    es: {
      q: "La gimnasta rumana Nadia Comăneci logró el primer 10 perfecto de la historia olímpica en 1976. ¿Dónde?",
      answer: "Montreal Forum, Canadá",
      fact: "El marcador mostró '1.00' porque solo podía enseñar tres dígitos."
    }
  },
  {
    sport: "athletics", level: 1,
    q: "Jesse Owens won four gold medals at the 1936 Olympics. Where?",
    answer: "Olympiastadion, Berlin",
    lat: 52.5147, lng: 13.2395, year: 1936,
    fact: "A street next to the stadium is now called Jesse-Owens-Allee.",
    es: {
      q: "Jesse Owens ganó cuatro medallas de oro en los Juegos de 1936. ¿Dónde?",
      answer: "Olympiastadion, Berlín",
      fact: "Una calle junto al estadio se llama hoy Jesse-Owens-Allee."
    }
  },
  {
    sport: "athletics", level: 2,
    q: "Bob Beamon's 8.90 m long jump in 1968 smashed the world record by 55 cm. Where?",
    answer: "Estadio Olímpico Universitario, Mexico City",
    lat: 19.3317, lng: -99.1922, year: 1968,
    fact: "The record stood for almost 23 years.",
    es: {
      q: "El salto de 8,90 m de Bob Beamon en 1968 pulverizó el récord mundial por 55 cm. ¿Dónde?",
      answer: "Estadio Olímpico Universitario, Ciudad de México",
      fact: "El récord duró casi 23 años."
    }
  },
  {
    sport: "athletics", level: 3,
    q: "Mondo Duplantis set his first pole vault world record, 6.17 m, in 2020. Where?",
    answer: "Arena Toruń, Poland",
    lat: 53.0136, lng: 18.6276, year: 2020,
    fact: "He has raised it many times since.",
    es: {
      q: "Mondo Duplantis batió su primer récord mundial de pértiga, 6,17 m, en 2020. ¿Dónde?",
      answer: "Arena Toruń, Polonia",
      fact: "Desde entonces lo ha mejorado muchas veces."
    }
  },
  {
    sport: "athletics", level: 2,
    q: "Paula Radcliffe ran a marathon world record of 2:15:25 in 2003. In which city?",
    answer: "London (finish on The Mall)",
    lat: 51.5033, lng: -0.1347, year: 2003,
    fact: "It stood as the women's world record for 16 years.",
    es: {
      q: "Paula Radcliffe corrió un maratón en 2:15:25, récord mundial, en 2003. ¿En qué ciudad?",
      answer: "Londres (meta en The Mall)",
      fact: "Fue el récord mundial femenino durante 16 años."
    }
  },
  {
    sport: "athletics", level: 2,
    q: "Eliud Kipchoge set an official marathon world record of 2:01:09 in 2022. In which city?",
    answer: "Berlin (finish by the Brandenburg Gate)",
    lat: 52.5163, lng: 13.3777, year: 2022,
    fact: "The course is so flat and fast that many marathon world records have been set on it.",
    es: {
      q: "Eliud Kipchoge batió el récord mundial oficial de maratón con 2:01:09 en 2022. ¿En qué ciudad?",
      answer: "Berlín (meta junto a la Puerta de Brandeburgo)",
      fact: "El recorrido es tan llano y rápido que en él se han batido muchos récords mundiales."
    }
  },
  {
    sport: "athletics", level: 2,
    q: "The world's oldest annual marathon has been run every year since 1897. Where?",
    answer: "Boston (finish on Boylston Street)",
    lat: 42.3497, lng: -71.0786, year: 1897,
    fact: "Women weren't officially allowed to take part until 1972.",
    es: {
      q: "El maratón anual más antiguo del mundo se corre cada año desde 1897. ¿Dónde?",
      answer: "Boston (meta en Boylston Street)",
      fact: "Las mujeres no pudieron participar oficialmente hasta 1972."
    }
  },
  {
    sport: "olympics", level: 1,
    q: "Which city hosted the 1992 Summer Olympics, where an archer lit the cauldron with a flaming arrow?",
    answer: "Estadi Olímpic, Barcelona",
    lat: 41.3647, lng: 2.1557, year: 1992,
    fact: "Paralympic archer Antonio Rebollo fired the arrow.",
    es: {
      q: "¿Qué ciudad organizó los Juegos Olímpicos de 1992, en los que un arquero encendió el pebetero con una flecha en llamas?",
      answer: "Estadi Olímpic, Barcelona",
      fact: "La flecha la lanzó el arquero paralímpico Antonio Rebollo."
    }
  },
  {
    sport: "olympics", level: 3,
    q: "At the 2024 Olympics, the surfing took place nearly 16,000 km from the host city. Where?",
    answer: "Teahupo'o, Tahiti",
    lat: -17.8494, lng: -149.267, year: 2024,
    fact: "It's the farthest an Olympic event has ever been held from its host city.",
    es: {
      q: "En los Juegos de 2024, el surf se disputó a casi 16.000 km de la ciudad organizadora. ¿Dónde?",
      answer: "Teahupo'o, Tahití",
      fact: "Es lo más lejos que se ha celebrado nunca una prueba olímpica de su ciudad sede."
    }
  },
  {
    sport: "olympics", level: 1,
    q: "Michael Phelps won a record eight gold medals at a single Games in 2008. Where?",
    answer: "National Aquatics Center ('Water Cube'), Beijing",
    lat: 39.993, lng: 116.3842, year: 2008,
    fact: "He won one of them, the 100 m butterfly, by a hundredth of a second.",
    es: {
      q: "Michael Phelps ganó un récord de ocho oros en unos mismos Juegos, en 2008. ¿Dónde?",
      answer: "Centro Acuático Nacional ('Cubo de Agua'), Pekín",
      fact: "Uno de ellos, el de 100 m mariposa, lo ganó por una centésima."
    }
  },
  {
    sport: "olympics", level: 3,
    q: "Fanny Blankers-Koen, a 30-year-old mother of two, won four gold medals at the 1948 Olympics. Where?",
    answer: "Wembley Stadium, London",
    lat: 51.556, lng: -0.2796, year: 1948,
    fact: "She was nicknamed 'The Flying Housewife'.",
    es: {
      q: "Fanny Blankers-Koen, madre de dos hijos y con 30 años, ganó cuatro oros en los Juegos de 1948. ¿Dónde?",
      answer: "Estadio de Wembley, Londres",
      fact: "La apodaron 'El ama de casa voladora'."
    }
  },
  {
    sport: "olympics", level: 2,
    q: "Which city hosted the 1980 Summer Olympics, boycotted by the United States?",
    answer: "Luzhniki Stadium, Moscow",
    lat: 55.7158, lng: 37.5539, year: 1980,
    fact: "Around 65 countries stayed away.",
    es: {
      q: "¿Qué ciudad organizó los Juegos Olímpicos de 1980, boicoteados por Estados Unidos?",
      answer: "Estadio Luzhnikí, Moscú",
      fact: "Unos 65 países no acudieron."
    }
  },
  {
    sport: "olympics", level: 2,
    q: "Where is the International Olympic Committee headquartered?",
    answer: "Olympic House, Lausanne",
    lat: 46.5189, lng: 6.5953, year: 1915,
    fact: "Pierre de Coubertin moved the IOC there in 1915.",
    es: {
      q: "¿Dónde tiene su sede el Comité Olímpico Internacional?",
      answer: "Olympic House, Lausana",
      fact: "Pierre de Coubertin trasladó allí el COI en 1915."
    }
  },
  {
    sport: "olympics", level: 1,
    q: "Which city hosted the 2004 Summer Olympics, as the Games returned to their birthplace?",
    answer: "Olympic Stadium (OAKA), Athens",
    lat: 38.0362, lng: 23.7876, year: 2004,
    fact: "The shot put was held at the ancient site of Olympia.",
    es: {
      q: "¿Qué ciudad organizó los Juegos Olímpicos de 2004, cuando los Juegos volvieron a su lugar de nacimiento?",
      answer: "Estadio Olímpico (OAKA), Atenas",
      fact: "El lanzamiento de peso se disputó en el yacimiento de la antigua Olimpia."
    }
  },
  {
    sport: "olympics", level: 1,
    q: "Which city became the first to host the Summer Olympics three times, in 2012?",
    answer: "Olympic Stadium, Stratford (London)",
    lat: 51.5386, lng: -0.0166, year: 2012,
    fact: "It had also hosted the Games in 1908 and 1948.",
    es: {
      q: "¿Qué ciudad fue la primera en organizar tres veces los Juegos Olímpicos de verano, en 2012?",
      answer: "Estadio Olímpico, Stratford (Londres)",
      fact: "También había organizado los Juegos en 1908 y 1948."
    }
  },
  {
    sport: "olympics", level: 1,
    q: "Which city hosted the 2024 Summer Olympics, exactly 100 years after it last had?",
    answer: "Paris",
    lat: 48.8566, lng: 2.3522, year: 2024,
    fact: "It had also hosted the Games in 1900 and 1924.",
    es: {
      q: "¿Qué ciudad organizó los Juegos Olímpicos de 2024, justo 100 años después de la vez anterior?",
      answer: "París",
      fact: "También había organizado los Juegos en 1900 y 1924."
    }
  },
  {
    sport: "olympics", level: 1,
    q: "Which city hosted the Summer Olympics that were postponed by a year and held without spectators in 2021?",
    answer: "Japan National Stadium, Tokyo",
    lat: 35.6778, lng: 139.7145, year: 2021,
    fact: "They kept the name 'Tokyo 2020' despite the delay.",
    es: {
      q: "¿Qué ciudad organizó los Juegos Olímpicos aplazados un año y celebrados sin público en 2021?",
      answer: "Estadio Nacional de Japón, Tokio",
      fact: "Mantuvieron el nombre 'Tokio 2020' pese al retraso."
    }
  },
  {
    sport: "olympics", level: 1,
    q: "Which city will host the 2028 Summer Olympics, its third Games?",
    answer: "Los Angeles Memorial Coliseum",
    lat: 34.0141, lng: -118.2879, year: 2028,
    fact: "The city also hosted in 1932 and 1984.",
    es: {
      q: "¿Qué ciudad organizará los Juegos Olímpicos de 2028, sus terceros Juegos?",
      answer: "Los Angeles Memorial Coliseum",
      fact: "La ciudad ya los organizó en 1932 y 1984."
    }
  },
  {
    sport: "olympics", level: 1,
    q: "Which city hosted the 2000 Summer Olympics, where Cathy Freeman won the 400 m?",
    answer: "Stadium Australia, Sydney",
    lat: -33.8471, lng: 151.0634, year: 2000,
    fact: "Freeman had also lit the Olympic cauldron at the opening ceremony.",
    es: {
      q: "¿Qué ciudad organizó los Juegos Olímpicos de 2000, en los que Cathy Freeman ganó los 400 m?",
      answer: "Stadium Australia, Sídney",
      fact: "Freeman también había encendido el pebetero en la ceremonia de inauguración."
    }
  },
  {
    sport: "olympics", level: 1,
    q: "Which city hosted the 2016 Summer Olympics, Usain Bolt's last?",
    answer: "Maracanã, Rio de Janeiro",
    lat: -22.9122, lng: -43.2302, year: 2016,
    fact: "Bolt won the 100 m, 200 m and 4x100 m relay there.",
    es: {
      q: "¿Qué ciudad organizó los Juegos Olímpicos de 2016, los últimos de Usain Bolt?",
      answer: "Maracaná, Río de Janeiro",
      fact: "Bolt ganó allí los 100 m, los 200 m y el relevo 4x100."
    }
  },
  {
    sport: "olympics", level: 2,
    q: "Which city hosted the 1996 Summer Olympics, where Muhammad Ali lit the cauldron?",
    answer: "Atlanta",
    lat: 33.749, lng: -84.388, year: 1996,
    fact: "They were the 'Centennial Games', 100 years after Athens 1896.",
    es: {
      q: "¿Qué ciudad organizó los Juegos Olímpicos de 1996, en los que Muhammad Ali encendió el pebetero?",
      answer: "Atlanta",
      fact: "Fueron los 'Juegos del Centenario', 100 años después de Atenas 1896."
    }
  },
  {
    sport: "olympics", level: 3,
    q: "The games that grew into the Paralympics began in 1948 at a hospital. Where?",
    answer: "Stoke Mandeville Hospital, Aylesbury",
    lat: 51.799, lng: -0.806, year: 1948,
    fact: "They were organised by neurologist Ludwig Guttmann.",
    es: {
      q: "Los juegos que dieron origen a los Paralímpicos empezaron en 1948 en un hospital. ¿Dónde?",
      answer: "Hospital de Stoke Mandeville, Aylesbury",
      fact: "Los organizó el neurólogo Ludwig Guttmann."
    }
  },

  // ───────────── Winter sports ─────────────
  {
    sport: "winter", level: 2,
    q: "The Streif, the most feared downhill in alpine skiing, hosts the Hahnenkamm race every January. Where?",
    answer: "Kitzbühel, Austria",
    lat: 47.4467, lng: 12.3917, year: 1937,
    fact: "Its 'Mausefalle' jump sends skiers flying up to 80 m.",
    es: {
      q: "La Streif, el descenso más temido del esquí alpino, acoge cada enero la carrera del Hahnenkamm. ¿Dónde?",
      answer: "Kitzbühel, Austria",
      fact: "Su salto de la 'Mausefalle' lanza a los esquiadores hasta 80 metros."
    }
  },
  {
    sport: "winter", level: 1,
    q: "Which iconic ski jump has hosted competitions since 1892?",
    answer: "Holmenkollbakken, Oslo",
    lat: 59.9636, lng: 10.6672, year: 1892,
    fact: "More than 100,000 spectators watched the jumping at the 1952 Winter Olympics there.",
    es: {
      q: "¿Qué mítico trampolín de saltos acoge competiciones desde 1892?",
      answer: "Holmenkollbakken, Oslo",
      fact: "Más de 100.000 espectadores vieron allí los saltos de los Juegos de Invierno de 1952."
    }
  },
  {
    sport: "winter", level: 3,
    q: "The Four Hills Tournament begins every December in which village?",
    answer: "Oberstdorf, Germany",
    lat: 47.4097, lng: 10.2789, year: 1953,
    fact: "It continues in Garmisch-Partenkirchen, Innsbruck and Bischofshofen.",
    es: {
      q: "El Torneo de los Cuatro Trampolines empieza cada diciembre en ¿qué localidad?",
      answer: "Oberstdorf, Alemania",
      fact: "Sigue en Garmisch-Partenkirchen, Innsbruck y Bischofshofen."
    }
  },
  {
    sport: "winter", level: 3,
    q: "The first ski jump of over 100 metres was made here in 1936; today jumpers fly over 250 metres. Where?",
    answer: "Planica, Slovenia",
    lat: 46.4797, lng: 13.7231, year: 1934,
    fact: "In 2025 Domen Prevc set the ski-flying world record here: 254.5 m.",
    es: {
      q: "Aquí se hizo en 1936 el primer salto de más de 100 metros; hoy los saltadores vuelan más de 250. ¿Dónde?",
      answer: "Planica, Eslovenia",
      fact: "En 2025 Domen Prevc batió aquí el récord mundial de vuelo: 254,5 m."
    }
  },
  {
    sport: "winter", level: 3,
    q: "The Vasaloppet, the world's oldest and biggest cross-country ski race, finishes in which town?",
    answer: "Mora, Sweden",
    lat: 61.007, lng: 14.543, year: 1922,
    fact: "The 90 km race from Sälen follows the route of King Gustav Vasa in 1520.",
    es: {
      q: "La Vasaloppet, la carrera de esquí de fondo más antigua y multitudinaria del mundo, termina en ¿qué localidad?",
      answer: "Mora, Suecia",
      fact: "Los 90 km desde Sälen siguen la ruta del rey Gustavo Vasa en 1520."
    }
  },
  {
    sport: "winter", level: 2,
    q: "Where were the very first Winter Olympics held, in 1924?",
    answer: "Chamonix, France",
    lat: 45.9237, lng: 6.8694, year: 1924,
    fact: "At the time it was called 'International Winter Sports Week'.",
    es: {
      q: "¿Dónde se celebraron los primeros Juegos Olímpicos de Invierno, en 1924?",
      answer: "Chamonix, Francia",
      fact: "Entonces se llamaron 'Semana Internacional de los Deportes de Invierno'."
    }
  },
  {
    sport: "winter", level: 2,
    q: "Torvill and Dean scored perfect 6.0s across the board with their 'Boléro' at the 1984 Winter Olympics. Where?",
    answer: "Zetra Olympic Hall, Sarajevo",
    lat: 43.8676, lng: 18.4115, year: 1984,
    fact: "Their routine was watched by 24 million TV viewers in the UK.",
    es: {
      q: "Torvill y Dean lograron seises perfectos de todos los jueces con su 'Bolero' en los Juegos de Invierno de 1984. ¿Dónde?",
      answer: "Pabellón Olímpico Zetra, Sarajevo",
      fact: "Su programa lo vieron 24 millones de espectadores en el Reino Unido."
    }
  },
  {
    sport: "winter", level: 2,
    q: "What many call the best Winter Olympics ever were held in 1994, in a small town of around 25,000 people. Which one?",
    answer: "Lillehammer, Norway",
    lat: 61.1153, lng: 10.4662, year: 1994,
    fact: "Norway won more medals than any other nation: 26.",
    es: {
      q: "Los que muchos consideran los mejores Juegos de Invierno de la historia se celebraron en 1994, en una pequeña ciudad de unos 25.000 habitantes. ¿Cuál?",
      answer: "Lillehammer, Noruega",
      fact: "Noruega fue el país que más medallas ganó: 26."
    }
  },
  {
    sport: "winter", level: 2,
    q: "The Cresta Run, a head-first toboggan track built in 1884, is in which glamorous resort?",
    answer: "St. Moritz, Switzerland",
    lat: 46.4983, lng: 9.839, year: 1884,
    fact: "Riders reach speeds of around 130 km/h lying face-down.",
    es: {
      q: "El Cresta Run, una pista de tobogán construida en 1884 que se baja de cabeza, ¿en qué glamurosa estación está?",
      answer: "St. Moritz, Suiza",
      fact: "Los corredores alcanzan unos 130 km/h tumbados boca abajo."
    }
  },
  {
    sport: "winter", level: 3,
    q: "The Lauberhorn is the longest downhill on the World Cup circuit. In which village is it raced?",
    answer: "Wengen, Switzerland",
    lat: 46.605, lng: 7.921, year: 1930,
    fact: "Run times are around 2.5 minutes — the longest on the World Cup.",
    es: {
      q: "El Lauberhorn es el descenso más largo de la Copa del Mundo. ¿En qué pueblo se corre?",
      answer: "Wengen, Suiza",
      fact: "Las bajadas duran unos dos minutos y medio, las más largas del circuito."
    }
  },
  {
    sport: "winter", level: 3,
    q: "Speed skating's most famous oval, where dozens of world records have been set, is where?",
    answer: "Thialf, Heerenveen",
    lat: 52.95, lng: 5.935, year: 1967,
    fact: "Heerenveen is in Friesland, the heartland of Dutch skating.",
    es: {
      q: "El óvalo de patinaje de velocidad más famoso del mundo, donde se han batido decenas de récords mundiales, ¿dónde está?",
      answer: "Thialf, Heerenveen",
      fact: "Heerenveen está en Frisia, la cuna del patinaje neerlandés."
    }
  },
  {
    sport: "winter", level: 3,
    q: "The legendary 200 km Elfstedentocht skating race on frozen canals starts and ends in which city?",
    answer: "Leeuwarden, Netherlands",
    lat: 53.2012, lng: 5.7999, year: 1909,
    fact: "It needs ice at least 15 cm thick everywhere; it was last held in 1997.",
    es: {
      q: "La legendaria Elfstedentocht, una carrera de patinaje de 200 km por canales helados, sale y llega a ¿qué ciudad?",
      answer: "Leeuwarden, Países Bajos",
      fact: "Necesita hielo de al menos 15 cm en todo el recorrido; la última se celebró en 1997."
    }
  },
  {
    sport: "winter", level: 2,
    q: "Finland won their first ever Ice Hockey World Championship in 1995, beating rivals Sweden in the final. Where?",
    answer: "Globen, Stockholm",
    lat: 59.2936, lng: 18.0833, year: 1995,
    fact: "Ville Peltonen scored a hat-trick in the 4-1 win.",
    es: {
      q: "Finlandia ganó su primer Mundial de hockey sobre hielo en 1995, contra su gran rival Suecia en la final. ¿Dónde?",
      answer: "Globen, Estocolmo",
      fact: "Ville Peltonen marcó un hat-trick en el 4-1."
    }
  },
  {
    sport: "winter", level: 1,
    q: "Which city hosted the 2014 Winter Olympics?",
    answer: "Sochi, Russia",
    lat: 43.4025, lng: 39.9564, year: 2014,
    fact: "With palm trees along the coast, it was one of the warmest Winter Games venues ever.",
    es: {
      q: "¿Qué ciudad organizó los Juegos Olímpicos de Invierno de 2014?",
      answer: "Sochi, Rusia",
      fact: "Con palmeras en la costa, fue una de las sedes más cálidas de unos Juegos de Invierno."
    }
  },
  {
    sport: "winter", level: 1,
    q: "In 2022, which city became the first to host both the Summer and Winter Olympics?",
    answer: "Beijing National Stadium ('Bird's Nest')",
    lat: 39.9917, lng: 116.3906, year: 2022,
    fact: "It had hosted the Summer Games in 2008.",
    es: {
      q: "En 2022, ¿qué ciudad fue la primera en organizar unos Juegos de verano y otros de invierno?",
      answer: "Estadio Nacional de Pekín ('Nido de Pájaro')",
      fact: "Había organizado los Juegos de verano en 2008."
    }
  },
  {
    sport: "winter", level: 1,
    q: "Which city hosted the 2010 Winter Olympics, where Sidney Crosby scored the 'Golden Goal' in ice hockey?",
    answer: "Vancouver",
    lat: 49.2768, lng: -123.1119, year: 2010,
    fact: "Crosby's overtime winner against the USA was watched by over 26 million Canadians.",
    es: {
      q: "¿Qué ciudad organizó los Juegos de Invierno de 2010, en los que Sidney Crosby marcó el 'Gol de Oro' en hockey?",
      answer: "Vancouver",
      fact: "Más de 26 millones de canadienses vieron su gol en la prórroga contra Estados Unidos."
    }
  },
  {
    sport: "winter", level: 2,
    q: "Which city hosted the 2006 Winter Olympics?",
    answer: "Turin, Italy",
    lat: 45.0703, lng: 7.6869, year: 2006,
    fact: "The alpine skiing took place in the mountains about 90 km away.",
    es: {
      q: "¿Qué ciudad organizó los Juegos Olímpicos de Invierno de 2006?",
      answer: "Turín, Italia",
      fact: "El esquí alpino se disputó en las montañas, a unos 90 km."
    }
  },
  {
    sport: "winter", level: 2,
    q: "The 2026 Winter Olympics opened in a famous football stadium. Which one?",
    answer: "San Siro, Milan",
    lat: 45.4781, lng: 9.124, year: 2026,
    fact: "Those Games were shared between Milan and Cortina d'Ampezzo.",
    es: {
      q: "Los Juegos de Invierno de 2026 se inauguraron en un famoso estadio de fútbol. ¿Cuál?",
      answer: "San Siro, Milán",
      fact: "Aquellos Juegos se repartieron entre Milán y Cortina d'Ampezzo."
    }
  },
  {
    sport: "winter", level: 3,
    q: "Eddie 'the Eagle' Edwards became a cult hero by finishing last in ski jumping at the 1988 Winter Olympics. Where?",
    answer: "Canada Olympic Park, Calgary",
    lat: 51.083, lng: -114.214, year: 1988,
    fact: "The IOC later brought in minimum standards, nicknamed the 'Eddie the Eagle rule'.",
    es: {
      q: "Eddie 'el Águila' Edwards se convirtió en un ídolo de culto quedando último en saltos en los Juegos de Invierno de 1988. ¿Dónde?",
      answer: "Canada Olympic Park, Calgary",
      fact: "El COI impuso después unas marcas mínimas, apodadas 'la regla de Eddie el Águila'."
    }
  },
  {
    sport: "winter", level: 3,
    q: "Up to 50,000 fans watch the floodlit 'Nightrace' slalom every January. Where?",
    answer: "Schladming, Austria",
    lat: 47.3928, lng: 13.6888, year: 1997,
    fact: "It's one of the biggest crowds in alpine skiing.",
    es: {
      q: "Hasta 50.000 aficionados ven cada enero el eslalon nocturno 'Nightrace', bajo los focos. ¿Dónde?",
      answer: "Schladming, Austria",
      fact: "Es uno de los mayores públicos del esquí alpino."
    }
  },
  {
    sport: "winter", level: 3,
    q: "Stefan Kraft set a ski-flying world record of 253.5 m in 2017. Where?",
    answer: "Vikersundbakken, Vikersund (Norway)",
    lat: 59.9906, lng: 9.9876, year: 2017,
    fact: "His record stood until 2025.",
    es: {
      q: "Stefan Kraft batió el récord mundial de vuelo con esquís, 253,5 m, en 2017. ¿Dónde?",
      answer: "Vikersundbakken, Vikersund (Noruega)",
      fact: "Su récord duró hasta 2025."
    }
  },
  {
    sport: "winter", level: 2,
    q: "A team of US college players beat the Soviet Union in the 1980 'Miracle on Ice'. Where?",
    answer: "Lake Placid, New York",
    lat: 44.2795, lng: -73.9799, year: 1980,
    fact: "The town had also hosted the 1932 Winter Olympics.",
    es: {
      q: "Un equipo de universitarios estadounidenses ganó a la Unión Soviética en el 'Milagro sobre hielo' de 1980. ¿Dónde?",
      answer: "Lake Placid, Nueva York",
      fact: "La localidad ya había organizado los Juegos de Invierno de 1932."
    }
  },
  {
    sport: "winter", level: 3,
    q: "Paul Henderson's late goal won the 1972 Summit Series for Canada against the USSR. Where?",
    answer: "Luzhniki Palace of Sports, Moscow",
    lat: 55.7158, lng: 37.5539, year: 1972,
    fact: "In Canada it is often called 'the goal of the century'.",
    es: {
      q: "El gol de Paul Henderson al final del partido dio a Canadá la Summit Series de 1972 contra la URSS. ¿Dónde?",
      answer: "Palacio de Deportes Luzhnikí, Moscú",
      fact: "En Canadá se le suele llamar 'el gol del siglo'."
    }
  },

  // ───────────── Rugby ─────────────
  {
    sport: "rugby", level: 1,
    q: "Jonny Wilkinson's last-minute drop goal won England the 2003 Rugby World Cup. Where?",
    answer: "Stadium Australia, Sydney",
    lat: -33.8471, lng: 151.0634, year: 2003,
    fact: "It came with 26 seconds of extra time remaining, kicked with his weaker right foot.",
    es: {
      q: "El drop de Jonny Wilkinson en el último minuto dio a Inglaterra el Mundial de rugby de 2003. ¿Dónde?",
      answer: "Stadium Australia, Sídney",
      fact: "Llegó a falta de 26 segundos de la prórroga, y con su pierna menos buena, la derecha."
    }
  },
  {
    sport: "rugby", level: 1,
    q: "The largest dedicated rugby union stadium in the world is where?",
    answer: "Twickenham Stadium, London",
    lat: 51.456, lng: -0.3415, year: 1909,
    fact: "It's nicknamed 'The Cabbage Patch' because the land was a market garden.",
    es: {
      q: "¿Dónde está el mayor estadio del mundo dedicado exclusivamente al rugby union?",
      answer: "Estadio de Twickenham, Londres",
      fact: "Lo apodan 'El Huerto de Coles' porque el terreno había sido un huerto."
    }
  },
  {
    sport: "rugby", level: 1,
    q: "A national rugby stadium with a retractable roof, right in a city centre, hosted the 1999 Rugby World Cup final. Where?",
    answer: "Principality (Millennium) Stadium, Cardiff",
    lat: 51.4782, lng: -3.1826, year: 1999,
    fact: "It's the home of the Wales national rugby team.",
    es: {
      q: "Un estadio nacional de rugby con techo retráctil, en pleno centro de una ciudad, acogió la final del Mundial de rugby de 1999. ¿Dónde?",
      answer: "Principality Stadium (antes Millennium), Cardiff",
      fact: "Es la casa de la selección galesa de rugby."
    }
  },
  {
    sport: "rugby", level: 2,
    q: "Nelson Mandela presented the trophy as South Africa won the 1995 Rugby World Cup. Where?",
    answer: "Ellis Park, Johannesburg",
    lat: -26.1975, lng: 28.0606, year: 1995,
    fact: "Joel Stransky's extra-time drop goal beat New Zealand 15-12.",
    es: {
      q: "Nelson Mandela entregó el trofeo a Sudáfrica, campeona del Mundial de rugby de 1995. ¿Dónde?",
      answer: "Ellis Park, Johannesburgo",
      fact: "Un drop de Joel Stransky en la prórroga ganó 15-12 a Nueva Zelanda."
    }
  },

  // ───────────── Golf ─────────────
  {
    sport: "golf", level: 1,
    q: "Which course is known as 'The Home of Golf'?",
    answer: "Old Course, St Andrews",
    lat: 56.3433, lng: -2.803, year: 1552,
    fact: "Golf has been played there since at least the 15th century.",
    es: {
      q: "¿Qué campo es conocido como 'La Casa del Golf'?",
      answer: "Old Course, St Andrews",
      fact: "Allí se juega al golf desde al menos el siglo XV."
    }
  },
  {
    sport: "golf", level: 3,
    q: "In 1997 the Ryder Cup was held in continental Europe for the first time. Where?",
    answer: "Valderrama, Sotogrande (Spain)",
    lat: 36.295, lng: -5.3, year: 1997,
    fact: "Seve Ballesteros captained Europe to victory.",
    es: {
      q: "En 1997 la Ryder Cup se jugó por primera vez en la Europa continental. ¿Dónde?",
      answer: "Valderrama, Sotogrande (España)",
      fact: "Seve Ballesteros fue el capitán de la victoria europea."
    }
  },
  {
    sport: "golf", level: 3,
    q: "Jean van de Velde famously waded into the Barry Burn and threw away the 1999 Open. Where?",
    answer: "Carnoustie, Scotland",
    lat: 56.497, lng: -2.715, year: 1999,
    fact: "He needed only a double bogey on the last hole to win, but made a triple.",
    es: {
      q: "Jean van de Velde se metió en el arroyo Barry Burn y tiró por la borda el Open de 1999. ¿Dónde?",
      answer: "Carnoustie, Escocia",
      fact: "Le bastaba un doble bogey en el último hoyo para ganar, pero hizo triple."
    }
  },
  {
    sport: "golf", level: 3,
    q: "The very first Open Championship was played in 1860 on a 12-hole course. Where?",
    answer: "Prestwick Golf Club, Scotland",
    lat: 55.495, lng: -4.615, year: 1860,
    fact: "Willie Park Sr. won; the prize was a red leather belt.",
    es: {
      q: "El primer Open Championship se jugó en 1860 en un campo de 12 hoyos. ¿Dónde?",
      answer: "Prestwick Golf Club, Escocia",
      fact: "Ganó Willie Park Sr.; el premio era un cinturón de cuero rojo."
    }
  },
  {
    sport: "golf", level: 1,
    q: "Where is the Masters played every April?",
    answer: "Augusta National Golf Club",
    lat: 33.503, lng: -82.023, year: 1934,
    fact: "The winner receives a green jacket.",
    es: {
      q: "¿Dónde se juega cada abril el Masters?",
      answer: "Augusta National Golf Club",
      fact: "El ganador recibe una chaqueta verde."
    }
  },
  {
    sport: "golf", level: 3,
    q: "Europe won the 2025 Ryder Cup away from home. Where?",
    answer: "Bethpage Black, Farmingdale (New York)",
    lat: 40.744, lng: -73.454, year: 2025,
    fact: "Europe won 15-13, their first away win since 2012.",
    es: {
      q: "Europa ganó la Ryder Cup de 2025 a domicilio. ¿Dónde?",
      answer: "Bethpage Black, Farmingdale (Nueva York)",
      fact: "Europa ganó 15-13, su primera victoria a domicilio desde 2012."
    }
  },
  {
    sport: "golf", level: 3,
    q: "Seve Ballesteros won his first Open in 1979, famously hitting a shot from a car park. Where?",
    answer: "Royal Lytham & St Annes",
    lat: 53.7489, lng: -3.0186, year: 1979,
    fact: "He was 22 years old.",
    es: {
      q: "Seve Ballesteros ganó su primer Open en 1979, con un famoso golpe desde un aparcamiento. ¿Dónde?",
      answer: "Royal Lytham & St Annes",
      fact: "Tenía 22 años."
    }
  },
  {
    sport: "golf", level: 3,
    q: "The 'Postage Stamp', the shortest hole in Open Championship golf, is on which course?",
    answer: "Royal Troon",
    lat: 55.531, lng: -4.65, year: 1923,
    fact: "The 8th hole is only about 110 metres long.",
    es: {
      q: "El 'Sello de Correos', el hoyo más corto del Open Championship, ¿en qué campo está?",
      answer: "Royal Troon",
      fact: "El hoyo 8 mide solo unos 110 metros."
    }
  },

  // ───────────── Cricket ─────────────
  {
    sport: "cricket", level: 1,
    q: "Which ground is known as 'The Home of Cricket'?",
    answer: "Lord's Cricket Ground, St John's Wood",
    lat: 51.5297, lng: -0.1729, year: 1814,
    fact: "Lord's has a noticeable slope: about 2.5 m from one side to the other.",
    es: {
      q: "¿Qué campo es conocido como 'La Casa del Críquet'?",
      answer: "Lord's, St John's Wood (Londres)",
      fact: "Lord's tiene una pendiente notable: unos 2,5 metros de un lado a otro."
    }
  },
  {
    sport: "cricket", level: 1,
    q: "A shock Australian win in 1882 led to a mock obituary for English cricket — and the birth of The Ashes. Where was the match?",
    answer: "The Oval, Kennington (London)",
    lat: 51.4837, lng: -0.115, year: 1882,
    fact: "The Sporting Times wrote that 'the body will be cremated and the ashes taken to Australia'.",
    es: {
      q: "Una sorprendente victoria australiana en 1882 provocó una esquela en broma por el críquet inglés… y el nacimiento de The Ashes. ¿Dónde fue el partido?",
      answer: "The Oval, Kennington (Londres)",
      fact: "El Sporting Times escribió que 'el cuerpo será incinerado y las cenizas llevadas a Australia'."
    }
  },

  // ───────────── Other sports ─────────────
  {
    sport: "boxing", level: 3,
    q: "Tyson Fury ended Wladimir Klitschko's nine-year reign as heavyweight champion in 2015. Where?",
    answer: "Esprit Arena, Düsseldorf",
    lat: 51.2617, lng: 6.7331, year: 2015,
    fact: "Klitschko had been unbeaten for over 11 years.",
    es: {
      q: "Tyson Fury acabó en 2015 con el reinado de nueve años de Wladimir Klitschko como campeón de los pesos pesados. ¿Dónde?",
      answer: "Esprit Arena, Düsseldorf",
      fact: "Klitschko llevaba más de 11 años sin perder."
    }
  },
  {
    sport: "darts", level: 1,
    q: "The PDC World Darts Championship is held every winter at the 'People's Palace'. Where?",
    answer: "Alexandra Palace, London",
    lat: 51.5942, lng: -0.131, year: 2008,
    fact: "In 2024, 16-year-old Luke Littler reached the final there on his debut.",
    es: {
      q: "El Mundial de dardos de la PDC se celebra cada invierno en el 'Palacio del Pueblo'. ¿Dónde?",
      answer: "Alexandra Palace, Londres",
      fact: "En 2024, Luke Littler, con 16 años, llegó allí a la final en su debut."
    }
  },
  {
    sport: "snooker", level: 2,
    q: "The World Snooker Championship has been held at the same theatre since 1977. Where?",
    answer: "Crucible Theatre, Sheffield",
    lat: 53.38, lng: -1.467, year: 1977,
    fact: "Ronnie O'Sullivan and Stephen Hendry have each won seven world titles in the modern era.",
    es: {
      q: "El Mundial de snooker se celebra en el mismo teatro desde 1977. ¿Dónde?",
      answer: "Crucible Theatre, Sheffield",
      fact: "Ronnie O'Sullivan y Stephen Hendry han ganado siete títulos mundiales cada uno en la era moderna."
    }
  },
  {
    sport: "horse racing", level: 1,
    q: "Where is the Grand National, the world's most famous steeplechase, run?",
    answer: "Aintree Racecourse, Liverpool",
    lat: 53.477, lng: -2.945, year: 1839,
    fact: "Red Rum won it a record three times (1973, 1974, 1977).",
    es: {
      q: "¿Dónde se corre el Grand National, la carrera de obstáculos más famosa del mundo?",
      answer: "Hipódromo de Aintree, Liverpool",
      fact: "Red Rum la ganó un récord de tres veces (1973, 1974 y 1977)."
    }
  },
  {
    sport: "horse racing", level: 1,
    q: "Twice every summer, riders race bareback around a medieval piazza in the Palio. In which city?",
    answer: "Piazza del Campo, Siena",
    lat: 43.3184, lng: 11.3316, year: 1633,
    fact: "A horse can win without its rider (a 'cavallo scosso').",
    es: {
      q: "Dos veces cada verano, jinetes montando a pelo dan vueltas a una plaza medieval en el Palio. ¿En qué ciudad?",
      answer: "Piazza del Campo, Siena",
      fact: "Un caballo puede ganar aunque haya perdido a su jinete (un 'cavallo scosso')."
    }
  },
  {
    sport: "equestrian", level: 3,
    q: "The famous horse trials — and the sport of badminton — take their name from a country estate. Where?",
    answer: "Badminton House, Gloucestershire",
    lat: 51.544, lng: -2.284, year: 1949,
    fact: "Badminton the racket sport was popularised by guests at the house in the 1870s.",
    es: {
      q: "Las famosas pruebas de concurso completo (y el deporte del bádminton) toman su nombre de una finca. ¿Dónde?",
      answer: "Badminton House, Gloucestershire",
      fact: "El bádminton se popularizó entre los invitados de la casa en la década de 1870."
    }
  },
  {
    sport: "climbing", level: 2,
    q: "The birth of mountaineering: which peak was first climbed in 1786?",
    answer: "Mont Blanc",
    lat: 45.8326, lng: 6.8652, year: 1786,
    fact: "Jacques Balmat and Michel-Gabriel Paccard reached the summit.",
    es: {
      q: "El nacimiento del alpinismo: ¿qué cumbre se escaló por primera vez en 1786?",
      answer: "Mont Blanc",
      fact: "Jacques Balmat y Michel-Gabriel Paccard llegaron a la cima."
    }
  },
  {
    sport: "climbing", level: 2,
    q: "Edward Whymper's party first reached this summit in 1865; four of them died on the way down. Which mountain?",
    answer: "Matterhorn",
    lat: 45.9763, lng: 7.6586, year: 1865,
    fact: "It's one of the most photographed mountains in the world.",
    es: {
      q: "La cordada de Edward Whymper llegó a esta cima por primera vez en 1865; cuatro de ellos murieron en el descenso. ¿Qué montaña?",
      answer: "Cervino (Matterhorn)",
      fact: "Es una de las montañas más fotografiadas del mundo."
    }
  },
  {
    sport: "darts", level: 3,
    q: "For more than 30 years, the BDO World Darts Championship was held at a country club. Where?",
    answer: "Lakeside Country Club, Frimley Green",
    lat: 51.307, lng: -0.724, year: 1986,
    fact: "It was held there from 1986 to 2019.",
    es: {
      q: "Durante más de 30 años, el Mundial de dardos de la BDO se celebró en un club de campo. ¿Dónde?",
      answer: "Lakeside Country Club, Frimley Green",
      fact: "Se celebró allí de 1986 a 2019."
    }
  },
  {
    sport: "boxing", level: 3,
    q: "Muhammad Ali defended his world title against Henry Cooper in 1966 at a football stadium. Where?",
    answer: "Highbury, London",
    lat: 51.555, lng: -0.1086, year: 1966,
    fact: "It was the old home of Arsenal.",
    es: {
      q: "Muhammad Ali defendió su título mundial contra Henry Cooper en 1966 en un estadio de fútbol. ¿Dónde?",
      answer: "Highbury, Londres",
      fact: "Era el antiguo estadio del Arsenal."
    }
  },
  {
    sport: "horse racing", level: 3,
    q: "The original Derby, first run in 1780, takes place at which racecourse?",
    answer: "Epsom Downs",
    lat: 51.315, lng: -0.255, year: 1780,
    fact: "Hundreds of races around the world are named after it.",
    es: {
      q: "El Derby original, que se corrió por primera vez en 1780, ¿en qué hipódromo se disputa?",
      answer: "Epsom Downs",
      fact: "Cientos de carreras de todo el mundo llevan su nombre."
    }
  },
  {
    sport: "horse racing", level: 3,
    q: "The roar of the crowd as the first race starts is famous at this four-day jumps festival every March. Where?",
    answer: "Cheltenham Racecourse",
    lat: 51.919, lng: -2.059, year: 1924,
    fact: "Its biggest race is the Gold Cup.",
    es: {
      q: "El rugido del público al arrancar la primera carrera es famoso en este festival de obstáculos de cuatro días cada marzo. ¿Dónde?",
      answer: "Hipódromo de Cheltenham",
      fact: "Su gran carrera es la Gold Cup."
    }
  },
  {
    sport: "basketball", level: 3,
    q: "Spain's 'golden generation' won the 2006 Basketball World Cup by beating Greece in the final, without the injured Pau Gasol. Where?",
    answer: "Saitama Super Arena, Japan",
    lat: 35.8949, lng: 139.6312, year: 2006,
    fact: "Pau Gasol was still named the tournament's MVP.",
    es: {
      q: "La 'generación de oro' de España ganó el Mundial de baloncesto de 2006 a Grecia en la final, sin Pau Gasol, lesionado. ¿Dónde?",
      answer: "Saitama Super Arena, Japón",
      fact: "Aun así, Pau Gasol fue elegido MVP del torneo."
    }
  },
  {
    sport: "sailing", level: 3,
    q: "In 2007 the America's Cup was held in Europe for the first time since 1851. Where?",
    answer: "Port of Valencia",
    lat: 39.46, lng: -0.32, year: 2007,
    fact: "Swiss team Alinghi defended the trophy against Team New Zealand.",
    es: {
      q: "En 2007 la Copa América de vela se celebró en Europa por primera vez desde 1851. ¿Dónde?",
      answer: "Puerto de Valencia",
      fact: "El equipo suizo Alinghi defendió el trofeo frente a Team New Zealand."
    }
  },
  {
    sport: "equestrian", level: 2,
    q: "The famous 'Spanish' Riding School, home of the Lipizzaner horses, is actually in which city?",
    answer: "Hofburg, Vienna",
    lat: 48.2075, lng: 16.3664, year: 1565,
    fact: "It's named after the Spanish horses the breed descends from.",
    es: {
      q: "La famosa Escuela Española de Equitación, hogar de los caballos lipizanos, está en realidad en ¿qué ciudad?",
      answer: "Hofburg, Viena",
      fact: "Debe su nombre a los caballos españoles de los que desciende la raza."
    }
  }
];
