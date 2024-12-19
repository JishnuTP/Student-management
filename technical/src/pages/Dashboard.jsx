import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import StudentList from "../components/StudentList";
import { useSelector, useDispatch } from "react-redux";
import { addStudent, fetchStudents } from "../redux/studentSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    cohort: "",
    courses: "",
    status: true,
  });

  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddStudent = () => {
    dispatch(
      addStudent({
        name: newStudent.name,
        cohort: newStudent.cohort,
        courses: newStudent.courses.split(", "), // Convert courses to an array
        status: newStudent.status,
      })
    );
    dispatch(fetchStudents());

    // Reset form state
    setNewStudent({ name: "", cohort: "", courses: "", status: true });
    handleCloseModal();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-10 bg-gray-800 text-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-64`}
      >
        <Sidebar />
      </div>

      {/* Overlay for Sidebar on Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10 md:hidden"
          onClick={handleSidebarToggle}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            className="md:hidden bg-gray-800 text-white p-2 rounded"
            onClick={handleSidebarToggle}
          >
            ☰
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Students</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleOpenModal}
          >
            Add New Student
          </button>
        </div>

        {/* Student List */}
        <StudentList students={students} />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
              <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Cohort
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={newStudent.cohort}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, cohort: e.target.value })
                  }
                >
                  <option value="">Select Cohort</option>
                  <option value="Cohort 2023">Cohort 2023</option>
                  <option value="Cohort 2024">Cohort 2024</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Courses (comma-separated)
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={newStudent.courses}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, courses: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Status
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={newStudent.status}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      status: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleAddStudent}
                >
                  Add Student
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
