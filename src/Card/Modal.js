import React from 'react';
import Popup from "reactjs-popup";
import './Modal.css';





const modal = (props) => {
      const details=props.detail;
      if (details!=null && details['card details']!=null){
        //console.log(details["1"]);
        //console.log(Object.values(details));
        //const cardinfo= Object.values(details);
        //console.log(Object.keys(details));
        /*for (let i=0;i<details.length;i++){
          console.log(details[i]);
        }*/
        const isarrayRare=Array.isArray(details['rarity']);
        const isarrayType=Array.isArray(details['card type']);

        /*if (cardinfo[2]!=null){
          if (cardinfo[2].hasOwnProperty("archetypes")){
            const isarrayArch=Array.isArray(cardinfo[2]['archetypes']);
          }
        }*/

        return (
          <Popup trigger= {props.input} modal>
          {
            close => (
                     <div className="modal">
                     <a className="close" onClick={close}>&times;</a>

                     <div className="header"> {details['name']} </div>
                     <div className="column">
                        <img src ={props.cardimage}/>
                     </div>
                     <div className="content">


                     <table>
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
                     </div>



                     </div>
          )}
        </Popup>
        );

      }
    return props.input;

};

export default modal;
