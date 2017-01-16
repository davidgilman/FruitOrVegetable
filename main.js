import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Exponent from 'exponent';
import Clarifai from 'clarifai';

export default class App extends React.Component {
  state = {
    image: null,
    message: ''
  }
  constructor()) {
  // instantiate a new Clarifai app passing in your clientId and clientSecret
  var app = new Clarifai.App(
    'xxx',
    'xxx'
  );

  // predict the contents of an image by passing in a url
  app.models.predict(Clarifai.GENERAL_MODEL, 'http://cdn2.thr.com/sites/default/files/imagecache/scale_crop_768_433/2016/05/fruit_ninja.jpg').then(
    function(response) {
      console.log(response);
    },
    function(err) {
      console.error(err);
    }
  );
}

  render() {
    let { image } = this.state;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={this._pickImage}>
          <View>
            <Text>Pick an image from camera roll</Text>
          </View>
        </TouchableOpacity>

        {image &&
          <Image source={{uri: image}} style={{width: 200, height: 200}} /> }
      </View>
    );
  }

  _pickImage = async () => {
    let result = await Exponent.ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  }
}


Exponent.registerRootComponent(App);
