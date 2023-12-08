import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Card({ item }) {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => navigation.navigate("Detail", {
            id: item.id
        })}>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Image
                        source={{ uri: item.imgUrl }}
                        style={styles.cardImage}
                    //   resizeMode="cover"
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={styles.cardCategory}>Rp. {item.price}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: 10
    },
    card: {
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginRight: 16,
        width: 200,
    },
    cardImage: {
        height: 150,
        width: '100%',
    },
    cardContent: {
        flex: 1,
        padding: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardCategory: {
        fontSize: 14,
        color: '#888',
    },
});
