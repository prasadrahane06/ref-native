import { RootState } from '@/redux/store';
import { transformObjectForLang } from '@/utils/json_transform';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const useLangTransformSelector = <T,>(selector: (state: RootState) => T): T => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language || 'en');
  const selectedData = useSelector(selector);

  useEffect(() => {
    setSelectedLanguage(i18n.language || 'en');
  }, [i18n.language]);

  const transformedData = useMemo(() => {
    return transformObjectForLang(selectedData, selectedLanguage);
  }, [selectedData, selectedLanguage]);

  return transformedData;
};

// // Example usage
// const profile = useTransformedSelector((state: RootState) => state.global.profile);
// const signInType = useTransformedSelector((state: RootState) => state.global.signInType);
// const signupDetails = useTransformedSelector((state: RootState) => state.global.signupDetails);
