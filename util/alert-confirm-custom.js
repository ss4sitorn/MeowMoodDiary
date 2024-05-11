import { Alert } from 'react-native';

const showConfirmationDialog = (title, message, onConfirm, onCancel) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: 'Cancel',
                onPress: onCancel,
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: onConfirm,
            },
        ],
        { cancelable: false }
    );
};
export default showConfirmationDialog;