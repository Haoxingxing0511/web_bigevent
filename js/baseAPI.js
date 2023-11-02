// 每次调用 $.get() / $.post() / $,ajax()时，会先调用这个函数
// 在这个函数中，可以拿到我们给AJAX提供的配置对象
$.ajaxPrefilter(function(options) {
	//在发起真正的ajax之前，统一拼接请求的根路劲
	options.url = 'http://ajax.frontend.itheima.net' + options.url
	console.log(options.url);
})