import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Content, Text, List, ListItem, Container, View, Icon } from 'native-base';
import _ from 'lodash';
import styles from './styles';

const avatarImage = require('../../../../../assets/avatar.png');

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.data = [
            {
                name: 'Home',
                route: 'Home',
                icon: 'home'
            },
            {
                name: 'Modal',
                route: 'Modal',
                icon: 'albums'
            },
            {
                name: 'Logout',
                route: 'Logout',
                icon: 'log-out'
            }
        ];
    }

    navigator(data) {
        if (data.route === 'Logout') {
            this.props.logout();
            this.props.navigation.navigate('Login');
        } else {
            this.props.navigation.navigate(data.route);
        }
    }

    onPress(data) {
        this.navigator(data)
    }

    render() {
        const data = this.data;
        let logoutMenu = _.find(this.data, { route: 'Logout' });
        return (
            <Container style={styles.container}>
                <View style={styles.drawerCover}>
                    <Image source={avatarImage} style={styles.avatar} />
                    <Text style={styles.organizerName}>Demo Account</Text>
                </View>
                <Content bounces={false}>
                    <List
                        dataArray={this.props.data}
                        renderRow={data => {
                            if (data.route === 'Logout') {
                                return null;
                            } else {
                                return <ListItem style={styles.menuItem} onPress={() => this.navigator(data)}>
                                    <Icon
                                        active
                                        name={data.icon}
                                        style={{ color: '#777', fontSize: 26, width: 30 }}
                                    />
                                    <Text style={styles.menuText}>{data.name}</Text>
                                </ListItem>;
                            }
                        }}
                    />
                </Content>
                <TouchableOpacity style={styles.footer} onPress={() => this.navigator(logoutMenu)}>
                    <Icon
                        active
                        name={logoutMenu.icon}
                        style={{ color: '#777', fontSize: 26, width: 30 }}
                    />
                    <Text style={styles.menuText}>{logoutMenu.name}</Text>
                </TouchableOpacity>
            </Container>
        );
    }
}