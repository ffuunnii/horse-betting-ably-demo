import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import * as oddslib from 'oddslib';
import horseData from './horses.json';

export default function HorseList(data) {

  const getOdds = (decimalOdds) => {
    let oddsStr = oddslib.from('malay', decimalOdds).to('fractional', {precision: 2});
    return `${parseInt(oddsStr.split('/')[1])}/${parseInt(oddsStr.split('/')[0])}`;
  }

  return (
    <List sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper', maxHeight: '100%', overflow: 'auto' }}>
    {
        data.raceData.horses.map((horse, index) => <ListItemButton key={index} alignItems="flex-start" selected={horse.horseId === data.selectedHorseId} onClick={() => data.setHorseId(horse.horseId)}>
            <ListItemAvatar>
                <Avatar alt={horse.name} src={`/${horseData[data.horseMockDataPairing[horse.horseId]].img}.jpg`} />
            </ListItemAvatar>
            <ListItemText primary={horse.name} secondary={`Odds: ${getOdds(horse.odds)}`} />
        </ListItemButton>)
    }
    </List>
  );
}