//import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';

//ReactGA.initialize('UA-124784036-1',{debug: true});
const Tracker =(props)=>{
  console.log('tracker works');
/*  ReactGA.event({
    category: 'Product clicked set number',
    action: props.name
  });*/
  const tagManagerArgs = {
        gtmId: 'GTM-M84WTCP',
        events: {
            productId: props.id,
            productName: props.name
        }
    }

    TagManager.initialize(tagManagerArgs);

  return (null);
}


export default Tracker
