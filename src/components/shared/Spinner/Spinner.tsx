import * as React from "react";
import "./Spinner.scss";

interface SpinnerProps {
  show: boolean;
  center: boolean;
}
const Spinner: React.SFC<SpinnerProps> = props => {
  return (
    <div className={props.center ? "spinner centered" : "spinner"}>
      <div className="loader">
        <div className="part">
          <div className="part">
            <div className="part">
              <div className="part">
                <div className="part" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
