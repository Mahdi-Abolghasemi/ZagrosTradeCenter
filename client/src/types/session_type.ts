import { Case_type } from "./case_type";

export type Session_type = {
    _id: string;
    caseId: string;
    sessionToUser: string;
}

export type Session_dto = {
    _id: string;
    caseId: string;
    sessionToUser: string;
    caseDetails: Case_type[];
}