import React, { Component } from 'react';
import Header from '../../components/header/index';
import { MetaTags } from 'react-meta-tags';

class Blog extends Component {
  render() {
    return (
      <div>
        <MetaTags>
          <title>Blog</title>
          <meta name="blog" content="Blog content"></meta>
          <meta name="keywords" content="blog, samuel davidson blog, web developer blog"></meta>
        </MetaTags>
        <Header />
      </div>
    )
  }
}

export default Blog;