import React, { Component } from 'react'
import { Text, View, Image, FlatList, TouchableOpacity, Dimensions, ImageBackground} from 'react-native'
import {connect} from 'react-redux';
import * as actioncreators from '../redux/actioncreators';
class HomeScreen extends Component {
    static navigationOptions =({navigation})=>({
        title: 'T-Comic',
        headerStyle: { backgroundColor: 'black', height:screenHeight*0.07},
        headerTitleStyle: { color: 'white' },
        headerLeft:
        <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
          <Image
          style={styles.icon} 
          source={require('./../pic/menu.png')}/>
        </TouchableOpacity>
    });
    constructor(props){
      super(props);
      this.state = {listComics:1}
    }
    componentWillMount(){
        this.props.getComicsList();
        this.props.getUserInfo();
    }
    render() {
      const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ImageBackground 
        source={require('./../pic/background-home.jpg')} 
        style={{width: '100%', height: '100%'}}>
        <FlatList
            data={this.props.comics}
            keyExtractor={item=>item.id}
            renderItem={param=>(
              <View style={styles.viewContainer}>
              <TouchableOpacity style={styles.buttonContainer}
               onPress={() => navigate('ListComic', {idComic : param.item.id,name : param.item.name,openDetail:'true'})}
              >
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image 
                source={{uri:param.item.image}}
                style={styles.image}></Image>
                  <Text style={styles.text}>{param.item.name}</Text>
                </View>
                <Text style={styles.text}>{param.item.countChapter}</Text>
              </TouchableOpacity>
              </View>
            )}
            >
        </FlatList>
        </ImageBackground>
      </View>
    )
  }
}
const screenHeight = Dimensions.get('window').height;
const styles ={
  container:{
    flex : 1 ,
    justifyContent : 'flex-start'
  },
  viewContainer:{
    height:screenHeight*0.1,
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 1
  },
  buttonContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    margin:screenHeight*0.01
  },
  image:{
    height:screenHeight*0.08,
    width:screenHeight*0.06
  },
  text:{
    color:'white',
    fontSize:screenHeight*0.03,
    margin:screenHeight*0.015
  },
  icon:{
    height:screenHeight*0.04,
    width:screenHeight*0.04,
    margin:screenHeight*0.03
  }
}
const mapStateToprops = state => ({comics : state.comics})
export default connect(mapStateToprops,actioncreators)(HomeScreen);