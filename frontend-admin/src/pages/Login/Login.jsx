import {
  Form,
  Link,
  redirect,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "../../globalStyles/formStyles.module.css";

const API_BASE_URL = "https://blog-backend-tf6n.onrender.com";

export async function Action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const loginData = {
    username,
    password,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) return { ...data, isError: true };
    localStorage.setItem("Authorization", data.token);
    return { data };
  } catch (error) {
    return { error: error.message };
  }
}

export default function Login() {
  const data = useActionData();
  const navigation = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();
  const search = location.search;
  console.log("search", search);
  let redirectPath = "";
  if (search) {
    const [path, pathnameSearch] = search.split("&");
    const pathname = path.split("?").at(-1).split("=").at(-1);
    redirectPath = pathnameSearch ? `${pathname}?${pathnameSearch}` : pathname;
  }

  if (data && !data.isError)
    redirectPath ? navigate(redirectPath) : navigate("/dashboard");
  return (
    <div className={styles["login-container"]}>
      <section className={styles["login"]}>
        <div
          className={`${styles["form-container"]} ${styles["large-form-container"]}`}
        >
          <div className={styles["header"]}>
            <h2 className={styles["title"]}>Log In</h2>
          </div>
          <p className={styles["form-instruction"]}>
            Fill all the fields with <span>*</span>
          </p>
          {data ? (
            <div className={styles["error"]}>
              {Array.isArray(data.error) ? (
                <p className={styles["error-text"]}>{data.error[0].msg}</p>
              ) : data.isError ? (
                <p className={styles["error-text"]}>
                  {data.message || data.error}
                </p>
              ) : (
                " "
              )}
            </div>
          ) : (
            ""
          )}
          <Form method="post" replace>
            <div className={styles["form-content"]}>
              <Input
                label={"Username"}
                name={"username"}
                id={"username"}
                placeholder={"Enter username"}
              />
              <Input
                label={"Password"}
                name={"password"}
                minLength={8}
                type={"password"}
                id={"password"}
                placeholder={"********"}
              />
              <Link
                to={"/auth/forgot-password"}
                state={{ redirectPath: search }}
              >
                Forgot Password?
              </Link>
            </div>
            <div className={styles["footer"]}>
              <Button
                label={"Log In"}
                type="submit"
                variant={"primary"}
                disabled={navigation.state == "submitting"}
                //   className={styles["submit-button"]}
              />
            </div>
            <div className={styles["auth-link"]}>
              <p>Don't have an account?</p>
              <Link to={"/auth/signup"} state={{ redirectPath: search }}>
                Sign Up
              </Link>
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
}
