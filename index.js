var http=require('http');
var mime=require('mime-types');
var fs=require('fs');
var port=null;
if(process.argv[2]>1024){
	port=process.argv[2];
}else if(process.argv[2]<1024){
	port=1024;
}
var server=http.createServer();

//process
server.on('request',(req, res)=>{
	try{
		var status, path;

		if(fs.existsSync(process.cwd()+req.url)){
			status=200;
 			path=process.cwd()+req.url;
		}else if(fs.existsSync(process.cwd()+req.url+'/index.html')){
			status=200;
			path=process.cwd()+req.url+'/index.html';
		}else{
			status=404;
			path=`${__dirname}/404.html`;
		}

		res.writeHead(status, {'Content-Type': mime.lookup(path)});
		res.write(fs.readFileSync(path, 'utf-8'));
		res.end();
	}catch(e){
		if(fs.existsSync(process.cwd()+req.url+'/index.html')){
			res.writeHead(200, {'Content-Type': mime.lookup(process.cwd()+req.url+'/index.html')});
			res.write(fs.readFileSync(process.cwd()+req.url+'/index.html'));
			res.end();
		}else{
			res.writeHead(500, {'Content-Type': 'text/html'});
			res.write(fs.readFileSync('./500.html','utf-8'));
			res.end();
		}
	}
})

if(port!=null){
	server.listen(port);
}else{
	server.listen(3000);
}
