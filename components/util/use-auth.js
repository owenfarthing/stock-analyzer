import { useSelector } from "react-redux";

const useAuth = () => {
  const { isAuthenticated, isUser, isAdmin } = useSelector(
    (state) => state.role.privileges
  );

  const getRole = () => {
    if (isAuthenticated && isUser && !isAdmin) return "user";
    if (isAuthenticated && !isUser && isAdmin) return "admin";
    return "none";
  };

  return {
    getRole,
  };
};

export default useAuth;
