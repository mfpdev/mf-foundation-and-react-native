/**
 *    © Copyright 2016 IBM Corp.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

'use strict';

var React = require('react');
var ReactNative = require('react-native');
var WLResourceRequestRN = require('NativeModules').WLResourceRequestRN;
var SecurityCheckChallengeHandlerRN = require('NativeModules').SecurityCheckChallengeHandlerRN;
var WLCLientRN = require('NativeModules').WLCLientRN;
var Main = require('./Main');
var BlogEntries = require('./BlogEntries');
var BlogEntry = require('./BlogEntry');
var LoginScreen = require('./LoginScreen');

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
            case "LoginScreen":
              return <LoginScreen title={route.title} navigator={navigator} {...route.passProps}/>
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
