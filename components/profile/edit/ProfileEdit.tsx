"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { message } from "antd";

import PutUserInfo from "@/services/server/users/PutUserInfo";
import { useAppStore } from "@/store/app-store";
import { useUserStore } from "@/store/user-store";

import ProfileEditForm from "./ProfileEditForm";

const ProfileEdit = ({ userId }: { userId: number }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [disableKeydown, setDisableKeydown] = useAppStore((state) => [
    state.disableKeyDown,
    state.setDisableKeyDown,
  ]);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const [messageApi, contextHolder] = message.useMessage();

  const submitFormHandler = async (value: UserEditPayload) => {
    setLoading(true);
    const { status, error, data } = await PutUserInfo(userId, {
      birthDate: value.birthdate
        ? new Date(value.birthdate.$d).getTime()
        : null,
      ...(value.newpassword &&
        value.oldpassword &&
        value.newpassword === value.repassword && {
          newpassword: value.newpassword,
          oldpassword: value.oldpassword,
        }),
      userName: value.username ? value.username : null,
      profileImage: value.profileimage ? value.profileimage : null,
    });
    setLoading(false);

    if (status === 201) {
      setUserInfo(data);
      setTimeout(() => {
        router.push("/profile");
        setDisableKeydown(false);
      }, 1000);
    }
    messageApi.open({
      type: status === 201 ? "success" : "error",
      content:
        status === 201 ? "Your Profile Info Successfully Changed" : error,
    });
  };

  useEffect(() => {
    if (!disableKeydown) setDisableKeydown(true);

    return () => {
      setDisableKeydown(false);
    };
  }, []);

  return (
    <>
      <ProfileEditForm onSubmitForm={submitFormHandler} loading={loading} />
      {contextHolder}
    </>
  );
};

export default ProfileEdit;
