import { decrypt } from "@/utils/decoding";
import ProfileEdit from "@/components/profile/edit/ProfileEdit";

export const metadata = {
  title: "Profile | Edit",
};

const ProfileEditPage = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const userId = decrypt(params.userId);

  return <ProfileEdit userId={userId} />;
};

export default ProfileEditPage;
