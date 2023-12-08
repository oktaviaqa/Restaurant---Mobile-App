import { StyleSheet, Text, View, StatusBar, FlatList } from "react-native";
import {
  HStack,
  Box,
  Divider,
  Stack,
  AspectRatio,
  Image,
  Center,
  Heading,
} from "native-base";
import { useQuery, gql } from '@apollo/client';
import LottieView from 'lottie-react-native';
import Card from "../components/Card";
const GET_ITEMS = gql`
  query GetItem {
    items {
      id
      name
      description
      price
      imgUrl
      Category {
      id
      name
    }
  }
  }
`
export default function MenuPage() {
  const { loading, error, data } = useQuery(GET_ITEMS);
  console.log(data);
  return (
    <View style={{ flex: 1, padding: 0 }}>
      <FlatList
      data={data?.items || []}
      renderItem={({ item }) => <Card item={item}/>}
      numColumns={2}
      style={{ margin: 0, padding: 0 }}
      />
    </View>
  );
}
