//Samuel Davidson
//05-31-2019
//Project & Portfolio 3
//WDD239-O

//set API url
let url = `https://www.giantbomb.com/api/games/?api_key=a5d9382c06dc91d1e6da7bb0c3cec9ab9abf00e5&field_list=name,description,image&format=json&limit=10`;

//set proxy to allow access through CORS security
let corsProxy = 'https://cors-anywhere.herokuapp.com/';

//update page heading
document.querySelector('h1').innerHTML = '<h2> Favorite Review Searches</h1>';

//begin fetch request
fetch(corsProxy + url, {
    
	//set fetch query type
	method: 'GET',
    headers: {
		//set content to JSON
		"Content-Type": "application/json",
		},
	})
	//retrieve response data as JSON
	.then((response) => response.json())
    .then((data) => {
		//create output variable
        let output = '<h2>Games</h2><ul>';
		//verify results are from the game data
		if(data.results){	
			//iterate through each result and set to list
			data.results.forEach(function (user) {
				output += 
                    `<li><h2>Game: ${user.name} </h2></li>
                    <ul>
					    <li><p>${user.description}</p></li>
                        <li><img src='${user.image.small_url}'</img> </li>
                    </ul>`;
			});
			output += '</ul>';
		}
		//append data to html index
        document.getElementById('output').innerHTML = output;
    })
	//catch and log any errors in fetch request
    .catch(function (error) {
        console.log(error);
    });