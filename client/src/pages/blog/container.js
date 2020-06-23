import { connect } from 'react-redux';
import { fetchPosts } from '../../store/posts/actions';

function mapStateToProps(state) {
  const {
    posts: { byId, allIds }
  } = state;
  // turn the array of ids into an array of objects
  return { posts: allIds.map(id => byId[id].data) };
}

const mapDispatchToProps = { fetchPosts };
export default connect(mapStateToProps, mapDispatchToProps);