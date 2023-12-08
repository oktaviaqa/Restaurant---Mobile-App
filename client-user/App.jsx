import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigators/TabNavigator"; //
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://54.251.7.70/",
  cache: new InMemoryCache(),
});

import { Text } from "react-native";

export default function App() {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    </ApolloProvider>
  );
}
