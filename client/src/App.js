import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './pages/landing/index';
import About from './pages/about/index';
import Projects from './pages/projects/index';
import Blog from './pages/blog/index';
import { MetaTags } from 'react-meta-tags'
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MetaTags>
          <meta name="Portfolio" content="Portfolio content"></meta>
          <meta name="keywords" content="website,development,nerd,samuel davidson,react,reacstrap, website development"></meta>
        </MetaTags>
        <Router>
          <Route path="/" exact component={Landing} />
          <Route path="/about" exact component={About} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/blog" exact component={Blog} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
