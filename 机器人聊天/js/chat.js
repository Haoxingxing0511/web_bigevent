$(function() {
    //重置滚动条位置
    // resetui()

    //给发送按钮绑定点击事件
    $('#btnSend').on('click', function() {
        $('#ipt').val().trim()
        if (Text.length <= 0) {
            return $('#ipt').val('')
        }

        //如果用户输入了聊天内容，就把聊天内容追加到聊天页面上去
        $('#talk_list').append('<li class="right_word"> <img src = "img/person02.png"alt = "" > < span > + text + < /span> </li>')
        $('#ipt').val('')
            //重置滚动条位置
        // resetui()
		getMsg(text)
    })
	
	
	function getMsg(text) {
		$.ajax({
			method:'GET',
			url:'',
			data :{
				spoken: text
			},
			success: function (res) {
				if (res.message === 'success') {
					var msg = res.data.info.text
					$('#talk_list').append('<li class="left_word"><img src="img/person01.png" alt=""><span> 嗨，最近想我了没？</span></li>')
					//重置滚动条位置
					// resetui()
					getVoice()
				}
			}
		})
	}
	//机器人自动回复
	function getVoice(text) {
		$.ajax({
			method: 'GET',
			url:'',
			data: {
				text: text
			},
			success: function (res) {
				if (res.status === 200) {
					$('#voice').attr('src',res.voiceUrl)
				}
			}
		})
	}
	
	//回车发送信息
	$('#ipt').on('keyup', function(e) {
		e.keyCode
		if(e.keyCode ===13) {
			$('#btnSend').click()
		}
	})
	
})