
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
var BlogEntries = require('./BlogEntries');
var LoginScreen = require('./LoginScreen');

var WLResourceRequestRN = require('NativeModules').WLResourceRequestRN;
var SecurityCheckChallengeHandlerRN = require('NativeModules').SecurityCheckChallengeHandlerRN;
var WLClientRN = require('NativeModules').WLClientRN;


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
    Platform,
    NativeEventEmitter,
    NativeModules
} = ReactNative

var styles = StyleSheet.create({
    title: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    error: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'red'
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
    image: {
        width: 150,
        height: 159
    }
});


const challengeEventModule = new NativeEventEmitter(NativeModules.SecurityCheckChallengeHandlerEventEmitter);

class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            message: ''
        };   
        this.registerChallengeHandler();
    }

    componentDidMount() {
         this.addChallengeListener();
    }

    registerChallengeHandler() {
        WLClientRN.registerChallengeHandler("UserLogin");
    }    

    render() {
        var spinner = this.state.isLoading ?
            (<ActivityIndicator
                size='large'/>) :
            (<View/>);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    ReactNative And MobileFirst Foundation
                </Text>
                <Text>{"\n\n\n"}</Text>
                <TouchableHighlight
                    onPress={this.getMFBlogEnriesAsCallback.bind(this) }
                    style={styles.button}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>View MF Blog (Callback)</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={this.getMFBlogEnriesAsPromise.bind(this) }
                    style={styles.button}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>View MF Blog (Promise)</Text>
                </TouchableHighlight>
                <Text>{"\n"}</Text>
                {spinner}
                <Text>{"\n"}</Text>
                <Text style={styles.error}>{this.state.message}</Text>
                <Image source={require('./Resources/foundation.png') } style={styles.image}/>
            </View>
        );
    }
 
    isLoginOnTop() {
        return this.props.navigator.navigationContext.currentRoute.component.name === "LoginScreen";
    }
    
    addChallengeListener() {
        var that = this;       
        const challengeEventModuleSubscription  = challengeEventModule.addListener(
            'handleChallenge', function (challenge) {
                if (challenge.securityCheck === "UserLogin" && !that.isLoginOnTop()) {
                    var a = that.props.navigator.push({
                        title: 'Login',
                        component: LoginScreen,
                        passProps: {}
                    });
                } else if (that.isLoginOnTop()){
                    alert("Wrong Credentials");
                }
            }
        );
    }    

    async getMFBlogEnriesAsPromise() {
        SecurityCheckChallengeHandlerRN.cancel("UserLogin");
        var error = "";
        this.setState({ isLoading: true, message: '' });
        try {
            var result
            result = await WLResourceRequestRN.asyncRequestWithURL("/adapters/MFBlogAdaptger/getFeed", WLResourceRequestRN.GET);
            this.handleResponse(JSON.parse(result))
        } catch (e) {
            error = e;
        }
        this.setState({ isLoading: false, message: error ? "Failed to retrieve blog entries - " + error.message : ""});
    }

    getMFBlogEnriesAsCallback() {
        SecurityCheckChallengeHandlerRN.cancel("UserLogin");
        var that = this;
        this.setState({ isLoading: true, message: '' });
        WLResourceRequestRN.requestWithURL("/adapters/MFBlogAdaptger/getFeed", WLResourceRequestRN.GET,
            (error) => {
                that.props.navigator.popToTop();
                that.setState({ isLoading: false, message: error.message });
            },
            (result) => {
                that.handleResponse(JSON.parse(result))
                that.setState({ isLoading: false, message: "" });
            });
    }

    handleResponse(response) {
        this.setState({ isLoading: false, message: '' });
        var beComponent = {
            title: 'MF And ReactNative Demo',
            component: BlogEntries,
            passProps: { entries: response.feed.entry }
        };

        if (this.isLoginOnTop()) {
            this.props.navigator.replace(beComponent);
        } else {
            this.props.navigator.push(beComponent);
        }
        
    }
}

module.exports = Main;
