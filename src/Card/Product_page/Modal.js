import React, { PureComponent } from 'react';
import Popup from "reactjs-popup";
import './Modal.css';
import Ebaytable from './Ebaytable';

class Modal extends PureComponent{

  render (){
    const details=this.props.detail;
    if (details!=null && details['card details']!=null){

      const isarrayRare=Array.isArray(details['rarity']);
      const isarrayType=Array.isArray(details['card type']);

      return (
        <Popup trigger= {this.props.input} modal>
        {
          close => (
                   <div className="modal">
                   <a className="close" onClick={close}>&times;</a>

                   <div className="header"> {details['name']} </div>

                   <div className="content">
                   <div className="column">
                      <img src ={this.props.cardimage}/>
                   </div>
                   <table className="tabledetails">
                   <tbody>
                   <tr>
                   <td className="properties">Set Name</td>
                   <td className="value" key="set number">{details['set number']}</td>
                   </tr>
                   <tr>
                   <td className="properties">Rarity</td>
                   <td className="value" key="rarity">{
                     isarrayRare?(<ul>
                      {details['rarity'].map((item,index) =>
                          <li key={index}>{item}</li>
                      )}
                      </ul>): details['rarity']
                   }</td>
                   </tr>
                   <tr>
                   <td className="properties">Type</td>
                   <td className="value" key="card type">{
                     isarrayType?(<ul>
                      {details['card type'].map((item,index) =>
                          <li key={index}>{item}</li>
                      )}
                      </ul>): details['card type']
                   }</td>
                   </tr>

                   {
                       Object.keys(details['card details']).map((key) =>
                       <tr>
                       <td className="properties">{key}</td>
                       <td className="value" key={ key }>{
                         key==='archetypes'?(<ul>
                          {details['card details'][key].map((item,index) =>
                              <li key={index}>{item}</li>
                          )}
                          </ul>): details['card details'][key]

                         }</td>
                       </tr>
                     )
                   }
                   </tbody>
                   </table>
                   <Ebaytable keyword={details['set number']}/>


                   </div>
                   </div>
        )}
      </Popup>
      );

    }
  return this.props.input;

  }
}

export default Modal;
