import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'
import Button from '@mui/material/Button';
import styles from '../styles/app.module.css';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router'

const Main = dynamic(() => import('../components/main'), { ssr: false });

const theme = createTheme({
  palette: {
    secondary: {
      light: '#0D1C0D',
      main: '#31572C',
      dark: '#0D1C0D',
      contrastText: '#fff',
    },
    primary: {
      light: '#4F4C94',
      main: '#2C2A51',
      dark: '#1D1C36',
      contrastText: '#fff',
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Link = ({ children, href }) => {
  const router = useRouter()
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        // typically you want to use `next/link` for this usecase
        // but this example shows how you can also access the router
        // and use it manually
        router.push(href)
      }}
    >
      {children}
      <style jsx>{`
        a {
          margin-right: 10px;
        }
      `}</style>
    </a>
  )
};

const generateUserName = async () => {
  const response = await fetch('https://random-word-api.herokuapp.com/word?number=2&swear=0');
  const name = await response.json();
  return `${name[0]} ${name[1]}`;
};

export default function Home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    generateUserName().then(name => {
      let firstname = name.split(' ')[0];
      let lastname = name.split(' ')[1];
      let usernameNew = `${firstname[0].toUpperCase()}${firstname.substr(1)} ${lastname[0].toUpperCase()}${lastname.substr(1)}`;
      console.log(usernameNew);
      setUsername(usernameNew);
    });
  }, []);

  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Horse betting</title>
          <meta name="description" content="Ably.io demo for Horse betting" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button color="inherit"><Link href="/">Home</Link></Button>
              <Button color="inherit"><Link href="/about">About</Link></Button>
            </Typography>
            <AccountCircle></AccountCircle>
            <Typography sx={{margin: 2}} component="span" variant="body2">{username}</Typography>
          </Toolbar>
        </AppBar>
        <Main></Main>
      </ThemeProvider>
    </div>
  )
}
