import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styles from '../styles/app.module.css';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function HorseCard(data) {
  const [odds, setOdds] = React.useState(data.horse.odds);

  useEffect(
    () => {
      setOdds(data.horse.odds)
    },
    [data.horse.odds],
  );

  return (
    <Card sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
      <CardHeader
        avatar={
          <Avatar alt={data.horse.name} src={`/${data.horse.img}.jpg`} />
        }
        title={data.horse.name}
        subheader={
            <React.Fragment>
              <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
              >
              </Typography>
            </React.Fragment>
        }
      />
      <CardContent>
        <Typography variant="h4" color="text.secondary">
            {`Odds: ${odds.toFixed(4)}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Stack spacing={2} direction="row">
            <Button variant="contained" size="large" onClick={() => data.setBetModalOpened(true)} startIcon={<AttachMoneyIcon />}>Bet now</Button>
        </Stack>
      </CardActions>
    </Card>
  );
}