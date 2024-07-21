import { APP_THEME } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

interface ChartComponentProps {
    title: string;
    labels?: string[];
    pendingData?: number[];
    doneData?: number[];
    yAxisLabel?: string;
    yAxisSuffix?: string;
    yAxisInterval?: number;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
    title,
    labels = [],
    pendingData = [],
    doneData = [],
    yAxisLabel,
    yAxisSuffix,
    yAxisInterval,
}) => {
    const theme = useSelector((state: RootState) => state.global.theme);

    const isDataEmpty = labels.length === 0 || pendingData.length === 0 || doneData.length === 0;

    const chartConfig = {
        backgroundGradientFrom: APP_THEME[theme].background,
        backgroundGradientFromOpacity: 0.2,
        backgroundGradientTo: APP_THEME[theme].background,
        backgroundGradientToOpacity: 0.4,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 4,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: APP_THEME[theme].ternary.first,
        },
    };

    return (
        <View style={[styles.mainContainer, { backgroundColor: APP_THEME[theme].background }]}>
            <View style={[styles.container, { backgroundColor: APP_THEME[theme].background }]}>
                <Text style={[styles.title, { color: APP_THEME[theme].ternary.first }]}>
                    {title}
                </Text>
                {isDataEmpty ? (
                    <Text style={styles.noDataText}>No Data Available</Text>
                ) : (
                    <>
                        <View style={styles.legendContainer}>
                            <View style={styles.legendItem}>
                                <View
                                    style={[
                                        styles.legendColorBox,
                                        { backgroundColor: "rgba(144, 238, 144, 1)" }, // Faint green
                                    ]}
                                />
                                <Text
                                    style={[styles.legendText, { color: APP_THEME[theme].ternary.first }]}
                                >
                                    Pending Payments
                                </Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View
                                    style={[
                                        styles.legendColorBox,
                                        { backgroundColor: "rgba(0, 100, 0, 1)" }, // Dark green
                                    ]}
                                />
                                <Text
                                    style={[styles.legendText, { color: APP_THEME[theme].ternary.first }]}
                                >
                                    Done Payments
                                </Text>
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
                    </>
                )}
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
    },
    container: {
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 16,
        borderRadius: 0,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
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
    },
    noDataText: {
        fontSize: 18,
        // color: APP_THEME[theme].ternary.first,
        textAlign: "center",
        marginTop: 20,
    },
});

export default ChartComponent;
