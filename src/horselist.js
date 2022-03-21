import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export default function HorseList(data) {

  return (
    <List sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper', maxHeight: '100%', overflow: 'auto' }}>
    {
        data.raceData.horses.map((horse, index) => <ListItemButton key={index} alignItems="flex-start" selected={horse.horseId === data.selectedHorseId} onClick={() => data.setHorseId(horse.horseId)}>
            <ListItemAvatar>
                <Avatar alt={horse.name} src={`/${horse.img}.jpg`} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <React.Fragment>
                        {horse.name}
                        
                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>
                        {`Odds: ${horse.odds.toFixed(4)}`}
                    </React.Fragment>
                }
                />
        </ListItemButton>)
    }
    </List>
  );
}