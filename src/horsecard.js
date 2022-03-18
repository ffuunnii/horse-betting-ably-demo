import * as React from 'react';
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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        avatar={
          <Avatar src={`/${data.horse.img}.jpg`} aria-label={data.horse.name}>
          </Avatar>
        }
        title={data.horse.name}
        subheader={
            <React.Fragment>
                        {`Jockey: `}
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {data.horse.jockey}
                        </Typography>
                        {` Weight: ${data.horse.weight} `}
                        {`Age: ${data.horse.age} `}
                    </React.Fragment>
        }
      />
      <CardMedia
        component="img"
        height="500"
        width="500"
        image={`/${data.horse.img}.jpg`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h4" color="text.secondary">
            {`Odds: ${data.horse.odds[0]}/${data.horse.odds[1]}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Stack spacing={2} direction="row">
            <Button variant="contained" size="large" onClick={() => data.setBetModalOpened(true)} startIcon={<AttachMoneyIcon />}>Bet now</Button>
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
            {data.horse.desc}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}