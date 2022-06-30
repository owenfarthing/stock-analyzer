import { useRouter } from "next/router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNav from "../components/ui/SideNav";
import MainNav from "../components/ui/MainNav";
import Authenticate from "../components/auth/Authenticate";
import { roleActions } from "../store/role-slice";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuthOpen = useSelector((state) => state.role.isAuthOpen);

  return (
    <>
      <MainNav />
      <SideNav />
      {isAuthOpen && <Authenticate />}
    </>
  );
}
