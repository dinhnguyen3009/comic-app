import React, { Component } from 'react'
import { Text, View,FlatList,TouchableOpacity } from 'react-native'
import axios from 'axios';

export default class ListChapterScreen extends Component {
    static navigationOptions =({navigation})=>({
        title: 'Danh sách Chapter'
    });
    constructor(props){
        super(props);
        this.state = {Chapters:[],url:''}
    }
    componentWillMount(){
        this.setChapters();
      }
    setChapters = async()=>{
        try{
            const uri = "https://dinh-test-v1.herokuapp.com/comic/" + this.props.navigation.getParam('idComic'); 
            const respone = await axios.get(uri);
            const getChapters = respone.data.newDatas.Chapters;
            this.setState({Chapters:getChapters,url:uri})
        }
        catch(error){
            alert(error.message)
        }
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex : 1 , justifyContent : 'flex-start' , backgroundColor : 'white'}}>
                <FlatList
                data={this.state.Chapters}
                keyExtractor={item=>item.Chapter}
                renderItem={param=>(
                    <View style={{height:50,borderBottomColor: '#a9a9a9', borderBottomWidth: 0.5}}>
                    <TouchableOpacity style={{flexDirection:'row', margin:5}}
                onPress={() => navigate('Read', {Chapter : param.item.Chapter,uri: this.state.url, link: param.item.Link})}
                >
                <View>
                <Text style={{fontSize:20, marginTop:10}}>Chap {param.item.Chapter}</Text>
                </View>
                </TouchableOpacity>
                    </View>
                )}>
                </FlatList>
            </View>
            
        )
      }
}
