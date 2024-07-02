import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.8; // 80% of screen width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6900',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Helvetica',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  dayContainer: {
    marginBottom: 18,
    width: cardWidth,
  },
  dayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  eventContainer: {
    marginBottom: 8,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    width: '100%',
  },
  currentEventContainer: {
    backgroundColor: '#4CAF50',
  },
  currentEventText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    padding: 8,
    backgroundColor: '#4CAF50',
  },
  eventContent: {
    padding: 12,
  },
  eventTime: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventName: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  locationLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  footerText: {
    color: 'white',
  },
});

export default styles;