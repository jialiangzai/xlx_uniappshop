var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/api/index_list/data",function(req,res,next){
	res.send({
		"code":0,
		"data":{
			topBar:[
				{id:1,name:'推荐'},
				{id:2,name:'运动户外'},
				{id:3,name:'服饰内衣'},
				{id:4,name:'鞋靴箱包'},
				{id:5,name:'美妆个护'},
				{id:6,name:'家居数码'},
				{id:7,name:'食品母婴'}
			],
			data:[
				{
					type:"swiperList",
					data:[
						{imgUrl:'../../static/img/swiper00.jpg'},
						{imgUrl:'../../static/img/swiper01.jpg'},
						{imgUrl:'../../static/img/swiper02.jpg'}
					]
				},
				{
					type:"recommendList",
					data:[
						{
							bigUrl:"../../static/img/body.jpg",
							data:[
								{imgUrl:"../../static/img/maoyi.jpg"},
								{imgUrl:"../../static/img/sahngyi.jpg"},
								{imgUrl:"../../static/img/qunzi.jpg"}
							]
						},
						{
							bigUrl:"../../static/img/run.jpg",
							data:[
								{imgUrl:"../../static/img/beizi.jpg"},
								{imgUrl:"../../static/img/zhentou.jpg"},
								{imgUrl:"../../static/img/xiezi.jpg"}
							]
						}
					]
				},
				{
					type:"commodityList",
					data:[
						{
							id:1,
							imgUrl:"../../static/img/commodity (1).jpg",
							name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice:"299",
							oprice:"659",
							discount:"5.2"
						},
						{
							id:2,
							imgUrl:"../../static/img/commodity (1).jpg",
							name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice:"299",
							oprice:"659",
							discount:"5.2"
						},
						{
							id:3,
							imgUrl:"../../static/img/commodity (1).jpg",
							name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice:"299",
							oprice:"659",
							discount:"5.2"
						},
						{
							id:4,
							imgUrl:"../../static/img/commodity (1).jpg",
							name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice:"299",
							oprice:"659",
							discount:"5.2"
						}
					]
				}
			]
		}
	})
});


module.exports = router;
