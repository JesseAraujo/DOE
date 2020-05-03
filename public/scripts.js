document
    .querySelector('header button')
    .addEventListener("click", function(){
        document
            .querySelector('.form')
            .classList.toggle('hide')
    })

    
function onOff() {
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")
}