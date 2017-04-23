const request = require('request');
const fs = require('fs');
const child_process = require('child_process');

var j = request.jar();
var cookie = request.cookie('okstockuserid=FE99119A03CABB28;okstockmail=fksundongfeng@126.com;okstockvipendtime=080D461894EAA778A321A47120195F93F0F5DA7BBB187247;okstockusertype=0');
var baseUrl = 'http://www.51pdf.com.cn/softweb/json/';
var TYPE = {
  'qs': 'getqs.asp',
  'hy': 'gethy.asp',
  'data': 'getdata1.asp',
};
var INTERVAL = {
  'three': 0,
  '2017': 11,
  '2016': 10,
  '2015': 9,
  '2014': 8,
  '2013': 7,
  '2012': 6,
  '2011': 4,
  '2010': 3,
};

j.setCookie(cookie, baseUrl);

//   var formData = {
//   // Pass a simple key-value pair
//   my_field: 'my_value',
//   // Pass data via Buffers
//   my_buffer: new Buffer([1, 2, 3]),
//   // Pass data via Streams
//   my_file: fs.createReadStream(__dirname + '/unicycle.jpg'),
//   // Pass multiple values /w an Array
//   attachments: [
//     fs.createReadStream(__dirname + '/attachment1.jpg'),
//     fs.createReadStream(__dirname + '/attachment2.jpg')
//   ],
//   // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
//   // Use case: for some types of streams, you'll need to provide "file"-related information manually.
//   // See the `form-data` README for more information about options: https://github.com/form-data/form-data
//   custom_file: {
//     value:  fs.createReadStream('/dev/urandom'),
//     options: {
//       filename: 'topsecret.jpg',
//       contentType: 'image/jpeg'
//     }
//   }
// };
var fileUrl = 'http://vip.51pdf.com.cn/DownLoad/DownLoad.aspx?rnd=';
var rnd = '170421233331411';

function postData(type){
  request.post({url: baseUrl+TYPE[type]}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('type',type, body);
  });
};
function getFile(rnd, name, filetype){
  var curl = `curl --cookie "okstockuserid=FE99119A03CABB28; okstockmail=fksundongfeng@126.com; okstockvipendtime=080D461894EAA778A321A47120195F93F0F5DA7BBB187247; okstockusertype=0" http://vip.51pdf.com.cn/DownLoad/DownLoad.aspx\?rnd\=${rnd} -o ${name}.${filetype}`;
  child_process.exec(curl, function(err, stdout, stderr){
    console.log(err);
  });

  return;
  // request
  // .get({
  //   'url': fileUrl+rnd,
  //   // 'encoding': 'utf-8',
  //   // 'headers':{
  //   //   'Accept': 'Accept: */*',
  //   //   'User-Agent':'UtilMind HTTPGet',
  //   //   'Cache-Control': 'no-cache'
  //   // }
  // }, function (error, response, body) {
  //     // body is the decompressed response body
  //     console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
  //     console.log('the decoded data is: ' + body)
  //   })
  // .on('error', function(err) {
  //   console.log(err)
  // })
  // // .on('data', function(data){
  // //   console.log(data.toString());
  // // });
  // .pipe(fs.createWriteStream('test1.pdf'))
}
// postData('qs');
// postData('hy');
// getFile(rnd);
