var express = require('express');
var connection = require('../db/sql');
var router = express.Router();
var user = require('../db/userSql')
// sdk
var tencentcloud = require("tencentcloud-sdk-nodejs")
//引入支付宝沙箱配置
const alipaySdk = require('../db/alipay.js');
const AlipayFormData = require('alipay-sdk/lib/form').default;
// 导入对应产品模块的client models。
var smsClient = tencentcloud.sms.v20210111.Client
var user = require('../db/UserSql.js');
var jwt_decode = require('jwt-decode');
//验证码
let code = '';
//接入短信的sdk
var QcloudSms = require("qcloudsms_js");
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});
/* GET home page. */
router.get('/api/ceshi', function(req, res, next) {
	res.send({
		data: {
			a: 1
		}
	})
});
//支付接口
router.post('/api/payment', function(req, res, next) {
    //接收前端给后端的订单号
    let orderId = req.body.orderId;
    //总价
    let price = req.body.price;
    //商品名称
    let list = req.body.list.join('');
    
    const formData = new AlipayFormData();
    //调用get方法
    formData.setMethod('get'),
    //支付时 的信息
    formData.addField('bizContent', {
      outTradeNo: orderId,//订单号
      productCode: 'FAST_INSTANT_TRADE_PAY',//写死的
      totalAmount: price,//金额
      subject: list//商品名称
    });
    //支付成功或者失败打开的页面
    formData.addField('returnUrl', 'http://www.xuexiluxian.cn/');
    const result = alipaySdk.exec(
      'alipay.trade.page.pay',
      {},
      { formData: formData },
    );
    result.then(resp=>{
        res.send({
            data:{
                code:200,
                success:true,
                paymentUrl:resp
            }
        })
    })
})
//修改订单状态
router.post('/api/submitOrder', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	//订单号
	let orderId = req.body.orderId
	//购物车中选中的商品
	let shopArr = req.body.shopArr
	connection.query(`select * from user where phone = ${phone.name}`, function(error, results, fields) {
		//当前用户id
		let userId = results[0].id
		connection.query(`select * from store_order where uId = ${userId} and order_id = ${orderId}`,
			function(err, result) {
				//订单的id
				let id = result[0].id
				connection.query(
					`update store_order set order_status = replace(order_status,'1','2') where id = ${id}`,
					function() {
						shopArr.forEach(v => {
							connection.query(`delete from goods_cart where id = ${v}`,
								function() {

								})
						})
						res.send({
							data: {
								code: 200,
								success: true
							}
						})
					})
			})
	})
})

//生成订单
router.post('/api/addOrder', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	//前端给后端传递的数据
	let goodsArr = req.body.arr
	//生成订单号
	function setTimeDateFmt(s) {
		return s < 10 ? '0' + s : s
	}

	function orderNumber() {
		const now = new Date()
		let fullYear = now.getFullYear()
		let month = setTimeDateFmt(now.getMonth() + 1)
		let day = setTimeDateFmt(now.getDate())
		let hour = setTimeDateFmt(now.getHours())
		let minutes = setTimeDateFmt(now.getMinutes())
		let seconds = setTimeDateFmt(now.getSeconds())
		let orderCode = fullYear + month + day + hour + minutes + seconds + (Math.round(Math.random() *
			1000000))
		return orderCode
	}
	//商品名称
	let goodsName = []
	//订单总价
	let goodsPrice = 0
	//订单商品总数量
	let goodsNum = 0
	//订单号
	let orderId = orderNumber()

	goodsArr.forEach(v => {
		goodsName.push(v.name)
		goodsNum += parseInt(v.num)
		goodsPrice += v.num * v.pprice
	})

	connection.query(`select * from user where phone = ${phone.name}`, function(error, results, fields) {
		//当前用户id
		let userId = results[0].id
		connection.query(
			`insert into store_order (uId,order_id,goods_name,goods_price,goods_num,order_status) values ('${userId}','${orderId}','${goodsName}','${goodsPrice}','${goodsNum}','1')`,
			function() {
				connection.query(
					`select * from store_order where uId = ${userId} and order_id = ${orderId}`,
					function(err, result) {
						res.send({
							data: {
								code: 200,
								success: true,
								data: result
							}
						})
					})
			})
	})
})

