import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResumes = async () => {
    try {
      const { data } = await API.get("/resume");
      setResumes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      await API.post("/resume/upload", formData);
      alert("Resume uploaded and analyzed successfully");
      setFile(null);
      fetchResumes();
    } catch (error) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReanalyze = async (id) => {
    try {
      setLoading(true);
      await API.put(`/resume/${id}/reanalyze`);
      fetchResumes();
    } catch (error) {
      alert("Re-analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/resume/${id}`);
      fetchResumes();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Upload Section */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded shadow mb-8 space-y-4"
      >
        <h2 className="text-lg font-medium">Upload Resume</h2>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Processing..." : "Upload & Analyze"}
        </button>
      </form>

      {/* Resume History */}
      <div className="space-y-6">
        <h2 className="text-lg font-medium">Your Resume History</h2>

        {resumes.length === 0 && (
          <p className="text-gray-500">No resumes uploaded yet.</p>
        )}

        {resumes.map((resume) => (
          <div
            key={resume._id}
            className="bg-white p-6 rounded shadow space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{resume.fileName}</h3>
              <span className="font-bold text-lg">
                Score: {resume.score || 0}/100
              </span>
            </div>

            {/* Strengths */}
            <div>
              <p className="font-medium">Strengths:</p>
              <ul className="list-disc ml-6 text-sm">
                {resume.strengths?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div>
              <p className="font-medium">Weaknesses:</p>
              <ul className="list-disc ml-6 text-sm">
                {resume.weaknesses?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            <div>
              <p className="font-medium">Suggestions:</p>
              <ul className="list-disc ml-6 text-sm">
                {resume.suggestions?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => handleReanalyze(resume._id)}
                disabled={loading}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Re-analyze
              </button>

              <button
                onClick={() => handleDelete(resume._id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Uploaded on {new Date(resume.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
