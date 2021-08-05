export const Ligs = [
  {
    id: 'laliga228',
    ligaName: 'La Liga',
    ligaCountry: 'Spain',
    country: 'spain',
    imageUrl: 'https://image',
    sportId: 'sooccer',
    currentMatchId: 'laliga',
    matches: [
      {
        playtime: new Date(),
        id: '1',
        type: 'HT',
        firstTeam: {
          score: 2,

          teamDetails: {
            id: 'barsa1',
            name: 'Barselona',
            imageUrl:
              'https://cdn.icon-icons.com/icons2/104/PNG/256/fc_barcelona_footballteam_18015.png',
          },
          stats: {
            shooting: 10,
            attacks: 15,
            possesion: 80,
            cards: 4,
            corners: 8,
          },
        },
        secondTeam: {
          score: 0,
          teamDetails: {
            id: 'real1',
            name: 'Real Madrid',
            imageUrl:
              'https://cdn.icon-icons.com/icons2/1637/PNG/256/real-madrid_109486.png',
          },
          stats: {
            shooting: 8,
            attacks: 9,
            possesion: 50,
            cards: 6,
            corners: 2,
          },
        },
      },
      {
        playtime: new Date(),
        id: '11',
        type: 'HT',
        firstTeam: {
          score: 3,
          teamDetails: {
            id: 'atletico1',
            name: 'Atletico M.',
            imageUrl:
              'https://icons.iconarchive.com/icons/giannis-zographos/spanish-football-club/256/Atletico-Madrid-icon.png',
          },
          stats: {
            shooting: 14,
            attacks: 19,
            possesion: 50,
            cards: 2,
            corners: 10,
          },
        },
        secondTeam: {
          score: 1,
          teamDetails: {
            id: 'sevilla1',
            name: 'Sevilla',
            imageUrl:
              'https://icons.iconarchive.com/icons/giannis-zographos/spanish-football-club/256/Sevilla-icon.png',
          },
          stats: {
            shooting: 8,
            attacks: 9,
            possesion: 50,
            cards: 6,
            corners: 2,
          },
        },
      },
    ],
  },
  {
    id: 'premierliga228',
    ligaName: 'Premier League',
    ligaCountry: 'England',
    country: 'england',
    imageUrl: 'https://image',
    sportId: 'soccer',
    currentMatchId: 'premierleague',
    matches: [
      {
        playtime: new Date(),

        id: '2',
        type: 'FT',
        firstTeam: {
          score: 2,
          teamDetails: {
            id: 'astonvilla1',
            name: 'Aston Villa',
            imageUrl:
              'https://cdn.icon-icons.com/icons2/103/PNG/256/aston_villa_17994.png',
          },
          stats: {
            shooting: 8,
            attacks: 9,
            possesion: 30,
            cards: 6,
            corners: 4,
          },
        },
        secondTeam: {
          score: 3,
          teamDetails: {
            id: 'liverpool1',
            name: 'Liverpool',
            imageUrl:
              'https://cdn.icon-icons.com/icons2/103/PNG/256/liverpool_fc_17975.png',
          },
          stats: {
            shooting: 18,
            attacks: 19,
            possesion: 60,
            cards: 2,
            corners: 2,
          },
        },
      },
      {
        playtime: new Date(),

        id: '22',
        type: 'FT',
        firstTeam: {
          score: 4,
          teamDetails: {
            id: 'chelsea1',
            name: 'Chelsea',
            imageUrl:
              'https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/128/Chelsea-FC-icon.png',
          },
          stats: {
            shooting: 18,
            attacks: 29,
            possesion: 60,
            cards: 2,
            corners: 12,
          },
        },
        secondTeam: {
          score: 3,
          teamDetails: {
            id: 'arsenal1',
            name: 'Arsenal',
            imageUrl:
              'https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Arsenal-FC-icon.png',
          },
          stats: {
            shooting: 10,
            attacks: 15,
            possesion: 80,
            cards: 5,
            corners: 7,
          },
        },
      },
    ],
  },
  {
    id: 'bundesliga228',
    ligaName: 'Bundesliga',
    ligaCountry: 'Germany',
    country: 'germany',
    imageUrl: 'https://image',
    sportId: 'soccer',
    currentMatchId: 'bundesliga',
    matches: [
      {
        playtime: new Date(),

        id: '3',
        type: 'FT',
        firstTeam: {
          score: 5,
          teamDetails: {
            id: 'bayern1',
            name: 'Bayern',
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg/600px-Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg.png',
          },
          stats: {
            shooting: 18,
            attacks: 25,
            possesion: 50,
            cards: 2,
            corners: 8,
          },
        },
        secondTeam: {
          score: 3,
          teamDetails: {
            id: 'borussiaD',
            name: 'Borussia D.',
            imageUrl:
              'https://iconape.com/wp-content/png_logo_vector/borussia-dortmund.png',
          },
          stats: {
            shooting: 10,
            attacks: 15,
            possesion: 45,
            cards: 2,
            corners: 8,
          },
        },
      },
      {
        playtime: new Date(),

        id: '33',
        type: 'FT',
        firstTeam: {
          score: 1,
          teamDetails: {
            id: 'wolfsburg1',
            name: 'Wolfsburg',
            imageUrl:
              'https://icons.iconarchive.com/icons/giannis-zographos/german-football-club/256/VfL-Wolfsburg-icon.png',
          },
          stats: {
            shooting: 5,
            attacks: 10,
            possesion: 45,
            cards: 3,
            corners: 8,
          },
        },
        secondTeam: {
          score: 1,
          teamDetails: {
            id: 'leipzig1',
            name: 'Leipzig ',
            imageUrl:
              'https://iconape.com/wp-content/png_logo_vector/rb-leipzig-logo.png',
          },
          stats: {
            shooting: 10,
            attacks: 15,
            possesion: 25,
            cards: 2,
            corners: 8,
          },
        },
      },
    ],
  },
];
