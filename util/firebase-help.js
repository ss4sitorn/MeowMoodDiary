import { getFirestore, doc, setDoc, updateDoc,getDoc,deleteField ,getDocs , collection} from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebaseApp from "../src/firebase/config";
import showConfirmationDialog from "./alert-confirm-custom";
import showAlert from "./alert-custom";
import {useNavigation} from "@react-navigation/native";
import moment from 'moment';
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const user = auth.currentUser;

const setPinToFireStore = async (pin) => {
    let auth = getAuth(firebaseApp);
    let user = auth.currentUser;
    try {
        await updateDoc(doc(db, "users", user.uid), {
            pin: pin,
        });
    } catch (e) {
        console.error(e);
    }
}

const resetPassword = async () => {
    let auth = getAuth(firebaseApp);
    let user = auth.currentUser;
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
    let auth = getAuth(firebaseApp);
    let user = auth.currentUser;
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

const getUID = () => {
    let auth = getAuth(firebaseApp);
    let user = auth.currentUser;
    return user.uid;
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

const deleteFieldWithValue = (field) => {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid);
    updateDoc(docRef, {
        [field]: deleteField()
    }).then(r => console.log(field ," deleted"));
}

const getDataCollectionWithUid = async (collectionName) => {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    const collref = getDocs(collection(db, collectionName));
    const data = [];
    const querySnapshot = await collref;
    querySnapshot.forEach((doc) => {
        if(doc.data().uid === user.uid){
            //convert string date "19 May 2024" to date object



            data.push(doc.data());
        }
    });
    data.map((item) => {
        const dateString = item.date.trim();
        const dateObject = moment(dateString, "DD MMM YYYY").toDate();
        if (isNaN(dateObject.getTime())) {
            console.error("Invalid date string: ", dateString);
        } else {
            item.date = dateObject;
        }
    });
    return data;
}

export { setPinToFireStore, resetPassword , LogOut, getEmail, getUsername , getUserData , deleteFieldWithValue,updateByValue , getDataCollectionWithUid};
