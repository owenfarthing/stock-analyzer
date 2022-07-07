import "bootstrap/dist/css/bootstrap.min.css";
import MainNav from "./MainNav";
import Authenticate from "../auth/Authenticate";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const Navigation = (props) => {
  const isAuthOpen = useSelector((state) => state.role.isAuthOpen);

  return (
    <>
      {isAuthOpen && <Authenticate />}
      <MainNav />
      {props.children}
      <Footer />
    </>
  );
};

export default Navigation;
