import { Case_type } from "./case_type";

export type Favority_type = {
    _id: string;
    caseId: string;
    favorityToUser: string;
}

export type Favority_dto = {
    _id: string;
    caseId: string;
    favorityToUser: string;
    caseDetails: Case_type[];
}