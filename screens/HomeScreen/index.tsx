import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { MovieCard } from '../../components/MovieCard';
import { usePopularMovies } from '../../hooks/useMovies';
import { Movie } from '../../types/movies';
import styles from './style';

interface HomeScreenProps {
  onMoviePress: (movie: Movie) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onMoviePress }) => {
  const { 
    data, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = usePopularMovies();

  const handleMoviePress = (movie: Movie) => {
    onMoviePress(movie); 
  };

  const allMovies = data?.pages.flatMap(page => page.results) || [];

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff6b6b" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Something went wrong!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Popular Movies</Text>
      <FlatList
        data={allMovies}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={handleMoviePress} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => 
          isFetchingNextPage ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color="#ff6b6b" />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

