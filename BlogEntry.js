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

var React = require('react');
var ReactNative = require('react-native');
var SearchResults = require('./BlogEntries');

var {
    Component
} = React

var {
    StyleSheet,
    Text,
    View,
    WebView
} = ReactNative

var styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});

class BlogEntry extends Component {
 
  render() {
    var property = this.props.property;

    return (<WebView
          source={{uri: property.link.href}}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          scalesPageToFit={true}
      />
    );
  }
}

module.exports = BlogEntry;