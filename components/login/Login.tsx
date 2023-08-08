"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { message, Spin } from "antd";

import { useAuthStore } from "@/store/auth-store";
import { useAppStore } from "@/store/app-store";

import LoginForm from "./LoginForm";
import LoginFooter from "./LoginFooter";

import styles from "./Login.module.scss";

const Login = () => {
  const returnUrl = useSearchParams().get("returnUrl");
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [disableKeydown, setDisableKeydown] = useAppStore((state) => [
    state.disableKeyDown,
    state.setDisableKeyDown,
  ]);
  const [token, login, register] = useAuthStore((state) => [
    state.token,
    state.login,
    state.Register,
  ]);

  const [messageApi, contextHolder] = message.useMessage();

  const changeLoginClickHandler = () => {
    setLoading(false);
    setIsLogin((prevState) => {
      return !prevState;
    });
  };

  const submitFormHandler = async (payload: LoginSignUpPayload) => {
    let $status: number, $statusText: string;
    setLoading(true);

    if (isLogin) {
      const { status, statusText } = await login({
        email: payload.email,
        password: payload.password,
      });

      $status = status;
      $statusText = statusText;
    } else {
      const { status, statusText } = await register({
        email: payload.email,
        password: payload.password,
        birthDate: new Date(payload.birthDate.$d).getTime(),
      });

      $status = status;
      $statusText = statusText;
    }
    setLoading(false);

    const type = $status === 201 ? "success" : "error";
    messageApi.open({
      type,
      content: $statusText,
    });
    if ($status === 201) {
      setTimeout(() => {
        redirect(returnUrl);
      }, 1500);
    }
  };

  const redirect = (returnUrl: string | undefined) => {
    setDisableKeydown(false);
    if (returnUrl) {
      router.push(returnUrl);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (!disableKeydown) setDisableKeydown(true);

    if (token) {
      redirect(undefined);
    }
  }, []);

  return (
    <>
      {!token ? (
        <>
          <h2 className={styles.title}>
            Music Player {isLogin ? "Login" : "Register"}
          </h2>
          <span className={styles.text}>
            Hey, Enter your details to get {isLogin ? "sign in" : "sign up"} to
            your account
          </span>

          <LoginForm
            isLogin={isLogin}
            onSubmitForm={submitFormHandler}
            loading={loading}
          />

          <LoginFooter
            isLogin={isLogin}
            onChangeLogin={changeLoginClickHandler}
          />
        </>
      ) : (
        <Spin />
      )}
      {contextHolder}
    </>
  );
};

export default Login;
