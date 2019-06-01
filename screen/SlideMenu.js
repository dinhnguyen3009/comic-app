import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions,Image } from 'react-native'
import {connect} from 'react-redux';
import * as actioncreators from '../redux/actioncreators';
class SlideMenu extends Component {
    static navigationOptions = {
        title: 'Menu',
        
      };
    constructor(props){
      super(props)
      this.state = {userProfile:[]}
    }
    isSignIn(){
      const {navigate} = this.props.navigation;
      const {users} = this.props;
      if(!users.Id){
        return(
          <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => navigate('Signin')}>
                    <Image style={styles.icon} 
                  source={require('./../pic/login.png')}/> 
                    <Text style={styles.buttonText}>Đăng Nhập</Text>
        </TouchableOpacity>
        )
      }
      else{
        return(
          <View>
          <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => navigate('Profile')}>
                    <Image style={styles.icon} 
                  source={require('./../pic/user.png')}/> 
                    <Text style={styles.buttonText}>Thông tin người dùng</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => {navigate('Result',{title:'Yêu thích',options:'liked',newOption:'true'})
                    this.props.navigation.closeDrawer();}
                    }>
                      <Image style={styles.icon} 
                    source={require('./../pic/heart.png')}/> 
                    <Text style={styles.buttonText}>Yêu thích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}
                          onPress={() => {navigate('Result',{title:'Đã đọc',options:'read',newOption:'true'})
                          this.props.navigation.closeDrawer();}
                          }>
                            <Image style={styles.icon} 
                          source={require('./../pic/read.png')}/> 
                          <Text style={styles.buttonText}>Đã đọc</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}
                          onPress={() => { this.props.signOut() 
                            navigate('Home')
                            this.props.navigation.closeDrawer();}
                          }>
                            <Image style={styles.icon} 
                          source={require('./../pic/logout.png')}/> 
                          <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
          </View>
        )
      }
    }
    render() {
        const {navigate} = this.props.navigation;
    return (    
    <View style={styles.container}>
    
    <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => navigate('Home','DrawerClose')}>
                    <Image style={styles.icon} 
                  source={require('./../pic/home.png')}/>
                    <Text style={styles.buttonText}>Home</Text>
    </TouchableOpacity>
    {this.isSignIn()}
    </View>
    )
  }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles={
  container:{
    flex: 1, alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop:screenHeight*0.04,
  },
  buttonContainer:{
    alignItems:'center',
    justifyConent:'center',
    backgroundColor : 'black',
    height: screenHeight*0.06,
    width:screenWidth*0.4,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    padding: screenHeight*0.02,
    flexDirection:'row',
  },
  buttonText:{
    fontSize : screenHeight*0.015,
    color : 'white'
  },
  icon:{
    height:screenHeight*0.03,
    width:screenHeight*0.03,
    margin:screenHeight*0.01
  }
}
const mapStateToprops = state => ({users : state.users, 
  comicDetail : state.comicDetail, 
  comicLiked:state.comicLiked, 
  comicRead:state.comicRead,
  rating:state.rating})
export default connect(mapStateToprops,actioncreators)(SlideMenu);