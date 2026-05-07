import { SignOut } from "@clerk/nextjs";

export default function SignOutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
      <SignOut />
    </div>
  );
}