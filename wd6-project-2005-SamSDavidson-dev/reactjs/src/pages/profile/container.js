import { connect } from 'react-redux';
import {fetchUser} from '../../store/users/actions';

function mapStateToProps(state, props){
  const { match: {params: { id }} } = props;

  const {
    users:{
      byId:{
      [id]: user
      }
    }
  } = state;
  return {user };
}

const mapDispatchToProps = {fetchUser};

export default connect(mapStateToProps, mapDispatchToProps);