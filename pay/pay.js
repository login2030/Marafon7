/* global Vue, swal */
window.addEventListener('load', function() {
	Vue.component('pay', {
		template: '#tpl-pay',
		data: function() {
			var settings = {
				start: '15 марта 2017 года',
				mail: 'ol-la.la900@yandex.ru'
			};
			var data = 'Данные не получены';
			var ya = 'Яндекс.Деньги';
			var sb = 'Банковская карта';
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
				settings: settings,
				header: 'Онлайн марафон',
				subheader: 'Красивые привычки. Красивое тело',
				data: data,
				pays: [
					{
						name: ya,
						img: 'https://www.walletone.com/logo/provider/YandexMoneyRUB.png?type=pt',
						form: '<iframe frameborder="0" allowtransparency="true" scrolling="no" src="https://money.yandex.ru/quickpay/button-widget?account=410013792146732&quickpay=small&yamoney-payment-type=on&button-text=02&button-size=l&button-color=orange&targets=Marafon7-' + data.info['Цена'] + '&default-sum=' + data.info['Цена'] + '&mail=on&successURL=http%3A%2F%2Fmarafon7.ru%2Fpay%2Fsuccess" width="190" height="48"></iframe>'
					},
					{
						name: sb,
						img: 'https://www.walletone.com/logo/provider/CreditCardRUB.png?type=pt',
						form: '<iframe frameborder="0" allowtransparency="true" scrolling="no" src="https://money.yandex.ru/quickpay/button-widget?account=410013792146732&quickpay=small&any-card-payment-type=on&button-text=02&button-size=l&button-color=orange&targets=Marafon7-' + data.info['Цена'] + '&default-sum=' + data.info['Цена'] + '&mail=on&successURL=http%3A%2F%2Fmarafon7.ru%2Fpay%2Fsuccess" width="190" height="48"></iframe>'
					}
				]
			};
		},
		// mounted: function() {
		// 	$(this.$el).find('.js-materialbox').materialbox();
		// },
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