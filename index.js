import app from './app.js'
const port = process.env.PORT

app.listen(port,()=>{
    console.log(`The server runs on port ${port}`);
})