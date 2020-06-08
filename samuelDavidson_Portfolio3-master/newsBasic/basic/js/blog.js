//Samuel Davidson
//05-12-2019
//Project & Portfolio 3

document.querySelector("#blog h2").innerHTML = "The National Nerd";
document.body.style.background = 'url("https://images.unsplash.com/photo-1454117096348-e4abbeba002c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")';

//Set array for company data
var companies = [
    xbox = {
        name: "Xbox",
        image: "https://images.unsplash.com/photo-1482855549413-2a6c9b1955a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Microsoft offers their premier gaming services with Xbox while constantly looking towards the future!",
        location: "Redmond, WA",
        sold:   "29.4 million",
        current: "Xbox One" ,
        home: "https://www.xbox.com/en-US/"
    },
    playstation = {
        name: "PlayStation",
        image: "https://images.unsplash.com/photo-1518908336710-4e1cf821d3d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1473&q=80",
        description: "Currently leading the game-console market with the PlayStation 4, Sony is dedicating to great gaming!",
        location: "Tokyo, Japan",
        sold: "91.6 million",
        current: "PlayStation 4",
        home: "https://www.playstation.com/en-us/"

    },
    nintendo = {
        name: "Nintendo",
        image: "https://images.unsplash.com/photo-1550921464-1bbe1d247da5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Home to gaming for everyone, Nintendo has been a member of the entertainment industry for over a century!",
        location: "Kyoto, Japan",
        sold: "32.27 million",
        current: "Switch",
        home: "https://www.nintendo.com/"
    }

];


        var articles = document.getElementsByTagName("article");
        for(var i = 0; i < companies.length; i++)
        {
            articles[i].querySelector("p").innerHTML = '<p class="thumbnail"><img src= "' + companies[i].image +'" alt="#"></p>';
            articles[i].querySelector("h3").innerHTML = '<h3>' + companies[i].name + '</h3>';
            articles[i].getElementsByTagName("p")[2].innerHTML = '<p>' + companies[i].description + '</p>';
            articles[i].querySelector("dl").innerHTML =
                '<dl>' +
                ' <dt> Headquarters </dt>'+
                '<dd>' + companies[i].location + '</dd>' +
                '<dt> Current Console </dt>' +
                '<dd>' + companies[i].current + '</dd>' +
                '<dt> Consoles Sold </dt>' +
                '<dd>' + companies[i].sold + '</dd>';
            articles[i].getElementsByTagName("p")[4].innerHTML = '<p> <a href="' + companies[i].home + '">Read More </a></p>';
        }
        document.getElementsByTagName("button")[0].innerHTML =  '<p><a href="http://www.google.com"><button>Load More</button></a></p>';
