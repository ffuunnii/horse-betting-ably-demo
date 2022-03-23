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
import * as oddslib from 'oddslib';
import horseData from './horses.json';

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

const calculateOdds = (decimalOdds) => {
  const precision = 0.05;
  for (let i = 1; i < 1000; i++) {
    let r = i/decimalOdds%1;
    if (r < precision) {
      return `${Math.floor(i/decimalOdds)}/${i}`;
    }
  }
};

export default function HorseCard(data) {
  const [odds, setOdds] = React.useState([1,1]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(
    () => {
      let oddsStr = oddslib.from('malay', data.horse.odds).to('fractional', {precision: 2});
      setOdds([parseInt(oddsStr.split('/')[1]), parseInt(oddsStr.split('/')[0])]);
      //setOdds(calculateOdds(data.horse.odds));
    },
    [data.horse.odds]
  );

  return (
    <Card sx={{ width: '100%', margin: 'auto'}}>
      <CardHeader
        avatar={
          <Avatar alt={data.horse.name} src={`/${horseData[data.horseMockDataPairing[data.horse.horseId]].img}.jpg`} />
        }
        title={data.horse.name}
        subheader={
          <React.Fragment>
            {`Jockey: `}
            <Typography component="span" variant="body2" color="text.primary">{horseData[data.horseMockDataPairing[data.horse.horseId]].jockey}</Typography>
            {` Weight: `}
            <Typography component="span" variant="body2" color="text.primary">{horseData[data.horseMockDataPairing[data.horse.horseId]].weight}</Typography>
            {` Age: `}
            <Typography component="span" variant="body2" color="text.primary">{horseData[data.horseMockDataPairing[data.horse.horseId]].age}</Typography>
          </React.Fragment>
        }
      />
      <CardMedia
        component="img"
        height="350"
        image={`/${horseData[data.horseMockDataPairing[data.horse.horseId]].img}.jpg`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h4" color="text.secondary">
            {`Odds: ${odds[0]}/${odds[1]}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Stack spacing={2} direction="row">
            <Button variant="contained" size="large" onClick={() => data.setBetModalOpened(true)} startIcon={<AttachMoneyIcon />}>Place bet</Button>
        </Stack>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={styles.housecarddesc}>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>
            Nunc dapibus, mauris ac congue scelerisque, nulla lorem mattis turpis, ac mollis est lorem blandit erat. Donec sit amet arcu ligula. Etiam molestie, nisi in auctor pulvinar, metus sem lobortis quam, eu suscipit elit sapien vel odio. Phasellus eu cursus augue. Sed laoreet vehicula est sed porta. In vestibulum eros at magna fermentum tempus. Curabitur rhoncus efficitur ultrices. Nullam nec elit vel odio tristique fermentum. Aenean pretium hendrerit dolor id auctor. Sed nisl ligula, scelerisque eu luctus a, maximus quis metus. Suspendisse nulla odio, porttitor id nisi quis, molestie gravida sapien. Sed quis consectetur neque. Sed sit amet lectus magna. Aliquam sit amet fermentum massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}