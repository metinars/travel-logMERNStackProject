const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false };

    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      localStorage.setItem(
        'currentUserToken',
        JSON.stringify(action.payload?.token)
      );
      return { ...state, currentUser: action.payload };

    case 'UPDATE_IMAGES':
      return { ...state, images: [...state.images, action.payload] };
    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };
    case 'UPDATE_DETAIlS':
      return { ...state, details: { ...state.details, ...action.payload } };

    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload };

    default:
      throw new Error('No matched action!');
  }
};

export default reducer;
