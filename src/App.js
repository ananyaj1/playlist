import logo from './logo.svg';
import { Grid, Divider, TextField, InputAdornment} from '@mui/material';
import '@fontsource/roboto/500.css';
import SearchIcon from '@mui/icons-material/Search';

export default function Playlist() {
  return (
    <Grid container spacing={2} textAlign={'center'} wrap="nowrap" >
    {/* Left column - takes 3/12 of the available space on both small and large screens */}
    <Grid item xs={3} lg={3}>
      {/* Content for the left column */}
      <h2>Favorites</h2>
    </Grid>

    <Grid item xs={false} lg={1}>
        <Divider orientation="vertical" />
    </Grid>
    {/* Middle column - takes 6/12 of the available space on both small and large screens */}
    <Grid item xs={6} lg={6}>
      {/* Content for the middle column */}
      <h2>Search</h2>
        <TextField
        variant="outlined"
        fullWidth
        size="small"
        placeholder="Search Music"
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
    </Grid>
    <Grid item xs={false} lg={1}>
        <Divider orientation="vertical" />
    </Grid>
    {/* Right column - takes 3/12 of the available space on both small and large screens */}
    <Grid item xs={3} lg={3}>
      {/* Content for the right column */}
      <h2>Queue</h2>
    </Grid>
  </Grid>
  );
}

