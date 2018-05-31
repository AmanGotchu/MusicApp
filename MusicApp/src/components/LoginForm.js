import React, {Component} from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Card, CardSection, Input, Button } from './common';
import { Actions } from 'react-native-router-flux';

class LoginForm extends Component {

   moveViews() {
     Actions.Spotify();
   }

  render(){
    return(

    <ImageBackground style={{flex: 1, flexDirection: 'column'}}>

      <Card>
        <CardSection style={{borderRadius: 30}}>
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

        <Button>
          Register
        </Button>
        </CardSection>


      </Card>

    </ImageBackground>


    );
  }
}

export default LoginForm;