//删除购物车商品数据
router.post('/api/deleteCart', function(req, res, next) {
	let goodsId = req.body.goodsId
	console.log(goodsId)
	for (var i = 0; i < goodsId.length; i++) {
		connection.query(`delete from goods_cart where id=${goodsId[i]}`, function(e, r) {
			res.json({
				data: {
					success: true
				}
			})
		})
	}
})
//加入购物车
router.post('/api/addCart', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	//商品id
	let goods_id = req.body.goods_id
	//用户输入的商品数量
	let num = req.body.num
	connection.query(`select * from user where phone = ${phone.name}`, function(error, results, fields) {
		//当前用户id
		let userId = results[0].id
		connection.query(`select * from goods_search where id = ${goods_id}`, function(err, result) {
			let name = result[0].name
			let imgUrl = result[0].imgUrl
			let pprice = result[0].pprice
			//查询当前用户之前是否添加过这个商品
			connection.query(
				`select * from goods_cart where uId = ${userId} and goods_id = ${goods_id}`,
				function(err, data) {
					if (data.length > 0) {
						//如果当前用户已经添加过本商品,就让数量增加
						connection.query(
							`update goods_cart set num = replace(num,${data[0].num},${parseInt(num) + parseInt(data[0].num)}) where id = ${data[0].id}`,
							function(e, r) {
								res.json({
									data: {
										success: "加入成功"
									}
								})
							})
					} else {
						//如果当前用户之前没有加入过本商品,需要添加进入
						connection.query(
							'insert into goods_cart (uId,goods_id,name,imgUrl,pprice,num) values ("' +
							userId + '","' + goods_id + '","' + name + '","' + imgUrl +
							'","' + pprice + '","' + num + '")',
							function(err, data) {
								res.json({
									data: {
										success: "加入成功"
									}
								})
							})
					}
				})
		})
	})
})

//1. 当前用户
//2. 当前用户--->哪一个商品的数量发展变化  [查询]   原来的数量
//3. 替换 ===> 把前端给的值拿过来, 把原来数量替换掉
//修改当前用户购物车商品数量
router.post('/api/updateNumCart', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	//商品id
	let goodsId = req.body.goodsId
	//用户输入的商品数量
	let num = req.body.num
	connection.query(`select * from user where phone = ${phone.name}`, function(error, results, fields) {
		//当前用户id
		let userId = results[0].id
		connection.query(`select * from goods_cart where uId = ${userId} and goods_id = ${goodsId}`,
			function(err, result) {
				//数据中当前的数量
				let goods_num = result[0].num
				//当前的id号
				let id = result[0].id
				//修改[替换]
				connection.query(
					`update goods_cart set num = replace(num,${goods_num},${num}) where id = ${id}`,
					function(e, r) {
						res.json({
							data: {
								success: true
							}
						})
					})
			})
	})
})

//获取当前用户购物车列表
router.post('/api/selectCart', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	connection.query(`select * from user where phone = ${phone.name}`, function(error, results, fields) {
		//当前用户id
		let userId = results[0].id
		console.log(userId)
		connection.query(`select * from goods_cart where uId = ${userId}`, function(err, result) {
			res.json({
				data: result
			})
		})
	})
})




