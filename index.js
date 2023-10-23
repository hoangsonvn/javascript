let name = 'nav';


function logName1() {
    let a = "ok";
    logName(a);
}

function logName(a) {
    console.log(a + name);
}

function outerFunction() {
    let name = 'jane';
    logName1();
}

outerFunction(); // logs 'nav'
