
import { useState, useEffect } from 'react';
import { textStyle, buttonStyle } from './dimensions';
import { questionOrder } from './randomized-parameters';
import Likert from 'react-likert-scale';
import { likertChoicesTest } from './likertScale';
import { useCopyEventDetector } from './CopyPasteDetectors';
import kraemer_a from './kraemer_a.svg';
import kraemer_b from './kraemer_b.svg';

import Data from './Data';

const TestPhase = (props) => {

    // import some relevant props
    const testData = props.testData;
    const name=testData.name;
    const dv=testData.dv;
    
    // detect if participants use CTRL-C
    const copyCount = useCopyEventDetector();

    // initialize variables
    const [responseIntentionality, setResponseIntentionality] = useState(0);
    const [responseCausation, setResponseCausation] = useState(0);
    const [responseKnowHow, setResponseKnowHow] = useState(0);
    const [responseProbRaising, setResponseProbRaising] = useState(0);

    const [responseWant, setResponseWant] = useState(0);

    const [sad, setSad] = useState(0);
    const [pathnumber, setPathnumber] = useState(0);
    const [displayButton, setDisplayButton] = useState(0);

    

    const handleSad = (e) => {
        setSad(e.target.value);
    };

    const handlePathnumber = (e) => {
        setPathnumber(e.target.value);
    };

    useEffect(() => {
        // go to top of the screen
            window.scrollTo(0, 0);
        }, []); 


    const handleClick = () => {
        // stores relevant data to the Data object
        // (you should replace '42' with the relevant data to be exported)
        Data.responses.push({
            trialNumber: props.testNumber,
            intentionality: responseIntentionality,
            causation: responseCausation,
            knowHow: responseKnowHow,
            probRaising: responseProbRaising,
            sad: sad,
            pathnumber: pathnumber,
            condition: dv,
            want: responseWant,
            copyCount: copyCount
        })
        Data.trialData.push({
            trialNumber: props.testNumber,
        })
        //console.log(Data);
        // increment the trial number so as to go to the next trial
        props.incrementTest(props.testNumber)
    }

    // is the reminder text at the top visible
    const reminderViz = props.testNumber === 0 ? 'hidden' : 'visible';
    // reminder text
    // note that throughout we use testNumber % 2 to compute whether we are in the intentionality question
    // trial (testNumber is even) or the 'other questions' trial (testNumber is odd)
    const textreminder = <p style={{visibility: reminderViz}}>(We have
     a few more questions about {name}---here is a reminder about what happened.)</p> 
    
    // text displaying information about what happens in the story

//     const text1 = <div >
//  <p>{name} has the opportunity to pull a lever that will randomly shoot a
//  lethal arrow down exactly one of ten specified paths.</p>
//  <p>A person named Bill is at the end of one of the ten paths. If {name} pulls
// the lever and the lethal arrow shoots down the path with Bill on it,
// then Bill will die.</p>
// <p>{name} has no idea which path the arrow will shoot down if she pulls
// the lever. But she does know that Bill is down path eight. And {name} really 
// wants to kill Bill.</p>
// <p>Hoping to kill Bill, {name} pulls the lever. To her great satisfaction, the
// arrow shoots down path eight, and Bill is killed. </p>

    // </div>;


const text1 = <div>

    <p>{name} is playing a carnival game. In the game, {name} is given the opportunity to pull a lever that will randomly shoot an arrow down exactly one of ten specified paths.
</p>

<p>A balloon is at the end of one of the ten paths. If {name} pulls the lever and the arrow shoots down the path with the balloon, then the balloon will pop.</p>
    
        <p>{name} has no idea which path the arrow will shoot down if she pulls the lever. But she does know that the balloon is down path eight. And {name} really wants to pop the balloon.
</p>

<p>Hoping to pop the balloon, {name} pulls the lever. To her great satisfaction, the arrow shoots down path eight, and the balloon pops.</p>
</div>

   

    //the likert scale for each question

    const likertOptionsIntentionality =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseIntentionality(val.value);
            setDisplayButton(true);
        },
        id: 'questionIntentionality',
    };

    const likertOptionsCausation =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseCausation(val.value);
            setDisplayButton(true);
        },
        id: 'questionCausation',
    };


    const likertOptionsKnowHow =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseKnowHow(val.value);
            setDisplayButton(true);
        },
        id: 'questionKnowHow',
    };

    const likertOptionsProbRaising =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseProbRaising(val.value);
            setDisplayButton(true);
        },
        id: 'questionProbRaising',
    };

     //the intentionality question 
    const intentionalityQuestion = <span>
    {/* <p>Please tell us how much you agree with the following statement:</p> */}
    <h4>{name} intentionally {dv==='means' ? 'made the arrow shoot down path eight.' : dv==='ends' ? 'popped the balloon.' : NaN}</h4>
    <span><Likert {...likertOptionsIntentionality} /></span>
    </span>;

    const questionIntro = props.testNumber === 0 ?
    <p>Please tell us how much you agree with the following
         statement:</p> : props.testNumber === 1 ?
         <p>Please tell us how much you agree with the following
         statements:</p> :
         props.testNumber === 2 ?
         <p>Please answer the following questions to show you understand the story:</p> : Nan;

    const causationQuestion =  <span>
    <h4>{dv==='means' ? 'The arrow shot down path eight' : dv==='ends' ? 'The balloon popped' : NaN} because {name} wanted to {dv==='means' ? 'shoot the arrow down path eight.' : dv==='ends' ? 'pop the balloon.' : NaN}</h4>
    <span><Likert {...likertOptionsCausation} /></span>
    </span>;

    const knowHowQuestion = <span>
    <h4>{name} knows how to {dv==='means' ? 'make the arrow shoot down path eight.' : dv==='ends' ? 'pop the balloon.' : NaN}</h4>
    <span><Likert {...likertOptionsKnowHow} /></span>
    </span>;

    const probRaisingQuestion = <span>
    <h4>Pulling the lever increased the probability of {dv==='means' ? 'the arrow shooting down path eight' : dv==='ends' ? 'the balloon popping.' : NaN}</h4>
    <span><Likert {...likertOptionsProbRaising} /></span>
    </span>;



    // add dummy question here

    const likertOptionsWant =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseWant(val.value);
            setDisplayButton(true);
        },
        id: 'questionWant',
    };

    const wantQuestion = <span style={{position: 'absolute', left: '-9999px'}}>
        <h4>{name} wanted to {dv==='means' ? 'shoot the arrow down path eight' : dv==='ends' ? 'pop the balloon.' : NaN}</h4>
    <span><Likert {...likertOptionsWant} /></span>
    </span>

    // creates an array with the causation, probability-raising and know-how questions
    // (order randomized between participants, constant within participant)
    const otherQuestions = [0,1,2].map((i)=>{
        let q = questionOrder[i];
        return(
            q==='intentionality' ? intentionalityQuestion :
            q==='knowHow' ? knowHowQuestion : 
            q==='probRaising' ? probRaisingQuestion :
            NaN
        )
    })


    // comprehension questions
    const comprehensionQuestions = <form>
        <label for="sad">{name} is sad that the balloon popped. </label>

        <select name="sad" id="sad" onChange={(e) => handleSad(e)}>
            <option value="NA">  </option>
            <option value="true">True</option>
            <option value="false">False</option>
        </select>
        <br></br>
        <label for="pathnumber">Which path is the balloon on? </label>

        <select name="pathnumber" id="pathnumber" onChange={(e) => handlePathnumber(e)}>
            <option value="NA">  </option>
            <option value="three">Three</option>
            <option value="eight">Eight</option>
            <option value="ten">Ten</option>

        </select>
        <br></br>
        <br></br>
    </form>;


    // compute which question(s) to display
    const questions = props.testNumber === 0 ? causationQuestion :
    props.testNumber === 1 ?  otherQuestions :
    props.testNumber === 2 ? comprehensionQuestions : NaN;

    // control when to display the Next-Page button
    const nextPageViz = props.testNumber === 0 ?  (displayButton ? 'visible' : 'hidden') :
    props.testNumber === 1 ?  (responseIntentionality===0|responseKnowHow===0|responseProbRaising===0 ? 'hidden' : 'visible') :
    props.testNumber === 2 ? (sad===0|pathnumber===0 ? 'hidden' : 'visible') : NaN

    // next-page button
    const nextPageButton = <button style={{...buttonStyle, visibility: nextPageViz}} onClick={() => handleClick()}>Next</button>;


  

  

    return (
        <div style={textStyle}>
            {textreminder}
            {text1}
            {/* {pic_a}
            {text2}
            {pic_b} */}
            {questionIntro}
            {questions}
            {wantQuestion}
            {nextPageButton}
        </div>

    )
}

export default TestPhase;