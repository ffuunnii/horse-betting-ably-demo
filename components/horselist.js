import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import * as oddslib from 'oddslib';
import horseData from './horses.json';

export default function HorseList(data) {

  useEffect(() => {
    if (data.race.status !== 'prerace') {
      data.race.horses.sort(function (a, b) {
        return a.position - b.position;
      });
    }
  }, [data.race.status, data.race.horses]);

  const getOdds = (decimalOdds) => {
    let oddsStr = oddslib.from('malay', decimalOdds).to('fractional', {precision: 2});
    return `${parseInt(oddsStr.split('/')[1])}/${parseInt(oddsStr.split('/')[0])}`;
  }

  const showSecondaryInfo = (horse) => {
    if (data.race.status === 'prerace') return `Odds: ${getOdds(horse.odds)}`;
    else if (data.race.status === 'race') return `Position: ${horse.position}`;
    else return `Result: ${horse.position}`;
  }

  return (
    <List sx={{ width: '100%', maxWidth: 430, bgcolor: 'background.paper', maxHeight: '100%', overflow: 'auto' }}>
    {
        data.race.horses.map((horse, index) => <ListItemButton key={index} alignItems="flex-start" style={{backgroundColor: (horse.position === 1 && data.race.status === 'postrace') && '#f3e5ab'}} selected={horse.horseId === data.selectedHorseId} onClick={() => data.setHorseId(horse.horseId)}>
            <ListItemAvatar>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <React.Fragment>{(horse.position === 1 && data.race.status === 'postrace') && <EmojiEventsIcon sx={{background: 'white', borderRadius: '50%', padding: '2px', color: '#daa520'}}></EmojiEventsIcon>}</React.Fragment>
                }
              >
                <Avatar alt={horse.name} src={`/${horseData[data.horseMockDataPairing[horse.horseId]].img}.jpg`} />
              </Badge>
                
            </ListItemAvatar>
            <ListItemText primary={
              <React.Fragment>
                <span style={{fontWeight: (horse.position === 1 && data.race.status === 'postrace') ? 'bold' : 'normal'}}>{horse.name}</span>
              </React.Fragment>
              
            } secondary={showSecondaryInfo(horse)} />
        </ListItemButton>)
    }
    </List>
  );
}