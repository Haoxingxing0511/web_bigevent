$(function() {
    // 点击“去注册”的连接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    // 点击“去登录”的连接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 从 layui 中获取 form对象
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function(value) {
            // 通过形参拿到的是确认密码的内容，还要拿到密码框的内容，然后进行一次等于的判断 ，如果判断失败，则return一个提示消息
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致!';
            }
        },
    });


    // 监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.post('http://ajax.frontend.itheima.net/api/reguser', {
            username: '$(',
            #: form_reg[name = username],
            ').val()': ,
            password: '$(',
            #: form_reg[name = password],
            ').val()':
        }, function(res) {
            if (res.status !== 0) {
                return console.log(res.message);
            }
            console.log('注册成功！');
        });
    });
});