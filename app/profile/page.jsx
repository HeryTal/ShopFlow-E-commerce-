const ProfilePage = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">Profile</p>
        <h1 className="mb-4 text-4xl font-bold text-slate-900">Your Profile</h1>
        <p className="text-lg leading-8 text-slate-600">
          Your account details are managed securely through Clerk.
        </p>
      </section>
    </main>
  );
};

export default ProfilePage;
