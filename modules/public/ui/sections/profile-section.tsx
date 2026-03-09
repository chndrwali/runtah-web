import PageContainer from "@/components/custom/page-container";
import { ProfileForm } from "@/modules/auth/ui/form/profile-form";

export const ProfileSection = () => {
  return (
    <PageContainer
      pageTitle="Profil Saya"
      pageDescription="Kelola informasi pribadi dan pengaturan lokasi penjemputan"
      scrollable={false}
    >
      <div className="pt-6">
        <ProfileForm />
      </div>
    </PageContainer>
  );
};
