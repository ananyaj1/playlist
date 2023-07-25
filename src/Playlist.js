import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import { Grid, Divider, TextField, InputAdornment, IconButton} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import '@fontsource/roboto/500.css';
import SearchIcon from '@mui/icons-material/Search';
import LinearProgress from '@mui/material/LinearProgress';
import SongCard from './SongCard';
import QueueCard from './queueCard';
export default function Playlist() {
  const [searchQuery, setSearchQuery] = useState("");
  const [topTracks, setTopTracks] = useState([]);
  const [queue, setQueue] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currSong, setCurrSong] = useState(null);
  const [curProgress, setCurProgress] = useState(0);
  const handleSearchChange = async (event) => {
    const query = event.target.value; // Use the event object to get the updated value
    setSearchQuery(query); // Update the state with the new value
  
    const tracks = await getTopTracks(query);
    setTopTracks(tracks);
  };

  const handleAddToQueue = (song) => {
    setQueue((prevQueue) => [...prevQueue, song]);
    console.log(queue);
  };

  const handleRemoveFromQueue = (song) => {
    setQueue((prevQueue) => prevQueue.filter((queuedSong) => queuedSong !== song));
  };

  const toggleFavorite = (song) => {
    if (favoriteSongs.includes(song)) {
      setFavoriteSongs(favoriteSongs.filter((favorite) => favorite !== song));
    } else {
      setFavoriteSongs([...favoriteSongs, song]);
    }
  };

  const handlePlay = () => {
    // Play is pressed, no song playing yet
    if (!isPlaying && !currSong && queue.length > 0) {
      const [nextSong, ...updatedQueue] = queue;
      setCurrSong(nextSong);
      setQueue(updatedQueue);
      setIsPlaying(true);
      setCurProgress(0);
      return;
    }
  
    // Pause or resume the song
    setIsPlaying(!isPlaying);
  };
  
  const updateProgress = () => {
    setCurProgress((prevProgress) => {
      if (prevProgress >= 100 && queue.length > 0) {
        // Progress reached 100, check if there's a next song in the queue
        const [nextSong, ...updatedQueue] = queue;
        setCurrSong(nextSong);
        setQueue(updatedQueue);
        return 0; // Reset the progress for the next song
      } else if (prevProgress >= 100 && queue.length === 0) {
        // No more songs in the queue, stop playback and reset progress
        setIsPlaying(false);
        setCurrSong(null);
        return 0; // Reset the progress to 0
      } else {
        // Increment the progress by 1 (adjust as needed)
        return prevProgress + 1;
      }
    });
  };
  
  useEffect(() => {
    let progressInterval;
  
    if (isPlaying && curProgress < 100) {
      progressInterval = setInterval(updateProgress, 100); // Update progress every 100ms (adjust as needed)
    } else if (curProgress >= 100 && queue.length > 0) {
      // Manually trigger the next song if progress reaches 100 and there are more songs in the queue
      updateProgress();
    }
  
    return () => clearInterval(progressInterval);
  }, [isPlaying, curProgress, queue]);

  const getTopTracks = async (query) => {
    const options = {
      method: 'GET',
      url: 'https://spotify-web2.p.rapidapi.com/search/',
      params: {
        q: query,
        type: 'tracks',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5'
      },
      headers: {
        'X-RapidAPI-Key': '53b715ab86msh703d72c69fafea4p13d64cjsne1f218143fc3',
        'X-RapidAPI-Host': 'spotify-web2.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      const tracks = response.data.tracks.items;
      const topTracks = [];
  
      tracks.forEach((track) => {
        const title = track.data.name;
        const artist = track.data.artists.items[0].profile.name;
        const image = track.data.albumOfTrack.coverArt.sources[0].url;
        const durationMs = track.data.duration.totalMilliseconds;
        const durationSec = Math.floor(durationMs / 1000);
  
        // Convert the duration from seconds to minutes:seconds format
        const minutes = Math.floor(durationSec / 60);
        const seconds = durationSec % 60;
        const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
        const songInfo = {
          title,
          artist,
          image,
          duration,
        };
  
        topTracks.push(songInfo);
      });
  
      return topTracks;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const currentProgress = 50;
  return (
    <div style={{ height: '100vh', display: 'grid', gridTemplateRows: '85vh 15vh' }}>
      <div>
        <Grid container spacing={3} textAlign={'center'} wrap="nowrap"  sx={{ height: '85vh'  }}>
          {/* Left column - takes 3/12 of the available space on both small and large screens */}
          <Grid item xs={3} lg={3}>
            {/* Content for the left column */}
            <h2>Favorites</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginLeft: 5 }}>
                {favoriteSongs.map((song, index) => (
                  <img
                    key={index}
                    src={song.image}
                    alt={song.title}
                    style={{ width: '48%', marginBottom: '8px', borderRadius: '8px' }}
                  />
                ))}
              </div>
          </Grid>

          <Grid item xs={false} lg={1}>
              <Divider orientation="vertical" />
          </Grid>
          {/* Middle column - takes 6/12 of the available space on both small and large screens */}
          <Grid item xs={6} lg={6} sx={{ overflowY: 'scroll' }}>
            {/* Content for the middle column */}
            <h2>Search</h2>
              <TextField
              variant="outlined"
              fullWidth
              size="small"
              placeholder="Search Music"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                style: {
                  borderRadius: '50px',
                  backgroundColor: 'white'
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              />
              <br/> <br/>
              {topTracks.map((song, index) => (
                <SongCard key={index} song={song} onAddToQueue={() => handleAddToQueue(song)} onToggleFavorite={() => toggleFavorite(song)}/>
              ))}
          </Grid>
          <Grid item xs={false} lg={1}>
              <Divider orientation="vertical" />
          </Grid>
          {/* Right column - takes 3/12 of the available space on both small and large screens */}
          <Grid item xs={3} lg={3}>
            {/* Content for the right column */}
            <h2>Queue</h2>
            {queue.map((song, index) => (
                <QueueCard key={index} song={song} onRemoveFromQueue={handleRemoveFromQueue} />
              ))}
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '25%',
            width: '50%',
          }}
        >
          <LinearProgress
            variant="determinate"
            value={curProgress}
            sx={{ width: '50%'}} // Adjust the width as needed
          />
        </Grid>

        {/* Play buttons */}
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
          }}
        >
          <IconButton>
            <FastRewindIcon />
          </IconButton>
          <IconButton onClick={handlePlay}>
            {isPlaying ? <PauseIcon/> : <PlayArrowIcon />}
          </IconButton>
          <IconButton>
            <FastForwardIcon />
          </IconButton>
        </Grid>
     </div> 
    </div>
    
  );
}

