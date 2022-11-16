import { atom } from "recoil";

export const chainInfo = atom({
    key: "chainInfo",
    default: {
        basicInfo: '',
        socialStatus: [],
        financialStatus: '',
        repution: '',
        dataType: '',
        alogorithm: '',
        interestedAddress: '',
        deliveryFrequency: '',
        deliveryMethod: '',
    },
});

export const routerActive = atom({
    key: "routerActive",
    default: '',
});