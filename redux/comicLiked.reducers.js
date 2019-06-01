function comicLikedReducer(state = [] , action){
    if(action.type === 'GET_USER_PROFILE') return action.users.Likedcomics?action.users.Likedcomics:[];
    if(action.type === 'ACTION_COMIC_LIKED') return action.comicLiked;
    if(action.type === 'SIGN_IN') return action.users.Likedcomics;
    if(action.type === 'SIGN_OUT') return [];
    return state;
}
export default comicLikedReducer