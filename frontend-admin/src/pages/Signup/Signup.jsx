import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import styles from "./Signup.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import formStyles from "../../globalStyles/formStyles.module.css";

export async function Action({ request }) {
  const formData = await request.formData();
  const fullName = formData.get("fullName");
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const role = formData.get("role");
  const signupData = {
    fullName,
    username,
    password,
    confirmPassword,
    role,
  };

  try {
    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    const data = await response.json();

    if (!response.ok) return { ...data, isError: true };
    localStorage.removeItem("Authorization");
    return redirect("/auth/login");
  } catch (error) {
    return { error: error.message };
  }
}

export default function Signup() {
  const data = useActionData();
  const navigation = useNavigation();

  return (
    <div className={formStyles["signup-container"]}>
      <section className={formStyles["signup"]}>
        <div
          className={`${formStyles["form-container"]} ${formStyles["large-form-container"]}`}
        >
          <div className={formStyles["header"]}>
            <h2 className={formStyles["title"]}>Sign Up </h2>
          </div>
          <p className={formStyles["form-instruction"]}>
            Fill all the fields with <span>*</span>
          </p>
          {data ? (
            <div className={formStyles["error"]}>
              {Array.isArray(data.error) ? (
                <p className={formStyles["error-text"]}>{data.error[0].msg}</p>
              ) : data.isError ? (
                <p className={formStyles["error-text"]}>
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
            <div className={formStyles["form-content"]}>
              <input type="hidden" name="role" value={"AUTHOR"} />
              <Input
                label={"Fullname"}
                name={"fullName"}
                id={"fullName"}
                placeholder={"Paul Maina"}
                pattern="[A-Za-z ]*"
                title="Only letters are allowed"
              />
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
            <div className={formStyles["footer"]}>
              <Button
                label={"Sign Up"}
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
