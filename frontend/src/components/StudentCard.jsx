const StudentCard = ({ student }) => {
  return (
    <div className="card">
      <h2>
        {student.name || "No Name"}
      </h2>

      <p>
        <strong>Headline:</strong>{" "}
        {student.headline || "N/A"}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {student.location || "N/A"}
      </p>

      <a
        href={
          student.profileUrl || "#"
        }
        target="_blank"
        rel="noreferrer"
      >
        Open Profile
      </a>
    </div>
  );
};

export default StudentCard;