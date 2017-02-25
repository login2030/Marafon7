/* global Vue, swal */
window.addEventListener('load', function() {
	var ya = 'Яндекс.Деньги';
	var sb = 'Сбербанк ОнЛ@йн';
	Vue.component('pay', {
		template: '#tpl-pay',
		data: function() {
			var data = 'Данные не получены';
			switch (getUrlVars().package) {
				case '2':
					data = {
						info: {
							'Товар': 'пакет СТАНДАРТНЫЙ',
							'Цена': 1190
						}
					};
					break;
				case '3':
					data = {
						info: {
							'Товар': 'пакет ОПТИМАЛЬНЫЙ',
							'Цена': 1890
						}
					};
					break;
					// Если любой другой, то будет показан шаблон оплаты для недельного курса
				default:
					data = {
						info: {
							'Товар': 'пакет НЕДЕЛЬНЫЙ',
							'Цена': 390
						}
					};
					break;
			}
			return {
				header: 'Онлайн марафон',
				subheader: 'Красивые привычки. Красивое тело',
				emailRE: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				ya: 'Яндекс.Деньги',
				sb: 'Сбербанк ОнЛ@йн',
				data: data,
				pays: [
					{
						name: ya,
						img: 'https://www.walletone.com/logo/provider/YandexMoneyRUB.png?type=pt'
					},
					{
						name: sb,
						img: 'https://www.walletone.com/logo/provider/SberOnlineRUB.png?type=pt'
					}
				],
				form: {
					email: '',
					transaction: ''
				},
				hint: false,
				paysInfo: {
					[ya]: [
						{
							text: 'Ytxt1',
							img: 'img1'
						},
						{
							text: 'txt2',
							img: 'img2'
						},
						{
							text: 'txt3',
							img: 'img3'
						},
					],
					[sb]: [
						{
							text: 'Stxt1',
							img: 'img1'
						},
						{
							text: 'txt2',
							img: 'img2'
						},
						{
							text: 'txt3',
							img: 'img3'
						},
					]
				},
			};
		},
		computed: {
			validation: function() {
				return {
					email: this.emailRE.test(this.form.email),
					transaction: !!this.form.transaction.trim()
				};
			},
			isValid: function() {
				var validation = this.validation;
				return Object.keys(validation).every(function(key) {
					return validation[key];
				});
			}
		},
		methods: {
			sendForm: function(e) {
				var that = this;
				if (this.isValid) {
					$.ajax({
						type: 'POST',
						url: '../data.php',
						data: {
							email: that.form.email,
							transaction: that.form.transaction
						},
						success: function(data) {
							$.ajax({
								type: 'POST',
								url: '../email.php',
								data: {
									email: that.form.email,
								},
								success: function(data) {
									swal(
										'<span class="roboto-700 color-black">Ваша оплата подтверждена!</span>',
										'<span class="roboto-400 color-black">На почту <span class="color-tomato">' + that.form.email + '</span>' + ' отправлено письмо с дальнейшими инструкциями</span>',
										'success'
									);
									that.form.email = '';
									that.form.transaction = '';
								},
								error: function(xhr, type) {
									swal(
										'Произошла ошибка!',
										'Для получения дальнейших инструкций напишите письмо на почту - <a href="mailto:ol-la.la900@yandex.ru">ol-la.la900@yandex.ru</a>',
										'error'
									);
									console.error(xhr, type);
								}
							});
						},
						error: function(xhr, type) {
							swal(
								'Произошла ошибка!',
								'Для получения дальнейших инструкций напишите письмо на почту - <a href="mailto:ol-la.la900@yandex.ru">ol-la.la900@yandex.ru</a>',
								'error'
							);
							console.error(xhr, type);
						}
					});
				}
			}
		}
	});
	new Vue({
		el: '#app'
	});
});
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value;
	});
	return vars;
}