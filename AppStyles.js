// AppStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6900',
  },
  dayText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 8,
    backgroundColor: 'white',
  },
  eventName: {
    fontWeight: 'bold',
  },
  locationLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default styles;