import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import LottieView from "lottie-react-native";
import { useRoute } from "@react-navigation/native";

const GET_ITEMS_DETAIL = gql`
  query Items($detailItemId: ID!) {
    detailItem(id: $detailItemId) {
      id
      name
      description
      price
      imgUrl
      Category {
        name
      }
      Ingredients {
        itemId
        name
      }
      User {
        username
      }
    }
  }
`;
export default function MorePage() {
  const route = useRoute();
  const { loading, error, data } = useQuery(GET_ITEMS_DETAIL, {
    variables: {
      detailItemId: route.params.id,
    },
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          autoPlay
          loop
          style={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
          source={require("../assets/loading.json")}
        />
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          autoPlay
          loop
          style={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
          source={require("../assets/error.json")}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: data?.detailItem?.imgUrl }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{data?.detailItem?.Category?.name}</Text>
        </View>
        <Text style={styles.name}>{data?.detailItem?.name}</Text>
        <Text style={styles.description}>{data?.detailItem?.description}</Text>
        <Text style={styles.price}>Rp. {data?.detailItem?.price}</Text>
        <Text style={styles.user}>
          Created By: {data?.detailItem?.User?.username}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  details: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  user: {
    fontSize: 10,
    marginBottom: 10,
  },
  category: {
    backgroundColor: "#f0c040",
    color: "#fff",
    padding: 6,
    borderRadius: 5,
    width: 100,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#f0c040",
    padding: 2,
    borderRadius: 10,
    alignItems: "center",
    width: 100,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
});
