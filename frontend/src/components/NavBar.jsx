import { useAuth } from "../context/AuthContext";
import socket from "../services/socket";

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    socket.disconnect();

    logout();

    window.location.href = "/";
  };

  return (
    <div className="bg-black text-white p-4 flex justify-between">
      <h1>Stock Dashboard</h1>

      <div className="flex gap-4">
        <span>{user?.email}</span>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
