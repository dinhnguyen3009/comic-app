
const axios = require('axios')
 signIn = async ()=>{
    const URL = 'https://dinh-test-v1.herokuapp.com/user/signin'
    response = await axios.post(URL, {username:"dinh3009",password:"dinh3009"});
    if(response.data.user){
        console.log(response.data.user._id);
    }
 }    
signIn();
    
    // static wait(){
    //     return new Promise((resolve,reject)=>{
    //         setTimeout(() => resolve() , 1000);
    //     });   
    // }
    // static async check(){
    //     try {
    //         const token = await AsyncStorage.getItem("@token");
    //         if(!token){
    //             await Userservice.wait();
    //             throw new Error("No token")
    //         }
    //         const URL = "https://servertest12.herokuapp.com/user/check";
    //         const response = await axios.post(URL , {token});
    //         if(!response.data.success) throw new Error ("No token");
    //         return response.data.user;
    //     } catch (error) { 
    //         alert(error.message);
    //     }
    // }
    // static async logout(){
    //     await AsyncStorage.removeItem("@token");
    // }