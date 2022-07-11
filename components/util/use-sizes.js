import useAuth from "./use-auth";

const useSizes = () => {
  const auth = useAuth();
  const role = auth.getRole();

  const sizes = {
    logoWidth: 200,
    navHeight: 50,
    tabWidth: 110,
    footerHeight: 50,
  };

  const calculateBodyWidth = () => {
    let numTabs = 2;
    if (role === "user") numTabs++;
    if (role === "admin") numTabs += 2;

    return numTabs * sizes.tabWidth;
  };

  return {
    sizes,
    calculateBodyWidth,
  };
};

export default useSizes;
