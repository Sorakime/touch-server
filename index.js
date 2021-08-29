var http=require('http');
var mime=require('mime-types');
var fs=require('fs');
var port;
if(Number(process.argv[2])>=1024){
	port=Number(process.argv[2]);
}else if(Number(process.argv[2])<1024){
	console.log('Changed: The port number was changed to 1024 because your inputted number will not do work.');
	port=1024;
}else{
	port=3000;
}

var server=http.createServer();

function exists(path){
	try{
		fs.readFileSync(path, 'utf-8');
		return true;
	}catch(e){
		return false;
	}
}

//process
server.on('request',(req, res)=>{
	try{

		if(exists(process.cwd()+req.url)){
			res.writeHead(200, {'Content-Type': mime.lookup(process.cwd()+req.url)});
			res.write(fs.readFileSync(process.cwd()+req.url, 'utf-8'));
		}else if(exists(process.cwd()+req.url+'/index.html')){
			res.writeHead(200, {'Content-Type': mime.lookup(process.cwd()+req.url+'/index.html')});
			res.write(fs.readFileSync(process.cwd()+req.url+'/index.html','utf-8'));
		}else{
			res.writeHead(404, {'Content-Type': 'text/html'});
			res.write(fs.readFileSync(`${__dirname}/404.html`,'utf-8'));
		}

	}catch(e){
		res.writeHead(500, {'Content-Type': 'text/html'});
		res.write(fs.readFileSync(`${__dirname}/500.html`,'utf-8'));
		console.log(e);
	}finally{
		res.end();
	}
})

server.listen(port);
