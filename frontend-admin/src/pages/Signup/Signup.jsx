import { Form, useLoaderData, useNavigation } from "react-router-dom";
import styles from "./Signup.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import formStyles from "../../globalStyles/formStyles.module.css";

export default function Signup() {
  const data = useLoaderData();
  const navigation = useNavigation();

  return (
    <div className="signup-container">
      <section className="signup">
        <div className={formStyles["form-container"]}>
          <div className={formStyles["header"]}>
            <h2 className={formStyles["title"]}>Signup </h2>
          </div>
          <p className={formStyles["form-instruction"]}>
            Fill all the fields with <span>*</span>
          </p>
          {data ? (
            <div className={formStyles["error"]}>
              <p className={formStyles["error-text"]}>{data.message}</p>
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
                label={"Passord"}
                name={"passord"}
                minLength={8}
                type={"password"}
                id={"passord"}
                placeholder={"********"}
              />
              <Input
                label={"confirmPassword"}
                name={"confirmPassword"}
                id={"confirmPassword"}
                type={"password"}
                minLength={8}
                placeholder={"********"}
              />
            </div>
            <div className={formStyles["footer"]}>
              <Button
                label={"Update"}
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
