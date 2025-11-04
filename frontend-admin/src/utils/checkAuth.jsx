export default function checkAuth() {
  const token = localStorage.getItem("Authorization");

  if (!token) return (window.location.href = "/auth/login");
}
