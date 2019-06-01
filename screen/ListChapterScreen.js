import React, { Component } from 'react'
import { Text, View,FlatList,TouchableOpacity, Dimensions, ImageBackground, Alert } from 'react-native'
import axios from 'axios';
import {connect} from 'react-redux';
import * as actioncreators from '../redux/actioncreators';

class ListChapterScreen extends Component {
    static navigationOptions =({navigation})=>({
        title: 'Danh sách Chapter'
    });
    constructor(props){
        super(props);
        this.state = {Chapter:0,link:''}
    }
    componentWillMount(){
        const {comicRead} = this.props
        if(comicRead!=[]){
        for(var i=0;i<comicRead.length;i++){
        if(comicRead[i].Id==this.props.navigation.getParam('idComic'))
        this.askingForRead(comicRead[i].Chapter,comicRead[i].Link)}}
    }
    askingForRead(chapter,link){
        const {navigate} = this.props.navigation;
        if(chapter!=1){
            Alert.alert(
                'Gợi ý',
                'Bạn đang đọc ở chapter '+ chapter,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => navigate('Read', {Chapter : chapter, link: link})},
                ],
                {cancelable: false},
              );
        }
    }
    render() {
        const {navigate} = this.props.navigation;
        const {comicDetail} = this.props
        return (
            <View style={styles.container}>
                <ImageBackground 
                    source={require('./../pic/background-home.jpg')} 
                    style={{width: '100%', height: '100%'}}>
                <FlatList
                data={comicDetail.Chapters}
                keyExtractor={item=>item.Chapter}
                renderItem={param=>(
                    <View style={styles.chapterContainer}>
                    <TouchableOpacity style={styles.buttonContainer}
                onPress={() => navigate('Read', {Chapter : param.item.Chapter, link: param.item.Link})}
                >
                <View>
                <Text style={styles.text}>Chap {param.item.Chapter}</Text>
                </View>
                </TouchableOpacity>
                    </View>
                )}>
                </FlatList>
                </ImageBackground>
            </View>
            
        )
      }
}
screenHeight = Dimensions.get('window').height;
const styles = {
    container:{
        flex : 1 ,
        justifyContent : 'flex-start',
        backgroundColor : 'white'
    },
    chapterContainer:{
        height:screenHeight*0.1,
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    buttonContainer:{
        flexDirection:'row',
        margin:screenHeight*0.01
    },
    text:{
        fontSize:screenHeight*0.03,
        margin:screenHeight*0.02,
        color:'white'
    }
}
const mapStateToprops = state => ({comicRead: state.comicRead, 
    comicDetail : state.comicDetail})
export default connect(mapStateToprops,actioncreators)(ListChapterScreen);