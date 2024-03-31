import Kidmed from "./components/table";
import kidmed from "./data.json";
function App() {
  return (
    <Kidmed props={{ data: kidmed["kidmed"] }} />
  );
}

export default App;
