import React, { Component } from 'react'
import { Text, View,FlatList,Dimensions,Image } from 'react-native'
import axios from 'axios';
import FullWidthImage from 'react-native-fullwidth-image'
import {connect} from 'react-redux';
import * as actioncreators from '../redux/actioncreators';

class ReadScreen extends Component {
    static navigationOptions =({navigation})=>({
        title: 'Chap '+ navigation.getParam('Chapter'),
        headerStyle: { backgroundColor: 'black'},
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
    });
    constructor(props){
        super(props);
        this.state = {Images:[]}
    }
    componentWillMount(){
        this.setImages();
        const {users,comicDetail}=this.props;
        this.props.addChapterRead(users.Id,comicDetail.Id,comicDetail.Name,
            this.props.navigation.getParam('Chapter'),
            this.props.navigation.getParam('link'))
      }
    
    // getHeighImage = async(url)=>{
    //     var imageHeight = 0;
    //     await Image.getSize(url, (width, height) => {imageHeight = screenWidth*height/width});
    //     return imageHeight
    // }

    setImages = async()=>{
        try{
            const {comicDetail} = this.props
            const uri = "https://dinh-test-v1.herokuapp.com/comic/"+comicDetail.Id
            const respone = await axios.post(uri,{"link":this.props.navigation.getParam('link')})
            // var getImages = await Promise.all( respone.data.stories.map((image)=>{
            //         Image.getSize(image.url, (width, height) => {imageHeight = screenWidth*height/width});
            //         return {page:image.page,url:image.url,height:this.getHeighImage(image.url)}
            // }));
            //alert(JSON.stringify(getImages));
            this.setState({Images:respone.data.stories})
        }
        catch(error){
            alert(error.message)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                data={this.state.Images}
                keyExtractor={item=>item.page.toString()}
                renderItem={param=>(
                    <View style={styles.imageContainer}>
                        <FullWidthImage source={{uri: param.item.url}} />
                    </View>
                )}>
                </FlatList> 
            </View>
            
        )
      }
}
const styles ={
    container:{
        flex : 1,
        justifyContent : 'flex-start',
        backgroundColor : 'gray',
        paddingTop : 20
    },
    imageContainer:{
        marginTop : 20
    }
}
const mapStateToprops = state => ({users:state.users,
    comicRead: state.comicRead, 
    comicDetail : state.comicDetail})
export default connect(mapStateToprops,actioncreators)(ReadScreen);