//当前用户修改收货地址
router.post('/api/updateAddress', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	let name = req.body.name
	let tel = req.body.tel
	let province = req.body.province
	let city = req.body.city
	let district = req.body.district
	let address = req.body.address
	let isDefault = req.body.isDefault
	let id = req.body.id

	//获取userId
	connection.query(`select * from user where phone = ${phone.name}`, function(error, results, fields) {
		let userId = results[0].id
		connection.query(`select * from address where userId = ${userId} and isDefault = ${isDefault}`,
			function(err, result) {
				let childId = result[0].id
				connection.query(
					`update address set isDefault = replace(isDefault,"1","0") where id = ${childId}`,
					function(e, r) {
						let updateSql =
							`update address set name = ?,tel = ?,province = ?,city = ?,district = ?,address = ?,isDefault = ?,userId = ? where id = ${id}`
						connection.query(updateSql, [name, tel, province, city, district,
							address, isDefault, userId
						], function(err, result) {
							res.send({
								data: {
									success: '成功'
								}
							})
						})
					})
			})
	})
})
//当前用户新增收货地址
router.post('/api/addAddress', function(req, res, next) {

	let token = req.headers.token
	let phone = jwt_decode(token)
	let name = req.body.name
	let tel = req.body.tel
	let province = req.body.province
	let city = req.body.city
	let district = req.body.district
	let address = req.body.address
	let isDefault = req.body.isDefault

	connection.query(`select * from user where phone = ${phone.name}`, function(error, results, fields) {
		let id = results[0].id
		let sqlInert =
			'insert into address (name,tel,province,city,district,address,isDefault,userId) values ("' +
			name + '","' + tel + '","' + province + '","' + city + '","' + district + '","' + address +
			'","' + isDefault + '","' + id + '")'
		connection.query(sqlInert, function(err, result, field) {
			res.send({
				data: {
					success: "成功"
				}
			})
		})
	})
})
//当前用户查询收货地址
router.post('/api/selectAddress', function(req, res, next) {

	let token = req.headers.token;
	let phone = jwt_decode(token);

	connection.query(`select * from user where phone = ${phone.name}`, function(error, results, fields) {
		let id = results[0].id;
		connection.query(`select * from address where userId = ${id}`, function(err, result, field) {
			res.send({
				data: result
			})
		})
	})
})
//第三发登录
router.post('/api/loginother', function(req, res, next) {
	//前端给后端的数据
	let params = {
		provider: req.body.provider, //登录方式
		openid: req.body.openid, //用户身份id
		nickName: req.body.nickName, //用户昵称
		avatarUrl: req.body.avatarUrl //用户头像
	};
	//查询数据库中有没有此用户
	connection.query(user.queryUserName(params), function(error, results, fields) {
		if (results.length > 0) {
			//数据库中存在      : 读取
			connection.query(user.queryUserName(params), function(e, r) {
				res.send({
					data: r[0]
				})
			})
		} else {
			//数据库中[不]存在  : 存储 ==>读取
			connection.query(user.insertData(params), function(er, result) {
				connection.query(user.queryUserName(params), function(e, r) {
					res.send({
						data: r[0]
					})
				})
			})
		}
	})

})
router.get('/api/addUser', function(req, res, next) {
	let params = {
		userName: req.body.userName,
		userCode: req.body.code
	};
	if (code == params.userCode) {
		connection.query(user.insertData(params), function(error, results, fields) {
			connection.query(user.queryUserName(params), function(error, results, fields) {
				res.send({
					data: {
						success: true,
						msg: '注册成功',
						data: results[0]
					}
				})
			})

		})
	}

});
//发送验证码
router.post('/api/code', function(req, res, next) {
	//前端给后端的数据
	let params = {
		userName: req.body.userName
	};
	// 短信应用 SDK AppID
	var appid = 1400187558; // SDK AppID 以1400开头
	// 短信应用 SDK AppKey
	var appkey = "dc9dc3391896235ddc2325685047edc7";
	// 需要发送短信的手机号码
	var phoneNumbers = [params.userName];
	// 短信模板 ID，需要在短信控制台中申请
	var templateId = 298000; // NOTE: 这里的模板ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请
	// 签名
	var smsSign = "三人行慕课"; // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
	// 实例化 QcloudSms
	var qcloudsms = QcloudSms(appid, appkey);
	// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
	function callback(err, ress, resData) {
		if (err) {
			console.log("err: ", err);
		} else {
			code = ress.req.body.params[0];
			res.send({
				data: {
					success: true,
					code: code
				}
			})
		}
	}
	var ssender = qcloudsms.SmsSingleSender();
	var paramss = [Math.floor(Math.random() * (9999 - 1000)) + 1000]; //发送的验证码
	ssender.sendWithParam("86", phoneNumbers[0], templateId,
		paramss, smsSign, "", "", callback);

})
// 验证码新版本测试需要签名
// router.post('/api/codesss', function(req, res, next) {
//   let params = {
//   	userName : req.body.userName
//   };
//   // 介入短信sdk
//   /* 实例化要请求产品(以sms为例)的client对象 */
//   const client = new smsClient({
//     credential: {
//     /* 必填：腾讯云账户密钥对secretId，secretKey。
//      * 这里采用的是从环境变量读取的方式，需要在环境变量中先设置这两个值。
//      * 你也可以直接在代码中写死密钥对，但是小心不要将代码复制、上传或者分享给他人，
//      * 以免泄露密钥对危及你的财产安全。
//      * SecretId、SecretKey 查询: https://console.cloud.tencent.com/cam/capi */
//       secretId: '1400712768',
//       secretKey: '9fb421d51b26915835c6b037c3e53e10',
//     },
//     /* 必填：地域信息，可以直接填写字符串ap-guangzhou，支持的地域列表参考 https://cloud.tencent.com/document/api/382/52071#.E5.9C.B0.E5.9F.9F.E5.88.97.E8.A1.A8 */
//     region: "ap-guangzhou",
//     /* 非必填:
//      * 客户端配置对象，可以指定超时时间等配置 */
//     profile: {
//       /* SDK默认用TC3-HMAC-SHA256进行签名，非必要请不要修改这个字段 */
//       signMethod: "HmacSHA256",
//       httpProfile: {
//         /* SDK默认使用POST方法。
//          * 如果你一定要使用GET方法，可以在这里设置。GET方法无法处理一些较大的请求 */
//         reqMethod: "POST",
//         /* SDK有默认的超时时间，非必要请不要进行调整
//          * 如有需要请在代码中查阅以获取最新的默认值 */
//         reqTimeout: 30,
//         /**
//          * 指定接入地域域名，默认就近地域接入域名为 sms.tencentcloudapi.com ，也支持指定地域域名访问，例如广州地域的域名为 sms.ap-guangzhou.tencentcloudapi.com
//          */
//         endpoint: "sms.tencentcloudapi.com"
//       },
//     },
//   })

