import { View, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Appbar, Card, Text, Icon, Button, Modal, Portal, Divider } from 'react-native-paper';
import { db } from "../config/Firebase";
import { collection, query, getDocs } from "firebase/firestore";
import * as React from 'react';

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function Home() {
    const [reports, setReports] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const limitDescription = (text, wordLimit = 10) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    const reportCard = ({ item }) => {
        return (
            <Card style={styles.fixedCard}>
                <Card.Title title={item.address} subtitle={capitalizeFirstLetter(item.user_type)} titleStyle={styles.titleStyle}
                    subtitleStyle={styles.subtitleStyle} left={() => <Icon
                        source="file-document"
                        color="#2E073F"
                        size={40}
                    />} />
                <Card.Content>
                    <Text variant="bodyMedium" style={styles.description}>{limitDescription(item.description)}</Text>
                </Card.Content>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                        <Text style={styles.titleElement}>Sakshi Gangwani</Text>
                        <Text style={styles.elements}>Description: {item.description}</Text>
                        <Text style={styles.elements}>Date & Time: {item.date_time}</Text>
                        <Text style={styles.elements}>Location: SVKM's Dwarkadas J. Sanghvi College of Engineering</Text>
                    </Modal>
                </Portal>
                <Card.Actions>
                    <Button onPress={showModal}>View</Button>
                </Card.Actions>
            </Card>
        )
    }

    const loadFirebaseData = async () => {
        const q = query(collection(db, "reports"))
        const querySnapshot = await getDocs(q)
        const reportDocs = [];
        // querySnapshot.forEach((doc) => { reportDocs.push(doc.data()) });
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            reportDocs.push({
                ...data,
                date_time: data.date_time?.toDate().toLocaleString(), 
            });
        });
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
                <FlatList ItemSeparatorComponent={<Divider style={styles.divider}/>} contentContainerStyle={styles.list} data={reports} renderItem={reportCard} keyExtractor={(k) => { return k.id }} />
            </View>
        </>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingBottom: 16, 
    },
    titleStyle: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#2E073F", 
        marginTop: 15,
    },
    subtitleStyle: {
        fontSize: 18,
        color: "#2E073F", 
        fontWeight: "bold",
    },
    description: {
        fontSize: 18,
        color: "#2E073F",
        marginLeft: 55,
        marginTop: 5
    },
    fixedCard: {
        width: "100%", 
        maxWidth: 400, 
        height: 175, 
        // elevation: 4, 
        // shadowColor: "#000", 
        // shadowOffset: { width: 0, height: 2 }, 
        // shadowOpacity: 0.5, 
        // shadowRadius: 4, 
        // borderRadius: 8, 
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        width: "90%",
        marginLeft: 22,
    },
    elements: {
        fontSize: 16,
        fontWeight: "500",
        color: "#2E073F",
        marginTop: 8
    },
    titleElement: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        color: "#2E073F",
        marginBottom: 10,
    },
    list: {
        backgroundColor: "transparent",
        padding: 16,
    },
    divider: {
        marginVertical: 14,
    }
})