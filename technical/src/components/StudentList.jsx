import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents,
  deleteStudent,
  updateStudent,
} from "../redux/studentSlice";
import Swal from "sweetalert2";

const StudentList = ({ onGetDetails }) => {
  const dispatch = useDispatch();
  const { students, status, error } = useSelector((state) => state.students);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState(null);
  const [selectedCohort, setSelectedCohort] = useState("All");
  const [searchName, setSearchName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);


  const handleGetDetails = (student) => {
    setSelectedStudents(student);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedStudents(null);
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStudent(id));
        Swal.fire("Deleted!", "The student has been deleted.", "success");
      }
    });
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
   
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    dispatch(updateStudent(selectedStudent));
    dispatch(fetchStudents())
    setIsModalOpen(false);
  };

  const filteredStudents = students.filter((student) => {
    const matchesCohort =
      selectedCohort === "All" || student.cohort === selectedCohort;
    const matchesName = student.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    return matchesCohort && matchesName;
  });

  const uniqueCohorts = [
    "All",
    ...new Set(students.map((student) => student.cohort)),
  ];

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>{error}</p>;

  return (
    <div className="overflow-auto">
      {/* Filter by Cohort */}
      <div className="mb-4 flex space-x-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Cohort</label>
          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            {uniqueCohorts.map((cohort) => (
              <option key={cohort} value={cohort}>
                {cohort}
              </option>
            ))}
          </select>
        </div>

        {/* Search by Name */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Search by Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-400 bg-white shadow-sm rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-400 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-400 px-4 py-2 text-left">Cohort</th>
            <th className="border border-gray-400 px-4 py-2 text-left">Courses</th>
            <th className="border border-gray-400 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-400 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id} className="hover:bg-gray-100">
              <td className="border border-gray-400 px-4 py-2">{student.name}</td>
              <td className="border border-gray-400 px-4 py-2">{student.cohort}</td>
              <td className="border border-gray-400 px-4 py-2">
                {student.courses.join(", ")}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {student.status ? (
                  <span className="text-green-500 font-semibold">Active</span>
                ) : (
                  <span className="text-red-500 font-semibold">Inactive</span>
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                  onClick={() => handleEditClick(student)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  onClick={() => handleGetDetails(student)}
                >
                  Get Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2"
                value={selectedStudent.name}
                onChange={(e) =>
                  setSelectedStudent({ ...selectedStudent, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Cohort</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2"
                value={selectedStudent.cohort}
                onChange={(e) =>
                  setSelectedStudent({ ...selectedStudent, cohort: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Courses</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2"
                value={selectedStudent.courses.join(", ")}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    courses: e.target.value.split(", "),
                  })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleUpdate}
              >
               Update
              </button>
            </div>
          </div>
        </div>
      )}


{isDetailsModalOpen && selectedStudents && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Student Details</h2>
            <div className="mb-4">
              <p>
                <strong>Name:</strong> {selectedStudents.name}
              </p>
              <p>
                <strong>Cohort:</strong> {selectedStudents.cohort}
              </p>
              <p>
                <strong>Courses:</strong> {selectedStudents.courses.join(", ")}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedStudents.status ? (
                  <span className="text-green-500 font-semibold">Active</span>
                ) : (
                  <span className="text-red-500 font-semibold">Inactive</span>
                )}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={handleCloseDetails}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
