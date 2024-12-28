const form = document.querySelector("form");
const resultdiv = document.querySelector(".result");
const synonymsdiv = document.getElementById("synonyms");
const antonymsdiv = document.getElementById("antonyms");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
})
const getWordInfo=async(word)=>{
    try{
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    console.log(data);
    
    let definitions=data[0].meanings[0].definitions[0];
    resultdiv.innerHTML=`
    <h2><strong>WORD:</strong> ${data[0].word}</h2>
    <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>MEANING:</strong>${definitions.definition==undefined?"not found":definitions.definition}</p>
    <p><strong>EXAMPLE:</strong>${definitions.example==undefined ? "Not found":definitions.example}</p>
    <div><p id ="synonyms"><strong >SYNONYMS:</strong></div>
    <div><p id ="antonyms"><strong>ANTONYMS:</strong></div>

    `;
    //fetching synonyms
    const synonymsdiv= document.getElementById("synonyms")
    if(definitions.synonyms.length===0){
       synonymsdiv.innerHTML += `<li><span>Not found</span></li>`;
    }
    else{
        for(let i=0;i<definitions.synonyms.length;i++){
            synonymsdiv.innerHTML+=`<li>${definitions.synonyms[i]}</li>`
        }
    }
    

    //fetching antonyms
    if(definitions.antonyms.length===0){
        resultdiv.innerHTML += `<li><span>Not found</span></li>`;
    }
    else{
        for(let i=0;i<definitions.antonyms.length;i++){
            resultdiv.innerHTML+=`<li>${definitions.antonyms[i]}</li>`
        }
    }
    

    //adding read more buttons
    resultdiv.innerHTML+=`<div><a href="${data[0].sourceUrls}"target="_blank">Read More</a></div>`}
catch(error){
    resultdiv.innerHTML="sorry,the word could not be found"
}
}