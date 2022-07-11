import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../components/ui/Navigation";
import useAuth from "../components/util/use-auth";
import SideNav from "../components/ui/SideNav";

export default function Home() {
  const auth = useAuth();
  const role = auth.getRole();

  return (
    <>
      <Navigation>
        {(role === "user" || role === "admin") && <SideNav />}
      </Navigation>
    </>
  );
}
