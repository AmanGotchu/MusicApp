import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { Header, Icon, ListItem, List } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import 'react-native-vector-icons';

let isHidden = true;
const homeChoices = [
    {
        title: 'User Settings',
        icon: 'cog',
        type: 'entypo',
        PressAction: () => Actions.UserInfo()
    },
    {
        title: '2',
        icon: 'mail',
        PressAction: () => console.log(2)
    },
    {
        title: '3',
        icon: 'mail',
        PressAction: () => console.log(3)
    },
    {
        title: '4',
        icon: 'mail',
        PressAction: () => console.log(3)
    },
];

class Home extends Component {
    state = { bounceValue: new Animated.Value(-100) }

    toggleSubview() {    
        let toValue = -100;

        if (isHidden) {
            toValue = 147;
        }
        
        Animated.spring(
        this.state.bounceValue,
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
                { transform: [{ translateY: this.state.bounceValue }] }]}
            >
                <List containerStyle={styles.ListContainer}>
                    {
                        homeChoices.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon, color: 'white', type: item.type }}
                                onPress={item.PressAction}
                                underlayColor='rgba(0, 0, 0, .0)'
                                wrapperStyle={{ paddingLeft: 5 }}
                                titleStyle={{ color: 'white' }}
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

export default Home;
