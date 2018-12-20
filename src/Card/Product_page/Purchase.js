import React from 'react';
import './Table.css';

const Purchase = (props) =>{
  let url='';
  props.listings.forEach(function(card_info){
    //console.log(card_info);
    if(props.lowprice.toString() === card_info['price']){
      //console.log(card_info['url']);
      url=card_info['url'];
    }
  });
  return (
    <div>
    <div className="price">{props.lowprice} $</div>
      <div><button
      className="button" onClick={()=>{
        window.open(url,'_blank');
      }}>Bag</button>
    </div>
    </div>

  );
};


export default Purchase;

/*
<div className="ebaydiv">
<table className="ebaytable">
<tbody>
<tr>
<th className="tablecol">Name</th>
<th className="tablecol">Condition</th>
<th className="tablecol">Price</th>
</tr>
{props.listings.map((item,index) =>
    <tr key={index}>
      <td className="tablecol" key="name">{item['tittle']}</td>
      <td key="condition" className="tablecol">{item['condition']}</td>
      <td key="price" className="tablecol">{item['price']} $</td>
      <td key={index}><button className="tablebutton" onClick={()=>{
        window.open(item['url'],'_blank');
      }}>Buy</button></td>
    </tr>
)}
</tbody>
</table>
</div>
*/
