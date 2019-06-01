function ratingReducer(state = [] , action){
    if(action.type === 'GET_USER_PROFILE') return action.users.Rating?action.users.Rating:state;
    if(action.type === 'ADD_RATING') return action.rating;
    if(action.type === 'SIGN_IN') return action.users.Rating;
    if(action.type === 'SIGN_OUT') return [];
    return state;
}
export default ratingReducer