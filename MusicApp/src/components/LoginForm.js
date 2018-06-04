import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button } from './common';

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
      <ImageBackground style={styles.BackgroundStyle}>
        <Card>
            <Text style={styles.LoginHeader}> Account Login </Text>
          <Card>
              <CardSection>
              <Input
              label="Email"
              placeholder="Email@email.com"
              />
            </CardSection>

            <CardSection>
              <Input
              label="Password"
              placeholder="password"
              />
            </CardSection>

            <CardSection>
              <Button
                onPress={this.moveViews}
              >
                Login
              </Button>
            </CardSection>
          </Card>
          <View style={{ flexDirection: 'row', alignContents: 'center', paddingLeft: 5 }}> 
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
    paddingLeft: 15
  },
  TextStyles: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5
  },
  LoginHeader: {
    fontSize: 22,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5
  }
};

export default LoginForm;
