import net from 'net';
import parser from './httpParser';

export interface FlyInterface {
    run(port:number,callback:(port:number)=>void):void
}

export function Fly():FlyInterface {
    //默认端口
    let PORT = 8080;

    const server = net.createServer();

    server.on('connection',(socket) => {
        socket.setEncoding('binary');

        socket.on('data',(data) => {
            const { method, path, headers } = parser(JSON.stringify(data));

            socket.write(`HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 5

hello`);
        });

        socket.on('close',(hadError) => {
            console.log('socket关闭是否有误:',hadError);
        })

        socket.on('error',(error) => {
            console.log('socket-error',error);
        })
    })

    server.on('error',(Error) => {
        throw Error;
    })


    function run(port:number,callback:(port:number)=>void){
        PORT = port;
        server.listen(PORT);
        server.on('listening', ()=>callback(PORT));
    }

    return {
        run
    }
}

/**
 * Test
 */
const fly = Fly();

fly.run(8080,(port) =>
    console.log(`Fly服务器运行在 http://localhost:${port}`)
);