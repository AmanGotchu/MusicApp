import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input } from './common';

class LoginForm extends Component {

   onPressRegister() {
     // filler for forgot password 
   }

   onPressForgot() {

   }

   moveViews() {
    Actions.Spotify();
  }

  render() {
    return (
      <ImageBackground source={require('../Images/LoginBack.jpeg' )} style={styles.BackgroundStyle}>
        <Card style={styles.CardStyle}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.LoginHeader}> Login </Text>
          </View>
            <View style={styles.InputContainer}>
              <CardSection style={styles.InputStyling}>
                <Input 
                label="Email"
                placeholder="Email@email.com"
                />
              </CardSection>
            </View>

            <View style={styles.InputContainer}>
              <CardSection style={styles.InputStyling}>
                <Input
                secureTextEntry
                label="Password"
                placeholder="password"
                />
              </CardSection>
            </View>

            <View style={styles.ButtonContainer}>
              <TouchableOpacity 
                style={styles.ButtonStyling}
                onPress={this.moveViews}
              >
                <Text style={styles.ButtonText}> Login </Text>
              </TouchableOpacity>
            </View>

          <View style={{ flexDirection: 'row', alignContent: 'center', paddingLeft: 5 }}> 
            <TouchableOpacity onPress={this.onPressRegister()}>
              <Text style={styles.TextStyles}>
                  Register
              </Text>
            </TouchableOpacity>
            <Text style={styles.TextStyles}>-</Text>
            <TouchableOpacity onPress={this.onPressForgot()}>
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
    fontSize: 22,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    color: 'white'
  },
  InputStyling: {
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderRadius: 5,
    paddingRight: 5,
    paddingLeft: 5,
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
  InputContainer: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10
  },
  ButtonStyling: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0caf24',
    backgroundColor: '#0caf24',
    marginLeft: 10,
    marginRight: 10,
  },
  ButtonContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#2c2c2d',
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
    backgroundColor: '#2c2c2d',
    borderColor: '#2c2c2d',
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

export default LoginForm;
