import { connect } from 'react-redux';
import {fetchUserPosts} from '../../store/posts/actions';

function mapStateToProps(state){
  const { posts: { posts, byId }} = state;
  const mappedPosts = posts.map(id => byId[id]);
  return { posts: mappedPosts };
}

const mapDispatchToProps = {fetchUserPosts};

export default connect(mapStateToProps, mapDispatchToProps);