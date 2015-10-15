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
} = React;
var REACTNATIVE_URL = 'https://www.reddit.com/r/reactnative.json';
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
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    console.log("rendering list")
    return (
      <View style={styles.container}>
      <Text>Reddit.com/r/reactnative</Text>
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
      console.log("data: " +responseData);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.data.children),
        loaded: true,
      });
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
     <View style={styles.container}>
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
    color:'blue',
  },
});

AppRegistry.registerComponent('reactnativeReddit', () => reactnativeReddit);
