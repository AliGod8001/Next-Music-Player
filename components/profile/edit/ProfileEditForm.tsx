import { useRouter } from "next/navigation";
import { useEffect } from "react";
import dayjs from "dayjs";
import { Form, Input, DatePicker, Avatar, Spin } from "antd";

import { useUserStore } from "@/store/user-store";
import useImage from "@/hooks/use-image";
import MainButton from "@/components/ui/button/MainButton";

import styles from "./ProfileEditForm.module.scss";

const birthDateConfig = {
  rules: [
    {
      type: "object" as const,
      required: true,
      message: "Please select your birth date!",
    },
  ],
};

const ProfileEditForm = ({
  onSubmitForm,
  loading,
}: {
  onSubmitForm: (value: UserEditPayload) => void;
  loading: boolean;
}) => {
  const router = useRouter();
  const userInfo = useUserStore((state) => state.userInfo);

  const {
    image,
    output,
    status,
    loading: imageLoading,
  } = useImage({
    errorClass: styles.error,
    inputId: "profilePicture",
    maxSize: 2,
    prefix: "MB",
  });

  const avatarProps = {
    className: styles.img,
    ...(userInfo && userInfo.profileImage && !image && { src: userInfo.profileImage }),
    ...(image && { src: image }),
  };

  const finishHandler = (value: UserEditPayload) => {
    onSubmitForm({
      ...value,
      profileimage: image,
    });
  };

  const cancelFormClickHandler = () => {
    router.push('/profile')
  }

  useEffect(() => {
    if (!userInfo) router.push("/profile");
  }, []);

  return (
    <Form name="profile-edit-form" onFinish={finishHandler}>
      <Form.Item label="User Name" name="username">
        <Input
          type="text"
          placeholder="username"
          defaultValue={userInfo && userInfo.userName}
        />
      </Form.Item>
      <Form.Item label="Old Password" name="oldpassword">
        <Input.Password type="password" placeholder="old password" />
      </Form.Item>
      <Form.Item label="New Password" name="newpassword">
        <Input.Password type="password" placeholder="new password" />
      </Form.Item>
      <Form.Item label="RePassword" name="repassword">
        <Input.Password type="password" placeholder="re password" />
      </Form.Item>
      <Form.Item label="Birth Date" name="birthdate">
        <DatePicker
          {...birthDateConfig}
          defaultValue={dayjs(new Date(userInfo && userInfo.birthDate))}
        />
      </Form.Item>
      <div className={styles.avatar}>
        <label
          htmlFor="profilePicture"
          className={`${styles.label} ${
            status === 501 ? styles["has-error"] : ""
          }`}
        >
          Profile Avatar:
        </label>
        <label htmlFor="profilePicture">
          {imageLoading ? (
            <div className={styles.img}>
              <Spin />
            </div>
          ) : (
            <Avatar {...avatarProps}>{!image ? "PA" : ""}</Avatar>
          )}
        </label>
        {output}
      </div>
      <div className={styles.action}>
        <MainButton type="primary-outline" onClick={cancelFormClickHandler}>Cancel</MainButton>
        <MainButton type="primary" className={loading ? "overlay-loading" : ""} buttonType="submit">
          Submit
        </MainButton>
      </div>
    </Form>
  );
};

export default ProfileEditForm;
