import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/app.module.css';
import HorseList from './horselist';
import RaceCard from './racecard';
import HorseCard from './horsecard';
import BetModal from './bet';
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

let raceData = [
  {
    "name": "Betway Queen Mother Champion Chase (Grade 1) (GBB Race)",
    "title": "Betway Queen",
    "date": "2022-04-04T15:30:00",
    "place": "Cheltenham",
    "distance": "1m 7f 199y",
    "runners": "10",
    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis.",
    "img": "race-01",
    "horses": [
      {
        "name": "Commander Of Fleet",
        "age": 8,
        "weight": 1110,
        "jockey": "Shane Fitzgerald",
        "img": "horse-01",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          20,
          1
        ]
      },
      {
        "name": "Fastorslow",
        "age": 6,
        "weight": 1013,
        "jockey": "O'Keeffe",
        "img": "horse-02",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          23,
          1
        ]
      },
      {
        "name": "Ashdale Bob",
        "age": 7,
        "weight": 1110,
        "jockey": "Foley",
        "img": "horse-03",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          21,
          1
        ]
      },
      {
        "name": "Camprond",
        "age": 6,
        "weight": 1012,
        "jockey": "Aidan Coleman",
        "img": "horse-04",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          22,
          1
        ]
      },
      {
        "name": "Maze Runner",
        "age": 7,
        "weight": 1011,
        "jockey": "Kafka",
        "img": "horse-05",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          18,
          1
        ]
      },
      {
        "name": "Christopher Wood",
        "age": 7,
        "weight": 1111,
        "jockey": "Harry Bannister",
        "img": "horse-06",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          21,
          1
        ]
      },
      {
        "name": "Gowel Road",
        "age": 6,
        "weight": 1130,
        "jockey": "Sam Twiston-Davies",
        "img": "horse-07",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          20,
          1
        ]
      },
      {
        "name": "Indigo Breeze",
        "age": 6,
        "weight": 1012,
        "jockey": "Gainford",
        "img": "horse-08",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          17,
          1
        ]
      },
      {
        "name": "Champagne Gold",
        "age": 7,
        "weight": 1011,
        "jockey": "Rachael Blackmore",
        "img": "horse-09",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          19,
          1
        ]
      },
      {
        "name": "Dans Le Vent",
        "age": 9,
        "weight": 1100,
        "jockey": "Isabel Williams",
        "img": "horse-10",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          21,
          1
        ]
      }
    ]
  },
  {
    "name": "Champion King Chase (Grade 2)",
    "title": "Champion King",
    "date": "2022-04-08T15:30:00",
    "place": "Manchester",
    "distance": "1m 9f 199y",
    "runners": "9",
    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis.",
    "img": "race-02",
    "horses": [
      {
        "name": "Fastorslow",
        "age": 6,
        "weight": 1013,
        "jockey": "O'Keeffe",
        "img": "horse-02",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          23,
          1
        ]
      },
      {
        "name": "Ashdale Bob",
        "age": 7,
        "weight": 1110,
        "jockey": "Foley",
        "img": "horse-03",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          21,
          1
        ]
      },
      {
        "name": "Camprond",
        "age": 6,
        "weight": 1012,
        "jockey": "Aidan Coleman",
        "img": "horse-04",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          22,
          1
        ]
      },
      {
        "name": "Maze Runner",
        "age": 7,
        "weight": 1011,
        "jockey": "Kafka",
        "img": "horse-05",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          18,
          1
        ]
      },
      {
        "name": "Christopher Wood",
        "age": 7,
        "weight": 1111,
        "jockey": "Harry Bannister",
        "img": "horse-06",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          21,
          1
        ]
      },
      {
        "name": "Gowel Road",
        "age": 6,
        "weight": 1130,
        "jockey": "Sam Twiston-Davies",
        "img": "horse-07",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          20,
          1
        ]
      },
      {
        "name": "Indigo Breeze",
        "age": 6,
        "weight": 1012,
        "jockey": "Gainford",
        "img": "horse-08",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          17,
          1
        ]
      },
      {
        "name": "Champagne Gold",
        "age": 7,
        "weight": 1011,
        "jockey": "Rachael Blackmore",
        "img": "horse-09",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          19,
          1
        ]
      },
      {
        "name": "Dans Le Vent",
        "age": 9,
        "weight": 1100,
        "jockey": "Isabel Williams",
        "img": "horse-10",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum nisi libero, vitae efficitur dui luctus quis. Etiam eleifend purus dolor, non luctus libero venenatis sit amet. Aenean rhoncus urna et augue eleifend maximus. Etiam lacinia sagittis mollis. Etiam sed turpis sem. Donec nec dolor mauris. Nam sollicitudin molestie ligula, sit amet pulvinar neque condimentum vitae. Nullam gravida lorem vel nibh faucibus pulvinar. Maecenas vestibulum accumsan ipsum et ornare. Quisque viverra nec urna et tristique. Cras vitae dictum nisi, in pulvinar ipsum. Ut commodo, leo ut condimentum convallis, ante odio mattis nisl, et hendrerit orci nibh a metus.",
        "odds": [
          21,
          1
        ]
      }
    ]
  }
];

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
              label={race.title}
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
                  <HorseList setHorse={setHorse} raceData={race}></HorseList>
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
