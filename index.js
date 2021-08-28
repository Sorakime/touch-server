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
	var status=404;
	var path=`${__dirname}/404.html`;

	if(fs.existsSync(process.cwd()+req.url)==true){
		status=200;
		path=process.cwd()+req.url;
	}else if(fs.existsSync(process.cwd()+req.url+'index.html')==true){
		status=200;
		path=process.cwd()+req.url+'index.html';
	}else if(fs.existsSync(process.cwd()+req.url+'/index.html')==true){
		status=200;
		path=process.cwd()+req.url+'/index.html';
	}
	res.writeHead(status, {'Content-Type': mime.lookup(path)});
	res.write(fs.readFileSync(path));
	res.end();
})

if(port!=null){
	server.listen(port);
}else{
	server.listen(3000);
}
