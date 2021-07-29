var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
//biến tạo kêt nối nodejs với postgresql
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 'vd25448199',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
  
});

// api lấy dữ liệU từ postgreSql
router.get('/getData01', function(req, res, next) {
    
 //get data
 pool.query('SELECT * FROM product_info', (erro,response)=>{
   if(erro){
     console.log(erro);
   }
   else{
    res.send(response.rows);
   }
  //  pool.end()
 })
  
});
router.get('/add', function(req, res, next) {
  res.render('add',{})
});
router.post('/add', function(req, res, next) {
  var product_name  = req.body.product_name,
  product_price  = req.body.product_price,
  image  = req.body.image;
  pool.query("insert into product_info (product_name, product_price, img) values ($1,$2,$3)", [product_name, product_price, image], (err, response)=>{
    if(err){
      res.send(err)
    }else{
      res.send(' insert thành công tên sản phẩm là: '+product_name+' giá là: ' + product_price +' link ảnh là: ' + image)
    }
  })

});

module.exports = router;
