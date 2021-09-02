import firestore from '@react-native-firebase/firestore';

export const getLigs = async () => {
  const querySnapshot = await firestore().collection('Soccer').get();
  const ligs = [];
  querySnapshot.forEach(documentSnapshot => {
    ligs.push(documentSnapshot.data());
  });

  const promises = ligs.map(async liga => {
    const promis = liga.matches.map(
      async matchID => await getMatchById(matchID),
    );
    liga.matches = await Promise.all(promis);
  });
  await Promise.all(promises);

  return ligs;
};

export const getMatches = async matchPerLoad => {
  const querySnapshot = await firestore()
    .collection('soccer_matches')
    .limit(matchPerLoad)
    .get();
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  const matches = [];
  querySnapshot.forEach(documentSnapshot => {
    matches.push(documentSnapshot.data());
  });

  console.log(matches);
  return {matches, lastVisible};
};
export const getTeamMatches = async (matchPerLoad, search) => {
  console.log(search);
  let matches = [];
  let lastVisible;
  let find = false;

  const queryFirstTeamSnapshot = await firestore()
    .collection('soccer_matches')
    .where('firstTeam.teamDetails.name', '==', search)

    .limit(matchPerLoad)
    .get();
  queryFirstTeamSnapshot.forEach(documentSnapshot => {
    matches.push(documentSnapshot.data());
  });
  const querySecondTeamSnapshot = await firestore()
    .collection('soccer_matches')
    .where('secondTeam.teamDetails.name', '==', search)
    .limit(matchPerLoad)
    .get();
  lastVisible =
    querySecondTeamSnapshot.docs[querySecondTeamSnapshot.docs.length - 1];
  querySecondTeamSnapshot.forEach(documentSnapshot => {
    matches.push(documentSnapshot.data());
  });
  if (matches.length !== 0) {
    find = true;
  }

  console.log(matches);
  return {matches, lastVisible, find};
};

export const fetchMoreMatches = async (startAfter, matchPerLoad, search) => {
  if (search !== '') {
    let matches = [];
    let lastVisible;

    const queryFirstTeamSnapshot = await firestore()
      .collection('soccer_matches')
      .where('firstTeam.teamDetails.name', '==', search)
      .startAfter(startAfter)
      .limit(matchPerLoad)
      .get();

    queryFirstTeamSnapshot.forEach(documentSnapshot => {
      matches.push(documentSnapshot.data());
    });
    const querySecondTeamSnapshot = await firestore()
      .collection('soccer_matches')
      .where('secondTeam.teamDetails.name', '==', search)
      .startAfter(startAfter)
      .limit(matchPerLoad)
      .get();

    querySecondTeamSnapshot.forEach(documentSnapshot => {
      matches.push(documentSnapshot.data());
    });

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

    console.log(matches);
    console.log(lastVisible);

    return {matches, lastVisible};
  }
};

export const getMatchById = async id => {
  const matchData = (
    await firestore().collection('soccer_matches').doc(id).get()
  ).data();
  matchData.playtime = new Date(matchData.playtime.nanoseconds);
  return matchData;
};

export const getAllTableMatches = async id => {
  const documentSnapshot = await firestore().collection('Soccer').doc(id).get();
  let tables;
  if (documentSnapshot.exists) {
    tables = documentSnapshot.data().alltable;
  }
  return tables;
};

export const getHomeTableMatches = async id => {
  const documentSnapshot = await firestore().collection('Soccer').doc(id).get();
  let tables;
  if (documentSnapshot.exists) {
    tables = documentSnapshot.data().hometable;
  }
  return tables;
};

export const getAwayTableMatches = async id => {
  const documentSnapshot = await firestore().collection('Soccer').doc(id).get();
  let tables;
  if (documentSnapshot.exists) {
    tables = documentSnapshot.data().awaytable;
  }
  return tables;
};

export const getLigaByID = async id => {
  const documentSnapshot = await firestore().collection('Soccer').doc(id).get();
  let liga;
  if (documentSnapshot.exists) {
    liga = documentSnapshot.data();
  }
  const promis = liga.matches.map(async matchID => await getMatchById(matchID));
  liga.matches = await Promise.all(promis);

  return liga;
};
