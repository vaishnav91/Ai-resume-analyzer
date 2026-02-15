import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await API.get("/auth/admin/stats");
      setStats(data);
    };

    fetchStats();
  }, []);

  if (!stats) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <p>Total Users: {stats.totalUsers}</p>
        <p>Total Resumes: {stats.totalResumes}</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
