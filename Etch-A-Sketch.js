document.addEventListener("DOMContentLoaded", function() {
    myrange.addEventListener('change', size);
    btn.addEventListener('click', reset);
    //First grid size of 16
    create(16)
    draw()
});

function create(num){
    const grid = document.querySelector('#grid')
    //Resets inner html
    grid.innerHTML= "";
    //Creates my grid
    for(let i = 0; i<num*num; i++){
        document.documentElement.style.setProperty("--repeat-num", num);
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        grid.appendChild(pixel);
    }
}

function draw(){
    //Selects all pixels
    var new_pixels = document.querySelectorAll("div.pixel");
    //Makes an event listner for every pixel
    new_pixels.forEach(new_pixel =>{
        
        new_pixel.addEventListener("mouseenter",function(event){
            //Checks if the radio boxes are checked
            let shader = document.getElementById("shader").checked;
            let random = document.getElementById("random").checked;
            if(shader == true){
                shade_pixel(event);
            }
            else if(random==true){
                randomcolor_pixel(event)
            }
            else{
            event.target.style.backgroundColor = 'rgb(220,220,220)'
            }   
        })
    })
}

function shade_pixel(event){
    //Checks if the event already been assigned a color
    //Sets the first color
    if (event.target.style.backgroundColor == ''){
        event.target.style.backgroundColor = 'rgb(220,220,220)';
    }
    else{
        //Shades the pixel 10 percent
        current = event.target.style.backgroundColor;
        let rgb = current.split(',');
        rgb = darken(rgb);   
        event.target.style.backgroundColor = rgb;
    }
}

function randomcolor_pixel(event){
    //If pixel has no color adds random rgb
    if (event.target.style.backgroundColor == ''){
        rgb = getRandomRgb()
        event.target.style.backgroundColor = rgb;
    }
    else{
        //Stops the pixels changing if already been assigned random rgb
        current = event.target.style.backgroundColor;
        event.target.style.backgroundColor = current;
    }
}

function reset(){
    //Resets pixels back to the class
    var new_pixels = document.querySelectorAll("div.pixel");
    new_pixels.forEach(new_pixel =>{
        new_pixel.style.backgroundColor = "";
    })
}

function size(){
    //Gets value from slider
    let num = document.getElementById("myrange").value;
    create(num)
    draw()
}

function getRandomRgb() {
    let num = Math.round(0xffffff * Math.random());
    let r = num >> 16;
    let g = num >> 8 & 255;
    let b = num & 255;
    return `rgb(${r},${g},${b})`;
  }

function darken(rgb){
    //Receive an array int and takes 10 percent
    rgb[1] = rgb[1] - (rgb[1]/10);
    return`rgb(${rgb[1]},${rgb[1]},${rgb[1]})`
}