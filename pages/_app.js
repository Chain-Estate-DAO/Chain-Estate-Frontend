import Head from 'next/head';
import { ThemeProvider, createTheme, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { DAppProvider, Rinkeby } from '@usedapp/core';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  const lightTheme = createTheme({
    // Primary - #70c1ff
    // Secondary - #48494f
    // Paper/card - #dbf1ff
    mode: 'light',
    palette: {
      background: {
        paper: '#dbf1ff',
      },
      primary: {
        main: '#70c1ff',
      },
      secondary: {
        main: '#48494f',
      },
    }
  });

  const darkTheme = createTheme({
    // Primary - #1649ff, previous - #0a0af0
    // Secondary - #cfcfcf
    // Paper/card - #141a2a
    palette: {
      mode: 'dark',
      background: {
        paper: '#141a2a',
      },
      primary: {
        main: '#1649ff',
      },
      secondary: {
        main: '#cfcfcf',
      },
    },
  });

  const [useDarkTheme, setUseDarkTheme] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("chainEstateTheme");
    if (theme) {
      if (theme == "light") {
        setUseDarkTheme(false);
      }
      else {
        setUseDarkTheme(true);
      }
    }
    else {
      localStorage.setItem("chainEstateTheme", "dark");
    }
  }, [])

  useEffect(() => {
    if (useDarkTheme) {
      localStorage.setItem("chainEstateTheme", "dark");
    }
    else {
      localStorage.setItem("chainEstateTheme", "light");
    }
  }, [useDarkTheme]);

  const config = {
    networks: [Rinkeby]
  }

  return (
    <ThemeProvider theme={useDarkTheme ? darkTheme : lightTheme}>
      <DAppProvider config={config}>
        <Head>
          <title>Chain Estate</title>
          <meta name="description" content="Chain Estate" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Paper className="mainPaper">
          <Navigation useDarkTheme={useDarkTheme} setUseDarkTheme={setUseDarkTheme} />
          <Component {...pageProps} useDarkTheme={useDarkTheme} />
          <Footer />
        </Paper>
      </DAppProvider>
    </ThemeProvider>
  )
}

export default MyApp
