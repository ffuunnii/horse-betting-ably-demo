import React, { useState, useEffect } from 'react';
import styles from '../styles/app.module.css';
import HorseList from './horselist';
import RaceCard from './racecard';
import HorseCard from './horsecard';
import BetModal from './bet';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import moment from 'moment';
import { useChannel } from "./AblyReactEffect";
import horseData from './horses.json';

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

export default function Main() {
  const [horseMockDataPairing, setHorseMockDataPairing] = useState();
  const [racesData, setRacesData] = useState();
  const [raceId, setRaceId] = useState();
  const [horseId, setHorseId] = useState();
  const [betModalOpened, setBetModalOpened] = useState(false);

  const [channel, ably] = useChannel("Outbound:HorseRacing:test", (message) => {
    let racesDataNew = JSON.parse(message.data);
    console.log(racesDataNew);
    racesDataNew.horseRaces.sort(function (a, b) {
      return b.startTime - a.startTime;
    });
    setRacesData(racesDataNew);
    updateHorseMockDataPairing(racesDataNew.horseRaces);

    if (!raceId || raceIdNotInRaces(racesDataNew.horseRaces)) {
      setRaceId(racesDataNew.horseRaces[0].raceId);
      setHorse(racesDataNew.horseRaces[0].horses[0].horseId);
    }
    else if (!horseId || horseIdNotInRaces(racesDataNew.horseRaces)) {
      setHorse(racesDataNew.horseRaces[racesData.horseRaces.indexOf(racesData.horseRaces.find(r => r.raceId === raceId))].horses[0].horseId);
    }
  });

  const handleChange = (event, newValue) => {
    setRaceId(racesData.horseRaces[newValue].raceId);
    setHorse(racesData.horseRaces[newValue].horses[0].horseId);
  };

  const setHorse = (horseSelectedId) => {
    setHorseId(horseSelectedId);
  };

  const raceIdNotInRaces = (racesDataNew) => {
    for (let race of racesDataNew) {
      if (race.raceId === raceId) {
        return false;
      }
    }
    return true;
  }

  const horseIdNotInRaces = (racesDataNew) => {
    for (let race of racesDataNew) {
      for (let horse of race.horses) {
        if (horse.horseId === horseId) {
          return false;
        }
      }
    }
    return true;
  }

  const updateHorseMockDataPairing = (racesDataNew) => {
    let horseMockDataPairingNew = {};
    if (!horseMockDataPairing) {
      for (let race of racesDataNew) {
        if (!horseMockDataPairingNew[race.raceId]) horseMockDataPairingNew[race.raceId] = {};
        for (let horse of race.horses) {
          if (horseMockDataPairingNew[race.raceId][horse.horseId] === undefined) horseMockDataPairingNew[race.raceId][horse.horseId] = getNewRandomNumber(horseMockDataPairingNew[race.raceId]);
        }
      }
    } else {
      horseMockDataPairingNew = { ...horseMockDataPairing };
      for (let race of racesDataNew) {
        if (!horseMockDataPairingNew[race.raceId]) horseMockDataPairingNew[race.raceId] = {};
        for (let horse of race.horses) {
          if (horseMockDataPairingNew[race.raceId][horse.horseId] === undefined) horseMockDataPairingNew[race.raceId][horse.horseId] = getNewRandomNumber(horseMockDataPairingNew[race.raceId]);
        }
      }
      
    }
    for (let raceId in horseMockDataPairingNew) {
      if(!racesDataNew.find(r => r.raceId === raceId)) delete horseMockDataPairingNew[raceId];
    }
    setHorseMockDataPairing(horseMockDataPairingNew);
  }

  const getNewRandomNumber = (o) => {
    let n = 0;
    do {
      n = Math.floor(Math.random() * horseData.length);
    } while (Object.values(o).indexOf(n) > -1);
    return n;
  }
  
  return (
    <div className={styles.container}>
        <div className={styles.main}>
          {racesData && racesData.horseRaces.indexOf(racesData.horseRaces.find(r => r.raceId === raceId)) !== -1 && <Tabs value={racesData.horseRaces.indexOf(racesData.horseRaces.find(r => r.raceId === raceId))} onChange={handleChange}>
            {racesData && racesData.horseRaces.map((race, index) => (
              <Tab
                label={`${race.name} (${moment.unix(race.startTime).format('DD. MM. - HH:mm')})`}
                key={index}
                aria-controls={`simple-tabpanel-${index}`}
              />
            ))}
          </Tabs>}
          {horseId && racesData.horseRaces.find(r => r.raceId === raceId) && racesData.horseRaces.find(r => r.raceId === raceId).horses && <BetModal opened={betModalOpened} setBetModalOpened={setBetModalOpened} horse={racesData.horseRaces.find(r => r.raceId === raceId).horses.find(h => h.horseId === horseId) || {}}></BetModal>}
          {racesData && horseMockDataPairing && racesData.horseRaces.map((race, index) => (
            <TabPanel key={index} value={racesData.horseRaces.indexOf(racesData.horseRaces.find(r => r.raceId === race.raceId))} index={racesData.horseRaces.indexOf(racesData.horseRaces.find(r => r.raceId === raceId))}>
              <div>
                <RaceCard race={race}></RaceCard>
                <div className={styles.maincont}>
                  <div className={styles.horselist}>
                    {horseMockDataPairing[race.raceId] && <HorseList horseMockDataPairing={horseMockDataPairing[race.raceId]} selectedHorseId={horseId} setHorseId={setHorse} raceData={race}></HorseList>}
                  </div>
                  <div className={styles.horsecard}>
                    {horseId && race.horses.find(h => h.horseId === horseId) && <HorseCard horseMockDataPairing={horseMockDataPairing[race.raceId]} horse={race.horses.find(h => h.horseId === horseId)} setBetModalOpened={setBetModalOpened}></HorseCard>}
                  </div>
                </div>
              </div>
            </TabPanel>
          ))}
        </div>
    </div>
  )
}
