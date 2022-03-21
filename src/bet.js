import React, { useEffect } from 'react';
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  width: '320px',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
};

export default function BetModal(data) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(1);
  const [odds, setOdds] = React.useState(1);
  const [accepted, setAccepted] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setAccepted(false);
    setAmount(1);
    data.setBetModalOpened(false);
  }

  useEffect(
    () => {
        setOpen(data.opened);
        setOdds(data.horse.odds);
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
            <Typography sx={{ m: 2 }}>{`Odds: ${odds}`}</Typography>
            <TextField sx={{ m: 2 }}
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
            <Typography sx={{ m: 2 }}>Amount you will win: ${(amount*(1/odds)).toLocaleString(undefined, {maximumFractionDigits:2}) }</Typography>
            <Button variant="contained" size="large" onClick={() => setAccepted(true)}>Place bet</Button>
          </div>}
          {accepted === true && <div>
            <Alert severity="success">
            <AlertTitle>Bet <strong>accepted</strong></AlertTitle>
              At {odds.toFixed(4)} for {data.horse.name} on {moment().format('dddd D MMMM YYYY, HH:mm')}    
            </Alert>
          </div>}
        </Box>
      </Modal>
    </div>
  );
}