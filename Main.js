
var React = require('react');
var ReactNative = require('react-native');
var BlogEntries = require('./BlogEntries');
var WLReactNativeAPI = require('NativeModules').WLReactNativeAPI;

var {
    Component
} = React

var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicator,
    Image
} = ReactNative

var styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },

    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    image: {
        width: 150,
        height: 159
    }
});

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'london',
            isLoading: false,
            message: ''
        };
    }

    onSearchTextChanged(event) {
        console.log('onSearchTextChanged');
        this.setState({ searchString: event.nativeEvent.text });
        console.log(this.state.searchString);
    }

    render() {
        var spinner = this.state.isLoading ?
            (<ActivityIndicator
                size='large'/>) :
            (<View/>);
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    ReactNative And MobileFirst Foundation
                </Text>
                 <Text>{"\n"}{"\n"}{"\n"}</Text>
                <TouchableHighlight
                    onPress={this.getMFBlogEnries.bind(this) }
                    style={styles.button}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>MF Blog</Text>
                </TouchableHighlight>
                <Text>{"\n"}{"\n"}{"\n"}</Text>
                {spinner}
                <Text>{"\n"}{"\n"}{"\n"}</Text>
                
                <Image source={require('./Resources/foundation.png') } style={styles.image}/>
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }

    getMFBlogEnries() {
        this.setState({ isLoading: true, message: '' });
        WLReactNativeAPI.requestWithURL("/adapters/MFBlogAdaptger/getFeed", "GET", (error, result) => {
            if (error) {
                 this.setState({ isLoading: false, message: error });
            } else {
                this.handleResponse(JSON.parse(result))
            }
            this.state.isLoading = false
        })
    }

    handleResponse(response) {
        this.setState({ isLoading: false, message: '' });
        this.props.navigator.push({
            title: 'MF And ReactNative Demo',
            component: BlogEntries,
            passProps: { entries: response.feed.entry }
        });
    }
}

module.exports = Main;
