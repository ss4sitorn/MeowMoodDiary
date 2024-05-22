import { getFirestore, doc, setDoc, updateDoc,getDoc } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebaseApp from "../src/firebase/config";
import showConfirmationDialog from "./alert-confirm-custom";
import showAlert from "./alert-custom";
import {useNavigation} from "@react-navigation/native";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const user = auth.currentUser;

const setPinToFireStore = async (pin) => {
    try {
        await updateDoc(doc(db, "users", user.uid), {
            pin: pin,
        });
    } catch (e) {
        console.error(e);
    }
}

const resetPassword = async () => {
    showConfirmationDialog('Reset Password', 'Are you sure you want to reset your password?', async () => {
        try {
            await sendPasswordResetEmail(auth, user.email).then(() => {
                showAlert('Success', 'Reset password email sent');
            }).catch((error) => {
                console.error(error);
            })
        } catch (e) {
            console.error(e);
        }
    }
        , () => { console.log('cancle reset password') }
    )
}
const LogOut = async (navigation) => {
    showConfirmationDialog('Warning', 'Are you sure to log out?', async () => {
            await auth.signOut().then(() => {
                console.log('User signed out');
                navigation.popToTop('Login');
            }).catch((error) => {
                console.error(error);
            });
        }, () => { console.log('cancle logout') }
    )
}

const getEmail = () => {
    let auth = getAuth(firebaseApp);
    let user = auth.currentUser;
    return user.email;
}

const getUsername = async() => {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data().username;
    } else {
        console.log("No such document!");
    }
}

const updateByValue = async (filed,value) => {
    try {
        const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
        await updateDoc(doc(db, "users", user.uid), {
            [filed]: value,
        });
    } catch (e) {
        console.error(e);
    }
}

const getUserData = async (value) => {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()[value];
    } else {
        console.log("No such document!");
        return null;
    }
}

export { setPinToFireStore, resetPassword , LogOut, getEmail, getUsername , getUserData,updateByValue};
