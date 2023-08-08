import { ChangeEvent, useState } from "react";
import { Form, Input, DatePicker, message } from "antd";

import PasswordStrength from "@/components/ui/password-strength/PasswordStrength";

import Icon from "../ui/Icon";
import MainButton from "../ui/button/MainButton";
import styles from "./LoginForm.module.scss";

const birthDateConfig = {
  rules: [
    {
      type: "object" as const,
      required: true,
      message: "Please select your birth date!",
    },
  ],
};

const emailConfig = {
  rules: [{ required: true, message: "Please enter your email!" }],
};

const passwordConfig = {
  rules: [{ required: true, message: "Please enter your Password!" }],
};

const rePasswordConfig = {
  rules: [{ required: true, message: "Please enter your re password!" }],
};

const LoginForm = ({
  isLogin,
  onSubmitForm,
  loading,
}: {
  isLogin: boolean;
  onSubmitForm: (payload: LoginSignUpPayload) => void;
  loading: boolean;
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [password, setPassword] = useState<string>(null);

  const formSubmitHandler = (payload: LoginSignUpPayload) => {
    if (!isLogin && payload.password !== payload.rePassword) {
      messageApi.open({
        type: "error",
        content: "Password and repassword are not the same!",
      });
      return;
    }
    onSubmitForm(payload);
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setPassword(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={formSubmitHandler}
      >
        <Form.Item name="email" {...emailConfig}>
          <Input
            type="email"
            prefix={<Icon icon="user" />}
            placeholder="email"
          />
        </Form.Item>

        <Form.Item name="password" {...passwordConfig}>
          <Input.Password
            onChange={passwordChangeHandler}
            prefix={<Icon icon="lock" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        {!isLogin && (
          <>
            <Form.Item name="rePassword" {...rePasswordConfig}>
              <Input.Password
                prefix={<Icon icon="lock" />}
                type="password"
                placeholder="RePassword"
              />
            </Form.Item>
            {password && password.length > 3 && (
              <PasswordStrength password={password} />
            )}
            <Form.Item name="birthDate" label="BirthDate" {...birthDateConfig}>
              <DatePicker />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <MainButton
            type="primary"
            buttonType="submit"
            className={`${styles.button} ${loading ? "overlay-loading" : ""}`}
          >
            {isLogin ? "Login" : "Sign Up"}
          </MainButton>
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
};

export default LoginForm;
