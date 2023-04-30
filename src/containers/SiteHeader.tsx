import HeaderLogged from "components/Header/HeaderLogged";
import { useLocation } from "react-router-dom";

const SiteHeader = () => {
  let location = useLocation();

  return  <HeaderLogged />;
};

export default SiteHeader;
