import React, {Component} from 'react';
import {
    Container, Header, Title, Button, Icon, Text, Left,
    Body, Right, Content
} from 'native-base';
import { StatusBar } from 'react-native';

export default class FincasList extends Component {
    componentWillMount() {
        const { listar, page } = this.props;
        listar(page);
    }

    render() {
        const { data, loader, page } = this.props;
        return (
            <Container style={styles.container}>
                <StatusBar translucent={false} />
                <Header
                    noShadow
                    iosBarStyle={"dark-content"}
                    androidStatusBarColor={"#fff"}
                    style={{ borderBottomWidth: 1 }}>
                    <Left style={styles.headerLeft}>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: "#000" }} />
                        </Button>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Title style={styles.textBody}>Home{loader ? ' (Cargando...)' : ''}</Title>
                    </Body>
                    <Right style={styles.headerRight} />
                </Header>
                <Content padder>
                    {
                        (data && data.results) && (
                            data.results.map(item => {
                                <Button block style={styles.btnShowModal}>
                                    <Text>{item.nombre}</Text>
                                </Button>
                            })
                        )
                    }
                </Content>
            </Container>
          );
    }
}
