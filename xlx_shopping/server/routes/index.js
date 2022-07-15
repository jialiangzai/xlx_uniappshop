var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});
// 服饰内衣
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
// 服饰内衣
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
