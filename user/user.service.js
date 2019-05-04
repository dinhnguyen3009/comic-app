import axios from 'axios';
import {AsyncStorage} from 'react-native';


export default class Userservice{
    static async signIn(username,password){
       const URL = 'https://dinh-test-v1.herokuapp.com/user/signin'
       const response = await axios.post(URL, {username,password});
       if(response.data.user){
           const {user} = response.data;
           await AsyncStorage.setItem("userInfo",JSON.stringify({Id:user._id,Username:user.Username,Comments:user.Comments.length}))
       }
       return response
    }    
    static async logout(){
        await AsyncStorage.removeItem("userInfo");
    }
} 