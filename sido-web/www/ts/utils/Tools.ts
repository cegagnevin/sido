import {QuizzResult} from "../models";
import {Quizz} from "../models";
/**
 * Created by jaucagne on 22/01/2016.
 */
export class Tools {

    /**
     * Return the index of an object in an array, based on an object's property
     * @param myArray the array to search
     * @param property the property used to search
     * @param search the value searched
     * @returns {number} the index found (-1 if not found)
     */
    public static arrayObjectIndexOf(myArray, property, search): number
    {
        if(typeof myArray === "undefined" || myArray == null)
        {
            console.log("parameter array not defined");
            return -1;
        }
        for(var i =0; i < myArray.length; i++)
        {
            if(myArray[i][property] === search) return i;
        }
        return -1;
    };

    //get the number of question in a given quizz
    private static getNbQuestionByQuizz (quizzLabel: string, quizzes : Array<Quizz>) : number
    {
        let rep: number = 0;
        for(let quizz of quizzes)
        {
            if(quizz.label == quizzLabel)
            {
                rep = quizz.questions.length;
                break;
            }
        }

        return rep;
    }

    //compute a weighted mean score
    public static computeGlobalQuizzResultW(quizzResults : Array <QuizzResult>, quizzes : Array <Quizz>): number
    {
        let sumRes = 0;
        let nbRes = 0;

        for(let quizzRes of quizzResults)
        {
            let nbQuest = this.getNbQuestionByQuizz(quizzRes.label, quizzes);
            sumRes += quizzRes.quizzResult * nbQuest;
            nbRes += nbQuest;
        }

        return sumRes / nbRes;
    }


}