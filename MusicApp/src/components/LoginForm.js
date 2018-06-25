import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from './common';
import { emailChanged, passwordChanged, loginUser } from './actions';

const BackgroundIMG = require('../Images/background-2.jpg');
const ButtonBack = require('../Images/Green-Gradient.png');

class LoginForm extends Component {

  onLoginButtonPress() {
    this.props.loginUser(this.props.email, this.props.password);
  }

  onEmailChanged(text) {
    this.props.emailChanged(text);
  }

  onPasswordChanged(text) {
    this.props.passwordChanged(text);
  }

  renderText() { 
    if (this.props.error) {
      return (
          <Text style={styles.ButtonText}> INVALID - TRY AGAIN </Text>
      );
    }

    return (<Text style={styles.ButtonText}> LOG IN </Text>);
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
              name="email-outline" 
              type="material-community"
              size={20} 
              color="#C0C0C0"
              style={{ paddingLeft: 5 }} 
              />
              <TextInput
              style={{ flex: 1, fontSize: 18, paddingLeft: 10 }} 
              label="Email"
              placeholder="Email"
              placeholderTextColor="#C0C0C0"
              onChangeText={this.onEmailChanged.bind(this)}
              value={this.props.email}
              color='#C0C0C0'
              />
            </CardSection>
          </View>

          <View style={styles.InputContainer}>
            <CardSection style={styles.InputStyling}>
              <Icon 
              name="lock" 
              type="feather"
              size={20} 
              color="#C0C0C0" 
              style={{ paddingLeft: 5 }}
              />
              <TextInput
              style={{ flex: 1, fontSize: 18, paddingLeft: 10 }} 
              secureTextEntry
              label="Password"
              placeholder="Password"
              placeholderTextColor="#C0C0C0"
              onChangeText={this.onPasswordChanged.bind(this)}
              value={this.props.password}
              color="#C0C0C0"
              />
            </CardSection>
          </View>

          <View style={styles.ButtonContainer}>
              <TouchableOpacity 
                style={styles.ButtonStyling}
                onPress={this.onLoginButtonPress.bind(this)}
              >
                <ImageBackground 
                  source={ButtonBack} 
                  style={{}}
                  borderRadius={10}
                >
                  {this.renderText()}
                </ImageBackground>
              </TouchableOpacity>
          </View>

          <View style={styles.RegisterStyle}> 
            <TouchableOpacity onPress={() => Actions.Register()}>
              <Text style={styles.TextStyles}>
                  Register
              </Text>
            </TouchableOpacity>
            <Text style={styles.TextStyles}>-</Text>
            <TouchableOpacity onPress={() => Actions.ForgotPassword()}>
              <Text style={styles.TextStyles}>
                  Forgot Password
              </Text>
            </TouchableOpacity>
          </View>

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
    email: state.auth.email,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, { 
  emailChanged, 
  passwordChanged,
  loginUser })(LoginForm);
