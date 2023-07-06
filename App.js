import { createNativeStackNavigator } from "@react-navigation/native";
import { NativeRouter as Router, Routes, Route } from "react-router-native";
import { NavigationContainer } from "@react-navigation/native";
import SaleView from "./Screens/SaleView";

const App = () => {
  return (
    <NavigationContainer>
      <Router>
        <Routes>
          <Route path="/" element={<SaleView />} />
        </Routes>
      </Router>
    </NavigationContainer>
  );
};

export default App;
