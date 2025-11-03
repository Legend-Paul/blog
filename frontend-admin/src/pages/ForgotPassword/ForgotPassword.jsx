import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import formStyles from "../../globalStyles/formStyles.module.css";

export async function Action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const forrgotPasswordData = {
    username,
    password,
    confirmPassword,
  };

  try {
    const response = await fetch("http://localhost:5000/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forrgotPasswordData),
    });

    const data = await response.json();
    console.log(data);
    console.log(response);
    if (!response.ok) return { ...data, isError: true };

    return redirect("/auth/login");
  } catch (error) {
    return { error: error.message };
  }
}

export default function ForgotPassword() {
  const data = useActionData();
  const navigation = useNavigation();

  return (
    <div className={formStyles["forrgot-password-container"]}>
      <section className={formStyles["forrgot-password"]}>
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
