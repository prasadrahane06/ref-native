import { AUIThemedText } from '@/components/common/AUIThemedText';
import { AUIThemedView } from '@/components/common/AUIThemedView';
import { API_URL } from '@/constants/urlProperties';
import useApiRequest from '@/customHooks/useApiRequest';
import { useLangTransformSelector } from '@/customHooks/useLangTransformSelector';
import { RootState } from '@/redux/store';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const screenWidth = Dimensions.get('window').width;

const transactions = [
    { id: '1', name: 'Joseph', date: 'Aug 13', amount: '+ $10.65', note: 'Boiling', image: 'https://example.com/joseph.jpg', status: 'success' },
    { id: '2', name: 'Jane Larson', date: 'Aug 11', amount: '+ $150', note: 'Drank', image: 'https://example.com/jane.jpg', status: 'success' },
    { id: '3', name: 'Jullie', date: 'Aug 5', amount: '+ $20', note: 'Meds', image: 'https://example.com/jullie.jpg', status: 'success' },
    { id: '4', name: 'Maggie', date: 'Jul 13', amount: '+ $34', note: 'Party ✌️', image: 'https://example.com/maggie.jpg', status: 'failure' },
    { id: '5', name: 'Simon', date: 'Jul 30', amount: '+ $32', note: 'ENJOY', image: 'https://example.com/simon.jpg', status: 'pending' },
];

const Transactions = () => {
    const [selectedTab, setSelectedTab] = useState<string>('all');
    const userData = useLangTransformSelector((state: RootState) => state.global.user);
    const paymentDetials = useLangTransformSelector((state: RootState) => state.api.paymentDetails || {});



    const { requestFn } = useApiRequest()
    const renderTransaction = ({ item }: any) => {
        const meta = JSON.parse(item?.meta);

        // Define colors for different statuses
        const statusColors: { [key: string]: string } = {
            success: '#4CAF50',  // Green
            failure: '#F44336',  // Red
            pending: '#FFC107'   // Yellow
        };

        // Define colors for payment statuses
        const paymentStatusColors: { [key: string]: string } = {
            success: '#4CAF50',  // Green
            failure: '#F44336',  // Red
            pending: '#FFC107'   // Yellow
        };

        // Determine the color for status
        const circleStyle: ViewStyle = {
            backgroundColor: statusColors[item.status as keyof typeof statusColors] || '#E0E0E0',
            width: screenWidth * 0.12,
            height: screenWidth * 0.12,
            borderRadius: (screenWidth * 0.12) / 2,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15,
        };

        // Determine the color for payment status
        const paymentStatusStyle = {
            padding: 5,
            borderRadius: 5,
            marginTop: 5,
            borderLeftWidth: 2,  // Set the width of the left border
            borderLeftColor: paymentStatusColors[item.paymentStatus as keyof typeof paymentStatusColors] || '#E0E0E0',  // Set the color of the left border
        };

        const transactionItem: ViewStyle = {
            flexDirection: 'row',
            borderRadius: 10,
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomColor: '#E0E0E0',
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderLeftColor: paymentStatusColors[item.paymentStatus as keyof typeof paymentStatusColors] || '#E0E0E0',
        };

        return (
            <AUIThemedView style={transactionItem}>
                <AUIThemedView style={circleStyle}>
                    <MaterialIcons name="payment" size={24} color="white" />
                </AUIThemedView>
                <AUIThemedView style={styles.transactionDetails}>
                    <AUIThemedText style={styles.transactionName}>{item?.hyperpayTransactionId}</AUIThemedText>
                    <AUIThemedText style={styles.transactionDate}>{meta?.timestamp} <AntDesign name="lock" size={12} color="gray" /></AUIThemedText>
                    <AUIThemedText style={styles.transactionNote}>Course: {item?.course?.courseName}</AUIThemedText>
                    <AUIThemedText style={styles.transactionNote}>Plan: {item?.plan?.name}</AUIThemedText>
                    <AUIThemedView style={paymentStatusStyle}>
                        <AUIThemedText style={{ color: paymentStatusColors[item.paymentStatus as keyof typeof paymentStatusColors] || '#E0E0E0' }}>
                            {item?.paymentStatus}
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>
                <AUIThemedText style={styles.transactionAmount}>{item?.amount}</AUIThemedText>
            </AUIThemedView>
        );
    };


    //fetching transations details 

    useEffect(() => {
        if (userData._id) {
            requestFn(API_URL.paymentDetails, "paymentDetails", { user: userData._id })
        }
    }, [userData])




    const tabs = [
        { key: 'all', label: 'all' },
        { key: 'success', label: 'Success' },
        { key: 'pending', label: 'Pending' },
        { key: 'failure', label: 'Failure' },
    ];

    return (
        <AUIThemedView style={styles.container}>
            <AUIThemedView style={styles.header}>
                {/* <AUISearchBar 
                
               
               /> */}
            </AUIThemedView>
            <AUIThemedView style={styles.filterRow}>
                {tabs.map(tab => (
                    <TouchableOpacity key={tab.key} onPress={() => setSelectedTab(tab.key)}>
                        <AUIThemedView style={selectedTab.includes(tab.key) ? styles.filterButton : styles.filterButtonInactive}>
                            <AUIThemedText style={styles.filterText}>{tab.label}</AUIThemedText>
                        </AUIThemedView>
                    </TouchableOpacity>
                ))}
            </AUIThemedView>
            <FlatList
                data={Array.isArray(paymentDetials) ? paymentDetials.filter((item: any) => {
                    if (selectedTab === 'all') {
                        return item.paymentStatus === 'success' || item.status === 'pending' || item.status === 'failure';
                    }
                    return item.paymentStatus === selectedTab;
                }) : []}  // If paymentDetials is not an array, default to an empty array
                renderItem={renderTransaction}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.transactionList}
                ListHeaderComponent={<AUIThemedText style={styles.sectionHeader}>{selectedTab}</AUIThemedText>}
            />


        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: screenWidth * 0.05, // 5% of screen width
    },
    filterButtonInactive: {
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    filterRow: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    },
    filterButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 10,
    },
    filterText: {
        color: '#fff',
        fontSize: 14,
    },
    transactionList: {
        paddingBottom: 20,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    transactionDetails: {
        flex: 1,
    },
    transactionName: {
        fontSize: screenWidth * 0.04, // 4% of screen width
        fontWeight: 'bold',
    },
    transactionDate: {
        fontSize: screenWidth * 0.03, // 3% of screen width
        color: 'gray',
        marginTop: 2,
    },
    transactionNote: {
        fontSize: screenWidth * 0.035,
    },
    transactionAmount: {
        fontSize: screenWidth * 0.04, // 4% of screen width
        fontWeight: 'bold',
    },
});


export default Transactions;
