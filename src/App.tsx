import "./App.css";
import { Button } from "../";
import { Dialog } from "../";

function App() {
  return (
    <div>
      <Button>Sample</Button>
      <Dialog isOpen={false}>
        <p></p>
      </Dialog>
    </div>
  );
}

export default App;
