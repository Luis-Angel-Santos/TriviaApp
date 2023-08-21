export interface Trivia {
    response_code: number;
    results:       Questions[];
}

export interface Questions {
    category?:          string;
    type?:              string;
    difficulty?:        string;
    question:          string;
    correct_answer:    string;
    incorrect_answers: string[];
    all_answers?:       string[];
}
