// import firestore from '@react-native-firebase/firestore';
import firestore, {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from '@react-native-firebase/firestore';

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

export const fetchMoreMatches = async (startAfter, matchPerLoad) => {
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
  return {matches, lastVisible};
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
