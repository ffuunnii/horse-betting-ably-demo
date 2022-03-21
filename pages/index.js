import React, { useState } from 'react';
import Head from 'next/head';
import Button from '@mui/material/Button';
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
import moment from 'moment';
import { useChannel } from "../src/AblyReactEffect";
import { useRouter } from 'next/router'

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

const Link = ({ children, href }) => {
  const router = useRouter()
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        // typically you want to use `next/link` for this usecase
        // but this example shows how you can also access the router
        // and use it manually
        router.push(href)
      }}
    >
      {children}
      <style jsx>{`
        a {
          margin-right: 10px;
        }
      `}</style>
    </a>
  )
}

export default function Home() {
  const [racesData, setRacesData] = useState();
  const [raceId, setRaceId] = useState(0);
  const [horseId, setHorseId] = useState();
  const [betModalOpened, setBetModalOpened] = useState(false);

  const [channel, ably] = useChannel("Outbound:HorseRacing:test", (message) => {
    let racesDataNew = JSON.parse(message.data);
    setRacesData(racesDataNew);
    if (!horseId) {
      setHorseId(racesDataNew.horseRaces[0].horses[0].horseId);
    }
  });

  const handleChange = (event, newValue) => {
    setRaceId(newValue);
    setHorseId(racesData.horseRaces[newValue].horses[0].horseId)
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
            <Button color="inherit"><Link href="/">Home</Link></Button>
            <Button color="inherit"><Link href="/about">About</Link></Button>
          </Toolbar>
        </AppBar>
        <div className={styles.main}>
          <Tabs value={raceId} onChange={handleChange}>
            {racesData && racesData.horseRaces.map((race, index) => (
              <Tab
                label={`${race.name} (${moment(race.startTime).format('DD. MM. YYYY - HH:mm')})`}
                key={index}
                aria-controls={`simple-tabpanel-${index}`}
              />
            ))}
          </Tabs>
          {racesData && racesData.horseRaces.map((race, index) => (
            <TabPanel key={index} value={raceId} index={index}>
              {horseId && <BetModal opened={betModalOpened} setBetModalOpened={setBetModalOpened} horse={race.horses.find(h => h.horseId === horseId)}></BetModal>}
              <div>
                <RaceCard race={race}></RaceCard>
                <div className={styles.maincont}>
                  <div className={styles.horselist}>
                    <HorseList selectedHorseId={horseId} setHorseId={setHorseId} raceData={race}></HorseList>
                  </div>
                  <div className={styles.horsecard}>
                    {horseId && <HorseCard horse={race.horses.find(h => h.horseId === horseId)} setBetModalOpened={setBetModalOpened}></HorseCard>}
                  </div>
                </div>
              </div>
            </TabPanel>
          ))}
        </div>
      </ThemeProvider>
    </div>
  )
}