//   /* 请求参数，根据调用的接口和实际情况，可以进一步设置请求参数
//    * 属性可能是基本类型，也可能引用了另一个数据结构
//    * 推荐使用IDE进行开发，可以方便的跳转查阅各个接口和数据结构的文档说明 */

//   /* 帮助链接：
//    * 短信控制台: https://console.cloud.tencent.com/smsv2
//    * 腾讯云短信小助手: https://cloud.tencent.com/document/product/382/3773#.E6.8A.80.E6.9C.AF.E4.BA.A4.E6.B5.81 */
//   const params = {
//     /* 短信应用ID: 短信SmsSdkAppId在 [短信控制台] 添加应用后生成的实际SmsSdkAppId，示例如1400006666 */
//     // 应用 ID 可前往 [短信控制台](https://console.cloud.tencent.com/smsv2/app-manage) 查看
//     SmsSdkAppId: "1400787878",
//     /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名 */
//     // 签名信息可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-sign) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-sign) 的签名管理查看
//     SignName: "腾讯云",
//     /* 模板 ID: 必须填写已审核通过的模板 ID */
//     // 模板 ID 可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-template) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-template) 的正文模板管理查看
//     TemplateId: "449739",
//     /* 模板参数: 模板参数的个数需要与 TemplateId 对应模板的变量个数保持一致，若无模板参数，则设置为空 */
//     TemplateParamSet: ["1234"],
//     /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
//      * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
//     PhoneNumberSet: [params.userName],
//     /* 用户的 session 内容（无需要可忽略）: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
//     SessionContext: "",
//     /* 短信码号扩展号（无需要可忽略）: 默认未开通，如需开通请联系 [腾讯云短信小助手] */
//     ExtendCode: "",
//     /* 国际/港澳台短信 senderid（无需要可忽略）: 国内短信填空，默认未开通，如需开通请联系 [腾讯云短信小助手] */
//     SenderId: "",
//   }
//   // 通过client对象调用想要访问的接口，需要传入请求对象以及响应回调函数
//   client.SendSms(params, function (err, response) {
//     // 请求异常返回，打印异常信息
//     if (err) {
//       console.log(err)
//       return
//     }
//     // 请求正常返回，打印response对象
//     console.log(response)
//   })

