var admin = require("firebase-admin");
var serviceAccount = require("../../../public/serviceAccount.json");
const { collection, doc } = require("firebase/firestore");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ahlisunna-52647.firebaseio.com"
});
const db = admin.firestore();



async function getFirestore(collectionType) {
    let fireStoreData = [];
  try {
    let docRef = db.collection(collectionType);
    fireStoreData = await docRef.get().then((snapshot) => {
      let data = [];
      snapshot.forEach((doc) => {
          data.push(
              {
                  ...doc.data(),
                  docId: doc.id
              }
          );
      });
      return data;
  }).catch((err) => {
      console.log('Error getting documents', err);
  });
  } catch (error) {
        console.log(error);
  }
    return fireStoreData;
}
async function removeFirestore(collectionType, id) {
    let fireStoreData = [];
    try {
        let docRef = db.collection(collectionType).doc(id);
        fireStoreData = await docRef.delete().then(() => {
            return true;
        }).catch((err) => {
            console.log('Error getting documents', err);
        });
    } catch (error) {
        console.log(error);
    }
    return fireStoreData;
}


async function addFirestore(collectionName, data) {
    let docRef = db.collection(collectionName).doc(data.id);
    let fireStoreData = await docRef.set(data).then(() => {
        return true;
    }).catch((err) => {
        console.log('Error getting documents', err);
    });
    return fireStoreData;

}
module.exports = {
    getFirestore,
    removeFirestore,
    addFirestore
}
