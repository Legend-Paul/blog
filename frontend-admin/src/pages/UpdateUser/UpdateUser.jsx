import { Form } from "react-router-dom";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import styles from "./UpdateUser.module.css";
import Button from "../../components/Button/Button";

export default function UpdateUser() {
  return (
    <div className={styles["update-user-container"]}>
      <Header />
      <section className={styles["update-user"]}>
        <div className={styles["form-container"]}>
          <div className={styles["header"]}>
            <h2 className={styles["title"]}>Update </h2>
          </div>
          <p className={styles["form-instruction"]}>
            Fill all the fields with <span>*</span>
          </p>
          <Form method="post" replace>
            <div className={styles["form-content"]}>
              <Input label={"Fullname"} placeholder={"Paul Maina"} />
              <Input label={"Username"} placeholder={"Enter username"} />
            </div>
            <div className={styles["footer"]}>
              <Button
                type="button"
                variant={"danger"}
                label={"Cancel"}
                //   disabled={state == "submitting"}
              />

              <Button
                label={"Update User"}
                type="submit"
                variant={"primary"}
                //   disabled={state == "submitting"}
                //   className={styles["submit-button"]}
              />
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
}
