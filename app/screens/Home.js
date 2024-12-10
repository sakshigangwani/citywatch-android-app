import { View, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Appbar, Card, Text, Icon, Button, MD3Colors  } from 'react-native-paper';
import { db } from "../config/Firebase";
import { collection, query, where, getDocs, Query } from "firebase/firestore";

const data = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
]

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function Home() {
    const [reports, setReports] = useState([]);

    const reportCard = ({ item }) => {
        return (
            <Card>
                <Card.Title title={item.address} subtitle={capitalizeFirstLetter(item.user_type)} left={() => <Icon
                    source="file-document"
                    color={MD3Colors.error50}
                    size={20}
                />} />
                <Card.Content>
                    <Text variant="bodyMedium">{item.description}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button>View</Button>
                </Card.Actions>
            </Card>
        )
    }

    const loadFirebaseData = async () => {
        const q = query(collection(db, "reports"))
        const querySnapshot = await getDocs(q)
        const reportDocs = [];
        querySnapshot.forEach((doc) => { reportDocs.push(doc.data()) });
        setReports(reportDocs);
    }

    useEffect(() => { loadFirebaseData() }, [])
    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Your Reports" />
                <Appbar.Action icon="refresh" onPress={loadFirebaseData} />
            </Appbar.Header>
            <View style={styles.container}>
                <FlatList data={reports} renderItem={reportCard} keyExtractor={(k) => { return k.id }} />
            </View>
        </>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        padding: 16
    }
})