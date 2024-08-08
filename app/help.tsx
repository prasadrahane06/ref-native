import AUIAccordion from "@/components/common/AUIAccordion";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { RootState } from "@/redux/store";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const Help = () => {
    const { t } = useTranslation();
    const isRTL = useSelector((state: RootState) => state.global.isRTL);
    const faqData = [
        { question: t("faq1"), answer: t("faq_ans1") },
        { question: t("faq2"), answer: t("faq_ans2") },
        { question: t("faq3"), answer: t("faq_ans3") },
        { question: t("faq4"), answer: t("faq_ans4") },
        { question: t("faq5"), answer: t("faq_ans5") },
    ];

    return (
        <AUIThemedView style={styles.screen}>
            <AUIThemedText style={styles.header}>{t("frequently_ask_questions")}</AUIThemedText>
            <ScrollView contentContainerStyle={styles.container}>
                {faqData.map((item, index) => (
                    <AUIAccordion key={index} title={item.question}>
                        <AUIThemedView style={styles.answerContainer}>
                            <AUIThemedText style={styles.answer}>{item.answer}</AUIThemedText>
                        </AUIThemedView>
                    </AUIAccordion>
                ))}
            </ScrollView>
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "orange",
        // color: APP_THEME.light.ternary.first,
    },
    container: {
        flexGrow: 1,
    },
    question: {
        color: "green",
    },
    answerContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    answer: {
        flex: 1,
        fontSize: 16,
        marginLeft: 18,
    },
});

export default Help;
