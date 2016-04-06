/**
 * Created by mvincent on 26/10/2015.
 */
// Answer
export class Answer {
    label:string;
    correct:boolean;
}
// Candidate information
export class Candidate {
    id:string;
    candidateId:string;
    globalResult:number;
    quizzs:Array<Quizz>;
    results:Array<QuizzResult>;
}
// Question information
export class Question {
    id:string;
    label:string;
    answers:Array<Answer>;
    tags:Array<string>;
    level:string;
    lineNb: number;
}
// Question result
export class QuestionResult {
    id:string;
    label:string;
    candidateAnswers:Array<Answer>;
    correctAnswers:Array<Answer>;
}

// Quizz information
export class Quizz {

    id:string;
    label:string;
    tags:Array<string>;
    questions:Array<Question>;
}

// Quizz result
export class QuizzResult {
    id:string;
    label:string;
    quizzResult:number;
    results:Array<QuestionResult>;
}
// User information
export class User {

    constructor(public login: string, public label:string, public password?:string) {
        this.login = login;
        this.password = password;
        this.label = label;
    }
}
