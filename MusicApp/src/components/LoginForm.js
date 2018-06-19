import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from './common';
import { emailChanged, passwordChanged, loginUser } from './actions';

const BackgroundIMG = require('../Images/Gradient-Phone-05.png');

class LoginForm extends Component {

   onPressRegister() {
    Actions.Register();
   }

   onPressForgot() {
    Actions.ForgotPassword();
   }

  onLoginButtonPress() {
    this.props.loginUser(this.props.email, this.props.password);
  }

  onEmailChanged(text) {
    this.props.emailChanged(text);
  }

  onPasswordChanged(text) {
    this.props.passwordChanged(text);
  }

  renderError() { 
    if (this.props.error) {
      return (
        <View style={{ paddingBottom: 10, paddingRight: 10, paddingLeft: 10 }}>
            <View style={styles.ErrorContainer}>
              <Text> INVALID LOGIN </Text>
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
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 50 }}>
            <Text style={styles.LoginHeader}> Music App </Text>
          </View>

          <View style={styles.InputContainer}>
            <CardSection style={styles.InputStyling}>
              <Icon 
              name="email" 
              size={20} 
              color="white"
              style={{ paddingRight: 10, paddingLeft: 5 }} 
              />
              <TextInput
              style={{ flex: 1, fontSize: 15 }} 
              label="Email"
              placeholder="Email"
              placeholderTextColor="#f2f3f4"
              onChangeText={this.onEmailChanged.bind(this)}
              value={this.props.email}
              color='white'
              />
            </CardSection>
          </View>

          <View style={styles.InputContainer}>
            <CardSection style={styles.InputStyling}>
              <Icon 
              name="lock" 
              size={20} 
              color="white" 
              style={{ paddingRight: 10, paddingLeft: 5 }}
              />
              <TextInput
              style={{ flex: 1, fontSize: 15 }} 
              secureTextEntry
              label="Password"
              placeholder="Password"
              placeholderTextColor="white"
              onChangeText={this.onPasswordChanged.bind(this)}
              value={this.props.password}
              color='white'
              />
            </CardSection>
          </View>

          <View style={styles.ButtonContainer}>
            <TouchableOpacity 
              style={styles.ButtonStyling}
              onPress={this.onLoginButtonPress.bind(this)}
            >
              <Text style={styles.ButtonText}> Login </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.RegisterStyle}> 
            <TouchableOpacity onPress={this.onPressRegister.bind(this)}>
              <Text style={styles.TextStyles}>
                  Register
              </Text>
            </TouchableOpacity>
            <Text style={styles.TextStyles}>-</Text>
            <TouchableOpacity onPress={this.onPressForgot.bind(this)}>
              <Text style={styles.TextStyles}>
                  Forgot Password
              </Text>
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
    color: '#b5b6b7'
  },
  LoginHeader: {
    fontFamily: 'Thonburi',
    fontWeight: 'bold',
    fontSize: 42,
    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 5,
    color: 'white'
  },
  InputStyling: {
    borderBottomWidth: 1,
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, .3)',
    borderColor: 'rgba(52, 52, 52, .5)',
    flexDirection: 'row'
  },
  InputContainer: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 40
  },
  ButtonStyling: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    marginLeft: 10,
    marginRight: 10,
  },
  ButtonContainer: {
    paddingTop: 10,
    alignSelf: 'center',
    width: 300,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'white',
  },
  ButtonText: {
      alignSelf: 'center',
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10
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
    email: state.auth.email,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, { 
  emailChanged, 
  passwordChanged,
  loginUser })(LoginForm);
