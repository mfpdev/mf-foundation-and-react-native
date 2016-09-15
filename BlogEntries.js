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