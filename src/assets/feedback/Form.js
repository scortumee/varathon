import React, { PureComponent } from 'react';
import './form.css';
import axios from 'axios';
import ReactGA from 'react-ga';
import check from './check.svg';

function getdeviceinfo(){

  var module = {
       options: [],
       header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
       dataos: [
           { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
           { name: 'Windows', value: 'Win', version: 'NT' },
           { name: 'iPhone', value: 'iPhone', version: 'OS' },
           { name: 'iPad', value: 'iPad', version: 'OS' },
           { name: 'Kindle', value: 'Silk', version: 'Silk' },
           { name: 'Android', value: 'Android', version: 'Android' },
           { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
           { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
           { name: 'Macintosh', value: 'Mac', version: 'OS X' },
           { name: 'Linux', value: 'Linux', version: 'rv' },
           { name: 'Palm', value: 'Palm', version: 'PalmOS' }
       ],
       databrowser: [
           { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
           { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
           { name: 'Safari', value: 'Safari', version: 'Version' },
           { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
           { name: 'Opera', value: 'Opera', version: 'Opera' },
           { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
           { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
       ],
       init: function () {
           var agent = this.header.join(' '),
               os = this.matchItem(agent, this.dataos),
               browser = this.matchItem(agent, this.databrowser);

           return { os: os, browser: browser };
       },
       matchItem: function (string, data) {
           var i = 0,
               j = 0,
               //html = '',
               regex,
               regexv,
               match,
               matches,
               version;

           for (i = 0; i < data.length; i += 1) {
               regex = new RegExp(data[i].value, 'i');
               match = regex.test(string);
               if (match) {
                   regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                   matches = string.match(regexv);
                   version = '';
                   if (matches) { if (matches[1]) { matches = matches[1]; } }
                   if (matches) {
                       matches = matches.split(/[._]+/);
                       for (j = 0; j < matches.length; j += 1) {
                           if (j === 0) {
                               version += matches[j] + '.';
                           } else {
                               version += matches[j];
                           }
                       }
                   } else {
                       version = '0';
                   }
                   return {
                       name: data[i].name,
                       version: parseFloat(version)
                   };
               }
           }
           return { name: 'unknown', version: 0 };
       }
   };

   var e = module.init(),
       debug = '';

   debug += 'OS name : ' + e.os.name +'<br/>';
   debug += 'OS version : ' + e.os.version+'<br/>' ;
   debug += 'Browser name : ' + e.browser.name+'<br/>';
   debug += 'Browser version : ' + e.browser.version+'<br/>';
   debug += 'Navigator userAgent : ' + navigator.userAgent + '<br/>';
   debug += 'Navigator appVersion : ' + navigator.appVersion + '<br/>';
   debug += 'Navigator platform : ' + navigator.platform + '<br/>';
   debug += 'Navigator vendor : ' + navigator.vendor+'<br/>';
   debug+= 'Device resolution : '+ window.screen.availWidth+' * '+window.screen.availHeight;
   console.log(debug);
   return debug;

}

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  email:'',
                  trackId:'',
                data1: null};

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleChangeEmail(event){
      this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    //event.preventDefault();
    console.log(this.state.email);
    console.log(this.state.value);
    ReactGA.initialize('UA-124784036-01');
    ReactGA.ga((tracker) => {
      //this.setState({trackId: tracker.get('clientId')});
      //console.log( tracker.get('clientId'));
      //console.log(this.state.trackId);
      axios.get('https://us-central1-varathon-a9121.cloudfunctions.net/feedback?deviceinfo='+getdeviceinfo()+'&feedback='+this.state.value.replace(/\n/g,"%0A")+'&clientId='+tracker.get('clientId')+'&email='+this.state.email)
           .then(({ data }) => {
             console.log(data);
             this.setState({data1:data})
           })


    });
      event.preventDefault();

  }

  render() {
    //getdeviceinfo()
    return (
      <div>
      {
        this.state.data1==="message sent" ? <div className="wrap">
                                            <h3> Thank you for your feedback</h3>
                                            <img src={check} className="resize" alt="check" />
                                            </div>:<form className ="text-wrap"onSubmit={this.handleSubmit}>
            <textarea type="text" placeholder="How can we improve our product" className="size" value={this.state.value} onChange={this.handleChange} />
            <textarea type="text" placeholder="Email address (Optional)" className="email" value={this.state.email} onChange={this.handleChangeEmail} />
          <input className="submit-style" type="submit" value="Submit" />
        </form>
      }
      </div>
    );
  }
}


export default Form;
