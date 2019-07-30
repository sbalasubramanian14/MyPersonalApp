import React from "react";
import { fire, firebase } from "./../../config/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Particles from "react-particles-js";

import "./App.scss";
import Layout from "../Layout";
import Spinner from "../../components/shared/Spinner";

export interface IAppProps {}

export interface IAppState {
  isSignedIn: boolean;
  userProfile: firebase.User | null;
  isLoading: boolean;
}
export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isLoading: true,
      isSignedIn: false,
      userProfile: null
    };
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  };

  componentDidMount = () => {
    fire.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user,
        userProfile: fire.auth().currentUser
      });
    });
    this.demoAsyncCall().then(() => this.setState({ isLoading: false }));
  };

  demoAsyncCall = () => {
    return new Promise(resolve => setTimeout(() => resolve(), 1500));
  };

  public render() {
    if (this.state.isLoading) {
      return <Spinner show={true} center={true} />;
    }
    return (
      <div className="app">
        <Particles
          className="background"
          params={{
            particles: {
              number: {
                value: 150,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              size: {
                value: 3
              }
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "grab"
                },
                onclick: {
                  enable: true,
                  mode: "grab"
                }
              }
            }
          }}
        />
        {this.state.isSignedIn && this.state.userProfile ? (
          <Layout />
        ) : (
          <div className="d-flex h-100 align-items-center justify-content-center">
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={fire.auth()}
              uiCallback={ui => ui.disableAutoSignIn()}
            />
          </div>
        )}
      </div>
    );
  }
}
