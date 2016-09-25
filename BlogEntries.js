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
var BlogEntry = require('./BlogEntry');

var {
    Component,
    BackAndroid
} = React

var {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    NavigatorIOS,
    ListView,
    Image
} = ReactNative;

var styles = StyleSheet.create({
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    } 
});

class BlogEntries extends Component {

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            { rowHasChanged: (r1, r2) => r1.title !== r2.title });
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.entries)
        };
    }

    rowPressed(propertyTitle) {
        var property = this.props.entries.filter(prop => prop.title === propertyTitle)[0];

        this.props.navigator.push({
            title: propertyTitle.CDATA,
            component: BlogEntry,
            passProps: { property: property }
        });
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData.title) }
                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <View  style={styles.textContainer}>
                            <Text style={styles.name}>{rowData.author.name}</Text>
                            <Text style={styles.title}
                                numberOfLines={1}>{rowData.title.CDATA}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this) }/>
        );
    }

}

module.exports = BlogEntries;