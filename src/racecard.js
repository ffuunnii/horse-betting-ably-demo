import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import moment from 'moment';


export default function RaceCard(data) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }} style={{backgroundColor: theme.palette.primary.main}}>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" color={theme.palette.primary.contrastText}>
            {data.race.name}
          </Typography>
          <Typography variant="subtitle1" color={theme.palette.primary.contrastText} component="div">
            {moment(data.race.startTime).format('dddd D MMMM YYYY, HH:mm')}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          
        </Box>
      </Box>
      
    </Card>
  );
}