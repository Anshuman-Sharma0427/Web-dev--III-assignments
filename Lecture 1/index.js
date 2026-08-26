// Calculator

// const math = require("./calculator")

// const calculation = process.argv[2]

// const a = Number(process.argv[3])

// const b = Number(process.argv[4])


// if (calculation !== "add" && calculation !== "sub" && calculation !== "mul" && calculation !== "div") {
//     console.log("Invalid operation. Use add, sub, mul, or div.")
// } else {
//     if (a === undefined || b === undefined) {
//         console.log("Please Enter Both Inputs")
//     } else {
//         if (calculation === "add") {
//             console.log(math.add(a, b))
//         } else if (calculation === "sub") {
//             console.log(math.sub(a, b))
//         } else if (calculation === "mul") {
//             console.log(math.mul(a, b))
//         } else if (calculation === "div") {
//             console.log(math.div(a, b))
//         }
//     }
// }

//-----------------------------------------------------------------

// isEven Module

// const checkEven = require("./modules/isEven")
// const a = Number(process.argv[2])

// if(Number.isInteger(a)){
//     console.log(checkEven.isEven(a))
// }else{
//     console.log("Invalid Input")
//     console.log("Please Enter Again")
// }

//-----------------------------------------------------------------

// HTTP SERVER

// const server = require("./server")

//-----------------------------------------------------------------

// fs MODULE

// const fs = require("./fileManager")

// fs.fileManager()

//-----------------------------------------------------------------

// Dice Generator

const dice = require("./dice")
for(let i = 0; i < 5; i++){
    dice.Dice()
}