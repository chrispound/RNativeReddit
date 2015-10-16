/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  ProgressBar,
  TextInput,
} = React;
var REACTNATIVE_URL = 'http://www.reddit.com/.json';
var reactnativeReddit = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  },
  componentDidMount: function() {
    this.loadSubredditData(REACTNATIVE_URL);
  },
  render: function() {
    // if(!this.state.loaded) {
    //   return this.renderLoadingView();
    // }
    console.log("rendering list")
    return (
      <View style={styles.container}>
      <View style={styles.container}>
        <Text>Enter Subreddit</Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => {
            var temp = 'http://www.reddit.com/r/'+text+'.json';
            this.setState({
              subreddit: text,
              loaded: false,
            })
            this.loadSubredditData(temp);
          }
        }
          value={this.state.text}/>
    </View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRedditPost}
        style={styles.listView}/>
        </View>
    );
  },
  loadSubredditData: function(url) {
    fetch(url)
    .then((response) =>response.json())
    .then((responseData)=> {
      if(!responseData.error) {
        console.log("data: " +responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data.children),
          loaded: true,
        });
      }
    })
    .done();
  },
  renderLoadingView: function() {
   return (
     <View style={styles.container}>
       <Text>
         Loading reddit...
       </Text>
     </View>
   );
 },
 renderRedditPost: function(data) {
   return (
     <View style={styles.redditPostContainer}>
          <Text style={styles.redditpost}>{data.data.title}</Text>
    </View>
          );
 }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listView: {
    paddingTop: 20,
    paddingBottom:20,
    paddingRight:16,
    paddingLeft: 16,
    backgroundColor: '#F5FCFF',
  },
  redditpost: {
    textAlign: 'left',
    fontSize:16,
    color:'#3366BB',
  },
  redditPostContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 16,
  },
});

AppRegistry.registerComponent('reactnativeReddit', () => reactnativeReddit);
