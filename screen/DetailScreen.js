import React, { Component } from 'react'
import { Text, View, Image, Dimensions,AsyncStorage, TextInput, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FlatList } from 'react-native-gesture-handler';

export default class DetailScreen extends Component {
  static navigationOptions =({navigation})=>({
    title: 'Thông tin truyện'
});
constructor(props){
  super(props);
  this.state = {Information:[],userProfile:[], comment:'', click:false}
  this.getLike = this.getLike.bind(this);
  this.postComent = this.postComent.bind(this);
}
componentWillMount(){
    this.setInformation();
}
postComent = async() =>{
  try {
    if(this.state.userProfile.Id!=null){
      this.setState({click:true,comment:''})
      const uri = "https://dinh-test-v1.herokuapp.com/comment"
      await axios.post(uri,{idUser:this.state.userProfile.Id,
      idComic:this.props.navigation.getParam('idComic'),
      comment: this.state.comment,
      name:this.state.userProfile.Username})
      this.props.navigation.navigate('Home')
    }
    else{
      alert("Bạn chưa đăng nhập")
    }
  } catch (error) {
    alert(error.message)
  }
}
getLike = async() =>{
  try {
    if(this.state.userProfile.Id!=null){
      const uri = "https://dinh-test-v1.herokuapp.com/user/liked"
      const response = await axios.post(uri,{idUser:this.state.userProfile.Id,
      idComic:this.props.navigation.getParam('idComic'),
      name:this.props.navigation.getParam('name')})
      alert(response.data.message);
    }
    else{
      alert("Bạn chưa đăng nhập")
    }
  } catch (error) {
    alert(error.message)
  }
}
setInformation = async()=>{
  try{
      const uri = "https://dinh-test-v1.herokuapp.com/comic/" + this.props.navigation.getParam('idComic'); 
      const respone = await axios.get(uri);
      const getChapters = respone.data.newDatas;
      const userProfile = await AsyncStorage.getItem("userInfo");
      if(userProfile!==null)
      {
        objUser = JSON.parse(userProfile);
        this.setState({userProfile:objUser});
      }
      this.setState({Information:getChapters})
      const uriRead = "https://dinh-test-v1.herokuapp.com/user/read"
      await axios.post(uriRead,{idUser:this.state.userProfile.Id,
        idComic:this.props.navigation.getParam('idComic'),
        name:this.props.navigation.getParam('name')})
  }
  catch(error){
      
  }
}
  render() {
    const {Information} = this.state
      return (
        <View style={{ flex: 1}}>
        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={200} >
          <View style={{height:220, flexDirection:'row', borderBottomColor: '#a9a9a9', borderBottomWidth: 0.5}}>
          <View style={{margin:5, width:150}}>
          <Image 
                source={{uri:Information.Image}}
                style={{height:210,width:140}}></Image>
          </View>
          <View style={{margin:5}}>
          <Text>Tên: {Information.Name}</Text>
          <Text>Tác Giả: {Information.Author}</Text>
          <Icon
            raised
            reverse
            name='heart'
            type='font-awesome'
            color='red'
            onPress={this.getLike} />
          </View>
          </View>
          <View>
            <Text></Text>
            <FlatList
            data={this.state.Information.Comments}
            keyExtractor={item=>item.Id}
            renderItem={param=>(
              <View style={{height:70,backgroundColor:'#a9a9a9', borderRadius: 10, margin:10}}>
              <View style={{margin:5,flexDirection:'row'}}>
                <Text>Người dùng: </Text>
                <Text style={{fontWeight:'bold'}}> {param.item.Name}</Text>
              </View>
              <View style={{margin:5}}>
                <Text>{param.item.Comment}</Text>
              </View>
              </View>)}>
            </FlatList>
            <View style={{height: 110, justifyContent:'space-around' }}>
            <Text style={{marginLeft:10}}> Nhập bình luận:</Text>
            <View style={{height:40,borderColor:'#a9a9a9', borderWidth: 0.5, borderRadius:5, margin:10}}>
              <TextInput style={{margin:5}} 
              onChangeText={text=>this.setState({comment:text})} 
              ></TextInput>
            </View>
            <View style={{alignItems:'flex-end', marginRight:10}}>
            <TouchableOpacity 
            disabled={this.state.click}
            style={{backgroundColor:'#3393FD', alignItems:'center', justifyContent:'center', width:70, height:30, borderRadius:3}}
            onPress={this.postComent}>
                <Text>Bình luận</Text>
              </TouchableOpacity>
            </View>
            </View>
            </View>
            </KeyboardAwareScrollView>
        </View>
      )
  }
}
