import Datasets from "../../../components/home/datasets/Datasets";
import Navigation from "../../../components/ui/Navigation";
import useAuth from "../../../components/util/use-auth";
import SideNav from "../../../components/ui/SideNav";

const DatasetsPage = () => {
  const auth = useAuth();
  const role = auth.getRole();

  return (
    <Navigation>
      <div style={{ width: "100%", display: "inline-flex" }}>
        {(role === "user" || role === "admin") && <SideNav />}
        <Datasets />
      </div>
    </Navigation>
  );
};

export default DatasetsPage;
