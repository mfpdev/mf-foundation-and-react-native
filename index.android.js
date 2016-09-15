'use strict';

var React = require('react');
var ReactNative = require('react-native');
var Main = require('./Main');
var BlogEntries = require('./BlogEntries');
var BlogEntry = require('./BlogEntry');
var _navigator;


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
  Navigator,
  BackAndroid
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
      <Navigator
        style={styles.container}
        initialRoute={{
          title: 'MF Blog',
          component: Main,
        }}
        renderScene={(route, navigator) => {
          _navigator = navigator;
          switch (route.component.name) {
            case "Main":
              return <Main title={route.title} navigator={navigator}/>
            case "BlogEntries":
              return <BlogEntries title={route.title} navigator={navigator} {...route.passProps}/>
            case "BlogEntry":
              return <BlogEntry title={route.title} navigator={navigator} {...route.passProps}/>
          }
        }}
        />
    );
  }
}

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

AppRegistry.registerComponent('MobileFirstAndReactNative', function() { return MFBlogApp });
