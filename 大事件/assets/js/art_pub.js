$(function() {
	var layer = layui.layer
	var form = layui.form
	
	// 获取裁剪区域的 DOM 元素
	var $image = $('#image')
	    // 1配置选项
	const options = {
	    // 纵横比
	    aspectRatio: 1,
	    // 指定预览区域
	    preview: '.img-preview'
	}
	
	// 创建裁剪区域
	$image.cropper(options)
	
	initCate()
	// 初始化富文本编辑器
	//initEditor()
	
	//定义加载文章分类的方法
	function initCate() {
		$.ajax({
			method:'GET',
			url: '/my/article/cates',
			success: function(res)  {
				if (res.status !== 0) {
					return layer.msg('初始化文章分类列表失败！')
				}
				//调用模板引擎
				var htmlStr = template('tol-cate', res)
				$('[name=cate_id]').html(htmlStr)
				
				form.render()
			}
		})
	}
	
	//为选择封面按钮绑定点击事件
	$('#btnChooseImage').on('click', function() {
		$('#coverFile').click()
	})
	
	//为文件选择框绑定 change 事件
	 $('#coverFile').on('change', function(e){
		 console.log(e);
		 //获取用户选择的文件
		 var filelist = e.target.files
		 if(filelist.length === 0) {
			 return layer.msg('请选择照片！')
		 }
		 
		 //1、拿到用户选择的文件
		 var file = e.target.files[0]
		//2、根据选择的文件，创建一个对应的 URL 地址：
		var newImgURL = URL.createObjectURL(file)
		//3、先销毁旧的裁剪区域，再重新设置图片路径，之后再创建``新``的``裁剪区域：
		//arduino复制代码
		$image
		   .cropper('destroy')      // 销毁旧的裁剪区域
		   .attr('src', newImgURL)  // 重新设置图片路径
		   .cropper(options)        // 重新初始化裁剪区域
	 })
	 
	 // 定义文章的发布状态
	 var art_state = '已发布'
	 
	 // 为存为草稿按钮，绑定点击事件处理函数
	 $('#btnSave2').on('click', function() {
		 art_state = '草稿'
	 })
	 
	 //为表单绑定 submit 提交事件
	 $('#form-pub').on('submit', function(e) {
		 //1.阻止表单的默认提交行为
		 e.preventDefault()
		 // 2.基于 form 表单，快速创建一个 FormData 对象
		 var fd = new FormData($(this)[0])
		 //3.将文章的发布状态，存到 fd 中
		 fd.append('state', art_state)
		 
		//4.将用户裁剪之后的图片，输出为一个文件对象
		$image
		      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
		        width: 400,
		        height: 280
		      })
		      .toBlob(function(blob){
				// 将 Canvas 画布上的内容，转化为 文件对象
				
				// 得到文件对象后,进行后续的操作
				
				//5.将文件对象，存储到 fd 中
				fd.append('cover_img', blob)
				//6.发起 ajax 请求
				publishArticle()
			  })       
		 
	 })
	 
	 // 定义一个发布文章的方法
	 function publishArticle(fd) {
		 $.ajax({
			 method: 'POST',
			 url: '/my/article/add',
			 data: fd,
			 //如果提交的是 FormData 格式的数据，就必须添加下面两个配置项
			 contentType: false,
			 processData: false,
			 success: function (res) {
				 if (res.status !== 0) {
				 	return layer.msg('发布文章失败！')
				 }
				 layer.msg('发布文章成功！')
				 //发布文章成功后跳转至文章列表页面
				 location.href = '/article/art_list.html'
			 }
		 })
	 }
	
})