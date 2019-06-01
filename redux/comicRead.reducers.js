function comicReadReducer(state = [] , action){
    if(action.type === 'GET_USER_PROFILE') return action.users.Readcomics?action.users.Readcomics:state;
    if(action.type === 'ADD_COMIC_READ') return action.comics;
    if(action.type === 'ADD_CHAPTER_READ') return action.comics;
    if(action.type === 'SIGN_IN') return action.users.Readcomics;
    if(action.type === 'SIGN_OUT') return [];
    return state;
}
export default comicReadReducer