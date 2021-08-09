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
        // playtime: new Date('2016-02-29T07:00:00.000Z'),
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
          formation: [4, 3, 3],

          players: {
            FWD: [
              {name: 'Dembele', number: '11', goal: '+'},
              {name: 'Aguero', number: '19'},
              {name: 'Griezmann', number: '7'},
            ],
            MID: [
              {name: 'Busquets', number: '5'},
              {name: 'DeJong', number: '21'},
              {
                name: 'Messi',
                number: '10',
                captain: '+',
                card: '+',
              },
            ],
            DEF: [
              {name: 'Alba', number: '18'},
              {name: 'Pique', number: '3'},
              {name: 'Roberto', number: '20', card: '+'},
              {name: 'Umtiti', number: '23'},
            ],
            GKC: [{name: 'Neto', number: '13'}],
          },

          // players: [
          //   {player: 'Neto', number: '13'},
          //   {player: 'Alba', number: '18'},
          //   {player: 'Pique', number: '3'},
          //   {player: 'Roberto', number: '20'},
          //   {player: 'Umtiti', number: '23'},
          //   {player: 'Busquets', number: '5'},
          //   {player: 'DeJong', number: '21'},
          //   {player: 'Messi', number: '10'},
          //   {player: 'Aguero', number: '19'},
          //   {player: 'Griezmann', number: '7'},
          //   {player: 'Dembele', number: '11'},
          // ],
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
            shooting: 11,
            attacks: 11,
            possesion: 50,
            cards: 6,
            corners: 2,
          },
          formation: [5, 2, 3],
          players: {
            FWD: [
              {name: 'Asensio', number: '11'},
              {name: 'Benzema', number: '9'},
              {name: 'Hazard', number: '7'},
            ],
            MID: [
              {name: 'Modric', number: '10'},
              {name: 'Isco', number: '22'},
            ],
            DEF: [
              {name: 'Alaba', number: '4'},
              {name: 'Nacho', number: '6'},
              {name: 'Marcelo', number: '12'},
              {name: 'Mendy', number: '23'},
              {name: 'Kroos', number: '8', captain: '+'},
            ],
            GKC: [{name: 'Courtois', number: '1'}],
          },
          // players: [
          //   {player: 'Courtois', number: '1'},
          //   {player: 'Alaba', number: '4'},
          //   {player: 'Nacho', number: '6'},
          //   {player: 'Marcelo', number: '12'},
          //   {player: 'Mendy', number: '23'},
          //   {player: 'Kroos', number: '8'},
          //   {player: 'Modric', number: '10'},
          //   {player: 'Isco', number: '22'},
          //   {player: 'Asensio', number: '11'},
          //   {player: 'Hazard', number: '7'},
          //   {player: 'Benzema', number: '9'},
          // ],
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
          formation: [4, 4, 2],
          players: {
            FWD: [
              {name: 'Felix', number: '7'},
              {name: 'Suarez', number: '9'},
            ],
            MID: [
              {name: 'Herrera', number: '16'},
              {name: 'Koke', number: '6'},
              {name: 'Dorta', number: '41'},
              {name: 'Saul', number: '8'},
            ],
            DEF: [
              {name: 'Hermoso', number: '22'},
              {name: 'Sanchez', number: '29'},
              {name: 'Lodi', number: '12'},
              {name: 'Garcia', number: '26'},
            ],
            GKC: [{name: 'Oblak', number: '13', captain: '+'}],
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
          formation: [4, 2, 3, 1],
          players: {
            FWD: [{name: 'Suso', number: '7'}],
            MIDF: [
              {name: 'Jordan', number: '8'},
              {name: 'Gomez', number: '24'},
              {name: 'Lemar', number: '11'},
            ],
            MIDS: [
              {name: 'Rodriges', number: '14'},
              {name: 'Rakitic', number: '10', captain: '+'},
            ],
            DEF: [
              {name: 'Pozo', number: '18'},
              {name: 'Reges', number: '25'},
              {name: 'Rekik', number: '4'},
              {name: 'Carlos', number: '20'},
              {name: 'Diaz', number: '31'},
            ],
            GKC: [{name: 'Bono', number: '13'}],
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
          formation: [4, 2, 3, 1],
          players: {
            FWD: [{name: 'Suso', number: '7'}],
            MIDF: [
              {name: 'Jordan', number: '8'},
              {name: 'Gomez', number: '24'},
              {name: 'Lemar', number: '11'},
            ],
            MIDS: [
              {name: 'Rodriges', number: '14'},
              {name: 'Rakitic', number: '10', captain: '+'},
            ],
            DEF: [
              {name: 'Pozo', number: '18'},
              {name: 'Reges', number: '25'},
              {name: 'Rekik', number: '4'},
              {name: 'Carlos', number: '20'},
              {name: 'Diaz', number: '31'},
            ],
            GKC: [{name: 'Bono', number: '13'}],
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
          formation: [5, 2, 3],
          players: {
            FWD: [
              {name: 'Asensio', number: '11'},
              {name: 'Benzema', number: '9', captain: '+'},
              {name: 'Hazard', number: '7'},
            ],
            MID: [
              {name: 'Modric', number: '10'},
              {name: 'Isco', number: '22'},
            ],
            DEF: [
              {name: 'Alaba', number: '4'},
              {name: 'Nacho', number: '6'},
              {name: 'Marcelo', number: '12'},
              {name: 'Mendy', number: '23'},
              {name: 'Kroos', number: '8'},
            ],
            GKC: [{name: 'Courtois', number: '1'}],
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
          formation: [4, 3, 3],

          players: {
            FWD: [
              {name: 'Dembele', number: '11'},
              {name: 'Aguero', number: '19'},
              {name: 'Griezmann', number: '7', captain: '+'},
            ],
            MID: [
              {name: 'Busquets', number: '5'},
              {name: 'DeJong', number: '21'},
              {name: 'Messi', number: '10'},
            ],
            DEF: [
              {name: 'Alba', number: '18'},
              {name: 'Pique', number: '3'},
              {name: 'Roberto', number: '20'},
              {name: 'Umtiti', number: '23'},
            ],
            GKC: [{name: 'Neto', number: '13'}],
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
          formation: [4, 2, 3, 1],
          players: {
            FWD: [{name: 'Suso', number: '7'}],
            MIDF: [
              {name: 'Jordan', number: '8'},
              {name: 'Gomez', number: '24'},
              {name: 'Lemar', number: '11'},
            ],
            MIDS: [
              {name: 'Rodriges', number: '14'},
              {name: 'Rakitic', number: '10'},
            ],
            DEF: [
              {name: 'Pozo', number: '18'},
              {name: 'Reges', number: '25'},
              {name: 'Rekik', number: '4', captain: '+'},
              {name: 'Carlos', number: '20'},
              {name: 'Diaz', number: '31'},
            ],
            GKC: [{name: 'Bono', number: '13'}],
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
          formation: [4, 3, 3],

          players: {
            FWD: [
              {name: 'Dembele', number: '11'},
              {name: 'Aguero', number: '19'},
              {name: 'Griezmann', number: '7'},
            ],
            MID: [
              {name: 'Busquets', number: '5'},
              {name: 'DeJong', number: '21'},
              {name: 'Messi', number: '10'},
            ],
            DEF: [
              {name: 'Alba', number: '18'},
              {name: 'Pique', number: '3'},
              {name: 'Roberto', number: '20'},
              {name: 'Umtiti', number: '23'},
            ],
            GKC: [{name: 'Neto', number: '13', captain: '+'}],
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
            shooting: 12,
            attacks: 15,
            possesion: 45,
            cards: 4,
            corners: 5,
          },
          formation: [4, 2, 3, 1],
          players: {
            FWD: [{name: 'Suso', number: '7'}],
            MIDF: [
              {name: 'Jordan', number: '8'},
              {name: 'Gomez', number: '24'},
              {name: 'Lemar', number: '11'},
            ],
            MIDS: [
              {name: 'Rodriges', number: '14'},
              {name: 'Rakitic', number: '10'},
            ],
            DEF: [
              {name: 'Pozo', number: '18'},
              {name: 'Reges', number: '25'},
              {name: 'Rekik', number: '4'},
              {name: 'Carlos', number: '20', captain: '+'},
              {name: 'Diaz', number: '31'},
            ],
            GKC: [{name: 'Bono', number: '13'}],
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
          formation: [5, 2, 3],
          players: {
            FWD: [
              {name: 'Asensio', number: '11'},
              {name: 'Benzema', number: '9'},
              {name: 'Hazard', number: '7'},
            ],
            MID: [
              {name: 'Modric', number: '10'},
              {name: 'Isco', number: '22'},
            ],
            DEF: [
              {name: 'Alaba', number: '4'},
              {name: 'Nacho', number: '6'},
              {name: 'Marcelo', number: '12'},
              {name: 'Mendy', number: '23', captain: '+'},
              {name: 'Kroos', number: '8'},
            ],
            GKC: [{name: 'Courtois', number: '1'}],
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
          formation: [4, 4, 2],
          players: {
            FWD: [
              {name: 'Felix', number: '7'},
              {name: 'Suarez', number: '9'},
            ],
            MID: [
              {name: 'Herrera', number: '16'},
              {name: 'Koke', number: '6'},
              {name: 'Dorta', number: '41'},
              {name: 'Saul', number: '8'},
            ],
            DEF: [
              {name: 'Hermoso', number: '22'},
              {name: 'Sanchez', number: '29'},
              {name: 'Lodi', number: '12'},
              {name: 'Garcia', number: '26'},
            ],
            GKC: [{name: 'Oblak', number: '13', captain: '+'}],
          },
        },
      },
    ],
  },
];
