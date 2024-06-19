import LogoutButton from './LogoutButton';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto p-8 flex flex-col items-center gap-8">
      <h1 className="p-4 text-center text-4xl my-10">Dashboard</h1>
      <p>Witaj w panelu administracyjnym</p>

      <LogoutButton />
    </div>
  );
}
