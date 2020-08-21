import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {useHistory} from "react-router-dom";
import Main from "./component/Main";
import New from "./component/New";
import post from "./component/post";
import "./App.css";
import "./index.css";

function App(){
  let history = useHistory();
  return(
   <Router history={history}>
     <div>
       <Switch>
         <Route path='/' exact component={Main} />
         <Route path='/New/:key' component={New}/>  `                        m                                             , jn bj`
       </Switch>
     </div>
   </Router>
  );
}
export default App;