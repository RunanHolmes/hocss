var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

var bodyParser = require('body-parser');
var multer = require('multer');

var storage1 = multer.diskStorage(
  {
    destination(req, file, cb){
       cb(null, 'public/images/background');
    },
    filename(req, file, cb){
      cb(null, Date.now() + file.originalname);
    }
  }
);

var upload = multer({storage: storage1}).single('avatar');

app.get('/', function(req,res){
  res.render('index_dark', {mang: mang});
});

app.get('/admin', function(req, res){
  res.render('addItem');
});
var parser = bodyParser.urlencoded({extended: false});

app.post('/upload', parser, function(req, res){
  upload(req, res, function(err){
    var hinh = req.file.filename;
    var title = req.body.title;
    var desc = req.body.desc;
    var videoID = req.body.videoID;

    mang.push(new SanPham(hinh, videoID, title, desc));
    res.redirect('/');
  });
});


app.listen(3000);

function SanPham(hinh, videoID, title, desc){
  this.hinh = hinh;
  this.videoID = videoID;
  this.title = title;
  this.desc = desc;
}

var mang = [
  new SanPham('16500156_th.jpg', '14506031', 'NodeJS', `NodeJS là một mã nguồn mở,
  được dùng để xây dựng các ứng dụng mạng, đặc biệt các ứng đòi hỏi real time
  (thời gian thực) & khối lượng request lớn. Chúng ta có thể lập trình NodeJS
  với ngôn ngữ JavaScript. NodeJS có thể được dùng để xây dựng hoàn chỉnh một trang web,
  ngoài ra, NodeJS còn có thể tích hợp để xây dựng các ứng dụng real time trên iOS, Android, Game online với Unity, Cocos2dx.`),
  new SanPham('18058390_th.jpg', '43224490', 'Android', `Android đang là hệ điều hành chiếm lĩnh thị trường thiết bị
   động hiện nay. Hàng trăm ngàn thiết bị từ ti vi, máy nghe nhạc...
   cho đến điện thoại di động đều có thể chạy trên nền Android.`)
];
