console.log("First")

async function test(){
     await console.log("third")
     console.log("fourth")
     return 1;
}

console.log(test())

console.log("second")