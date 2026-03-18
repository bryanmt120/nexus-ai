import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="label-tag mb-3">AUTHENTICATION_MODULE</div>
          <h1 className="font-headline font-bold text-3xl text-primary uppercase tracking-tighter">
            SIGN_IN
          </h1>
        </div>
        <SignIn
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
