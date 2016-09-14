'use strict';

var React = require('react');
var ReactNative = require('react-native');
var Main = require('./Main');


var {
  Component
} = React

var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  NavigatorIOS
} = ReactNative;


var styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});


class MFBlogApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'MF Blog',
          component: Main,
        }}/>
    );
  }
}



AppRegistry.registerComponent('MobileFirstAndReactNative', function() { return MFBlogApp });
