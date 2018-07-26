import Modal from 'react-native-modal';
import React, { Component } from 'react';
import { View, Animated, Text } from 'react-native';
import { Header, Icon, ListItem, List, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import 'react-native-vector-icons';
import { setHubId } from './actions';

const bounceValue = new Animated.Value(-100);
let isHidden = true;

class ModalNavigator extends Component {

  constructor(props) {
    super(props);
    this.state = { modalVisible: this.props.parentOption };
  }

componentWillMount() {
    //firebase.auth().currentUser.uid;
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

openModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
}

homeChoices = [
    {
        title: 'User Settings',
        icon: 'cog',
        type: 'entypo',
        PressAction: () => { Actions.UserInfo(); }
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
        PressAction: () => { Actions.CurrentHub(); }
    },
    {
        title: 'Map',
        icon: 'x',
        type: 'foundation',
        iconPaddingLeft: 9,
        textPaddingLeft: 4,
        PressAction: () => { Actions.Map(); }
    }
];

toggleSubview() {
    let toValue = 300;

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

  render() {
    return (
      <View>
        <Modal
          style={{ margin: 30, backgroundColor: 'white' }}
          animationType="fade"
          visible={this.props.isOpen}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >

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
          <Icon
          name='chevron-with-circle-up'
          type='entypo'
          color='#517fa4'
          containerStyle={styles.iconStyles}
          onPress={this.props.onSomeChildPress}
          />
        </Modal>
      </View>
    );
  }
}


const mapStateToProps = state => {
    return {
        hubId: state.hubManage.hubId
    };
};

const styles = {
    subView: {
        position: 'absolute',
        top: 150,
        left: 0,
        right: 0,
        backgroundColor: '#C0C0C0',
    },
    ListContainer: {
        marginTop: 0,
        backgroundColor: 'green',
    }
};


export default connect(mapStateToProps, {
    setHubId })(ModalNavigator);
