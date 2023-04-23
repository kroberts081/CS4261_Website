import React, {useState, useEffect} from 'react';
import bg from './components/assets/bg.png';
// import Sidebar from './components/widgets/Sidebar';
import Home from './page/Home';
import Signup from './page/Signup';
import Login from './page/Login';
import Manage from './page/Manage';
import {Routes, Route} from 'react-router-dom';
// import Navbar from './components/widgets/Navbar';
import Layout from './components/widgets/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

function App() {

  const appTheme = createTheme({
    palette: {
      primary: {
        main: '#6750a4'
      },
      secondary: {
        main: '#625b71',
      },
      background: {
        paper: "#ffffff",
        default: '#ffffff',
      },
    },
    typography: {
      button: {
        textTransform: "none",
      }
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline />
      <Router>     
              <Routes>
            
                  <Route 
                    path="/home"
                    element={
                      <Layout>
                        < Home />
                      </Layout>
                    
                    }
                  />

                  <Route 
                    path="/manage"
                    element={
                      <Layout>
                        < Manage />
                      </Layout>
                    
                    }
                  />              
                
                <Route path="/" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
              </Routes>          
      </Router>
    </ThemeProvider>
  );
}

export default App;



