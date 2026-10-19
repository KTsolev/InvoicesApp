import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { InvoiceProvider } from './contexts/invoiceContext';
import CreateInvoice from './screens/CreateInvoice';
import CameraView from './screens/CameraView';
import LoadInvoice from './screens/LoadInvoice';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileCirclePlus, faFileImport } from '@fortawesome/free-solid-svg-icons';


const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Create Invoice" screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Create Invoice" component={CreateInvoice} />
      <HomeStack.Screen name="Camera" component={CameraView} options={{ headerShown: true }} />
    </HomeStack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <InvoiceProvider>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Create Invoice"
            component={HomeStackScreen}
            options={{
              title: 'Нова Фактура',
              tabBarIcon: ({ size, focused, color }) => {
                return (
                  <FontAwesomeIcon icon={faFileCirclePlus} color={color} size={size} />
                );
              },
            }}
          />
          <Tab.Screen
            name="Load Invoice"
            component={LoadInvoice}
            options={{
              title: 'Запазени Фактури',
              tabBarIcon: ({ size, focused, color }) => {
                return (
                  <FontAwesomeIcon icon={faFileImport} color={color} size={size} />
                );
              },
            }}
          />
        </Tab.Navigator>
      </InvoiceProvider>
    </NavigationContainer>
  );
}

export default App;
