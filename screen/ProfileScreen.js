import React, { Component } from 'react'
import { Text, View , AsyncStorage,TouchableOpacity,Image,Dimensions, ImageBackground } from 'react-native'
import {connect} from 'react-redux';
import * as actioncreators from '../redux/actioncreators';

class Profile extends Component {
  constructor(props){
    super(props);
    this.renderProfile=this.renderProfile.bind(this);
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Thông tin người dùng',
        headerStyle: { backgroundColor: 'black', height:screenHeight*0.07},
        headerTitleStyle: { color: 'white' },
        headerLeft:
        <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
          <Image
          style={styles.icon} 
          source={require('./../pic/menu.png')}/>
        </TouchableOpacity>
  })
  componentWillMount (){
      this.props.getUserInfo();
  }

  renderProfile(){
    const userProfile = this.props.users;
    const {navigate} = this.props.navigation;
    if(userProfile.Id)
    return(
      <View>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
          <Image 
                source={require('../pic/user-men.jpg')}
                style={styles.image}/>
          </View>
          <View style={styles.profileContainer}>
          <Text style={styles.text}>Tên người dùng: {userProfile.Username}</Text>
          <Text style={styles.text}>Lượt bình luận: {userProfile.Comments}</Text>
          <Text style={styles.text}>Truyện đã đọc: {this.props.comicRead.length}</Text>
          <Text style={styles.text}>Truyện đã thích: {this.props.comicLiked.length}</Text>
          <TouchableOpacity 
                    onPress={()=>this.props.signOut()}
                    style={styles.button}>
                    <Text style={styles.text}>Đăng xuất</Text>
          </TouchableOpacity>
          </View>
          </View>
            <TouchableOpacity 
                    onPress={()=>navigate('Result',{title:'Yêu thích',options:'liked',newOption:'true'})}
                    style={styles.button}>
                    <Text style={styles.text}>Truyện đã thích</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                    onPress={()=>navigate('Result',{title:'Đã đọc',options:'read',newOption:'true'})}
                    style={styles.button}>
                    <Text style={styles.text}>Truyện đã xem</Text>
              </TouchableOpacity>
      </View>)
      else
      return(
        <View>
          <View style={styles.container}>
          <View style={styles.imageContainer}>
          <Image 
                source={require('../pic/user-men.jpg')}
                style={styles.image}/>
          </View>
          <View style={styles.profileContainer}>
          <Text style={styles.text}>Tên người dùng: {userProfile.Username}</Text>
          <Text style={styles.text}>Lượt bình luận: {userProfile.Comments}</Text>
          </View>
          </View>
          <Text style={styles.text}>Bạn cần đăng nhập để sử dụng mục này</Text>
            <TouchableOpacity 
                    onPress={()=>{navigate('Signin')}}
                    style={styles.button}>
                    <Text style={styles.text}>Đăng nhập</Text>
              </TouchableOpacity>
        </View>
        )
  }
  render() {
    return (
      <View style={{ flex: 1,alignItems : 'center'}}>
          <ImageBackground 
        source={require('./../pic/background-home.jpg')} 
        style={{width: '100%', height: '100%'}}>
           {this.renderProfile()}
        </ImageBackground>
        </View>
      
    )
  }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles={
  container:{
    height:screenHeight*0.3,
    width : screenWidth,
    flexDirection:'row',
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 0.5
  },
  imageContainer:{
    margin:5,
    width:screenHeight*0.25
  },
  image:{
    height:screenHeight*0.25,
    width:screenHeight*0.25,
    borderRadius: 90
  },
  profileContainer:{
    margin:5
  },
  button:{
    backgroundColor : '#3393FD',
    alignItems:'center',
    padding : 5 ,
    borderRadius : 5,
    height:35,
    marginTop:5
  },
  text:{
    fontSize : 14,
    color : 'white',
    alignItems : 'center'
  },
  icon:{
    height:screenHeight*0.04,
    width:screenHeight*0.04,
    margin:screenHeight*0.03
  }
}
const mapStateToprops = state => ({users : state.users,comicRead: state.comicRead,comicLiked: state.comicLiked})
export default connect(mapStateToprops,actioncreators)(Profile);