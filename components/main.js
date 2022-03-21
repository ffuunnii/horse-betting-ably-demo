import React, { useState } from 'react';
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
    </div>
  )
}
