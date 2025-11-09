import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Signout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = location.state;
  const { author } = useParams();
  console.log(localStorage.getItem("Authorization"));

  localStorage.removeItem("Authorization");
  console.log(localStorage.getItem("Authorization"));
  useEffect(() => {
    navigate(`/${author}/auth/login?redirectTo=${`/${author}/blogs/${slug}`}`);
  }, []);
}
