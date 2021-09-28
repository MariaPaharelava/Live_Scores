import firestore from '@react-native-firebase/firestore';
export const getSoccerLigs = async () => {
  const querySnapshot = await firestore().collection('Soccer').get();
  const ligs = [];
  querySnapshot.forEach(documentSnapshot => {
    ligs.push(documentSnapshot.data());
  });

  const promises = ligs.map(async liga => {
    const promis = liga.matches.map(
      async matchID => await getSoccerMatchById(matchID),
    );
    liga.matches = await Promise.all(promis);
  });
  await Promise.all(promises);
  return ligs;
};
export const getSoccerLiga = async (ligsPerload, search) => {
  const querySnapshot = await firestore()
    .collection('Soccer')
    .where('ligaName', '==', search)
    .limit(ligsPerload)
    .get();
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  const ligs = [];
  querySnapshot.forEach(documentSnapshot => {
    ligs.push(documentSnapshot.data());
  });

  const promises = ligs.map(async liga => {
    const promis = liga.matches.map(
      async matchID => await getSoccerMatchById(matchID),
    );
    liga.matches = await Promise.all(promis);
  });
  await Promise.all(promises);

  return {ligs, lastVisible};
};
export const getSoccerMatchById = async id => {
  const matchData = (
    await firestore().collection('soccer_matches').doc(id).get()
  ).data();

  matchData.playtime = matchData.playtime.seconds;
  const promises = matchData.firstTeam.team.map(
    async teamID => await getSoocerTeamById(teamID),
  );
  const promises2 = matchData.secondTeam.team.map(
    async teamID => await getSoocerTeamById(teamID),
  );

  matchData.firstTeam.team = await Promise.all(promises);
  matchData.secondTeam.team = await Promise.all(promises2);

  return matchData;
};

