import * as React from "react";

import { fire } from "./../../config/firebase";

export interface Props {
  children?: React.ReactNode;
}

export interface State {}

export default class Layout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            fire.auth().signOut();
            console.log(fire.auth().currentUser);
          }}
        >
          sign out
        </button>
      </div>
    );
  }
}
