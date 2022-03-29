import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import styles from '../styles/app.module.css';


export default function RaceCard(data) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }} style={{backgroundColor: theme.palette.primary.main}} className={styles[data.race.status]}>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" color={theme.palette.primary.contrastText} style={{fontWeight: data.race.status === 'race' ? 'bold' : 'normal'}}>
            {data.race.name}
          </Typography>
          <Typography variant="subtitle1" color={theme.palette.primary.contrastText} component="div">
            {`${moment.unix(data.race.startTime).format('dddd D MMMM YYYY, HH:mm')}`}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}