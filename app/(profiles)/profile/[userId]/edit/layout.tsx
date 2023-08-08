import MainCard from "@/components/ui/main-card/MainCard";

const ProfileEditPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainCard title="Edit Your Profile Account." link="/profile" text="back">{children}</MainCard>;
};

export default ProfileEditPageLayout;
