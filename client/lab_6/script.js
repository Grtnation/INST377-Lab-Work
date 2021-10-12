

async function windowActions(){ 
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
    const request = await fetch(endpoint);
    const arrayName = await request.json()




function FindMatches(wordToMatch, arrayName){
    return arrayName.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.name.match(regex);
    });
    }
    
function displayMatches(event) {
    const matchArray = FindMatches(event.target.value, arrayName);
    const html = matchArray.map(place => {
        const regex = new RegExp(event.target.value, 'gi');
        return `
        <li>
            <span class = "name"> ${place.name}</span><br/>
            <span class = "category"> ${place.category}</span><br/>
            <span class = "address"> ${place.address_line_1}</span><br/>
            <span class = "city"> ${place.city}</span><br/>
            <span class = "zip"> ${place.city}</span><br/>

        </li>
        `
    }    
    ).join('');
    suggestions.innerHTML = html;
}
    const searchInput = document.querySelector(".search");
    const suggestions = document.querySelector(".suggestions"); 
    searchInput.addEventListener("change", displayMatches);
    searchInput.addEventListener("keyup", (evt) => { displayMatches(evt); });
}
    

window.onload = windowActions;