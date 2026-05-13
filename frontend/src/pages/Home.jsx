import { useState } from "react";
import API from "../services/api";
import StudentCard from "../components/StudentCard";
import Loader from "../components/Loader";

const Home = () => {
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await API.post("/linkedin/search", {
        keyword: "student 2025",
      });

    
      setStudents(response.data.students || []);
    } catch (error) {
       console.log("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>LinkedIn Student Finder</h1>

     <button
  onClick={handleSearch}
  disabled={loading}
>
  {loading
    ? "Searching..."
    : "Search Students"}
</button>

      {loading && <Loader />}

      <div className="grid">
        {students.map((student, i) => (
          <StudentCard key={i} student={student} />
        ))}
      </div>
    </div>
  );
};

export default Home;
