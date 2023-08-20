import React, { Component } from 'react';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/Facerecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg'
import Rank from './components/Rank/Rank';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false

    }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }



  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })

    const PAT = 'e39790bf861a456a902dfa28a3ea2ff5';
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };



    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch(error => console.log('error', error));

  }
  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState({isSignedIn: false})
    }
    else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  render() {
    return (
      <div className="App">
        <ParticlesBg className='particles' type="cobweb" color='' bg={true} interactivity='true' in={true} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' 
        ? <div>
          <Logo />
          <Rank />
          <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
        </div>
        :(
          this.state.route ==='signin'
          ?<SignIn onRouteChange={this.onRouteChange}/>
          :<Register onRouteChange={this.onRouteChange}/>
          
        )
        }
      </div>
    );
  }
}
export default App;