export const getSoocerTeamById = async id => {
  const team = (
    await firestore().collection('soccer_teams').doc(id).get()
  ).data();
  return team;
};
export const getSoccerLigsTable = async ligsPerload => {
  const querySnapshot = await firestore()
    .collection('Soccer')
    .limit(ligsPerload)
    .get();
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  const ligs = [];
  querySnapshot.forEach(documentSnapshot => {
    ligs.push(documentSnapshot.data());
  });

  const promises = ligs.map(async liga => {
    const promis = liga.matches.map(
      async matchID => await getSoccerMatchById(matchID),
    );
    liga.matches = await Promise.all(promis);
  });
  await Promise.all(promises);

  return {ligs, lastVisible};
};
export const fetchSoccerMoreLigs = async (startAfter, ligsPerload, search) => {
  if (search !== '') {
    const ligs = [];

    return {ligs};
  } else {
    const querySnapshot = await firestore()
      .collection('Soccer')
      .startAfter(startAfter)
      .limit(ligsPerload)
      .get();
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    const ligs = [];
    querySnapshot.forEach(documentSnapshot => {
      ligs.push(documentSnapshot.data());
    });

    const promises = ligs.map(async liga => {
      const promis = liga.matches.map(
        async matchID => await getSoccerMatchById(matchID),
      );
      liga.matches = await Promise.all(promis);
    });
    await Promise.all(promises);

    return {ligs, lastVisible};
  }
};
export const getSoccerMatches = async matchPerLoad => {
  const querySnapshot = await firestore()
    .collection('soccer_matches')
    .limit(matchPerLoad)
    .get();
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  const matches = [];
  querySnapshot.forEach(documentSnapshot => {
    matches.push(documentSnapshot.data());
  });
  const promises = matches.map(async match => {
    const promises1 = match.firstTeam.team.map(
      async teamID => await getSoocerTeamById(teamID),
    );
    const promises2 = match.secondTeam.team.map(
      async teamID => await getSoocerTeamById(teamID),
    );
    match.firstTeam.team = await Promise.all(promises1);
    match.secondTeam.team = await Promise.all(promises2);
  });
  await Promise.all(promises);

  return {matches, lastVisible};
};
export const getTeamSoccerMatches = async (matchPerLoad, search) => {
  let matches = [];
  let lastVisible;

  const queryFirstTeamSnapshot = await firestore()
    .collection('soccer_matches')
    .where('firstTeam.team.teamDetails.name', '==', search)

    .limit(matchPerLoad)
    .get();
  queryFirstTeamSnapshot.forEach(documentSnapshot => {
    matches.push(documentSnapshot.data());
  });

  const querySecondTeamSnapshot = await firestore()
    .collection('soccer_matches')
    .where('secondTeam.team.teamDetails.name', '==', search)
    .limit(matchPerLoad)
    .get();
  lastVisible =
    querySecondTeamSnapshot.docs[querySecondTeamSnapshot.docs.length - 1];
  querySecondTeamSnapshot.forEach(documentSnapshot => {
    matches.push(documentSnapshot.data());
  });
  const promises = matches.map(async match => {
    const promises1 = match.firstTeam.team.map(
      async teamID => await getSoocerTeamById(teamID),
    );
    const promises2 = match.secondTeam.team.map(
      async teamID => await getSoocerTeamById(teamID),
    );
    match.firstTeam.team = await Promise.all(promises1);
    match.secondTeam.team = await Promise.all(promises2);
  });
  await Promise.all(promises);

  return {matches, lastVisible};
};
export const fetchMoreSoccerMatches = async (
  startAfter,
  matchPerLoad,
  search,
) => {
  if (search !== '') {
    let matches = [];
    let lastVisible;

    const queryFirstTeamSnapshot = await firestore()
      .collection('soccer_matches')
      .where('firstTeam.team.teamDetails.name', '==', search)
      .startAfter(startAfter)
      .limit(matchPerLoad)
      .get();

    queryFirstTeamSnapshot.forEach(documentSnapshot => {
      matches.push(documentSnapshot.data());
    });
    const querySecondTeamSnapshot = await firestore()
      .collection('soccer_matches')
      .where('secondTeam.team.teamDetails.name', '==', search)
      .startAfter(startAfter)
      .limit(matchPerLoad)
      .get();

    querySecondTeamSnapshot.forEach(documentSnapshot => {
      matches.push(documentSnapshot.data());
    });
    const promises = matches.map(async match => {
      const promises1 = match.firstTeam.team.map(
        async teamID => await getSoocerTeamById(teamID),
      );
      const promises2 = match.secondTeam.team.map(
        async teamID => await getSoocerTeamById(teamID),
      );
      match.firstTeam.team = await Promise.all(promises1);
      match.secondTeam.team = await Promise.all(promises2);
    });
    await Promise.all(promises);

    return {matches, lastVisible};
  } else {
    const querySnapshot = await firestore()
      .collection('soccer_matches')
      .startAfter(startAfter)
      .limit(matchPerLoad)
      .get();
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const matches = [];
    querySnapshot.forEach(documentSnapshot => {
      matches.push(documentSnapshot.data());
    });
    const promises = matches.map(async match => {
      const promises1 = match.firstTeam.team.map(
        async teamID => await getSoocerTeamById(teamID),
      );
      const promises2 = match.secondTeam.team.map(
        async teamID => await getSoocerTeamById(teamID),
      );
      match.firstTeam.team = await Promise.all(promises1);
      match.secondTeam.team = await Promise.all(promises2);
    });
    await Promise.all(promises);

    return {matches, lastVisible};
  }
};
export const getAllTableSoccerMatches = async id => {
  const documentSnapshot = await firestore().collection('Soccer').doc(id).get();
  let tables;
  if (documentSnapshot.exists) {
    tables = documentSnapshot.data().alltable;
  }
  return tables;
};

export const getHomeTableSoccerMatches = async id => {
  const documentSnapshot = await firestore().collection('Soccer').doc(id).get();
  let tables;
  if (documentSnapshot.exists) {
    tables = documentSnapshot.data().hometable;
  }
  return tables;
};
export const getAwayTableSoccerMatches = async id => {
  const documentSnapshot = await firestore().collection('Soccer').doc(id).get();
  let tables;
  if (documentSnapshot.exists) {
    tables = documentSnapshot.data().awaytable;
  }
  return tables;
};

export const getBasketballLigs = async () => {
  const querySnapshot = await firestore().collection('Basketball').get();
  const ligs = [];

  querySnapshot.forEach(documentSnapshot => {
    ligs.push(documentSnapshot.data());
  });

  const promises = ligs.map(async liga => {
    const promis = liga.matches.map(
      async matchID => await getBasketballMatchById(matchID),
    );
    liga.matches = await Promise.all(promis);
  });
  await Promise.all(promises);

  return ligs;
};

export const getBasketballLigsTable = async ligsPerload => {
  const querySnapshot = await firestore()
    .collection('Basketball')
    .limit(ligsPerload)
    .get();
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  const ligs = [];
  querySnapshot.forEach(documentSnapshot => {
    ligs.push(documentSnapshot.data());
  });

  const promises = ligs.map(async liga => {
    const promis = liga.matches.map(
      async matchID => await getBasketballMatchById(matchID),
    );
    liga.matches = await Promise.all(promis);
  });
  await Promise.all(promises);

  return {ligs, lastVisible};
};

