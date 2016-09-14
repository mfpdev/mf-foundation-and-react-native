
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
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{ html: property.content.CDATA, baseUrl: "/" }}
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