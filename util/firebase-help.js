import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
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
                navigation.popToTop();
            }).catch((error) => {
                console.error(error);
            });
        }, () => { console.log('cancle logout') }
    )
}

export { setPinToFireStore, resetPassword , LogOut};