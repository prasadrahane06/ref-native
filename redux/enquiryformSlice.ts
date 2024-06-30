import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enquiry {
    user: string;
    course: string;
    client: string;
    nationality: string;
    phone: string;
    email: string;
    languageToLearn: string;
    startDate: string;
    endDate: string;
    accomodation: string;
    comment: string;
}

interface EnquiryFormState {
    enquiries: Enquiry[];
}

const initialState: EnquiryFormState = {
    enquiries: [],
};

const enquiryFormSlice = createSlice({
    name: "enquiryForm",
    initialState,
    reducers: {
        addEnquiry: (state, action: PayloadAction<Enquiry>) => {
            state.enquiries.push(action.payload);
        },
    },
});

export const { addEnquiry } = enquiryFormSlice.actions;
export default enquiryFormSlice.reducer;
