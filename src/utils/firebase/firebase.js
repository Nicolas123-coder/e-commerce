import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCSajc99CokQZw4MmGfMsVd_Uvem00TlwQ",
  authDomain: "e-commerce-db-af0b0.firebaseapp.com",
  projectId: "e-commerce-db-af0b0",
  storageBucket: "e-commerce-db-af0b0.appspot.com",
  messagingSenderId: "175469438922",
  appId: "1:175469438922:web:463d6f02a61913121d5133"
};
  
const firebaseApp = initializeApp(firebaseConfig);

// para google authenticator
const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

// inicializa o firestore (banco)
export const db = getFirestore() 

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists())
}