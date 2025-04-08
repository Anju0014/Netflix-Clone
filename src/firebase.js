
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut} from 'firebase/auth'
import {addDoc,collection,getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyC-P9qK5PQxB0GrQ2aAINHaUX4ItHZBiu0",
  authDomain: "net-flix-clone-c996b.firebaseapp.com",
  projectId: "net-flix-clone-c996b",
  storageBucket: "net-flix-clone-c996b.firebasestorage.app",
  messagingSenderId: "706049688253",
  appId: "1:706049688253:web:07fa54dd1e048d5a4cadd4"
};


const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db=  getFirestore(app);

const signup=async(name,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch(error){
          console.log(error)
        // alert(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
     }
}


// const login= async ()=>{
//     try{
//         await signInWithEmailAndPassword(auth,email,password)

//     }catch(error){
//         console.log(error);
//         alert(error);
//     }
// }
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        // alert(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
};


const logOut=()=>{
    console.log("REACHED")
    signOut(auth)
    
}


export {auth,db,login,signup,logOut};