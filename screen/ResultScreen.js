import React, { Component } from 'react'
import { Text, View, Image, Dimensions, FlatList, TouchableOpacity, AsyncStorage, ImageBackground } from 'react-native'
import {connect} from 'react-redux';
import * as actioncreators from '../redux/actioncreators';
class ResultScreen extends Component {
    static navigationOptions =({navigation})=>({
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
      this.state = {listComics:[],userProfile:[],options:''};
    }

  render() {
    const {navigate} = this.props.navigation;
    const {comicLiked,comicRead} = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground 
        source={require('./../pic/background-home.jpg')} 
        style={{width: '100%', height: '100%'}}>
      <FlatList
      data={(this.props.navigation.getParam('options')==='liked')?comicLiked:comicRead}
      keyExtractor={item=>item.Id}
      renderItem={param=>(
        <View style={styles.viewContainer}>
        <TouchableOpacity style={styles.buttonContainer}
         onPress={() => navigate('ListComic', {idComic : param.item.Id,name : param.item.Name})}
        >
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={styles.text}>{param.item.Name}</Text>
          </View>
          <View style={{alignItems:'center'}}>
          <Text style={styles.text}>{param.item.countChapter}</Text>
          </View>
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
    justifyContent : 'flex-start',
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
const mapStateToprops = state => ({comics : state.comics,comicRead: state.comicRead, comicLiked: state.comicLiked})
export default connect(mapStateToprops,actioncreators)(ResultScreen);