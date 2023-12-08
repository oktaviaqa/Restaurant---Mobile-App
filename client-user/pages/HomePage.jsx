import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image } from "react-native";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Image source={{ uri: 'https://i.imgur.com/6pJE2Zq.jpeg' }}
       style={{width: '100%', height: 400}}>
      </Image>
      <View>
        <Text style={styles.text}>Hi !</Text>
      </View>
    </View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 17,
    marginTop: 5
  },
});

