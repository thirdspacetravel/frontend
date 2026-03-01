import AdminInfoCard from "./AdminInfoCard";
// import TeamMembersSection from "./TeamMembersSection";
// import CompanyDetailsForm from "./CompanyDetailsForm";
// import NotificationPreferences from "./NotificationPreferences";
// import InviteTeamMemberForm from "./InviteTeamMemberForm";
import { trpc } from "../../../trpc/index";
const ProfileContent = () => {
  const adminQuery = trpc.admin.getMe.useQuery();

  if (adminQuery.isLoading) {
    return <div>Loading admin details...</div>;
  }
  if (adminQuery.isError) {
    return <div>Error: {adminQuery.error.message}</div>;
  }
  const admin = adminQuery.data;
  return (
    <>
      <div className="profile__container">
        <div className="profile__main">
          <AdminInfoCard admin={admin} />
          {/* <CompanyDetailsForm /> */}
        </div>
        {/* <div className="profile__sidebar">
          <TeamMembersSection />
          <NotificationPreferences admin={admin} />
        </div> */}
        {/* <div className="add-member-wrapper">
          <InviteTeamMemberForm />
        </div> */}
      </div>
    </>
  );
};

export default ProfileContent;
