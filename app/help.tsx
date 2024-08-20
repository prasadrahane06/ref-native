import AUIAccordion from "@/components/common/AUIAccordion";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const Help = () => {
    const { t } = useTranslation();
    const data = useLangTransformSelector((state: RootState) => state.global.user);
    // const loginType = useSelector((state) => state.auth.user); // Assuming loginType can be 'student' or 'school'
    // const data = useLangTransformSelector((state: RootState) => state.global.user);
    const type = data?.type;
   
   
    const studentFAQ = [
        { question: t("faq1"), answer: t("faq_ans1") },
        { question: t("faq2"), answer: t("faq_ans2") },
        { question: t("faq3"), answer: t("faq_ans3") },
        { question: t("faq4"), answer: t("faq_ans4") },
        { question: t("faq5"), answer: t("faq_ans5") },
    ];

    const schoolFAQ = [
        { question: t("faq6"), answer: t("faq_ans6") },
        { question: t("faq7"), answer: t("faq_ans7") },
        { question: t("faq8"), answer: t("faq_ans8") },
        { question: t("faq9"), answer: t("faq_ans9") },
        { question: t("faq10"), answer: t("faq_ans10")},
    ];

    const faqData = type === 'student' ? studentFAQ : schoolFAQ;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <AUIThemedView style={styles.screen}>
                <AUIThemedText style={styles.header}>{t("frequently_ask_questions")}</AUIThemedText>
                {faqData.map((item, index) => (
                    <AUIAccordion key={index} title={item.question}>
                        <AUIThemedView style={styles.answerContainer}>
                            <AUIThemedText style={styles.answer}>{item.answer}</AUIThemedText>
                        </AUIThemedView>
                    </AUIAccordion>
                ))}
            </AUIThemedView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#5BD894",
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        padding:10,
        paddingBottom: 20,
        color: "#f8f8f8",
        // color: APP_THEME.light.ternary.first,
    },
    container: {
        flexGrow: 1,
        backgroundColor: "#f8f8f8",
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