export const getBasketballLiga = async (ligsPerload, search) => {
  const querySnapshot = await firestore()
    .collection('Basketball')
    .where('ligaName', '==', search)
    .limit(ligsPerload)
    .get();
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  const ligs = [];
  querySnapshot.forEach(documentSnapshot => {
    ligs.push(documentSnapshot.data());
  });

  const promises = ligs.map(async liga => {
    const promis = liga.matches.map(
      async matchID => await getBasketballMatchById(matchID),
    );
    liga.matches = await Promise.all(promis);
  });
  await Promise.all(promises);

  return {ligs, lastVisible};
};

export const fetchBasketballMoreLigs = async (
  startAfter,
  ligsPerload,
  search,
) => {
  if (search !== '') {
    const ligs = [];

    return {ligs};
  } else {
    const querySnapshot = await firestore()
      .collection('Basketball')
      .startAfter(startAfter)
      .limit(ligsPerload)
      .get();
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    const ligs = [];
    querySnapshot.forEach(documentSnapshot => {
      ligs.push(documentSnapshot.data());
    });

    const promises = ligs.map(async liga => {
      const promis = liga.matches.map(
        async matchID => await getBasketballMatchById(matchID),
      );
      liga.matches = await Promise.all(promis);
    });
    await Promise.all(promises);

    return {ligs, lastVisible};
  }
};

export const getBasketballMatches = async matchPerLoad => {
  const querySnapshot = await firestore()
    .collection('basketball_matches')
    .limit(matchPerLoad)
    .get();
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  const matches = [];
  querySnapshot.forEach(documentSnapshot => {
    matches.push(documentSnapshot.data());
  });
  const promises = matches.map(async match => {
    const promises1 = match.firstTeam.team.map(
      async teamID => await getBasketballTeamById(teamID),
    );
    const promises2 = match.secondTeam.team.map(
      async teamID => await getBasketballTeamById(teamID),
    );
    match.firstTeam.team = await Promise.all(promises1);
    match.secondTeam.team = await Promise.all(promises2);
  });
  await Promise.all(promises);

  return {matches, lastVisible};
};

export const getTeamBasketballMatches = async (matchPerLoad, search) => {
  let matches = [];
  let lastVisible;

  const queryFirstTeamSnapshot = await firestore()
    .collection('basketball_matches')
    .where('firstTeam.team.teamDetails.name', '==', search)

    .limit(matchPerLoad)
    .get();
  queryFirstTeamSnapshot.forEach(documentSnapshot => {
    matches.push(documentSnapshot.data());
  });
  const querySecondTeamSnapshot = await firestore()
    .collection('basketball_matches')
    .where('secondTeam.team.teamDetails.name', '==', search)
    .limit(matchPerLoad)
    .get();
  lastVisible =
    querySecondTeamSnapshot.docs[querySecondTeamSnapshot.docs.length - 1];
  querySecondTeamSnapshot.forEach(documentSnapshot => {
    matches.push(documentSnapshot.data());
  });
  const promises = matches.map(async match => {
    const promises1 = match.firstTeam.team.map(
      async teamID => await getBasketballTeamById(teamID),
    );
    const promises2 = match.secondTeam.team.map(
      async teamID => await getBasketballTeamById(teamID),
    );
    match.firstTeam.team = await Promise.all(promises1);
    match.secondTeam.team = await Promise.all(promises2);
  });
  await Promise.all(promises);

  return {matches, lastVisible};
};

