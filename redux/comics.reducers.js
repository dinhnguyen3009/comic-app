function comicsReducer(state = [] , action){
    if(action.type === 'GET_COMIC_LIST') return action.comics;
    return state;
}
export default comicsReducer