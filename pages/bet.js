import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

export default function BetModal(data) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(1);

  const handleClose = () => {
    setOpen(false);
    data.setBetModalOpened(false);
  }

  const handleBet = () => {
    handleClose();
    data.setOpenSnackbar(true);
    data.setBet({
        horsename: data.horse.name,
        odds: `${data.horse.odds[0]}/${data.horse.odds[1]}`,
        timestamp: moment.now()
    });
  }

  useEffect(
    () => {
        setOpen(data.opened)
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
          <Typography id="modal-modal-title" variant="h6" component="h2">{data.horse.name}</Typography>
          <Typography sx={{ m: 2 }}>{`Odds: ${data.horse.odds[0]}/${data.horse.odds[1]}`}</Typography>
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
          <Typography sx={{ m: 2 }}>Amount you will win: {amount*(data.horse.odds[0]/data.horse.odds[1])}$</Typography>
          <Button variant="contained" size="large" onClick={handleBet}>Make bet</Button>
        </Box>
      </Modal>
    </div>
  );
}