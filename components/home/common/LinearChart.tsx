import { APP_THEME } from "@/constants/Colors";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface ChartComponentProps {
    title: string;
    labels: string[];
    pendingData: number[];
    doneData: number[];
    yAxisLabel?: string;
    yAxisSuffix?: string;
    yAxisInterval?: number;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
    title,
    labels,
    pendingData,
    doneData,
    yAxisLabel,
    yAxisSuffix,
    yAxisInterval,
}) => {
    const chartConfig = {
        backgroundGradientFrom: APP_THEME.background,
        backgroundGradientFromOpacity: 0.2,
        backgroundGradientTo: APP_THEME.background,
        backgroundGradientToOpacity: 0.4,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 4,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                        <View
                            style={[
                                styles.legendColorBox,
                                { backgroundColor: "rgba(144, 238, 144, 1)" }, // Faint green
                            ]}
                        />
                        <Text style={styles.legendText}>Pending Payments</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View
                            style={[
                                styles.legendColorBox,
                                { backgroundColor: "rgba(0, 100, 0, 1)" }, // Dark green
                            ]}
                        />
                        <Text style={styles.legendText}>Done Payments</Text>
                    </View>
                </View>
                <LineChart
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                data: pendingData,
                                color: (opacity = 1) => `rgba(144, 238, 144, ${opacity})`, // Faint green for pending payments
                                strokeWidth: 2,
                            },
                            {
                                data: doneData,
                                color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`, // Dark green for done payments
                                strokeWidth: 2,
                            },
                        ],
                    }}
                    width={Dimensions.get("window").width * 0.9}
                    height={220}
                    yAxisLabel={yAxisLabel}
                    yAxisSuffix={yAxisSuffix}
                    yAxisInterval={yAxisInterval}
                    chartConfig={chartConfig}
                    bezier={false} // Set to false to get straight lines
                    style={styles.chart}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: APP_THEME.background,
    },
    container: {
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 16,
        backgroundColor: APP_THEME.background,
        borderRadius: 0,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        color: APP_THEME.ternary.first,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    legendContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 16,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 16,
    },
    legendColorBox: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
    legendText: {
        fontSize: 14,
        color: APP_THEME.ternary.first,
    },
});

export default ChartComponent;
