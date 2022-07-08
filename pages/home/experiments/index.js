import Experiments from "../../../components/home/experiments/Experiments";
import Navigation from "../../../components/ui/Navigation";
import useAuth from "../../../components/util/use-auth";
import SideNav from "../../../components/ui/SideNav";

const ExperimentsPage = () => {
  const auth = useAuth();
  const role = auth.getRole();

  return (
    <Navigation>
      <div style={{ width: "100%", display: "inline-flex" }}>
        {(role === "user" || role === "admin") && <SideNav />}
        <Experiments />
      </div>
    </Navigation>
  );
};

export default ExperimentsPage;
