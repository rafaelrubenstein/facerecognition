import React from "react";


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerFirstName: '',
      registerLastName: '',
      registerEmail: '',
      regsiterPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({ registerEmail: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ regsiterPassword: event.target.value });
  }
  onFirstNameChange = (event) => {
    this.setState({ registerFirstName: event.target.value });
  }

  onLastNameChange = (event) => {
    this.setState({ registerLastName: event.target.value });
  }

  onSubmitRegister = () =>{
    fetch("http://localhost:3000/register", {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        first_name: this.state.registerFirstName,
        last_name: this.state.registerLastName,
        email: this.state.registerEmail.toLowerCase(),
        password: this.state.regsiterPassword
      })
    }).then(respone => {
      if(respone.status === 200){
        this.props.loadUser(respone.json());
        this.props.onRouteChange('home');
      }else{
        console.log("error with registration");
      }
    })
    }

  render() {
    return (
      <div className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <div className="pa4 black-80">
          <div className="measure">
            <fieldset id="register" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="first_name">First Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="text" 
                first_name="name" 
                id="first_name" 
                onChange={this.onFirstNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="last_name">Last Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="text" 
                last_name="last_name" 
                id="last_name" 
                onChange={this.onLastNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address" 
                id="email-address" 
                onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password" 
                id="password" 
                onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={this.onSubmitRegister}
              />
            </div>
          </div>
        </div>
      </div>

    );

  }
}

export default Register;