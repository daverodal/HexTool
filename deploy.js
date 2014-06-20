    var Sftp = require('sftp-upload'),
        fs = require('fs');

    var options = {
        host:'davidrodal.com',
        username:'david',
        path: './dist',
        remoteDir: '/neo',
	port: 7822,
        privateKey: fs.readFileSync('privateKey_rsa')
    },
    sftp = new Sftp(options);

    sftp.on('error', function(err){
        throw err;
    })
    .on('uploading', function(pgs){
        console.log('Uploading', pgs.file);
        console.log(pgs.percent+'% completed');
    })
    .on('completed', function(){
        console.log('Upload Completed');
    })
    .upload();
