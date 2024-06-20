import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enquiry {
    courseId: string;
    plan: any;
    name: string;
    nationality: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    language: string;
    startDate: string;
    endDate: string;
    accommodation: string;
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
