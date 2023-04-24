import React from 'react';
import Upload from './page/Upload';
import Signup from './page/Signup';
import Login from './page/Login';
import Manage from './page/Manage';
import Feedback from './page/Feedback';
import ReviewerManage from './page/ReviewerManage';
import {Routes, Route} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

function App() {

  const appTheme = createTheme({
    palette: {
      primary: {
        main: '#6750a4'
      },
      secondary: {
        main: '#036d19',
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
    <Router>
      <ThemeProvider theme={appTheme}>
      <CssBaseline />
        <Routes>     
          <Route path="/upload" element={<Upload />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/reviewersmanage" element={<ReviewerManage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;