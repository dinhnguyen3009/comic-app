// const defaultWords = [
//     { id: 'a1', en: 'One', vn: 'Mot', isMemorized: true },
//     { id: 'a2', en: 'Two', vn: 'Hai', isMemorized: false },
//     { id: 'a3', en: 'Three', vn: 'Ba', isMemorized: true }
// ]

function usersReducer(state = [] , action){
    if(action.type === 'GET_USER_PROFILE') return action.users;
    if(action.type === 'SIGN_OUT') return [];
    if(action.type === 'SIGN_IN') return action.users;
    return state;
}
export default usersReducer