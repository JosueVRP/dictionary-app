const searchButton = document.getElementById("search-button");
const wordInput = document.getElementById("words-input");
const mainWord = document.getElementById("main-word");
const phoneticLabel = document.getElementById("phonetic");
const partOfSpeechLabel = document.getElementById("part-of-speech");
const meaningContainer = document.getElementById("meaning-container");
const synonymsContainer = document.getElementById("synonym-container");
const secondMeaningContainer = document.getElementById("second-meaning-container");
const sourceLabel = document.getElementById("source-span");

let data

async function getInformation(searchedWord) {
    searchedWord = wordInput.value
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`);
        data = await response.json();
        console.log(data)
        // console.log(data[0].word);
        // console.log(data[0].meanings[0].definitions)
        completeInformation();
    }
    catch(error){
        console.log(error)
    }
}

function createDefinitions(){
    meaningContainer.innerHTML = "";
    let definitions = data[0].meanings[0].definitions;
    definitions.forEach(function(definition){
        const labelDefinition = document.createElement("p");
        labelDefinition.innerHTML = `${definition.definition}`
        meaningContainer.append(labelDefinition);

    })
}

function createSynonyms(){
    synonymsContainer.innerHTML = "";
    let synonyms = data[0].meanings[0].synonyms;
    synonyms.forEach(function(synonym){
        const labelSynonym = document.createElement("span");
        labelSynonym.innerHTML = `${synonym}, `;
        synonymsContainer.append(labelSynonym);
    })
}

function createExamples(){
    secondMeaningContainer.innerHTML = "";
    let secondDefinitions = data[0].meanings[1].definitions;
    secondDefinitions.forEach(function(definition){
        const definitionAndExampleContainer = document.createElement("div");
        secondMeaningContainer.append(definitionAndExampleContainer);
        const secondDefinitionLabel = document.createElement("p");
        secondDefinitionLabel.innerHTML = `${definition.definition}`;
        const exampleLabel = document.createElement("p");
        exampleLabel.innerHTML = `"${definition.example}"`;
        definitionAndExampleContainer.append(secondDefinitionLabel);
        definitionAndExampleContainer.append(exampleLabel);

    })
}

function completeInformation(){
    mainWord.innerHTML = `${data[0].word}`;
    phoneticLabel.innerHTML = `${data[0].phonetic}`;
    partOfSpeechLabel.innerHTML = `${data[0].meanings[0].partOfSpeech}`;
    createDefinitions();
    createSynonyms();
    createExamples();
    sourceLabel.innerHTML = `${data[0].sourceUrls}`;

}

searchButton.addEventListener("click",getInformation);