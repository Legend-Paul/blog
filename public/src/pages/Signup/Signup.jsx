import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "../../globalStyles/formStyles.module.css";

export async function Action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const author = formData.get("author");
  const redirectPath = formData.get("redirectPath");
  console.log(author);
  const signupData = {
    username,
    password,
    confirmPassword,
  };
  try {
    const response = await fetch(
      `https://blog-backend-tf6n.onrender.com/${author}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      }
    );

    const data = await response.json();

    if (!response.ok) return { ...data, isError: true };
    localStorage.removeItem("Authorization");
    return { ...data, redirectPath };
  } catch (error) {
    return { error: error.message };
  }
}

export default function Signup() {
  const data = useActionData();
  const { author } = useParams();
  const navigation = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(author);
  let redirectPath = location.state?.redirectPath || "";

  useEffect(() => {
    if (data && !data.isError) {
      const finalRedirectPath = data.redirectPath || "";
      navigate(`/${author}/auth/login${finalRedirectPath}`);
    }
  }, [data, navigate]);

  return (
    <div className={styles["signup-container"]}>
      <section className={styles["signup"]}>
        <div
          className={`${styles["form-container"]} ${styles["large-form-container"]}`}
        >
          <div className={styles["header"]}>
            <h2 className={styles["title"]}>Sign Up </h2>
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
              <input type="hidden" name="author" value={author} />
              <input type="hidden" name="redirectPath" value={redirectPath} />
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
              <Input
                label={"ConfirmPassword"}
                name={"confirmPassword"}
                id={"confirmPassword"}
                type={"password"}
                minLength={8}
                placeholder={"********"}
              />
            </div>
            <div className={styles["footer"]}>
              <Button
                label={"Sign Up"}
                type="submit"
                variant={"primary"}
                disabled={navigation.state == "submitting"}
                //   className={styles["submit-button"]}
              />
            </div>
            <div className={styles["auth-link"]}>
              <p>Already have an account?</p>
              <Link to={`/${author}/auth/login${redirectPath}`}>Log In</Link>
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
}
