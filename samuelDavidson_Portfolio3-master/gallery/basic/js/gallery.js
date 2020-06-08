//Sam Davidson
//Project adn Portfolio 3
//05-15-2019

document.querySelector('h2').innerHTML = '<h2> The National <strong>Nerd</strong></h2>';

var images = [
    souls = {
        url : 'https://visualcocaine.org/public/uploads/large/11509548767vxyvfcsiabsxwsfozynyqhjtwksf3nprikmypixugy7krlhz5dz6seuksa6hdlngbmfw6vqblakhqcpsbeo5mxxkabxmp68xuaaf.jpg',
        description: 'The next Dark Souls entry brings darker settings and bigger monsters! Your death counter is going to need another decimal place!',
        alt: 'Dark Knight',
        game: 'Dark Souls',
    },
    zelda = {
        url : 'https://visualcocaine.org/public/uploads/large/11509444605ltccsvmswnm3twywlvhne7gyddxancv1r3ggo0gm8nfnqlz5d9d3isgqby7slupf9gcjzk1r2bdw6fs7sartmgi8cxksa1gedfwi.jpg',
        description: 'New legend of zelda is a return to ages past within an advanced civilization with exciting new technology!',
        alt: 'Cyber Zelda',
        game: 'Legend of Zelda'
    },
    finalFantasy = {
        url : 'https://visualcocaine.org/public/uploads/large/11495786351yvm5cl4uibf2zjegcqsey0mp5jkqjul4lz6edzy4eqxmqlhjtdqmweaspitufei7f7bdt8lbbzfww788ukmwvunjh2k7h7t4ynvk.jpg',
        description: 'Final Fantasy 7 updates fresh from Square Enix! See Sephiroth and experience an exciting new battle system.',
        alt: 'Cloudy Sephiroth',
        game: 'Final Fantasy'
    }
];

//set index
let activeIndex = 0;
//set current image
const activeImage = document.querySelector("article");
changeImage();

//on next button click
function nextImage(event){
    //if image is last in collection, move to first
    if(activeIndex === 2){
        activeIndex = 0;
        changeImage();
    }
    else{
        activeIndex++;
        changeImage();
    }
}

function previousImage(event){
    if(activeIndex === 0){
        activeIndex = 2;
        changeImage();
    }
    else{
        activeIndex--;
        changeImage();
    }
}

function changeImage(){
    if(activeImage){
        activeImage.querySelector("p").innerHTML = '<p> <img src= "' + images[activeIndex].url + '" alt= "' + images[activeIndex].alt + '"></p>';
        activeImage.querySelector("h3").innerHTML = '<h3> '+ images[activeIndex].game + '</h3>';
        activeImage.getElementsByTagName("p")[2].innerHTML ='<p>' + images[activeIndex].description + '</p>';
    }
}

let next = document.querySelector('.pagination li:last-of-type button');
next.addEventListener("click", nextImage);

let previous = document.querySelector('.pagination li:first-of-type button');
previous.addEventListener("click", previousImage);