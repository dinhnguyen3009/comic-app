import React, { Component } from 'react'
import { Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native'
import axios from 'axios';
export default class HomeScreen extends Component {
    static navigationOptions =({navigation})=>({
        title: 'Home',
        headerLeft: <Button title="Menu" onPress={()=>{navigation.openDrawer()}}/>
    });
    constructor(props){
      super(props);
      this.state = {listComics:[]}
    }
    componentWillMount(){
        this.setListComics();
    }
    setListComics = async() => {
      try {
          const response = await axios.get("https://dinh-test-v1.herokuapp.com/comic")
          this.setState({listComics : response.data.newDatas});
          
      } catch (error) {
          alert(error.message)
      }   
    }
    render() {
      const {navigate} = this.props.navigation;
    return (
      <View style={{flex : 1 , justifyContent : 'flex-start' , backgroundColor : 'white'}}>
            <FlatList
            data={this.state.listComics}
            keyExtractor={item=>item.id}
            renderItem={param=>(
              <View style={{height:70,borderBottomColor: '#a9a9a9', borderBottomWidth: 0.5}}>
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', margin:5}}
               onPress={() => navigate('ListComic', {idComic : param.item.id,name : param.item.name,openDetail:'true'})}
              >
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image 
                source={{uri:param.item.image}}
                style={{height:60,width:40}}></Image>
                  <Text style={{fontSize:20, margin:5}}>{param.item.name}</Text>
                </View>
                <View style={{alignItems:'center'}}>
                <Text style={{fontSize:30, margin:5}}>{param.item.countChapter}</Text>
                </View>
              </TouchableOpacity>
              </View>
            )}
            >
            </FlatList>
      </View>
    )
  }
}