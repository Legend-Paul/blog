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
import checkAuth from "../../utils/checkAuth";

const API_BASE_URL = "https://blog-backend-tf6n.onrender.com";

export async function Action({ request }) {
  const formData = await request.formData();
  const fullName = formData.get("fullName");
  const username = formData.get("username");
  const password = formData.get("password");
  const userData = { fullName, username, password };
  const token = localStorage.getItem("Authorization");

  try {
    const response = await fetch(`${API_BASE_URL}/auth/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) return { ...data, isError: true };
    return redirect("/dashboard");
  } catch (error) {
    return { error: error.message };
  }
}

export default function UpdateUser() {
  checkAuth();
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
                id={"password"}
                type="password"
                placeholder={"********"}
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
