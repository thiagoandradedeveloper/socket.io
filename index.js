const express = require('express')
const app = express()

//  abaixo o autor ja fez direto
//const app  = require('express')()
const http = require('http').createServer(app)

//midware estudar
const io = require('socket.io')(http)

app.use(express.static(`${__dirname}/js`))
app.use(express.static('js'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/js/index.html')
})

io.on('connection',(socket)=>{
    /* 
        socket.id retornar um id para cada usuario
        se eu abrir uma varias com localhost:3000 abas cada uma gerara um id 
        se a conexao cair e for levantada novamente sera rconectado altomaticamente e gerado
        um novo id e cada vez que eu atualizar a página sera gerado um novo id
    */ 
    //console.log('new connection', socket.id)

    //obs o socket represnta o client que foi conectado

    //(1)
    socket.on('msg',(msg)=>{
        socket.join('contador')
        //console.log(msg)
        //resposta para todos conectado
        //socket.broadcast.emit('msg', socket.id + ' connected<br>')
        //socket.broadcast.emit('msg', '<strong style="color:red">' + msg + '</strong><br>')
        socket.broadcast.emit('msg', msg)
    })
})

let counter = 0
setInterval(()=>{
    io.to('contador2').emit('msg',counter++);
},1000)

http.listen(3000,()=>{
    console.log("rodando")
})