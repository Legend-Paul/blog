import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import styles from "./Login.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import formStyles from "../../globalStyles/formStyles.module.css";

export async function Action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const loginData = {
    username,
    password,
  };

  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) return { ...data, isError: true };
    localStorage.setItem("Authorization", data.token);
    return redirect("/dashboard");
  } catch (error) {
    return { error: error.message };
  }
}

export default function Login() {
  const data = useActionData();
  const navigation = useNavigation();
  console.log(localStorage.getItem("Authorization"));

  return (
    <div className={formStyles["login-container"]}>
      <section className={formStyles["login"]}>
        <div
          className={`${formStyles["form-container"]} ${formStyles["large-form-container"]}`}
        >
          <div className={formStyles["header"]}>
            <h2 className={formStyles["title"]}>Log In</h2>
          </div>
          <p className={formStyles["form-instruction"]}>
            Fill all the fields with <span>*</span>
          </p>
          {data ? (
            <div className={formStyles["error"]}>
              {data.error ? (
                <p className={formStyles["error-text"]}>{data.error[0].msg}</p>
              ) : data.isError ? (
                <p className={formStyles["error-text"]}>{data.message}</p>
              ) : (
                " "
              )}
            </div>
          ) : (
            ""
          )}
          <Form method="post" replace>
            <div className={formStyles["form-content"]}>
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
              <Link to={"/auth/forgot-password"}>Forgot Password?</Link>
            </div>
            <div className={formStyles["footer"]}>
              <Button
                label={"Log In"}
                type="submit"
                variant={"primary"}
                disabled={navigation.state == "submitting"}
                //   className={styles["submit-button"]}
              />
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
}
