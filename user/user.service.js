import axios from 'axios';
import {AsyncStorage} from 'react-native';


export default class Userservice{
    static async signIn(username,password){
       const URL = 'https://dinh-test-v1.herokuapp.com/user/signin'
       const response = await axios.post(URL, {username,password});
       if(response.data.user){
           const {user} = response.data;
           const userData = JSON.stringify({Id:user._id,Username:user.Username,Comments:user.Comments.length,Likedcomics:user.Likedcomics,Readcomics:user.Readcomics,Rating:user.Rating})
           await AsyncStorage.setItem("userInfo",userData)
           alert('Đăng nhập thành công');
       }
       else
        alert(response.data.message)
        const userInfo = await AsyncStorage.getItem("userInfo")
        return userInfo;
    }    
    static async logout(){
        await AsyncStorage.removeItem("userInfo");
        return [];
    }
} 