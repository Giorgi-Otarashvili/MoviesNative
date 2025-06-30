import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: (width - 48) / 2, // 2 სვეტი + padding
    marginBottom: 16,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: 200,
    backgroundColor: '#333',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    padding: 8,
    textAlign: 'center',
  },
});


export default styles;