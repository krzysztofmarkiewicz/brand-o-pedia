import app from './app.js'
const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Serwer działa na porcie ${port}`);
})