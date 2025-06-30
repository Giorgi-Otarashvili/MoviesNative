import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { Movie } from './types/movies';
import { MovieDetailsScreen } from './screens/MovieDetailsScreen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 წუთი
      gcTime: 1000 * 60 * 10, // 10 წუთი
    },
  },
});

type Screen = 'home' | 'movieDetails';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  // ეს ფუნქცია გადასცემს HomeScreen-ს
  const navigateToMovieDetails = (movie: Movie) => {
    console.log('Navigating to movie:', movie.title); // debug
    setSelectedMovieId(movie.id);
    setCurrentScreen('movieDetails');
  };

  // უკან დაბრუნების ფუნქცია
  const navigateBack = () => {
    setCurrentScreen('home');
    setSelectedMovieId(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onMoviePress={navigateToMovieDetails} />;
      case 'movieDetails':
        return selectedMovieId ? (
          <MovieDetailsScreen 
            movieId={selectedMovieId} 
            onBack={navigateBack}
          />
        ) : null;
      default:
        return <HomeScreen onMoviePress={navigateToMovieDetails} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      {renderScreen()}
    </QueryClientProvider>
  );
};

export default App;