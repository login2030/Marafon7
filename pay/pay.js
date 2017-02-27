/* global Vue, swal */
window.addEventListener('load', function() {
	Vue.component('pay', {
		template: '#tpl-pay',
		data: function() {
			var data = 'Данные не получены';
			var ya = 'Яндекс.Деньги';
			var sb = 'Сбербанк ОнЛ@йн';
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
							text: 'Зайдите в Яндекс.Деньги <a target="_blank" href="https://money.yandex.ru" class="color-tomato">Яндекс.Деньги</a>',
							img: 'ya-1.jpg'
						},
						{
							text: 'Внимательно проверьте все данные:'+
							'<p>- Зайдите в "Переводы". Проверьте, хватает ли Вам средств, для оплаты выбранного пакета</p>'+
							'<p>- В поле <b>Куда</b> выберите <b class="color-tomato">На любой кошелек</b></p>'+
							'<p>- В поле <b>Кошелек, телефон или почта</b> введите номер кошелька <b class="color-tomato">410013792146732</b></p>'+
							'<p>- В поле <b>Сумма</b> введите <b class="color-tomato">' + data.info['Цена'] + 'руб</b></p>'+
							'<p>- Нажмите кнопку <b>Продолжить</b></p>'+
							'',
							img: data.info['Цена'] + '-ya-2.jpg'
						},
						{
							text: 'Еще раз проверьте, все ли правильно. Нажмите кнопку <b>Заплатить</b>',
							img: 'ya-3.jpg'
						},
						{
							text: 'Если Вы все сделали правильно, покажется этот экран',
							img: 'ya-4.jpg'
						},
						{
							text: 'Для завершения процесса оплаты в форме, которая находится ниже укажите свой <b class="color-tomato">Email</b> и <b class="color-tomato">Номер кошелька</b>.' +
							'<p>На указанную Вами почту будет выслано письмо с дальнейшими инструкциями</p>',
							img: 'ya-5.jpg'
						}
					],
					[sb]: [
						{
							text: 'Stxt1',
							img: 'sb-1.jpg'
						},
						{
							text: 'txt2',
							img: 'sb-2.jpg'
						},
						{
							text: 'txt3',
							img: 'sb-3.jpg'
						},
					]
				},
			};
		},
		mounted: function() {
			$(this.$el).find('.js-materialbox').materialbox();
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
			},
			getInstructionInfo: function(i, txt) {
				return ++i + ') ' + txt;
			},
			// getImgSrc: function(image, prefix) {
			// 	return prefix ? 'img/' + this.data.imgPrefix + image : 'img/' + image;
			// }
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