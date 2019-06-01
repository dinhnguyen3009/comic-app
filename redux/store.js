import { createStore , combineReducers , applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import usersReducer from './users.reducers';
import comicsReducer from './comics.reducers';
import comicDetailReducer from './comicDetail.reducers';
import comicLikedReducer from './comicLiked.reducers';
import comicReadReducer from './comicRead.reducers'
import ratingReducer from './rating.reducers';

const reducer = combineReducers({
    users : usersReducer,
    comics : comicsReducer,
    comicDetail: comicDetailReducer,
    comicLiked :comicLikedReducer,
    comicRead : comicReadReducer,
    rating : ratingReducer
})
export const store = createStore(reducer,applyMiddleware(thunk));
 