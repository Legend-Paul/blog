import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import styles from "./UpdateUser.module.css";
import formStyles from "../../globalStyles/formStyles.module.css";
import Button from "../../components/Button/Button";

export async function Action({ request }) {
  const formData = await request.formData();
  const fullName = formData.get("fullName");
  const username = formData.get("username");
  const userData = { fullName, username };

  try {
    const response = await fetch("http://localhost:5000/auth/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5NDExOTU0LTU3MjAtNDQwOC1iM2I3LTRjZTg2YjU1M2RhYSIsImZ1bGxOYW1lIjoiUGF1bCBNYWluYSIsInVzZXJuYW1lIjoibGVnZW5kIiwicm9sZSI6IkFVVEhPUiIsImNyZWF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsInVwZGF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsImlhdCI6MTc2MTc2MTY5NCwiZXhwIjoxNzY0MzUzNjk0fQ.KFXzG0_HJYNgWfNfQ4M4kIdV-bdK6Mh4T4GEZvJBxs8`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.status == 400) return data;
    return redirect("/dashboard");
  } catch (error) {
    return { error: error.message };
  }
}

export default function UpdateUser() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();

  const handleCancleUpdate = () => {
    navigate(-1);
  };
  return (
    <div className={styles["update-user-container"]}>
      <Header />
      <section className={styles["update-user"]}>
        <div className={formStyles["form-container"]}>
          <div className={formStyles["header"]}>
            <h2 className={formStyles["title"]}>Update </h2>
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
            </div>
            <div className={formStyles["footer"]}>
              <Button
                type="button"
                variant={"danger"}
                label={"Cancel"}
                onClick={handleCancleUpdate}
                disabled={navigation.state == "submitting"}
              />

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
