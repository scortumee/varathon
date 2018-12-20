import React, { PureComponent } from 'react';
import Latestpacks from './Latestpacks';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '').replace('__',':_').replace('  ',': ').split(".")[1]] = r(item); });
  return images;
}

class Entry extends PureComponent{
  render(){
    const imagesBooster = importAll(require.context('../../assets/productImages/Booster', false, /\.(png|jpe?g|svg)$/));
    const imagesStarter=importAll(require.context('../../assets/productImages/Starter', false, /\.(png|jpe?g|svg)$/));
    const imagesStructure=importAll(require.context('../../assets/productImages/Structure', false, /\.(png|jpe?g|svg)$/));
    //console.log(images);
    const img={
                'Booster Pack': imagesBooster,
                'Structure Deck':imagesStructure,
                'Starter Deck':imagesStarter
              }
    const packlist=Object.keys(img).map((key)=>
    <Latestpacks pack={key} key={key} imglist={img[key]}/>
  );
    return(
      <div>
      {packlist}
      </div>
    );
  }
}

export default Entry;
