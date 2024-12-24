import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const resultsPerPage = 10; // Adjust this for batch size
      const maxPages = 5; // Adjust based on the expected number of pages
      let allUsers = [];

      for (let page = 1; page <= maxPages; page++) {
        try {
          const response = await fetch(
            `https://randomuser.me/api/?page=${page}&results=${resultsPerPage}&seed=abc`
          );
          const data = await response.json();
          allUsers = [...allUsers, ...data.results];
        } catch (error) {
          console.error("Error fetching user data:", error);
          break;
        }
      }
      setUsers(allUsers);
    };

    fetchUsers();
  }, []);

  if (users.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600 font-medium">
        Loading... Here it is!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r bg-gray-100">
      <header className="bg-white text-Black text-center py-9 shadow-md">
        <h1 className="text-4xl font-bold"> </h1>
      </header>

      {/* User Cards Section */}
      <div className="container text-center mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 mt-10">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white border-4 border-gray-400 shadow-xl rounded-xl p-6 transform hover:scale-105 transition duration-300"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              {/* Left Side: User Photo */}
              <img
                className="w-32 h-32 rounded-full border-4 border-gray-500 shadow-md sm:mr-6 mb-4 sm:mb-0"
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
              />
              {/* Right Side: User Details */}
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">
                  {user.name.title}. {user.name.first} {user.name.last}
                </h2>
                <h3 className="text-lg font-medium text-gray-700">
                  {user.id.value} {user.id.name}
                </h3>
                <p className="text-gray-600 mt-2">Age: {user.dob.age}</p>
                <p className="text-gray-500 italic">{user.email}</p>
                <p className="text-gray-600 mt-2">
                  {user.phone}, {user.cell}
                </p>
                <p className="text-gray-600 mt-2">
                  {user.location.street.number}, {user.location.street.name},{" "}
                  {user.location.city}, {user.location.country}, {user.nat},{" "}
                  {user.location.postcode}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
