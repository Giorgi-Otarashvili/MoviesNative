import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Movie } from '../../types/movies';
import { getImageUrl } from '../../services/api/movies';
import styles from './styles';

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}


export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(movie)}
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: getImageUrl(movie.poster_path) || 'https://via.placeholder.com/300x450',
        }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
};