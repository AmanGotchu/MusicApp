import firebase from 'firebase';
import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Header, Icon, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { firstNameChange, lastNameChange, discardChanges } from './actions';
import { DeleteOverlay } from './common/DeleteOverlay';

class UserInfo extends Component {

    componentWillMount() {
        const id = firebase.auth().currentUser.uid;
        firebase.database().ref(`/users/${id}/accountInfo/personalDetails`).once('value')
        .then((snapshot) => this.setFields(snapshot))
        .catch(error => console.log(error));
    }

    setFields(snapshot) {
        this.initFirstName = snapshot.val().firstName;
        this.initLastName = snapshot.val().lastName;
        this.firstTextChange(this.initFirstName);
        this.lastTextChange(this.initLastName);
    }

    setOverlay() {
        if (this.props.firstName !== this.initFirstName 
            || this.props.lastName !== this.initLastName) {
                this.props.discardChanges(true);
            } else {
            Actions.pop();
        }
    }

    saveInfo() {
        const { firstName, lastName } = this.props;
        const id = firebase.auth().currentUser.uid;

        firebase.database().ref(`/users/${id}/accountInfo/personalDetails`)
        .set({ firstName, lastName })
        .then(() => Actions.pop())
        .catch((error) => console.log(error));
    }

    firstTextChange(text) {
        this.props.firstNameChange(text);
    }

    lastTextChange(text) {
        this.props.lastNameChange(text);
    }

    clearOverlay() {
        this.props.discardChanges(false);
    }

    renderBack() {
        return (
            <Icon   
                containerStyle={{ paddingTop: 17 }}
                name='ios-arrow-back'
                onPress={() => this.setOverlay()}
                type='ionicon'
                color='white'
                underlayColor='rgba(0, 0, 0, .0)'
            />
        );
    }

    render() {
        const showDeleteOverlay = 
        (<DeleteOverlay 
            onPressYes={() => {
                this.clearOverlay();
                Actions.pop();
            }}
            onPressNo={() => {
                this.clearOverlay();
            }}
        > 
            Would you like to discard changes? 
        </DeleteOverlay>);

        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftComponent={this.renderBack()}
                    centerComponent={{ text: 'Account Information', style: { color: '#fff', fontSize: 18 } }}
                />
                <View>
                    <FormLabel>First Name</FormLabel>
                    <FormInput 
                        onChangeText={this.firstTextChange.bind(this)}
                        value={this.props.firstName}
                    />
                </View>
                <View>
                    <FormLabel>Last Name</FormLabel>
                    <FormInput 
                        onChangeText={this.lastTextChange.bind(this)}
                        value={this.props.lastName}
                    />
                </View>

                <View style={styles.ButtonContainer}>
                    <TouchableOpacity 
                        style={styles.ButtonSaveStyling}
                        onPress={this.saveInfo.bind(this)}
                    >
                        <Text 
                            style={{ color: 'white', fontSize: 20 }}
                        > Save </Text>
                    </TouchableOpacity>
                </View>

                {this.props.discard ? showDeleteOverlay : null }

            </View>
        );
    }
}

const styles = {
    ButtonContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .0)',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 3,
        alignSelf: 'center',
        flex: 1,
        paddingBottom: 30
    },
    ButtonSaveStyling: {
        padding: 10,
        borderWidth: 1,
        backgroundColor: 'green',
        marginLeft: 5,
        marginRight: 5
    },
    discardContainer: {
        position: 'absolute',
        top: 60,
        left: 30,
        right: 30,
        bottom: 60,
        flex: 1,
        backgroundColor: 'white',
        alignSelf: 'stretch',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 3,
        justifyContent: 'center',
        alignContent: 'center'
    },
    DiscButtonContainer: {
        marginLeft: 20,
        marginRight: 20,
        flex: 1
    }
};

const mapStatetoProps = state => {
    return {
        firstName: state.userInfo.first,
        lastName: state.userInfo.last,
        discard: state.userInfo.discard
    };
};

export default connect(mapStatetoProps, {
    firstNameChange,
    lastNameChange,
    discardChanges })(UserInfo);
