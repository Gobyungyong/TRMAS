import { Navigate } from "react-router-dom";
import routes from "../routes";

export function RouterForLoginUser({ children }) {
  const user = sessionStorage.getItem(
    "firebase:authUser:AIzaSyCqjAufHdf9tdpUagxXjjKPB2sV9nVbGW8:[DEFAULT]"
  );

  if (!user) {
    alert("로그인 후 이용 가능한 서비스입니다.");
    return <Navigate to={routes.adminLogin} replace />;
  }

  return children;
}

export function RouterForNotLoginUser({ children }) {
  const user = sessionStorage.getItem(
    "firebase:authUser:AIzaSyCqjAufHdf9tdpUagxXjjKPB2sV9nVbGW8:[DEFAULT]"
  );

  if (user) {
    return <Navigate to={routes.projectAdmin} replace />;
  }

  return children;
}
