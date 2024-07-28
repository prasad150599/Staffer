import React, { useEffect, useState } from "react";
import AppNavigator from "./Screens/AppNavigator";
import SplashScreen from "./Screens/SplashScreen";

const App = () => {

      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
            const timer = setTimeout(() => {
              setIsLoading(false);
            }, 2000);
        
            return () => clearTimeout(timer);
          }, []);

      return (

            // <AppNavigator />
            isLoading ? <SplashScreen /> : <AppNavigator />
      )
}

export default App;