export const fetchMoreBasketballMatches = async (
  startAfter,
  matchPerLoad,
  search,
) => {
  if (search !== '') {
    let matches = [];
    let lastVisible;

    const queryFirstTeamSnapshot = await firestore()
      .collection('basketball_matches')
      .where('firstTeam.team.teamDetails.name', '==', search)
      .startAfter(startAfter)
      .limit(matchPerLoad)
      .get();

    queryFirstTeamSnapshot.forEach(documentSnapshot => {
      matches.push(documentSnapshot.data());
    });
    const querySecondTeamSnapshot = await firestore()
      .collection('basketball_matches')
      .where('secondTeam.team.teamDetails.name', '==', search)
      .startAfter(startAfter)
      .limit(matchPerLoad)
      .get();

    querySecondTeamSnapshot.forEach(documentSnapshot => {
      matches.push(documentSnapshot.data());
    });
    const promises = matches.map(async match => {
      const promises1 = match.firstTeam.team.map(
        async teamID => await getBasketballTeamById(teamID),
      );
      const promises2 = match.secondTeam.team.map(
        async teamID => await getBasketballTeamById(teamID),
      );
      match.firstTeam.team = await Promise.all(promises1);
      match.secondTeam.team = await Promise.all(promises2);
    });
    await Promise.all(promises);

    return {matches, lastVisible};
  } else {
    const querySnapshot = await firestore()
      .collection('basketball_matches')
      .startAfter(startAfter)
      .limit(matchPerLoad)
      .get();
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const matches = [];
    querySnapshot.forEach(documentSnapshot => {
      matches.push(documentSnapshot.data());
    });
    const promises = matches.map(async match => {
      const promises1 = match.firstTeam.team.map(
        async teamID => await getBasketballTeamById(teamID),
      );
      const promises2 = match.secondTeam.team.map(
        async teamID => await getBasketballTeamById(teamID),
      );
      match.firstTeam.team = await Promise.all(promises1);
      match.secondTeam.team = await Promise.all(promises2);
    });
    await Promise.all(promises);

    return {matches, lastVisible};
  }
};

export const getBasketballMatchById = async id => {
  const matchData = (
    await firestore().collection('basketball_matches').doc(id).get()
  ).data();
  matchData.playtime = new Date(matchData.playtime.nanoseconds);
  const promises = matchData.firstTeam.team.map(
    async teamID => await getBasketballTeamById(teamID),
  );
  const promises2 = matchData.secondTeam.team.map(
    async teamID => await getBasketballTeamById(teamID),
  );

  matchData.firstTeam.team = await Promise.all(promises);
  matchData.secondTeam.team = await Promise.all(promises2);
  return matchData;
};

export const getBasketballTeamById = async id => {
  const team = (
    await firestore().collection('basketball_teams').doc(id).get()
  ).data();
  return team;
};

export const getAllTableBasketballMatches = async id => {
  const documentSnapshot = await firestore()
    .collection('Basketball')
    .doc(id)
    .get();
  let tables;
  if (documentSnapshot.exists) {
    tables = documentSnapshot.data().alltable;
  }
  return tables;
};

export const getHomeTableBasketballMatches = async id => {
  const documentSnapshot = await firestore()
    .collection('Basketball')
    .doc(id)
    .get();
  let tables;
  if (documentSnapshot.exists) {
    tables = documentSnapshot.data().hometable;
  }
  return tables;
};

export const getAwayTableBasketballMatches = async id => {
  const documentSnapshot = await firestore()
    .collection('Basketball')
    .doc(id)
    .get();
  let tables;
  if (documentSnapshot.exists) {
    tables = documentSnapshot.data().awaytable;
  }
  return tables;
};

export const getSoccerLigaByID = async id => {
  const documentSnapshot = await firestore().collection('Soccer').doc(id).get();
  let liga;
  if (documentSnapshot.exists) {
    liga = documentSnapshot.data();
  }
  console.log('liga', liga);
  const promis = liga.matches.map(
    async matchID => await getSoccerMatchById(matchID),
  );
  liga.matches = await Promise.all(promis);

  return liga;
};

export const getBasketballLigaByID = async id => {
  const documentSnapshot = await firestore()
    .collection('Basketball')
    .doc(id)
    .get();
  let liga;
  if (documentSnapshot.exists) {
    liga = documentSnapshot.data();
  }
  const promis = liga.matches.map(
    async matchID => await getBasketballMatchById(matchID),
  );
  liga.matches = await Promise.all(promis);

  return liga;
};

export const getUsers = async usersPerLoad => {
  const querySnapshot = await firestore()
    .collection('users')
    .limit(usersPerLoad)
    .get();
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  const users = [];
  querySnapshot.forEach(documentSnapshot => {
    users.push(documentSnapshot.data());
  });

  return {users, lastVisible};
};

export const fetchMoreUsers = async (startAfter, matchPerLoad) => {
  const querySnapshot = await firestore()
    .collection('users')
    .startAfter(startAfter)
    .limit(matchPerLoad)
    .get();
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  const users = [];
  querySnapshot.forEach(documentSnapshot => {
    users.push(documentSnapshot.data());
  });

  return {users, lastVisible};
};

export const getSoocerTeams = async () => {
  const querySnapshot = await firestore().collection('soccer_teams').get();
  const teams = [];
  querySnapshot.forEach(documentSnapshot => {
    teams.push(documentSnapshot.data());
  });

  return teams;
};
