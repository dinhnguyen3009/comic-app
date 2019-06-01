import React, { Component } from 'react'
import { Text, View, Image, Dimensions, TextInput, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import { Icon , AirbnbRating} from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import * as actioncreators from '../redux/actioncreators';

class DetailScreen extends Component {
  static navigationOptions =({navigation})=>({
    title: 'Thông tin truyện',
    headerRight:
    <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
          <Image
          style={styles.icon} 
          source={require('./../pic/menu.png')}/>
        </TouchableOpacity>
    
});
constructor(props){
  super(props);
  this.state = {isLike:false,comment:'', click:false,userRat:0}
  this.likeComic = this.likeComic.bind(this)
}
componentWillMount (){
  this.props.deleteComicDetail()
  this.props.getComicDetail(this.props.navigation.getParam('idComic'));
  var addRead = true      
  const {comicRead} = this.props
  if(this.props.users.Id&&comicRead!=[]){
  for(var i=0;i<comicRead.length;i++){
  if(comicRead[i].Id==this.props.navigation.getParam('idComic'))
  addRead = false}}
  if(this.props.users.Id&&addRead){
  this.props.addComicRead(this.props.users.Id,this.props.navigation.getParam('idComic'),this.props.navigation.getParam('name'));
  }

  const {comicLiked} = this.props
  if(this.props.users.Id&&comicLiked!=[]){
  for(var i=0;i<comicLiked.length;i++){
    if(comicLiked[i].Id==this.props.navigation.getParam('idComic'))
    this.setState({isLike:true})}
  }

  const {rating} = this.props
  if(this.props.users.Id){
  for(var i=0;i<rating.length;i++){
    if(rating[i].Id==this.props.navigation.getParam('idComic'))
    this.setState({userRat:rating[i].Rating})
  }
  }
}
ratingCompleted = (rating)=>{
  const {comicDetail,users} = this.props
  if(users.Id){
  this.props.addRating(users.Id,comicDetail.Id,rating)
  }
  else
  alert('chua dang nhap')
}

likeComic(){
  const {comicDetail,users} = this.props
  if(users.Id){
    this.props.actionLikedComic(users.Id,comicDetail.Id,comicDetail.Name)
    this.setState({isLike:!this.state.isLike})
  }
  else
  alert('chua dang nhap')
}
addComment=()=>{
  const {comicDetail,users} = this.props;
  if(users.Id){
    this.props.addComment(users.Id,comicDetail.Id,this.state.comment,users.Username)
    this.setState({comment:''})
  }
  else
  alert('chua dang nhap')
}
  render() {
    const {comicDetail,users} = this.props
      return (
        <View style={{ flex: 1}}>
          <ImageBackground 
        source={require('./../pic/background-home.jpg')} 
        style={{width: '100%', height: '100%'}}>
        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={175} >
          <View style={styles.detailContainer}>
          <View style={styles.imageContainer}>
          <Image 
                source={{uri:comicDetail.Image}}
                style={styles.image}></Image>
          </View>
          <View style={styles.inforContaier}>
          <Text style={styles.text}>Tên: {comicDetail.Name}</Text>
          <Text style={styles.text}>Tác Giả: {comicDetail.Author}</Text>
          <Icon
            raised
            reverse
            name='heart'
            type='font-awesome'
            color={this.state.isLike?'red':'blue'}
            onPress={this.likeComic} />
            <AirbnbRating
              count={5}
              reviews={[]}
              defaultRating={users.Id?this.state.userRat:comicDetail.rating}
              size={20}
              onFinishRating={this.ratingCompleted}/>
            <Text style={styles.textBold}>Điểm trung bình: {comicDetail.rating}</Text>
          </View>
          </View>
          <View>
            <FlatList
            data={comicDetail.Comments}
            keyExtractor={item=>item.idComment.toString()}
            renderItem={param=>(
              <View style={styles.commentContainer}>
              <View style={styles.textCommentContainer}>
                <Text style={styles.textBold}>Người dùng: </Text>
                <Text style={styles.text}> {param.item.Name}</Text>
                <Text style={styles.text}> -  {param.item.time}</Text>
              </View>
              <View style={styles.textCommentContainer}>
                <Text style={styles.text}>{param.item.Comment}</Text>
              </View>
              </View>)}>
            </FlatList>
            <View style={styles.typeCommentContainer}>
            <Text style={styles.textBold} > Nhập bình luận:</Text>
            <View style={styles.inputContainer}>
              <TextInput 
              style={{color:'white'}}
              maxLength = {100}
              value={this.state.comment}
              onChangeText={text=>this.setState({comment:text})} 
              ></TextInput>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity 
            disabled={this.state.click}
            style={styles.button}
            onPress={this.addComment}>
                <Text style={styles.textBold}>Bình luận</Text>
              </TouchableOpacity>
            </View>
            </View>
            </View>
            </KeyboardAwareScrollView>
            </ImageBackground>
        </View>
      )
  }
}
const screenHeight = Dimensions.get('window').height;
const styles={
  detailContainer:{
    height:screenHeight*0.35,
    flexDirection:'row',
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 0.5
  },
  imageContainer:{
    margin:screenHeight*0.025,
    width:screenHeight*0.18
  },
  image:{
    height:screenHeight*0.3,
    width:screenHeight*0.18
  }
  ,
  inforContaier:{
    margin:5
  },
  commentContainer:{
    borderColor:'white',
    height:screenHeight*0.12,
    backgroundColor:'gray',
    blurRadius: 1,
    margin:screenHeight*0.015
  },
  textCommentContainer:{
    margin:screenHeight*0.005,
    flexDirection:'row'
  },
  typeCommentContainer:{
    height: screenHeight*0.2,
    justifyContent:'space-around',
    margin: screenHeight*0.015
  },
  inputContainer:{
    height:screenHeight*0.1,
    borderColor:'#a9a9a9',
    borderWidth: 0.5,
    borderRadius:5, margin:screenHeight*0.015
  },
  buttonContainer:{
    alignItems:'flex-end',
    marginRight:screenHeight*0.015
  },
  button:{
    backgroundColor:'#3393FD',
    alignItems:'center',
    justifyContent:'center',
    width:screenHeight*0.14,
    height:screenHeight*0.08,
    borderRadius:3,
  },
  text:{color:'white'},
  textBold:{
    fontWeight: 'bold',
    color:'white'}
}
const mapStateToprops = state => ({users : state.users, 
  comicDetail : state.comicDetail, 
  comicLiked:state.comicLiked, 
  comicRead:state.comicRead,
  rating:state.rating})
export default connect(mapStateToprops,actioncreators)(DetailScreen);