import React, { PureComponent } from 'react';
import icon from './feedbackicon.png';
import Popup from "reactjs-popup";
import './feedback.css'
import Form from './Form';


const popupStyle={
    width: '50%',
    height: '500px',
}
const fpop={
  width:'400%',
  height:'50%'
}
class Feedback extends PureComponent {


  render(){
    return(
      <div>
        <Popup
        trigger={<div className="wrap">
        <Popup
           trigger={ <img src={icon} className="icon" alt="feedback" width="75" height="50" />}
           on="hover"
           position="right center"
           contentStyle={fpop}
           closeOnDocumentClick
         >
           <span className="style-pop"> How can we improve your experience? </span>
         </Popup>

               </div>}
        contentStyle={popupStyle}
        modal>
            {close => (
              <div className="modal">
                <a className="close" onClick={close}>
                  &times;
                </a>
                <div className="content">
                  <Form />
                </div>
              </div>
            )}
        </Popup>
      </div>




    );


  }
}


export default Feedback;
