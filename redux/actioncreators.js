import {AsyncStorage} from 'react-native';
import Userservice from '../user/user.service';
import axios from 'axios';
export function deleteComicDetail(){
    return {type:'DELETE_COMIC_DETAIL'}
}
export function getUserInfo (){
    return function(dispatch){
    AsyncStorage.getItem("userInfo")
    .then(response =>{ 
        if(response)
        dispatch({type:'GET_USER_PROFILE', users: JSON.parse(response)})
        else
        dispatch({type:'GET_USER_PROFILE', users: []})
    }
    );
    }
}
export function signOut () {
    return function(dispatch){
        Userservice.logout()
        .then(response=>{
            dispatch({type:'SIGN_OUT', users:response})
        })
    }
}
export function signIn (txtUsername,txtPassword) {
    return function(dispatch){
        Userservice.signIn(txtUsername,txtPassword)
        .then(response=>{
            if(response)
            dispatch({type:'SIGN_IN', users: JSON.parse(response)})
            else
            dispatch({type:'SIGN_IN', users: []})
        })
    }
}
export function getComicsList () {
    return function(dispatch){
        axios.get("https://dinh-test-v1.herokuapp.com/comic")
        .then(response=>{
            dispatch({type:'GET_COMIC_LIST', comics:response.data.newDatas})
        })
    }
}
export function getComicDetail (idComic) {
    return function(dispatch){
        const uri = "https://dinh-test-v1.herokuapp.com/comic/" + idComic; 
        axios.get(uri).then(response=>{
            const {newDatas}= response.data
            var rating = 0;
            if(newDatas.Rating!=[]){
              var temp = 0;
              for(let i=0;i<newDatas.Rating.length;i++){
                temp=temp+newDatas.Rating[i].Rating;
              }
              rating = temp/newDatas.Rating.length;
            }
            const comicDetail = {Id:newDatas._id,
                Name:newDatas.Name,
                Author:newDatas.Author,
                Image:newDatas.Image,
                Comments:newDatas.Comments,
                Chapters:newDatas.Chapters,
                rating:rating.toFixed(1)}
            dispatch({type:'GET_COMIC_DETAIL', comics:comicDetail})
        })
    }
}
export function addComicRead (idUser,idComic,name) {
    return function(dispatch){
        const uriRead = "https://dinh-test-v1.herokuapp.com/user/read"
        axios.post(uriRead,{idUser:idUser,
        idComic:idComic,
        name:name,
    })
        .then(response=>{
                dispatch({type:'ADD_COMIC_READ', comics:response.data.readComics})
        })
    }
}
export function addChapterRead(idUser,idComic,name,chapter,link){
    return function(dispatch){
        const uriRead = "https://dinh-test-v1.herokuapp.com/user/add/read"
        axios.post(uriRead,{idUser:idUser,
            idComic:idComic,
            name:name,
            chapter:chapter,
        link:link})
        .then(response=>{
            dispatch({type:'ADD_CHAPTER_READ', comics:response.data.readComics})
        })
    }
}
export function actionLikedComic (idUser,idComic,name){
    return function(dispatch){
        const uri = "https://dinh-test-v1.herokuapp.com/user/liked"
      axios.post(uri,{idUser:idUser,
      idComic:idComic,
      name:name}).then(response=>{
        dispatch({type:'ACTION_COMIC_LIKED', comicLiked: response.data.likedComics})
      })
    }
}
export function addRating (idUser,idComic,rating){
    return function(dispatch){
        const uri = "https://dinh-test-v1.herokuapp.com/rating"
        axios.post(uri,{idUser:idUser,idComic:idComic,rating:rating}).then(
            response=>{
                dispatch({type:'ADD_RATING', rating: response.data.userRating})
            }
        )
    }
}
export function addComment (idUser,idComic,comment,name){
    return function(dispatch){
        const uri = "https://dinh-test-v1.herokuapp.com/comment"
        axios.post(uri,{idUser:idUser,
        idComic:idComic,
        comment: comment,
        name:name}).then(
            response=>{
                const newDatas= response.data.commentComics
                var rating = 0;
                if(newDatas.Rating!=[]){
                var temp = 0;
                for(let i=0;i<newDatas.Rating.length;i++){
                    temp=temp+newDatas.Rating[i].Rating;
                }
                rating = temp/newDatas.Rating.length;
                }
                const comicDetail = {Id:newDatas._id,
                    Name:newDatas.Name,
                    Author:newDatas.Author,
                    Image:newDatas.Image,
                    Comments:newDatas.Comments,
                    Chapters:newDatas.Chapters,
                    rating:rating}
                dispatch({type:'ADD_COMMENT',comics:comicDetail})
            }
        )
    }
}
// export function setWord(){
//     return function(dispatch){
//         const URL = "https://server2301.herokuapp.com/word"
//         axios.get(URL)
//         .then(response => dispatch({type : 'SET_WORDS' , words : response.data.words}));
//     }
// }
// dispatch({type:'SET_USER_PROFILE', users: response})
// export const getUserById = id => async (getState, dispatch) => {
//     try{
//         const {token} = await callGetUserApi(id);
//         const response = await callGetReportApi(token);
//         const report = JSON.parse(response.report);
//         dispatch({
//             type:"GET_REPORT_SUCCESS",
//             payload:report
//         });
//     }catch(error){
//        dispatch({
//             type:"GET_REPORT_FAIL",
//             payload:{message:"fail to get report"}
//         }); 
//     }
// }