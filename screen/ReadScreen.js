import React, { Component } from 'react'
import { Text, View,FlatList,Dimensions,Image } from 'react-native'
import axios from 'axios';
import FullWidthImage from 'react-native-fullwidth-image'

export default class ReadScreen extends Component {
    static navigationOptions =({navigation})=>({
        title: 'Chap '+ navigation.getParam('Chapter')
    });
    constructor(props){
        super(props);
        this.state = {Images:[]}
    }
    componentWillMount(){
        this.setImages();
      }
    setImages = async()=>{
        try{
            const uri = this.props.navigation.getParam('uri'); 
            const respone = await axios.post(uri,{"link":this.props.navigation.getParam('link')})
            const getImages = respone.data.stories;
            this.setState({Images:getImages})
        }
        catch(error){
            alert(error.message)
        }
    }
    getSizeImage= async(url)=>{
        const imageHeight = await Image.getSize(url, (width, height) => {
            // calculate image width and height 
            const screenWidth = Dimensions.get('window').width
            const scaleFactor = width / screenWidth
            return height / scaleFactor
          })
        return imageHeight;
    }
    render() {
        return (
            <View style={{flex : 1 , justifyContent : 'flex-start' , backgroundColor : 'white' , paddingTop : 20}}>
                <FlatList
                data={this.state.Images}
                keyExtractor={item=>item.page.toString()}
                renderItem={param=>(
                    
                    <View style={{ marginTop : 20 }}>
                        <FullWidthImage source={{uri: param.item.url}} />
                    </View>
                )}>
                </FlatList> 
            </View>
            
        )
      }
}
