import React from 'react';
import Image from 'next/image'
import Button from '@mui/material/Button';
import styles from '../styles/app.module.css';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router'

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
}


export default function About() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Horse betting
            </Typography>
            <Button color="inherit"><Link href="/">Home</Link></Button>
            <Button color="inherit"><Link href="/about">About</Link></Button>
          </Toolbar>
        </AppBar>
        <div className={styles.about}>
          <Image
            src="/logo-ably.jpg"
            alt="Picture of the author"
            width={380}
            height={380}
          />
          <Image
            src="/logo-aerospike.jpg"
            alt="Picture of the author"
            width={380}
            height={380}
          />
          <h2>This  is an Ably betting demonstration.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in risus tincidunt, consequat enim eget, scelerisque lorem. Sed porta lacus eu dolor venenatis porta. Fusce convallis elementum faucibus. Nulla at risus neque. Maecenas et porttitor neque. Donec dui arcu, vulputate in odio ac, auctor consequat tellus. Nunc convallis lectus turpis, eu porttitor felis ultricies ac.</p>
        </div>
      </ThemeProvider>
    </div>
    
  )
}