import React from 'react';
import Popup from "reactjs-popup";
import './Modal.css';





const modal=(props)=>{
      let details=props.detail;
      if (details!=null){
        //console.log(details["1"]);
        //console.log(Object.values(details));
        let cardinfo= Object.values(details);
        //console.log(Object.keys(details));
        /*for (let i=0;i<details.length;i++){
          console.log(details[i]);
        }*/


        return (
          <Popup trigger= {props.input} modal>
          {
            close => (
                     <div className="modal">
                     <a className="close" onClick={close}>&times;</a>

                     <div className="header"> {cardinfo[6]} </div>
                     <div className="content">
                     <div className="column">
                        <img src ={props.cardimage}/>
                     </div>

                     <tr>
                     <td className="properties">Set Name</td>
                     <td className="value">{cardinfo[8]}</td>
                     </tr>
                     <tr>
                     <td className="properties">Rarity</td>
                     <td className="value">{cardinfo[7]}</td>
                     </tr>
                     <tr>
                     <td className="properties">Type</td>
                     <td className="value">{cardinfo[3]}</td>
                     </tr>

                     {
                         Object.keys(cardinfo[2]).map((key) =>
                         <tr>
                         <td className="properties">{key}</td>
                         <td className="value" key={ key }>{cardinfo[2][key]}</td>
                         </tr>
                       )
                     }


                     </div>
                     </div>
          )}
        </Popup>
        );

      }
    return props.input;

};

export default modal;
