import * as React from 'react';
import { AppState } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const InvoiceContext = React.createContext(null);

const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = React.useState({
    companyName: '',
    vatNumber: '',
    phone: '',
    email: '',
    address: '',
    items: [],
  });
  const [invoices, setInvoices] = React.useState([
    { "address": "Assess ", "companyName": "Wwwwwwwwwwwwww ", "email": "ssd@sdf.com", "items": [{ "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fmy-app-25318801-bf7c-41c3-bfa5-1565f4da2303/Camera/bcfe510e-65a1-4f78-b051-e272a0bf6392.jpg" }], "phone": "Wwwwwwwwwwwwww ", "vatNumber": "Wwwwwwwwwwwwww " },
    { "address": "Assess rr", "companyName": "Wwwwwwwwwwwwww 44", "email": "ssd@sdf.com", "items": [{ "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fmy-app-25318801-bf7c-41c3-bfa5-1565f4da2303/Camera/5a7005f8-cc44-45d6-ad33-8100fb625a8d.jpg" }], "phone": "Wwwwwwwwwwwwww 44", "vatNumber": "Wwwwwwwwwwwwww 44" },
    { "address": "Assess rr", "companyName": "Wwwwwwwwwwwwww 55", "email": "ssd@sdf.com", "items": [{ "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fmy-app-25318801-bf7c-41c3-bfa5-1565f4da2303/Camera/5a7005f8-cc44-45d6-ad33-8100fb625a8d.jpg" }], "phone": "Wwwwwwwwwwwwww 55", "vatNumber": "Wwwwwwwwwwwwww 55" }
  ]);
  const [appState, setAppState] = React.useState(AppState.currentState);

  const loadData = async () => {
    const data = await AsyncStorage.getItem("Invoices");
    console.log("Stored invoices:", data);
    if (data) {
      const jsonData = JSON.parse(data)
      setInvoices(jsonData)
    }
  }

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log('App State changed to', nextAppState);
      setAppState(nextAppState);
      if (nextAppState === 'active') {
        loadData()
        // The app has come to the foreground, refresh data or UI
      } else if (nextAppState === 'background') {
        console.log("Saving invoices:", invoices);
        AsyncStorage.setItem("Invoices", JSON.stringify(invoices));
        // The app is in the background, save state or pause tasks
      }
    });
    return () => {
      subscription.remove();
    };
  }, [invoices]);

  return (
    <InvoiceContext.Provider value={{ invoiceData, setInvoiceData, invoices, setInvoices }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export { InvoiceContext, InvoiceProvider }; 