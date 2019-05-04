import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity, TextInput, AsyncStorage, Dimensions } from 'react-native'
export default class SlideMenu extends Component {
    static navigationOptions = {
        drawerLabel: 'Menu'
      };
    constructor(props){
      super(props)
      this.state = {userProfile:[]}
    }
    render() {
        const {navigate} = this.props.navigation;
    return (    
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', marginTop:17,borderBottomColor: '#a9a9a9', borderBottomWidth: 0.5 }}>
    
    <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => navigate('Home','DrawerClose')}>
                    <Text style={styles.buttonText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => navigate('Profile')}>
                    <Text style={styles.buttonText}>User</Text>
    </TouchableOpacity>
    <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => navigate('Result',{title:'Yêu thích',options:'liked',newOption:'true'})}>
                    <Text style={styles.buttonText}>Yêu thích</Text>
    </TouchableOpacity>
    <TouchableOpacity  
                    style={styles.buttonContainer}
                    onPress={() => navigate('Result',{title:'Đã đọc',options:'read',newOption:'true'})}>
                    <Text style={styles.buttonText}>Đã đọc</Text>
    </TouchableOpacity>
    </View>
    )
  }
}
const screenWidth = Dimensions.get('window').width;
const styles={
  buttonContainer:{
    alignItems:'center',
    justifyConent:'center',
    backgroundColor : 'white',
    height:50,
    width:screenWidth*0.4,
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 0.5,
    padding: 15
  },
  buttonText:{
    fontWeight : 'bold',
    fontSize : 14,
    color : 'red'
  }
}