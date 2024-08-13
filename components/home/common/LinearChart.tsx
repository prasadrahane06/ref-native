import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { BlurView } from "expo-blur"; // Import BlurView from expo-blur
import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet } from "react-native";
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
    const { t } = useTranslation();
    const theme = useSelector((state: RootState) => state.global.theme);

    const isDataEmpty = labels.length === 0 || pendingData.length === 0 || doneData.length === 0;

    const chartConfig = {
        backgroundGradientFrom: APP_THEME[theme].background,
        backgroundGradientFromOpacity: 0.2,
        backgroundGradientTo: APP_THEME[theme].background,
        backgroundGradientToOpacity: 0.4,
        color: (opacity = 1) => (theme === "light" ? `#000` : `rgba(26, 255, 146, ${opacity})`),
        strokeWidth: 4,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        labelColor: (opacity = 1) => TEXT_THEME[theme].primary,
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: APP_THEME[theme].ternary.first,
        },
    };

    return (
        <AUIThemedView
            style={[styles.mainContainer, { backgroundColor: APP_THEME[theme].background }]}
        >
            <AUIThemedView
                style={[styles.container, { backgroundColor: APP_THEME[theme].background }]}
            >
                <AUIThemedText style={[styles.title]}>{title}</AUIThemedText>
                <AUIThemedText style={[styles.subTitle]}>Payments are in $ Currency</AUIThemedText>
                {isDataEmpty ? (
                    <BlurView intensity={90} style={styles.blurContainer}>
                        <AUIThemedText style={styles.noDataText}>
                            No Chart Data Available!!
                        </AUIThemedText>
                    </BlurView>
                ) : (
                    <>
                        <AUIThemedView style={styles.legendContainer}>
                            <AUIThemedView style={styles.legendItem}>
                                <AUIThemedView
                                    style={[
                                        styles.legendColorBox,
                                        { backgroundColor: "rgba(144, 238, 144, 1)" }, // Faint green
                                    ]}
                                />
                                <AUIThemedText style={[styles.legendText]}>
                                    Pending Payments
                                </AUIThemedText>
                            </AUIThemedView>
                            <AUIThemedView style={styles.legendItem}>
                                <AUIThemedView
                                    style={[
                                        styles.legendColorBox,
                                        { backgroundColor: "rgba(0, 100, 0, 1)" }, // Dark green
                                    ]}
                                />
                                <AUIThemedText style={[styles.legendText]}>
                                    Done Payments
                                </AUIThemedText>
                            </AUIThemedView>
                        </AUIThemedView>
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
                            // fromZero // Ensure chart starts from zero
                            // verticalLabelRotation={30} // Rotate labels to prevent overlap
                        />
                    </>
                )}
            </AUIThemedView>
        </AUIThemedView>
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
    subTitle: {
        fontSize: 10,
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
    blurContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D3FFE7",
    },
    noDataText: {
        fontSize: 12,
        color: "black",
        textAlign: "center",
        position: "absolute",
    },
});

export default ChartComponent;
