import { initializeApp } from 'firebase/app'
import { Category } from '../../store/categories/category.types';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from '@firebase/firestore';

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

// retorna os dados dos produtos da aba '/shop' (dados das categorias)
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories')

  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category)
}

export type ObjectToAdd = {
  title: string
}

// cria a collection que vai ter os dados de todos os produtos da aba '/shop' (dados das categorias)
// quando precisar criar a collection de novo no banco de dados só chamar essa função e usar o obj. da aula como segundo parametro
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string, 
  objectsToAdd: T[]
): Promise <void> => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)  // como se fosse transactions em SQL

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')
} 

export type AdditionalInformation = {
  displayName?: string
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

export const createUserDocumentFromAuth = async (
  userAuth: User, 
  additionalInfo = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if(!userAuth) return 

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)
  console.log('user exists ? ', userSnapshot.exists())

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
      console.log('error creating the user', error)
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>
}

export const createAuthUserWithEmailAndPassword = async (
  email: string, 
  password: string
) => {
  if(!email || !password) return 

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const SignInUserWithEmailAndPassword = async (email: string, password: string) => {
  if(!email || !password) return 

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => signOut(auth)

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => 
  onAuthStateChanged(auth, callback)

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe()
        resolve(userAuth)
      },
      reject
    )
  })
}