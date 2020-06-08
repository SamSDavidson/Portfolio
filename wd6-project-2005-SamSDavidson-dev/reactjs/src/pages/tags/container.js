import { connect } from 'react-redux';
import {fetchTags} from '../../store/tags/actions';

function mapStateToProps(state) {
  const { tags: {tags, byId}} = state;
  const mappedTags = tags.map(id => byId[id])
  return {tags: mappedTags}
}

const mapDispatchToProps = {fetchTags}

export default connect(mapStateToProps, mapDispatchToProps);