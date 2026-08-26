const http = require("http")

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("<h1>Welcome To Home Page</h1><br>")
        res.write("<h2>There is nothing more to see on this page , Now move to next page </h2>")
        res.end()
    }
    else if (req.url === "/about") {
        res.write("<h1>About Page</h1><br>")
        res.write("<h2>Assignment One</h2><br>")
        res.write("<h3>Task-3</h3><br>")
        res.write("<h4>Creating Basic HTTP Server</h4>")
        res.end()
    }
    else if (req.url === "/contact") {
        res.write("<h1>Contact Page</h1><br>")
        res.write("<h4>Ph:45678</h4><br>")
        res.write("<h4>email : Don't mail me</h4>")
        res.end()
    } else {
        res.statusCode = 404
        res.write("<h1>Invalid Route</h1>")
        res.end()
    }


})
server.listen(3000, () => {
    console.log("Server is running on Port 3000")
})

module.exports = { server }