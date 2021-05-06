if(process.env.NODE_ENV == "production"){
    module.exports = {
        mongoURI: "mongodb+srv://firstUser:firstUser@ajuda-unb.ioxkc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    }
}else{
    module.exports = {
        mongoURI: "mongodb://localhost/guiaunb"
    }
}