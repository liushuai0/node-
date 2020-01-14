//handel.js
/*
    数据增删改查模块封装
    req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
    req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
    req.body通常用来解析POST请求中的数据
     +req.query.id 可以将id转为整数
 */
// 引入mysql
var mysql = require('mysql');
// 引入mysql连接配置
var mysqlconfig = require('./config/config.js');
// 引入连接池配置
var poolextend = require('./poolextend.js');
// 引入SQL模块
var sql = require('./sql.js');
// 引入json模块
var json = require('./json.js');
// 使用连接池，提升性能
var pool = mysql.createPool(poolextend({}, mysqlconfig));
var userData = {
	add: function(params, res) {
		pool.getConnection(function(err, connection) {
			//          var param = req.query || req.params;		
			connection.query(sql.insert1, params, function(err, result) {
				if(result) {
					result = 'add'
					console.log(result)
				} else {
					// 以json形式，把操作结果返回给前台页面
					console.log(result)
				}
				json(res, result);
				// 释放连接 
				connection.release();
			});
		});
	},
	delete: function(params, res) {
		pool.getConnection(function(err, connection) {
			connection.query(sql.delete, params, function(err, result) {
				if(result.affectedRows > 0) {
					result = 'delete';
				} else {
					result = undefined;
				}
				json(res, result);
				connection.release();
			});
		});
	},
	update: function(params, res) {
		
		if(params.name == null || params.age == null || params.id == null) {
			json(res, undefined);
			return;
		}
		pool.getConnection(function(err, connection) {
			connection.query(sql.update, params, function(err, result) {
				if(result.affectedRows > 0) {
					result = 'update'
				} else {
					result = undefined;
				}
				json(res, result);
				connection.release();
			});
		});
	},
	queryById: function(req, res, next) {
		var id = +req.query.id;
		pool.getConnection(function(err, connection) {
			connection.query(sql.queryById, id, function(err, result) {
				if(result != '') {
					var _result = result;
					result = {
						result: 'select',
						data: _result
					}
				} else {
					result = undefined;
				}
				
				json(res, result);
				connection.release();
			});
		});
	},
	queryByName: function(params, res) {
		var name = params;
		var qresult=''
		pool.getConnection(function(err, connection) {
			connection.query(sql.queryByName, name, function(err, result) {
				if(result != ''&&result != undefined) {
					qresult = {
						data: result
					}
				} else {
					qresult = undefined;
				}
				json(res, qresult);
				connection.release();
			});
		});
	},
	queryAll: function(req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query(sql.queryAll, function(err, result) {
				if(result != '') {
					var _result = result;
					result = {
						result: 'selectall',
						data: _result
					}
				} else {
					result = undefined;
				}
				json(res, result);
				connection.release();
			});
		});
	}
};
module.exports = userData;