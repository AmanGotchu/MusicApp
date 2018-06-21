import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card } from './common';
import { 
  emailChanged, 
  passwordChanged, 
  passwordChanged2, 
  registerUser,
  passwordNonMatch } from './actions';

  const BackgroundIMG = require('../Images/background-2.jpg');
  const ButtonBack = require('../Images/Green-Gradient.png');

class Registration extends Component {

   onPressRegister() {
    Actions.Register();
   }

  onRegisterButtonPress() {
    if (this.props.password2 !== this.props.password) {
      this.props.passwordNonMatch();
    } else {
      this.props.registerUser(this.props.email, this.props.password);
    }
  }

  onEmailChanged(text) {
    this.props.emailChanged(text);
  }

  onPasswordChanged(text) {
    this.props.passwordChanged(text);
  }

  onPasswordChanged2(text) {
    this.props.passwordChanged2(text);
  }

  renderError() { 
    if (this.props.error) {
      return (
        <View style={{ paddingBottom: 10, paddingRight: 10, paddingLeft: 10 }}>
            <View style={styles.ErrorContainer}>
              <Text> {this.props.error} </Text>
            </View>
          </View>
      );
    }

    return <View />;
  }

  render() {
    return (
      <ImageBackground source={BackgroundIMG} style={styles.BackgroundStyle}>
        <Card style={styles.CardStyle}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.LoginHeader}> Registeration </Text>
          </View>

            <View style={styles.InputContainer}>
              <View style={styles.InputStyling}>
                <TextInput 
                style={{ flex: 1, fontSize: 18 }}
                label="Email"
                placeholder="Email"
                onChangeText={this.onEmailChanged.bind(this)}
                value={this.props.email}
                placeholderTextColor='#C0C0C0'
                color='#C0C0C0'
                />
              </View>
            </View>

            <View style={styles.InputContainer}>
              <View style={styles.InputStyling}>
                <TextInput
                style={{ flex: 1, fontSize: 18 }}
                label="Password"
                secureTextEntry
                placeholder="Password"
                onChangeText={this.onPasswordChanged.bind(this)}
                value={this.props.password}
                placeholderTextColor='#C0C0C0'
                colro='#C0C0C0'
                />
              </View>
            </View>

            <View style={styles.InputContainer}>
              <View style={styles.InputStyling}>
                <TextInput
                style={{ flex: 1, fontSize: 18 }}
                Style={styles.InputTextStyle}
                secureTextEntry
                placeholder="Confirm Password"
                onChangeText={this.onPasswordChanged2.bind(this)}
                value={this.props.password2}
                placeholderTextColor='#C0C0C0'
                color='#C0C0C0'
                />
              </View>
            </View>

            <View style={styles.ButtonContainer}>
              <TouchableOpacity 
                style={styles.ButtonStyling}
                onPress={this.onRegisterButtonPress.bind(this)}
              >
                <ImageBackground 
                  source={ButtonBack} 
                  style={{}}
                  borderRadius={10}
                >
                  <Text style={styles.ButtonText}>Register</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

          {this.renderError()}

        </Card>
      </ImageBackground>
    );
  }
}

const styles = {
  RegisterStyle: {
    flexDirection: 'row',
    alignContent: 'center', 
    paddingLeft: 5, 
    justifyContent: 'center', 
    paddingTop: 50
  },
  ErrorContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignContent: 'center',
    borderColor: 'orange',
    borderRadius: 3,
    borderWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: 'orange'
  },
  BackgroundStyle: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'center',
    paddingRight: 15,
    paddingLeft: 15,
  },
  TextStyles: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    color: '#C0C0C0'
  },
  LoginHeader: {
    fontFamily: 'Thonburi',
    fontWeight: 'bold',
    fontSize: 42,
    paddingTop: 20,
    paddingBottom: 30,
    color: 'white'
  },
  InputStyling: {
    borderBottomWidth: 1,
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, .0)',
    borderColor: 'grey',
    flexDirection: 'row',
  },
  InputContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 40,
  },
  ButtonStyling: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    marginLeft: 5,
    marginRight: 5
  },
  ButtonContainer: {
    paddingTop: 10,
    alignSelf: 'center',
    paddingLeft: 1,
    paddingRight: 1,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'white',
  },
  ButtonText: {
      alignSelf: 'center',
      fontSize: 18,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10,
      color: 'white'
  },
  CardStyle: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderColor: 'rgba(52, 52, 52, 0)',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  }
};

const mapStateToProps = state => {
  return {
    password: state.auth.password,
    password2: state.auth.password2,
    email: state.auth.email,
    error: state.auth.error,
    loading: state.auth.loading,
    registerUser: state.auth.RegistrationStatus
  };
};

export default connect(mapStateToProps, { 
  emailChanged, 
  passwordChanged,
  passwordChanged2,
  registerUser,
  passwordNonMatch })(Registration);
