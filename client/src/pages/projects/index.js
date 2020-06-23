import React, { Component } from 'react';
import Header from '../../components/header/index';
import MetaTags from 'react-meta-tags';

class Projects extends Component {
  render() {
    return (
      <div>
        <MetaTags>
          <title>Projects</title>
          <meta name="projects" content="Project content"></meta>
          <meta name="keywords" content="projects, samuel davidson projects, web developer projects, portfolio projects, nerd developer projects"></meta>
        </MetaTags>
        <Header />
      </div>
    )
  }
}

export default Projects;