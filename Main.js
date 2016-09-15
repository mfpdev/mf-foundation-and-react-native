
var React = require('react');
var ReactNative = require('react-native');
var BlogEntries = require('./BlogEntries');
var WLResourceRequestRN = require('NativeModules').WLResourceRequestRN;

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
    Image,
    Platform
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
                    <Text style={styles.buttonText}>MF Blog (Callbacks)</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={this.getMFBlogEnriesAsync.bind(this) }
                    style={styles.button}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>MF Blog (Promises) </Text>
                </TouchableHighlight>
                <Text>{"\n"}{"\n"}{"\n"}</Text>
                {spinner}
                <Text>{"\n"}{"\n"}{"\n"}</Text>

                <Image source={require('./Resources/foundation.png') } style={styles.image}/>
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }

    async getMFBlogEnriesAsync() {
        var error = "";
        this.setState({ isLoading: true, message: '' });
        try {
            var result
            if (Platform.OS === 'ios') {
                result = await WLResourceRequestRN.asyncRequestWithURL("/adapters/MFBlogAdaptger/getFeed", "GET", 1.0);
            } else {
                result = await WLResourceRequestRN.asyncRequestWithURL("/adapters/MFBlogAdaptger/getFeed", "GET");
            }
            this.handleResponse(JSON.parse(result))
        } catch (e) {
            error = e;
        }
        this.setState({ isLoading: false, message: error });
    }

    getMFBlogEnries() {
        this.setState({ isLoading: true, message: '' });
        if (Platform.OS === 'ios') {
            WLResourceRequestRN.requestWithURL("/adapters/MFBlogAdaptger/getFeed", "GET", (error, result) => {
                if (!error) {
                    this.handleResponse(JSON.parse(result))
                }
                this.setState({ isLoading: false, message: error != null ? error : "" });
            })
        } else {
            WLResourceRequestRN.requestWithURL("/adapters/MFBlogAdaptger/getFeed", "GET", 1.0, (error, result) => {
                if (!error) {
                    this.handleResponse(JSON.parse(result))
                }
                this.setState({ isLoading: false, message: error != null ? error : "" });
            })
        }
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
