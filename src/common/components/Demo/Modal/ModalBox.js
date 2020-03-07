import React, { Component } from 'react';
import {
    Container, Header, Title, Button, Icon, Text, Left,
    Body, Right, Content,
    View,
} from 'native-base';
import { StatusBar } from 'react-native';
import styles from './styles';
import {
    BasicModal, TopModal, CenterModal, BottomModal, ScrollModal,
} from './modals';

export default class ModalBox extends Component {
    render() {
        const { data, loader, page } = this.props;
        console.log('DATA:', data);
        return (
            <Container style={styles.container}>
                <StatusBar translucent={false} />
                <Header
                    noShadow
                    iosBarStyle={"dark-content"}
                    androidStatusBarColor={"#fff"}
                    style={{ borderBottomWidth: 1 }}
                >
                    <Left style={styles.headerLeft}>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: "#000" }} />
                        </Button>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Title style={styles.textBody}>Home</Title>
                    </Body>
                    <Right style={styles.headerRight} />
                </Header>
                <Content padder>
                    <View style={styles.container}>
                        <BasicModal />
                        <TopModal />
                        <CenterModal />
                        <BottomModal />
                        <ScrollModal />
                    </View>
                    <Button block style={styles.btnShowModal} onPress={() => this.props.handleOpen("basicModal")}>
                        <Text>Basic Modal</Text>
                    </Button>
                    <Button block style={styles.btnShowModal} onPress={() => this.props.handleOpen("topModal")}>
                        <Text>Position Top</Text>
                    </Button>
                    <Button block style={styles.btnShowModal} onPress={() => this.props.handleOpen("centerModal")}>
                        <Text>Position Center</Text>
                    </Button>
                    <Button block style={styles.btnShowModal} onPress={() => this.props.handleOpen("bottomModal")}>
                        <Text>Position Bottom</Text>
                    </Button>
                    <Button block style={styles.btnShowModal} onPress={() => this.props.handleOpen("scrollModal")}>
                        <Text>Scroll Modal</Text>
                    </Button>
                    { (data && data.results) && (
                        data.results.map(item => {
                            return <Button key={item.id} block style={styles.btnShowModal}>
                                <Text>[{item.id}] {item.nombre}</Text>
                            </Button>
                        })
                    ) }
                </Content>
            </Container>
        );
    }
}