//   /* 当出现以下错误码时，快速解决方案参考
//    * [FailedOperation.SignatureIncorrectOrUnapproved](https://cloud.tencent.com/document/product/382/9558#.E7.9F.AD.E4.BF.A1.E5.8F.91.E9.80.81.E6.8F.90.E7.A4.BA.EF.BC.9Afailedoperation.signatureincorrectorunapproved-.E5.A6.82.E4.BD.95.E5.A4.84.E7.90.86.EF.BC.9F)
//    * [FailedOperation.TemplateIncorrectOrUnapproved](https://cloud.tencent.com/document/product/382/9558#.E7.9F.AD.E4.BF.A1.E5.8F.91.E9.80.81.E6.8F.90.E7.A4.BA.EF.BC.9Afailedoperation.templateincorrectorunapproved-.E5.A6.82.E4.BD.95.E5.A4.84.E7.90.86.EF.BC.9F)
//    * [UnauthorizedOperation.SmsSdkAppIdVerifyFail](https://cloud.tencent.com/document/product/382/9558#.E7.9F.AD.E4.BF.A1.E5.8F.91.E9.80.81.E6.8F.90.E7.A4.BA.EF.BC.9Aunauthorizedoperation.smssdkappidverifyfail-.E5.A6.82.E4.BD.95.E5.A4.84.E7.90.86.EF.BC.9F)
//    * [UnsupportedOperation.ContainDomesticAndInternationalPhoneNumber](https://cloud.tencent.com/document/product/382/9558#.E7.9F.AD.E4.BF.A1.E5.8F.91.E9.80.81.E6.8F.90.E7.A4.BA.EF.BC.9Aunsupportedoperation.containdomesticandinternationalphonenumber-.E5.A6.82.E4.BD.95.E5.A4.84.E7.90.86.EF.BC.9F)
//    * 更多错误，可咨询[腾讯云助手](https://tccc.qcloud.com/web/im/index.html#/chat?webAppId=8fa15978f85cb41f7e2ea36920cb3ae1&title=Sms)
//   */

// })
//注册验证手机号是否存在
router.post('/api/registered', function(req, res, next) {

	//前端给后端的数据
	let params = {
		userName: req.body.phone
	};
	//查询手机号是否存在
	connection.query(user.queryUserName(params), function(error, results, fields) {
		if (results.length > 0) {
			res.send({
				data: {
					success: false,
					msg: "手机号已经存在"
				}
			})
		} else {
			res.send({
				data: {
					success: true
				}
			})
		}
	})

})
//用户登录
router.post('/api/login', function(req, res, next) {

	//前端给后端的数据
	let params = {
		userName: req.body.userName,
		userPwd: req.body.userPwd
	}
	console.log(params);
	//查询用户名或者手机号存在不存在
	connection.query(user.queryUserName(params), function(error, results, fields) {
		console.log(results);
		if (results.length > 0) {
			connection.query(user.queryUserPwd(params), function(err, result) {
				if (result.length > 0) {
					res.send({
						data: {
							success: true,
							msg: "登录成功",
							data: result[0]
						}
					})
				} else {
					res.send({
						data: {
							success: false,
							msg: "密码不正确"
						}
					})
				}
			})
		} else {
			res.send({
				data: {
					success: false,
					msg: "用户名或手机号不存在"
				}
			})
		}
	})
});

