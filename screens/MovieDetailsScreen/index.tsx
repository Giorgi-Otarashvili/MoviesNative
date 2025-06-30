import { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useMovieDetails } from '../../hooks/useMovies';
import { getImageUrl } from '../../services/api/movies';
import styles from './styles';

interface MovieDetailsScreenProps {
  movieId: number;
  onBack: () => void;
}


export const MovieDetailsScreen: React.FC<MovieDetailsScreenProps> = ({ 
  movieId, 
  onBack 
}) => {
  const { data: movie, isLoading, error } = useMovieDetails(movieId);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff6b6b" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load movie</Text>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
    Alert.alert(
      isInWatchlist ? 'Removed from Watchlist' : 'Added to Watchlist',
      `${movie.title} has been ${isInWatchlist ? 'removed from' : 'added to'} your watchlist.`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Image
          source={{
            uri: getImageUrl(movie.poster_path) || 'https://via.placeholder.com/400x600'
          }}
          style={styles.poster}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Text style={styles.title}>{movie.title}</Text>

          <View style={styles.genresContainer}>
            {movie.genres.map((genre, index) => (
              <Text key={genre.id} style={styles.genre}>
                {genre.name}{index < movie.genres.length - 1 ? ' • ' : ''}
              </Text>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.watchlistButton, isInWatchlist && styles.watchlistButtonActive]} 
            onPress={handleWatchlistToggle}
          >
            <Text style={styles.watchlistIcon}>
              {isInWatchlist ? '❤️' : '🤍'}
            </Text>
            <Text style={styles.watchlistText}>
              {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </Text>
          </TouchableOpacity>

          <View style={styles.overviewSection}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};