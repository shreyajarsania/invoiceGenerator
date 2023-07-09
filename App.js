import { NativeRouter as Router, Routes, Route } from "react-router-native";
import { NavigationContainer } from "@react-navigation/native";
import SaleView from "./Screens/SaleView";
import GeneratePdf from "./Screens/GeneratePdf";

const App = () => {
  return (
    <NavigationContainer>
      <Router>
        <Routes>
          <Route path="/" element={<SaleView />} />
          <Route path="/pdfScreen" element={<GeneratePdf />} />
        </Routes>
      </Router>
    </NavigationContainer>
  );
};

export default App;
