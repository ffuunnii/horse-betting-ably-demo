import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import moment from 'moment';
import * as oddslib from 'oddslib';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  width: '320px',
  height: '440px',
  display: 'flex',
  flexDirection: 'column',
};

export default function BetModal(data) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [odds, setOdds] = useState([1,1]);
  const [acceptedOdds, setAcceptedOdds] = useState('1/1');

  const handleClose = () => {
    setOpen(false);
    setAccepted(false);
    setAmount(1);
    data.setBetModalOpened(false);
  };

  const setButtonText = (status) => {
    if (status === 'prerace') return 'Place bet'; 
    else if (status === 'race') return 'Betting on this race has closed. The race is now running.';
    else return 'Betting on this race has closed. The race has run.';
  };

  useEffect(
    () => {
      if (data.horse.odds) {
        let oddsStr = oddslib.from('malay', data.horse.odds).to('fractional', {precision: 2});
        setOdds([parseInt(oddsStr.split('/')[1]), parseInt(oddsStr.split('/')[0])]);
      }
    },
    [data.horse.odds]
  );

  useEffect(
    () => {
      if (Object.keys(data.horse).length === 0) handleClose();
    },
    [data.horse]
  );
  

  useEffect(
    () => {
      setOpen(data.opened);
    },
    [data.opened],
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >        
        <Box sx={style}>
          <IconButton sx={{ marginLeft: 'calc(100% - 40px)', width: '40px', marginBottom: '20px' }} aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          {accepted === false && <div style={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">{data.horse.name}</Typography>
            <Typography sx={{ m: 2 }}>{`Odds: ${odds[0]}/${odds[1]}`}</Typography>
            <TextField sx={{ m: 2 }}
              disabled={data.race.status !== 'prerace'}
              label="Bet"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                      <AttachMoneyIcon />
                  </InputAdornment>
              ),
              }}
              variant="standard"
            />
            <Typography sx={{ m: 1 }}>Amount you will win:</Typography>
            <Typography sx={{ m: 1 }}>${(amount*(odds[0]/odds[1])).toLocaleString(undefined, {maximumFractionDigits:2}) }</Typography>
            <Button variant="contained" size="small" onClick={() => {setAccepted(true); setAcceptedOdds(`${odds[0]}/${odds[1]}`)}} disabled={data.race.status !== 'prerace'}>{setButtonText(data.race.status)}</Button>
          </div>}
          {accepted === true && <div>
            <Alert severity="success">
            <AlertTitle>Bet <strong>accepted</strong></AlertTitle>
              At {acceptedOdds} for {data.horse.name} on {moment().format('dddd D MMMM YYYY, HH:mm')}    
            </Alert>
          </div>}
        </Box>
      </Modal>
    </div>
  );
}