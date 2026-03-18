import { currentUser } from "@clerk/nextjs/server";
import { UserProfile } from "@clerk/nextjs";

export default async function SettingsPage() {
  const user = await currentUser();

  return (
    <div className="max-w-3xl">
      <div className="mb-12">
        <div className="label-tag mb-3">USER_CONFIGURATION</div>
        <h1 className="font-headline font-extrabold text-5xl text-primary uppercase tracking-tighter">
          SETTINGS
        </h1>
      </div>

      {/* Account info */}
      <div className="bg-surface-container-low p-8 mb-6">
        <div className="label-tag mb-6">ACCOUNT_INFO</div>
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: "USER_ID", value: user?.id ?? "—" },
            { label: "EMAIL", value: user?.emailAddresses[0]?.emailAddress ?? "—" },
            { label: "USERNAME", value: user?.username ?? user?.firstName ?? "—" },
            { label: "CREATED", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="label-tag mb-1 text-outline-variant">{label}</div>
              <div className="font-mono text-sm text-on-surface truncate">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Clerk UserProfile (handles password, social accounts, etc.) */}
      <div className="mb-6">
        <div className="label-tag mb-4">PROFILE_MANAGER</div>
        <UserProfile
          appearance={{
            variables: {
              colorPrimary: "#b1c5ff",
              colorBackground: "#171f33",
              colorText: "#dae2fd",
              colorInputBackground: "#060e20",
              colorInputText: "#dae2fd",
              borderRadius: "0px",
              fontFamily: "Inter, sans-serif",
            },
          }}
        />
      </div>
    </div>
  );
}
