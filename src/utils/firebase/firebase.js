import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword
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
const provider = new GoogleAuthProvider()  //se preciar criar um login com github mudar o provider *

provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider) // * e criar mais um aqui

// inicializa o firestore (banco)
export const db = getFirestore() 

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if(!userAuth) return 

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists())

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return 

  return await createUserWithEmailAndPassword(auth, email, password)
}