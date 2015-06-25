import {React, Reflux, reactMixin} from './init';

import Upload from './components/upload';
import Result from './components/result';
import Options from './components/options';
import Previews from './components/previews';
import Save from './components/save';
import themeStore from './stores/theme';

@reactMixin.decorate(Reflux.connect(themeStore))
export default class Main extends React.Component { 
  render() {   
    const {props, state} = this;    
    return (      
      <div>
        <nav className="section-header">
           <div className="nav-wrapper">
             <a href="#" className="brand-logo">Lower Contrast</a>
           </div>
         </nav>             

         <If condition={ !state.showOptions }>
           <section className="section-upload">         
            <Upload />
          </section>
        </If>

         <If condition={ state.showOptions }>
          <section className="section-options">
            <Options />
          </section>         
        </If>

         <If condition={ state.showOptions }>          
            <section className="section-previews">
              <Previews colors={state.colors} />
            </section>          
        </If>

        <If condition={ state.showOptions }>          
          <Save />
        </If>
      </div>
    );
  }
}