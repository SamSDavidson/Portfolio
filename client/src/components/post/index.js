import React, { Component } from 'react';
import styles from './post.module.css';

class Post extends Component {
  render() {
    const post = this.props.post;
    const id = post.id;
    return (
      <div className={styles.post}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    )
  }
}

export default Post;