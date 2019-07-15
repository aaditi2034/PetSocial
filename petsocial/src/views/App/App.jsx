import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import Login from '../../components/Login'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Register from '../../components/Register';
import Dashboard from '../../components/Dashboard';
import UploadPost from '../../components/UploadPost';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
          <Route path="/" exact component={Register} />
          <Route path="/login" component={Login} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/upload-post' component={UploadPost} />
        <Footer />
      </div>
    </BrowserRouter>
  )
};
 
export default App;
