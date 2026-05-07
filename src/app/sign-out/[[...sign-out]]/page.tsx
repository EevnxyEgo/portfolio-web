import { SignOutButton } from '@clerk/nextjs';

export default function SignOutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
      <SignOutButton redirectUrl="/">
        <button className="font-dm-sans text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">
          Signing out...
        </button>
      </SignOutButton>
    </div>
  );
}
