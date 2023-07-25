import React, {useState} from 'react';
import logo from './logo.svg';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import from @mui/icons-material
import AddIcon from '@mui/icons-material/Add';

const SongCard = ({ song, onAddToQueue, onToggleFavorite}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const handleFavoriteClick = () => {
        setIsFavorite((prev) => !prev);
        onToggleFavorite();
      };
    
    const cardStyles = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 8,
    };
  
    const mediaStyles = {
      width: 100,
      height: 100,
      marginRight: 16,
    };
  
    const titleStyles = {
      fontWeight: 'bold',
    };
  
    const artistStyles = {
      color: '#777',
      textAlign: 'center', 
    };
  
    const buttonsStyles = {
      marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'right',
    };
    const cardContentStyles = {
        // Set a fixed width for the CardContent section
        width: '200px', // Adjust the value as needed for your desired fixed size
    };
  
    return (
      <Card sx={cardStyles}>
        <CardMedia sx={mediaStyles} image={song.image} title={song.title} />
  
        <CardContent sx={cardContentStyles}>
          <Typography sx={titleStyles} variant="h6">
            {song.title}
          </Typography>
          <Typography sx={artistStyles} variant="subtitle2">
           {song.artist}
          </Typography>
        </CardContent>
  
        <div sx={buttonsStyles}>
        <IconButton onClick={handleFavoriteClick}>
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon color="primary" />}
        </IconButton>
          <IconButton onClick={onAddToQueue}>
            <AddIcon color="primary" />
          </IconButton>
        </div>
      </Card>
    );
  };
  
  export default SongCard;