// 商品分享前提商品详情页
router.get('/api/goods/id', function(req, res, next) {

	let id = req.query.id

	connection.query("select * from good_search where id=" + id + "", function(error, results, fields) {
		if (error) throw error;
		res.send({
			code: "0",
			data: results
		})
	});

});
// 列表
router.get('/api/goods/list', function(req, res, next) {
	res.json({
		code: 0,
		data: [{
				id: 1,
				name: "家居家纺",
				data: [{
						name: "家纺",
						list: [{
								id: 1,
								name: "毛巾/浴巾",
								imgUrl: "../../static/img/list1.jpg"
							},
							{
								id: 2,
								name: "枕头",
								imgUrl: "../../static/img/list1.jpg"
							}
						]
					},
					{
						name: "生活用品",
						list: [{
								id: 1,
								name: "浴室用品",
								imgUrl: "../../static/img/list1.jpg"
							},
							{
								id: 2,
								name: "洗晒",
								imgUrl: "../../static/img/list1.jpg"
							}
						]
					}
				]
			},
			{
				id: 2,
				name: "女装",
				data: [{
						name: "裙装",
						list: [{
								id: 1,
								name: "半身裙",
								imgUrl: "../../static/img/list1.jpg"
							},
							{
								id: 2,
								name: "连衣裙",
								imgUrl: "../../static/img/list1.jpg"
							}
						]
					},
					{
						name: "上衣",
						list: [{
								id: 1,
								name: "T恤",
								imgUrl: "../../static/img/list1.jpg"
							},
							{
								id: 2,
								name: "衬衫",
								imgUrl: "../../static/img/list1.jpg"
							}
						]
					}
				]
			}
		]
	})
});




// 搜索


