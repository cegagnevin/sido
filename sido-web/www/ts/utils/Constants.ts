/**
 * Created by mvincent on 05/01/2016.
 */
export class Constants {

    // Technical information
    //public static SERVER_URL = "http://localhost:8080/";

    //test david
    public static SERVER_URL = "http://172.30.98.41:8080/";
    //public static SERVER_URL = "http://lptxraarecrut01.ptx.fr.sopra:8080/quizz-0.0.1/";

    // URLs
    public static QUESTION_URL = "question";
    public static QUESTION_WITH_TAG_URL = "/questions-by-tags?";
    public static QUESTION_RESULT_URL = "question-result";
    public static QUIZZ_URL = "quizz";
    public static QUIZZ_WITH_TAG_URL = "/quizz-by-tags?";
    public static QUIZZ_RESULT_URL = "quizz-result";
    public static QUIZZ_RESULT_ID_URL = "/search/findById?id=";
    public static USER_URL = "user";
    public static USER_INFO_URL = "/search/findByLogin?login=";
    public static CANDIDATE_URL = "candidate";
    public static CANDIDATE_ID_URL = "/search/findByCandidateId?candidateId=";
    public static CANDIDATE_ID_FILTER_URL = "/search/findByCandidateIdContains?filter=";
    public static ANSWER_URL = "answer";
    public static TAGS_URL = "tags";
    public static QUIZZ_TAGS_URL = "quizzTags";
    public static SESSION_URL = "session";
    public static CREATE_URL = "/create";
    public static TEMP_URL = "/temp";
    public static CHECK_URL = "/check";
    // Parameters
    public static TAG = "tag=";

    public static selectAnswerColor = "#B1DFFA";
    public static unselectAnswerColor = "white";
}