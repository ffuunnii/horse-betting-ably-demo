import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import data from './horses.json';

export default function AlignItemsList() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {
        data.horses.map((horse, index) => <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
            <Avatar alt={horse.name} src={`/${horse.img}.jpg`} />
            </ListItemAvatar>
            <ListItemText
            primary={horse.name}
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
                {`Odds: ${horse.odds[0]}/${horse.odds[1]}`}
                </React.Fragment>
            }
            />
        </ListItem>)
    }
    </List>
  );
}