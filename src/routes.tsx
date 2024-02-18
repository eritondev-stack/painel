import {
  HashRouter,
  useRoutes,
} from "react-router-dom";
//import Fabric from "./components/Home/fabric";
import 'material-icons/iconfont/material-icons.css';
import Painel from "./components/Painel";
import PainelRealDash from "./components/PainelRealDash";
const Routes = () => {


 return useRoutes([
  { path: '/', element: <PainelRealDash />},
 ])}


 const AppWrapper = () => {
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  );
};

export default AppWrapper;
