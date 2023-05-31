import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import React from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const initialState = {
  input: '',
  IMAGE_URL: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    first_name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.user_id,
        first_name: data.first_name,
        email: data.email,
        entries: data.entries,
        joined: data.joined

      }
    })
  }  

  // calculateFaceLocation = (data) => {
  //   const clarifaiFace = data.regions[0].region_info.bounding_box;
  //   const image = document.getElementById('inputimage');
  //   const width = Number(image.width);
  //   const height = Number(image.height);
  //   return {
  //     leftCol: clarifaiFace.left_col * width,
  //     topRow: clarifaiFace.top_row * height,
  //     rightCol: width - (clarifaiFace.right_col * width),
  //     bottomRow: height - (clarifaiFace.bottom_row * height)
  //   }
  // }

  calculateFaceLocations = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return data.regions.map(region => {
        const clarifaiFace = region.region_info.bounding_box;
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    });
}


  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes  });
}


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    this.setState({IMAGE_URL: this.state.input});
      fetch('http://localhost:3000/imagedata', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        console.log(response.data);
        this.displayFaceBox(this.calculateFaceLocations(response.data))
      })
      .catch(err => console.log(err));
  }




  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  

  render() {
    const { isSignedIn, IMAGE_URL, route, boxes } = this.state;
    return (
      <div className="App">
        <ParticlesBg num={50} type="cobweb" bg={true} />
        <Navigation 
        isSignedIn={isSignedIn} 
        onRouteChange={this.onRouteChange} />
        {route === 'home' ?
          <div>
            <Logo />
            <Rank 
            first_name={this.state.user.first_name} 
            entries={this.state.user.entries} />
            <ImageLinkForm 
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit} />
            <FaceRecognition boxes={boxes} img={IMAGE_URL} />
          </div>
          : (route === 'signin') ? 
          <Signin 
          loadUser={this.loadUser} 
          onRouteChange={this.onRouteChange} />
          :
            <Register 
            loadUser={this.loadUser} 
            onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}

export default App;
