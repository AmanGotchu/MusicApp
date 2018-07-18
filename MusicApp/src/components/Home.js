import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { Header, Icon, ListItem, List } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import 'react-native-vector-icons';
import { setHubId } from './actions';

const bounceValue = new Animated.Value(-100);
let isHidden = true;

class Home extends Component {
    componentWillMount() {
        const id = 'LqqarxhRAPhVF9CQcnSRtGzhSKS2';//firebase.auth().currentUser.uid;
        // firebase.database().ref(`/users/${id}/accountInfo`).once('value')
        // .then((snapshot) => this.props.setHubId(snapshot.val().hostingHubId));
        this.props.setHubId('-LHQdr_wLAVV9GfV_3gB');
    }

    getHubDirection() {
        if (this.props.hubId) {
            Actions.ManageHub();
        } else {
            Actions.CreateHub();
        }
    }

    homeChoices = [
        {
            title: 'User Settings',
            icon: 'cog',
            type: 'entypo',
            PressAction: () => Actions.UserInfo()
        },
        {
            title: 'Manage Your Hub',
            icon: 'add',
            type: 'MaterialIcons',
            PressAction: () => this.getHubDirection()
        },
        {
            title: 'Current Hub',
            icon: 'sound',
            type: 'foundation',
            iconPaddingLeft: 9,
            textPaddingLeft: 4,
            PressAction: () => Actions.CurrentHub()
        },
        {
            title: 'Map',
            icon: 'x',
            type: 'foundation',
            iconPaddingLeft: 9,
            textPaddingLeft: 4,
            PressAction: () => Actions.Map()
        }
    ];

    toggleSubview() {
        let toValue = -100;

        if (isHidden) {
            toValue = 147;
        }
        
        Animated.spring(
        bounceValue,
        {
            toValue,
            velocity: 3,
            tension: 2,
            friction: 8,
        }
        ).start();
        
        isHidden = !isHidden;
    }

    renderCog() {
        return (
            <Icon
                containerStyle={{ paddingTop: 17 }}
                onPress={() => console.log('settings')}
                name="cog"
                type="entypo"
                color="white"
                underlayColor='rgba(0, 0, 0, .0)'
            />
        );
    }

    renderDrop() {
        return (
            <Icon 
                containerStyle={{ paddingTop: 17 }}
                onPress={() => this.toggleSubview()}
                name="menu"
                color="white"
                underlayColor='rgba(0, 0, 0, .0)'
            />
        );
    }

    render() {
        return (
            <View>
            <Animated.View
                style={[styles.subView,
                { transform: [{ translateY: bounceValue }] }]}
            >
                <List containerStyle={styles.ListContainer}>
                    {
                        this.homeChoices.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon, color: 'white', type: item.type }}
                                onPress={item.PressAction}
                                underlayColor='rgba(0, 0, 0, .0)'
                                wrapperStyle={{ paddingLeft: item.iconPaddingLeft || 5 }}
                                titleStyle={{ color: 'white', paddingLeft: item.textPaddingLeft }}
                            />
                        ))
                    }
                </List>
            </Animated.View>
            <Header
                backgroundColor='green'
                leftComponent={this.renderDrop()}
                centerComponent={{ text: 'HOME', style: { color: '#fff', fontSize: 18 } }}
                rightComponent={this.renderCog()}
            />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        hubId: state.hubManage.hubId
    };
};

export default connect(mapStateToProps, {
    setHubId })(Home);

const styles = {
    subView: {
        position: 'absolute',
        top: -80,
        left: 0,
        right: 0,
        backgroundColor: '#C0C0C0',
    },
    ListContainer: {
        marginTop: 0,
        backgroundColor: 'green',
    }
};

