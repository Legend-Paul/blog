import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signout() {
  const navigate = useNavigate();
  console.log(localStorage.getItem("Authorization"));

  localStorage.removeItem("Authorization");
  console.log(localStorage.getItem("Authorization"));
  useEffect(() => {
    navigate("/auth/login");
  }, []);
}
