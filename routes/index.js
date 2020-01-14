var express = require('express');
var router = express.Router();

var user = require('../db/handle.js');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //带cookies
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

router.get('/login', function(req, res, next) {
	console.log(req.query);
	//查询users表
	let params=req.query.name
	user.queryByName(params,res)
});
router.get('/userList', function(req, res, next) {
	console.log(req.query);
	//查询users表
	let params=[]
	user.queryAll(params,res)
});
router.get('/deluserList', function(req, res, next) {
	console.log(req.query.phone);
	//查询users表
	var params=[]
	params.push(req.query.phone)
	user.delete(params,res)
});

router.get('/adduserList', function(req, res, next) {
	let phone=req.query.phone
	let name=req.query.name
	var params=[]
	params.push(name,phone)
	console.log(params)
	user.add(params,res)
});
module.exports = router;