import React, { Component } from 'react'
import { Text, View , AsyncStorage,TouchableOpacity,Image,Dimensions, Button } from 'react-native'
import Userservice from '../user/user.service'
import { StackActions, NavigationActions } from 'react-navigation';
export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state={userProfile:[]};
    this.renderProfile=this.renderProfile.bind(this);
  }
  componentWillMount = async () =>{
    try {
      const userProfile = await AsyncStorage.getItem("userInfo");
      if(userProfile!==null)
      {
        objUser = JSON.parse(userProfile);
        this.setState({userProfile:objUser});
      }
      if(userProfile===null){
        alert('Bạn cần đăng nhập để sử dụng mục này')
        this.props.navigation.navigate('Signin')
        
      }
    } catch (error) {
      
    }
  }

  componentWillUpdate = async () =>{
    try {
      if(!this.state.userProfile.Id){
        const userProfile = await AsyncStorage.getItem("userInfo");
        if(userProfile!==null){
          objUser = JSON.parse(userProfile);
          this.setState({userProfile:objUser});}
      }
    } catch (error) {
      
    }
  }

  logout = async () => {
    try {
        await Userservice.logout();
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Profile' })],
          });
        this.props.navigation.dispatch(resetAction);
    } catch (error) {
       alert(error.message)
    }
  }

  renderProfile(){
    const {userProfile} = this.state;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const {navigate} = this.props.navigation;
    if(!userProfile.Id)
      return(
        <View>
          <View style={{height:screenHeight*0.3,width : screenWidth, flexDirection:'row', borderBottomColor: '#a9a9a9', borderBottomWidth: 0.5}}>
          <View style={{margin:5, width:screenHeight*0.3}}>
          <Image 
                source={require('../pic/user.jpg')}
                style={{height:screenHeight*0.3,width:screenHeight*0.3}}></Image>
          </View>
          <View style={{margin:5}}>
          <Text>Tên người dùng: {userProfile.Username}</Text>
          <Text>Lượt bình luận: {userProfile.Comments}</Text>
          </View>
          </View>
          <Text>Bạn cần đăng nhập để sử dụng mục này</Text>
            <TouchableOpacity 
                    onPress={()=>{navigate('Signin')}}
                    style={{backgroundColor : '#3393FD' ,alignItems:'center', padding : 5 , borderRadius : 5,height:35, marginTop:5}}>
                    <Text style={{ fontSize : 20 , color : 'white',  alignItems : 'center',}}>Đăng nhập</Text>
              </TouchableOpacity>
        </View>
        )
    else
    return(
      <View>
        <View style={{height:screenHeight*0.3,width : screenWidth, flexDirection:'row', borderBottomColor: '#a9a9a9', borderBottomWidth: 0.5}}>
          <View style={{margin:5, width:screenHeight*0.3}}>
          <Image 
                source={require('../pic/user.jpg')}
                style={{height:screenHeight*0.3,width:screenHeight*0.3}}></Image>
          </View>
          <View style={{margin:5}}>
          <Text>Tên người dùng: {userProfile.Username}</Text>
          <Text>Lượt bình luận: {userProfile.Comments}</Text>
          <TouchableOpacity 
                    onPress={this.logout}
                    style={{backgroundColor : '#3393FD' ,alignItems:'center', padding : 5 , borderRadius : 5,height:35, marginTop:5}}>
                    <Text style={{ fontSize : 20 , color : 'white',  alignItems : 'center'}}>Đăng xuất</Text>
          </TouchableOpacity>
          </View>
          </View>
          <View style={{ width : screenWidth*0.9, margin:10,justifyContent : 'center'}}>
            <TouchableOpacity 
                    onPress={()=>navigate('Result',{title:'Yêu thích',options:'liked',newOption:'true'})}
                    style={{backgroundColor : '#3393FD' ,alignItems:'center', padding : 5 , borderRadius : 5,height:35, marginTop:5}}>
                    <Text style={{ fontSize : 20 , color : 'white',  alignItems : 'center'}}>Truyện đã thích</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                    onPress={()=>navigate('Result',{title:'Đã đọc',options:'read',newOption:'true'})}
                    style={{backgroundColor : '#3393FD' ,alignItems:'center', padding : 5 , borderRadius : 5,height:35, marginTop:5}}>
                    <Text style={{ fontSize : 20 , color : 'white',  alignItems : 'center'}}>Truyện đã xem</Text>
              </TouchableOpacity>
          </View>
      </View>
    )
  }
  render() {
    return (
      <View style={{ flex: 1,alignItems : 'center'}}>
          {this.renderProfile()}
        </View>
      
    )
  }
}
