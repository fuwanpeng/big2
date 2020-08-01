$(function () {
    $('#goreg').on('click', function () {
        $('.line-login').hide()
        $('.line-reg').show()
    })
    $('#gologin').on('click', function () {
        $('.line-login').show()
        $('.line-reg').hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if (value !== $('#form_reg [name=password]').val()) {
                return '两次密码不一致'
            }
        }
    })

    // 注册表单提交
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#form_reg')[0].reset()
                $('#gologin').click()
            }
        })
    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})