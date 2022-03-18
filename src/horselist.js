import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function HorseList(data) {
  return (
    <List sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper', maxHeight: '100%', overflow: 'auto' }}>
    {
        data.raceData.horses.map((horse, index) => <ListItemButton key={index} alignItems="flex-start" selected={horse === data.selectedHorse} onClick={() => data.setHorse(horse)}>
            <ListItemAvatar>
                <Avatar alt={horse.name} src={`/${horse.img}.jpg`} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <React.Fragment>
                        {horse.name}
                        {` | Odds: ${horse.odds[0]}/${horse.odds[1]}`}
                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>
                        {`Jockey: `}
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {horse.jockey}
                        </Typography>
                        {` Weight: ${horse.weight} `}
                        {`Age: ${horse.age} `}
                    </React.Fragment>
                }
                />
        </ListItemButton>)
    }
    </List>
  );
}