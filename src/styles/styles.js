import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.cream,
  },
  headingContainer: {
    marginBottom: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subheadingText: {
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: COLORS.darkgreen,
  },
  input: {
    borderRadius: 15,
    padding: 5,
    width: '100%',
    backgroundColor: COLORS.white,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: COLORS.lightgreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '40%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
    errorText: {
      color: 'red',
      marginBottom: 10,
      fontSize: 16,
    },
    forgotPasswordText: {
      color: COLORS.darkgreen,
      marginTop: 15,
      textAlign: 'center',
    },
});

export default styles;
