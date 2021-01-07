function WELCOME_MSG() {​​
    return `<speak> Olá! </speak>`;
}​​

function HELLO_MSG() {​​
    return `<speak> Seja bem-vindo ao Hello World. </speak>`;
}​​

function HELP_MSG() {​​
    return `<speak> Bem-vindo a ajuda. </speak>`;
}​​

function GOODBYE_MSG() {​​
    return `<speak> Até mais. </speak>`;
}​​

function FALLBACK_MSG() {​​
    return `<speak> Desculpe, não entendi. </speak>`;
}​​

function ERROR_MSG() {​​
    return `<speak> Um erro ocorreu nesta skill. </speak>`;
}​​

module.exports = {​​
    WELCOME_MSG,
    HELLO_MSG,
    HELP_MSG,
    GOODBYE_MSG,
    FALLBACK_MSG,
    ERROR_MSG
}​​