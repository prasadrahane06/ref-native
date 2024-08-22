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
        { question: t("stu_faq1"), answer: t("stu_ans1") },
        { question: t("stu_faq2"), answer: t("stu_ans2") },
        { question: t("stu_faq3"), answer: t("stu_ans3") },
        { question: t("stu_faq4"), answer: t("stu_ans4") },
        { question: t("stu_faq5"), answer: t("stu_ans5") },
    ];

    const schoolFAQ = [
        { question: t("sch_faq1"), answer: t("sch_ans1") },
        { question: t("sch_faq2"), answer: t("sch_ans2") },
        { question: t("sch_faq3"), answer: t("sch_ans3") },
        { question: t("sch_faq4"), answer: t("sch_ans4") },
        { question: t("sch_faq5"), answer: t("sch_ans5")},
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
        marginLeft: 2,
    },
});

export default Help;
