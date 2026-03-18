import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="label-tag mb-3">NEW_ACCOUNT_REGISTRATION</div>
          <h1 className="font-headline font-bold text-3xl text-primary uppercase tracking-tighter">
            CREATE_ACCOUNT
          </h1>
        </div>
        <SignUp
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
