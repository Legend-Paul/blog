import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Signout() {
  const navigate = useNavigate();
  const { author } = useParams();
  console.log(localStorage.getItem("Authorization"));

  localStorage.removeItem("Authorization");
  console.log(localStorage.getItem("Authorization"));
  useEffect(() => {
    navigate(`/${author}/auth/login`);
  }, []);
}
