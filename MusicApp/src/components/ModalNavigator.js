import Modal from 'react-native-modal';
import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { Icon, ListItem, List } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import 'react-native-vector-icons';
import { setHubId } from './actions';
import {
    Color1,
    Color2,
    Color3,
    Color4,
    Color5
} from './common/Colors';

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
];

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
        <Modal
          style={styles.modalStyle}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          isVisible={this.props.isOpen}
          swipeThreshold={50}
          onSwipe={() => { this.setState({ isVisible: false }); this.props.onSomeChildPress(); }}
          swipeDirection="left"
          onBackdropPress={() => { this.setState({ isVisible: false }); this.props.onSomeChildPress(); }}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View>
                <Icon
                    name='social-soundcloud'
                    type='simple-line-icon'
                    color={Color3}
                    containerStyle={styles.iconStyles}
                    underlayColor='rgba(0, 0, 0, .0)'
                    size={100}
                />
            </View>
            <View>
                <List containerStyle={styles.ListContainer}>
                    {
                        this.homeChoices.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                hideChevron
                                leftIcon={{ name: item.icon, color: Color1, type: item.type }}
                                onPress={() => { this.setState({ isVisible: false }); this.props.onSomeChildPress(); item.PressAction(); }}
                                underlayColor='rgba(0, 0, 0, .0)'
                                wrapperStyle={{ paddingLeft: item.iconPaddingLeft || 5 }}
                                titleStyle={{ color: Color1, paddingLeft: item.textPaddingLeft }}
                                containerStyle={{ borderBottomColor: i === 3 ? 'rgba(0, 0, 0, .0)' : Color1,
                                borderBottomWidth: 2 }}
                            />
                        ))
                    }
                </List>
            </View>
        </View>
        </Modal>
    );
  }
}


const mapStateToProps = state => {
    return {
        hubId: state.hubManage.hubId
    };
};

const styles = {
    ListContainer: {
        marginTop: 0,
        backgroundColor: Color5,
        borderColor: Color5
    },
    modalStyle: {
        backgroundColor: Color5,
        marginRight: 150
    }
};


export default connect(mapStateToProps, {
    setHubId })(ModalNavigator);
