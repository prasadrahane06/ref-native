

/**
 * This is alternative to useSelector of redux to ensure application of i18n language.
 * @param obj 
 * @param language 
 * @returns 
 */
export const transformObjectForLang = (obj: any, language: string): any => {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    // If it's an array, recursively transform each element
    if (Array.isArray(obj)) {
        return obj.map((item) => transformObjectForLang(item, language));
    }

    // If it's an object with exactly 'en' and 'ar' keys, transform it
    if ("en" in obj && "ar" in obj && Object.keys(obj).length === 2) {
        return obj[language];
    }

    // Recursively transform each property of the object
    const transformedObj: any = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            transformedObj[key] = transformObjectForLang(obj[key], language);
        }
    }

    return transformedObj;
};