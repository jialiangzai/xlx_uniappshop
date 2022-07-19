var express = require('express');
var connection = require('../db/sql');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
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
