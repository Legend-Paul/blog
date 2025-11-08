import {
  Form,
  Link,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
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

  const redirectPath = formData.get("redirectPath");
  const author = formData.get("author");

  const forgotPasswordData = {
    username,
    password,
    confirmPassword,
  };

  try {
    const response = await fetch(
      `http://localhost:5000/${author}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forgotPasswordData),
      }
    );

    const data = await response.json();

    if (!response.ok) return { ...data, isError: true };

    return { ...data, redirectPath, author };
  } catch (error) {
    return { error: error.message };
  }
}

export default function ForgotPassword() {
  const data = useActionData();
  const navigation = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();
  const { author } = useParams();

  let redirectPath = location.state?.redirectPath || "";

  useEffect(() => {
    if (data && !data.isError) {
      const finalRedirectPath = data.redirectPath || "";
      navigate(`/${data.author}/auth/login${finalRedirectPath}`);
    }
  }, [data, navigate]);

  return (
    <div className={styles["forgot-password-container"]}>
      <section className={styles["forgot-password"]}>
        <div
          className={`${styles["form-container"]} ${styles["large-form-container"]}`}
        >
          <div className={styles["header"]}>
            <h2 className={styles["title"]}>Forgot Password</h2>
          </div>
          <p className={styles["form-instruction"]}>
            Fill all the fields with <span>*</span>
          </p>
          {data ? (
            <div className={styles["error"]}>
              {data.error ? (
                <p className={styles["error-text"]}>{data.error[0].msg}</p>
              ) : data.isError ? (
                <p className={styles["error-text"]}>{data.message}</p>
              ) : (
                " "
              )}
            </div>
          ) : (
            ""
          )}
          <Form method="post" replace>
            <div className={styles["form-content"]}>
              <input type="hidden" name="redirectPath" value={redirectPath} />
              <input type="hidden" name="author" value={author} />
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
                label={"Update Password"}
                type="submit"
                variant={"primary"}
                disabled={navigation.state == "submitting"}
                className={styles["submit-button"]}
              />
            </div>
            <div className={styles["auth-link"]}>
              <p>Remember Password?</p>
              <Link to={`/${author}/auth/login${redirectPath}`}>Log In</Link>
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
}
