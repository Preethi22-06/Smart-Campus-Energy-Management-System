import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1">
          <Dashboard />
        </main>

      </div>

    </div>
  );
}

export default App;