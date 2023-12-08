import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import LottieView from 'lottie-react-native';
import { useRoute } from '@react-navigation/native';

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
`
export default function MorePage() {
  const route = useRoute()
  const { loading, error, data } = useQuery(GET_ITEMS_DETAIL, {
    variables: {
      detailItemId: route.params.id
    }
  })
  if (loading) {
    return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        source={require("../assets/loading.json")}
      />
    </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      {/* <Image source={{ uri: product.image }} style={styles.image} /> */}
      <View style={styles.details}>
        <Text style={styles.name}>{data?.name}</Text>
        <Text style={styles.price}>{data?.price}</Text>
        <Text style={styles.description}>{data?.description}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  details: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f0c040',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
