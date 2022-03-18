import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/app.module.css';
import HorseList from '../src/horselist';
import RaceCard from '../src/racecard';
import HorseCard from '../src/horsecard';
import BetModal from '../src/bet';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import moment from 'moment';
import raceData from '../src/races.json';

// https://faqs.ably.com/i-want-to-add-ably-to-my-react-app-where-do-i-put-the-channel-subscriptions

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme({
  palette: {
    secondary: {
      light: '#0D1C0D',
      main: '#31572C',
      dark: '#0D1C0D',
      contrastText: '#fff',
    },
    primary: {
      light: '#4F4C94',
      main: '#2C2A51',
      dark: '#1D1C36',
      contrastText: '#fff',
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Home() {
  const [raceId, setRaceId] = useState(0);
  const [horse, setHorse] = useState(raceData[0].horses[0]);
  const [betModalOpened, setBetModalOpened] = useState(false);
  const [openSnackBar, setOpenSnackbar] = useState(false);
  const [bet, setBet] = useState({odds: '', horsename: '', timestamp: ''});

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChange = (event, newValue) => {
    setRaceId(newValue);
    setHorse(raceData[newValue].horses[0])
  };
  
  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Horse betting</title>
          <meta name="description" content="Ably.io demo for Horse betting" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Horse betting
            </Typography>
          </Toolbar>
        </AppBar>

        <Tabs value={raceId} onChange={handleChange}>
          {raceData.map((race, index) => (
            <Tab
              label={`${race.title} (${moment(race.date).format('DD. MM. - HH:mm')})`}
              key={index}
              aria-controls={`simple-tabpanel-${index}`}
            />
          ))}
        </Tabs>
        {raceData.map((race, index) => (
          <TabPanel key={index} value={raceId} index={index}>
            <BetModal opened={betModalOpened} setBetModalOpened={setBetModalOpened} setOpenSnackbar={setOpenSnackbar} setBet={setBet} horse={horse}></BetModal>
            <div className={styles.main}>
              <RaceCard race={race}></RaceCard>
              <div className={styles.maincont}>
                <div className={styles.horselist}>
                  <HorseList selectedHorse={horse} setHorse={setHorse} raceData={race}></HorseList>
                </div>
                <div className={styles.horsecard}>
                  <HorseCard horse={horse} setBetModalOpened={setBetModalOpened}></HorseCard>
                </div>
              </div>
            </div>
          </TabPanel>
        ))}
        <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Bet accepted at {bet.odds} for {bet.horsename} on {moment(bet.timestamp).format('dddd D MMMM YYYY, HH:mm')}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  )
}
