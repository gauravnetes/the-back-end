// using .then

function populateDiv() {
    const a = document.getElementById("firstNum").value
    const b = document.getElementById("secondNum").value
    fetch("https://sum-server.100xdevs.com//sum?a=" + a + "&b=" + b)
        .then(function(response) {
            response.text()
                .then(function(ans) {
                    document.getElementById("finalSum").innerHTML = ans
                })
        })
}

// using async await: 

async function populateDiv2() {
    const a = document.getElementById("firstNum").value
    const b = document.getElementById("secondNum").value
    const response = await fetch("https://sum-server.100xdevs.com//sum?a=" + a + "&b=" + b)
    const ans = await response.text() 
    document.getElementById("finalSum").innerHTML = ans
}