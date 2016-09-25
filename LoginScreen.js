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

"use strict";

var ReactNative = require("react-native");
var React = require("react");
var SecurityCheckChallengeHandlerRN = require('NativeModules').SecurityCheckChallengeHandlerRN;

var {
    Component
} = React

var {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} = ReactNative;

var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: "stretch"
    },
    error: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'red'
    },
    title: {
        fontSize: 18,
        marginBottom: 10
    },
    formInput: {
        height: 36,
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
        flex: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#48BBEC",
        borderRadius: 8,
        color: "#656565"
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
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
});

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: ""
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TextInput
                        autoFocus={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Username"
                        onChange={(event) => this.setState({ username: event.nativeEvent.text }) }
                        style={styles.formInput}
                        value={this.state.username}/>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        onChange={(event) => this.setState({ password: event.nativeEvent.text }) }
                        style={styles.formInput}
                        value={this.state.password}/>
                    <TouchableHighlight onPress={(this.onSubmitPressed.bind(this)) } style={styles.button}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>
                    <Text style={styles.error}>{this.props.message}</Text>
                </View>
            </View>
        );
    }

    onSubmitPressed() {
        SecurityCheckChallengeHandlerRN.submitChallengeAnswer({ 'username': this.state.username.trim(), 'password': this.state.password.trim() }, "UserLogin");
    }
};

module.exports = LoginScreen;