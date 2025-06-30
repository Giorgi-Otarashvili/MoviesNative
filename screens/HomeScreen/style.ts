import { StyleSheet,} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 16,
  },
  list: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#fff',
    marginTop: 8,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
});

export default styles;