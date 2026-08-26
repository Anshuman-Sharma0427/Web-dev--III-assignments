const crypto = require("crypto")

function Dice(){const dice = crypto.randomInt(1,7)

console.log("Dice Rolled: ",dice)
}

module.exports = {Dice}