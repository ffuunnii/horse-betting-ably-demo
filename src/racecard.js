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
        <CardMedia
            component="img"
            sx={{ width: 200 }}
            image={`/${data.race.img}.jpg`}
            alt=""
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" color={theme.palette.primary.contrastText}>
            {data.race.name}
          </Typography>
          <Typography variant="subtitle1" color={theme.palette.primary.contrastText} component="div">
            {data.race.place}
          </Typography>
          <Typography variant="subtitle1" color={theme.palette.primary.contrastText} component="div">
            {moment(data.race.date).format('dddd D MMMM YYYY, HH:mm')}
          </Typography>
          <Typography variant="subtitle1" color={theme.palette.primary.contrastText} component="div">
            Runners: {data.race.runners}
          </Typography>
          <Typography variant="subtitle1" color={theme.palette.primary.contrastText} component="div">
            Distance: {data.race.distance}
          </Typography>
          <Typography variant="subtitle1" color={theme.palette.primary.contrastText} component="div">
            {data.race.desc}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          
        </Box>
      </Box>
      
    </Card>
  );
}