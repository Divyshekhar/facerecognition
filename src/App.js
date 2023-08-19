import React, { Component } from 'react';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg'
import Rank from './components/Rank/Rank';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',

    }
  }
  onInputChange = (event) => {
    console.log(event);
  }
  onButtonSubmit = () => {
    console.log("click");
  }
  render() {
    return (
      <div className="App">
        <ParticlesBg className='particles' type="cobweb" color='' bg={true} interactivity='true' in={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} />
        {/* <FaceRecognition />  */}
      </div>
    );
  }
}
export default App;
