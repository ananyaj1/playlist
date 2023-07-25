import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const QueueCard = ({ song, onRemoveFromQueue }) => {
    const cardStyles = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 2,
      marginRight: 3
    };
  
    const titleStyles = {
      flex: 1, // Let the title take up the remaining space
      fontWeight: 'bold',
    };
  
    const artistStyles = {
      color: '#777',
    };
  
    const durationStyles = {
      flex: 1, // Let the duration take up the remaining space
      textAlign: 'center',
    };
  
    const removeButtonStyles = {
      flex: '0 0 auto', // Let the remove button adjust its width based on its content
    };
  
    return (
      <Card sx={cardStyles}>
        <CardContent>
          <Typography sx={titleStyles} variant="h6">
            {song.title}
          </Typography>
          <Typography sx={artistStyles} variant="subtitle2">
            {song.artist}
          </Typography>
        </CardContent>
  
        <CardContent sx={durationStyles}>
          <Typography variant="body2">{song.duration}</Typography>
        </CardContent>
  
        <IconButton sx={removeButtonStyles} onClick={() => onRemoveFromQueue(song)}>
          <CloseIcon color="error" />
        </IconButton>
      </Card>
    );
  };
  
  export default QueueCard;