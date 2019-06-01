function comicDetailReducer(state = [] , action){
    if(action.type === 'GET_COMIC_DETAIL') return action.comics;
    if(action.type === 'ADD_COMMENT') return action.comics;
    if(action.type === 'SIGN_OUT') return [];
    if(action.type === 'DELETE_COMIC_DETAIL') return [];
    return state;
}
export default comicDetailReducer