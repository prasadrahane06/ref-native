import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { StyleSheet,ScrollView, View  } from "react-native";
import AUIAccordion from "@/components/common/AUIAccordion";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { t } from "i18next";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME, ThemeType } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


const Help = () => {
    const theme = useSelector((state: RootState) => state.global.theme);
    const faqData = [
        { question: ' What are some of the advantages of attending college online?', answer: "Online education is known for its flexibility" },
        { question: ' How does online education work on a day-to-day basis?', answer: 'instructional methods, course requirements, and learning technologies can vary significantly' },
        { question: 'Is online education as effective as face-to-face instruction?', answer: 'Yes and no. While schools do offer online and hybrid programs in these disciplines' },
        { question: ' Do employers accept online degrees?', answer: 'Online education may seem relatively new, but years of research suggests' },
        { question: 'Is online education more conducive to cheating?', answer: 'The concern that online students cheat more than traditional students is perhaps misplaced' },
      ];
    return (
    
        <AUIThemedView style={styles.screen}>
      <AUIThemedText style={styles.header}>{t("frequently_ask_questions")}</AUIThemedText>
      <ScrollView contentContainerStyle={styles.container} >
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
        backgroundColor: '#f8f8f8',
        padding: 20,
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color:"orange"
      },
      container: {
        flexGrow: 1,
      },
      question: {
        color: 'green',
      },
      answerContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
      answer: {
        fontSize: 16,
        // color={TEXT_THEME[theme].primary}
      },
});

export default Help;
