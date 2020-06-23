export default function callAPIMiddleware({ dispatch, getState }) {
  return next => async action => {
    const { types, callAPI, shouldCallAPI = () => true, ...props } = action;
    if (!types) {
      next(action);
      return;
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }
    if (!shouldCallAPI(getState())) {
      return;
    }
    const [requestType, successType, failureType] = types;
    dispatch({
      ...props,
      type: requestType
    });
    try {
      const resp = await callAPI();
      dispatch({
        ...props,
        type: successType,
        data: resp.data
      });
    } catch (err) {
      dispatch({
        ...props,
        type: failureType,
        err
      });
    }
  };
}
