import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import styles from "./Login.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import formStyles from "../../globalStyles/formStyles.module.css";

export default function Login() {
  const data = useActionData();
  const navigation = useNavigation();

  return (
    <div className={formStyles["signup-container"]}>
      <section className={formStyles["signup"]}>
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
              ) : (
                <p className={formStyles["error-text"]}>{data.message}</p>
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