router.get("/api/goods/search", function(req, res, next) {
	//desc降序     asc升序
	//获取对象的key
	let [goodsName, orderName] = Object.keys(req.query);
	//name参数的值
	let name = req.query.name;
	//orderName的key的值
	let order = req.query[orderName];

	connection.query("select * from good_search where name like '%" + name + "%' order by " + orderName + " " +
		order + "",
		function(error, results, fields) {
			if (error) throw error;
			res.send({
				code: "0",
				data: results
			})
		});

});
// 服饰内衣触底第3次
router.get('/api/index_list/2/data/3', function(req, res, next) {
	res.send({
		'code': 0,
		'data': [{
			type: "commodityList",
			data: [{
					id: 1,
					imgUrl: "../../static/img/commodity (1).jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 2,
					imgUrl: "../../static/img/commodity (1).jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 3,
					imgUrl: "../../static/img/commodity (1).jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 4,
					imgUrl: "../../static/img/commodity (1).jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				}
			]
		}]
	});
});
// 服饰内衣触底第二次
router.get('/api/index_list/2/data/2', function(req, res, next) {
	res.send({
		'code': 0,
		'data': [{
			type: "commodityList",
			data: [{
					id: 1,
					imgUrl: "../../static/img/commodity (1).jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 2,
					imgUrl: "../../static/img/commodity (1).jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 3,
					imgUrl: "../../static/img/commodity (1).jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 4,
					imgUrl: "../../static/img/commodity (1).jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				}
			]
		}]
	});
});
// 服饰内衣第一次
router.get('/api/index_list/2/data/1', function(req, res, next) {
	res.send({
		'code': 0,
		'data': [{
				type: 'bannerList',
				imgUrl: '../../static/img/banner.jpg'
			},
			{
				type: 'iconsList',
				data: [

					{
						imgUrl: '../../static/img/icon (7).jpg',
						name: '服饰内衣'
					},
					{
						imgUrl: '../../static/img/icon (8).jpg',
						name: '服饰内衣'
					},
					{
						imgUrl: '../../static/img/icon (1).jpg',
						name: '服饰内衣'
					},
					{
						imgUrl: '../../static/img/icon (4).jpg',
						name: '服饰内衣'
					},
					{
						imgUrl: '../../static/img/icon (5).jpg',
						name: '服饰内衣'
					},
					{
						imgUrl: '../../static/img/icon (6).jpg',
						name: '服饰内衣'
					},
					{
						imgUrl: '../../static/img/icon (3).jpg',
						name: '服饰内衣'
					},
					{
						imgUrl: '../../static/img/icon (2).jpg',
						name: '服饰内衣'
					},
				]
			},
			{
				type: 'hotList',
				data: [

					{
						id: 1,
						imgUrl: '../../static/img/hot (1).jpg',
						name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
						pprice: "222",
						oprice: "666",
						discount: '3.3'
					},
					{
						id: 2,
						imgUrl: '../../static/img/hot (2).jpg',
						name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
						pprice: "222",
						oprice: "666",
						discount: '3.3'
					}, {
						id: 3,
						imgUrl: '../../static/img/hot (3).jpg',
						name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
						pprice: "222",
						oprice: "666",
						discount: '3.3'
					},

				]
			},
			{
				type: 'shopList',
				data: [{
					bigUrl: '../../static/img/shop (1).jpg',
					data: [{
							id: 1,
							imgUrl: '../../static/img/commodity (1).jpg',
							name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
							pprice: "222",
							oprice: "666",
							discount: '3.3'
						},
						{
							id: 2,
							imgUrl: '../../static/img/commodity (2).jpg',
							name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
							pprice: "222",
							oprice: "666",
							discount: '3.3'
						}, {
							id: 3,
							imgUrl: '../../static/img/commodity (3).jpg',
							name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
							pprice: "222",
							oprice: "666",
							discount: '3.3'
						},
						{
							id: 4,
							imgUrl: '../../static/img/commodity (3).jpg',
							name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
							pprice: "222",
							oprice: "666",
							discount: '3.3'
						},
						{
							id: 5,
							imgUrl: '../../static/img/commodity (3).jpg',
							name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
							pprice: "222",
							oprice: "666",
							discount: '3.3'
						}


					]
				}]

			},
			{
				type: "commodityList",
				data: [{
						id: 1,
						imgUrl: "../../static/img/commodity (1).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/commodity (1).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imgUrl: "../../static/img/commodity (1).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imgUrl: "../../static/img/commodity (1).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}
		]
	});
});
// 鞋靴箱包第一次
router.get('/api/index_list/3/data/1', function(req, res, next) {
	res.send({
		'code': 0,
		'data': [{
				type: 'bannerList',
				imgUrl: '../../static/img/banner.jpg'
			},
			{
				type: 'iconsList',
				data: [

					{
						imgUrl: '../../static/img/icon (7).jpg',
						name: '鞋靴箱包'
					},
					{
						imgUrl: '../../static/img/icon (8).jpg',
						name: '鞋靴箱包'
					},
					{
						imgUrl: '../../static/img/icon (1).jpg',
						name: '鞋靴箱包'
					},
					{
						imgUrl: '../../static/img/icon (4).jpg',
						name: '鞋靴箱包'
					},
					{
						imgUrl: '../../static/img/icon (5).jpg',
						name: '鞋靴箱包'
					},
					{
						imgUrl: '../../static/img/icon (6).jpg',
						name: '鞋靴箱包'
					},
					{
						imgUrl: '../../static/img/icon (3).jpg',
						name: '鞋靴箱包'
					},
					{
						imgUrl: '../../static/img/icon (2).jpg',
						name: '鞋靴箱包'

					},
				]
			},
			{
				type: 'hotList',
				data: [

					{
						id: 1,
						imgUrl: '../../static/img/hot (1).jpg',
						name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
						pprice: "222",
						oprice: "666",
						discount: '3.3'
					},
					{
						id: 2,
						imgUrl: '../../static/img/hot (2).jpg',
						name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
						pprice: "222",
						oprice: "666",
						discount: '3.3'
					}, {
						id: 3,
						imgUrl: '../../static/img/hot (3).jpg',
						name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
						pprice: "222",
						oprice: "666",
						discount: '3.3'
					},

				]
			},
			{
				type: 'shopList',
				data: [{
					bigUrl: '../../static/img/shop (1).jpg',
					data: [


						{
							id: 1,
							imgUrl: '../../static/img/commodity (1).jpg',
							name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
							pprice: "222",
							oprice: "666",
							discount: '3.3'
						},
						{
							id: 2,
							imgUrl: '../../static/img/commodity (2).jpg',
							name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
							pprice: "222",
							oprice: "666",
							discount: '3.3'
						}, {
							id: 3,
							imgUrl: '../../static/img/commodity (3).jpg',
							name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
							pprice: "222",
							oprice: "666",
							discount: '3.3'
						},
						{
							id: 4,
							imgUrl: '../../static/img/commodity (3).jpg',
							name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
							pprice: "222",
							oprice: "666",
							discount: '3.3'
						},
						{
							id: 5,
							imgUrl: '../../static/img/commodity (3).jpg',
							name: '鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
							pprice: "222",
							oprice: "666",
							discount: '3.3'
						}


					]
				}]

			},
			{
				type: "commodityList",
				data: [{
						id: 1,
						imgUrl: "../../static/img/commodity (1).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/commodity (1).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imgUrl: "../../static/img/commodity (1).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imgUrl: "../../static/img/commodity (1).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}
		]
	});
});
// 首页
router.get("/api/index_list/data", function(req, res, next) {
	res.send({
		"code": 0,
		"data": {
			topBar: [{
					id: 1,
					name: '推荐'
				},
				{
					id: 2,
					name: '服饰内衣'
				},
				{
					id: 3,
					name: '鞋靴箱包'
				},
				{
					id: 4,
					name: '美妆个护'
				},
				{
					id: 5,
					name: '家居数码'
				},
				{
					id: 6,
					name: '食品母婴'
				}
			],
			data: [{
					type: "swiperList",
					data: [{
							imgUrl: '../../static/img/swiper00.jpg'
						},
						{
							imgUrl: '../../static/img/swiper01.jpg'
						},
						{
							imgUrl: '../../static/img/swiper02.jpg'
						}
					]
				},
				{
					type: "recommendList",
					data: [{
							bigUrl: "../../static/img/body.jpg",
							data: [{
									imgUrl: "../../static/img/maoyi.jpg"
								},
								{
									imgUrl: "../../static/img/sahngyi.jpg"
								},
								{
									imgUrl: "../../static/img/qunzi.jpg"
								}
							]
						},
						{
							bigUrl: "../../static/img/run.jpg",
							data: [{
									imgUrl: "../../static/img/beizi.jpg"
								},
								{
									imgUrl: "../../static/img/zhentou.jpg"
								},
								{
									imgUrl: "../../static/img/xiezi.jpg"
								}
							]
						}
					]
				},
				{
					type: "commodityList",
					data: [{
							id: 1,
							imgUrl: "../../static/img/commodity (1).jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 2,
							imgUrl: "../../static/img/commodity (1).jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 3,
							imgUrl: "../../static/img/commodity (1).jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 4,
							imgUrl: "../../static/img/commodity (1).jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						}
					]
				}
			]
		}
	})
});


module.exports = router;
