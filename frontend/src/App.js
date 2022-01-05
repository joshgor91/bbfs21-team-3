import "./styles/app.css"
import AdminRouter from "./components/Router/AdminRouter";
import GuestRouter from "./components/Router/GuestRouter";

function App() {

  return (
      <>
          <GuestRouter/>
          <AdminRouter/>
      </>
  )
}

export default App;
