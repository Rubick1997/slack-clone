import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyDKA8AhQczVMoIhrDZSTspnyz9dN6OVaVo",
	authDomain: "slack-clone-d2681.firebaseapp.com",
	projectId: "slack-clone-d2681",
	storageBucket: "slack-clone-d2681.appspot.com",
	messagingSenderId: "218575846812",
	appId: "1:218575846812:web:bc3874ab3c5349140e1c59",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
