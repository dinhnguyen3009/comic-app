import React, { Component } from 'react'
import { Text, View, Image, Button, FlatList, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios';
export default class ResultScreen extends Component {
    static navigationOptions =({navigation})=>({
        headerLeft: <Button title="Menu"  onPress={()=>{navigation.openDrawer()}}/>
    });
    constructor(props){
      super(props);
      this.state = {listComics:[],userProfile:[],options:''};
    }

    componentWillMount = async () =>{
        try {
          const userProfile = await AsyncStorage.getItem("userInfo");
          if(userProfile!==null)
          {
            objUser = JSON.parse(userProfile);
            this.setState({userProfile:objUser});
            this.setListComics();
          }
          if(userProfile===null){
            alert('Bạn cần đăng nhập để sử dụng mục này')
            this.props.navigation.navigate('Signin')
            
          }
        } catch (error) {
          alert(error.message)
        }
      }
    
    componentWillUpdate = async () =>{
    try {
      if(!this.state.userProfile.Id){
        const userProfile = await AsyncStorage.getItem("userInfo");
        if(userProfile!==null){
          objUser = JSON.parse(userProfile);
          this.setState({userProfile:objUser});}
        else{
          alert('Bạn cần đăng nhập để sử dụng mục này')
          this.props.navigation.navigate('Signin')
        }
      }
      else{
        if(this.state.options!==this.props.navigation.getParam('options')){
          this.setListComics();
        }
        
      }
    } catch (error) {
    }
  }

    setListComics = async() => {
      try {
          if(this.props.navigation.getParam('options')==='liked'){
              URL = "https://dinh-test-v1.herokuapp.com/user/liked/" + this.state.userProfile.Id;
              const response = await axios.get(URL)
              this.setState({listComics : response.data.newDatas});
          }
          else
          {
            URL = "https://dinh-test-v1.herokuapp.com/user/read/" + this.state.userProfile.Id;
            const response = await axios.get(URL)
              this.setState({listComics : response.data.newDatas});
          }
          
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
      keyExtractor={item=>item.Id}
      renderItem={param=>(
        <View style={{height:70,borderBottomColor: '#a9a9a9', borderBottomWidth: 0.5}}>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', margin:5}}
         onPress={() => navigate('ListComic', {idComic : param.item.Id,name : param.item.Name})}
        >
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{fontSize:20, margin:5}}>{param.item.Name}</Text>
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
