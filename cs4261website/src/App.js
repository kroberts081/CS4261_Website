import React, {useState, useEffect} from 'react';
import bg from './components/assets/bg.png';
// import Sidebar from './components/widgets/Sidebar';
import Home from './page/Home';
import Signup from './page/Signup';
import Login from './page/Login';
import Manage from './page/Manage';
import Feedback from './page/Feedback';
import ReviewerManage from './page/ReviewerManage';
import {Routes, Route} from 'react-router-dom';
// import Navbar from './components/widgets/Navbar';
import Layout from './components/widgets/Layout';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {

  return (
    <Router>
      <div className="App bg-primary">
        <section>          
          <div>            
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

                <Route 
                  path="/reviewersmanage"
                  element={
                    <Layout>
                      < ReviewerManage />
                    </Layout>
                  
                  }
                />   

                <Route 
                  path="/feedback"
                  element={
                    <Layout>
                      < Feedback />
                    </Layout>
                  
                  }
                />            
              
              <Route path="/" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>          
          </div>
        </section>

      </div>
    </Router>
  );
}

export default App;



