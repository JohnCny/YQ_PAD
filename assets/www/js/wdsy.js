
//我的首页
function mywdsy(){
	window.scrollTo(0,0);//滚动条回到顶端
	var get = crud.dom.factory("GET");
	wsCustManager ="/ipad/user/findSysUserMsg.json";
	var url = wsCustManager+"?userId="+window.sessionStorage.getItem("userId");
	get.doGet(url,initCustManagerContentCallback,"加载客户经理信息失败！");
	function initCustManagerContentCallback(json){
		var objs = $.evalJSON(json);
		var im="<div class='box wdsy4' onclick='tz()'><img src='images/tz.png'/><span>通知</span></div>";
		var locationType="<div class='box wdsy5' onclick ='mymap()'><img src='images/wdzj.png'/><span>位置信息</span></div>";
		var gett = crud.dom.factory("GETT");
		wsNotifiyMessage ="/ipad/custAppInfo/notifiyMessageNum.json";
		var url = wsNotifiyMessage+"?userId="+window.sessionStorage.getItem("userId")+"&userType="+window.sessionStorage.getItem("userType");
		gett.doGet(url,initNotifiyMessageContentCallback,"加载通知信息失败！");
		function initNotifiyMessageContentCallback(json){
			var obj = $.evalJSON(json);
			if(obj.sum!=0){
				im="<div class='box wdsy4' onclick='tz()'><img src='images/tz11.png'/><span>通知</span></div>";
			}
		}	
		if(objs.result.age==null){
			objs.result.age="";
		}
		
		if(window.sessionStorage.getItem("LocationType")=="H5"){
			locationType="<div class='box wdsy5' onclick='wzxx()'><img src='images/wdzj.png'/><span>位置信息</span></div>"
		}
		
		var zhiwei="客户经理";
		if(window.sessionStorage.getItem("userType")==5){
			zhiwei="风险岗";
		}else if(window.sessionStorage.getItem("userType")==0){
			zhiwei="系统管理员";
		}else if(window.sessionStorage.getItem("userType")==4){
			zhiwei="微贷团队";
		}else if(window.sessionStorage.getItem("userType")==3){
			zhiwei="机构主管";
		}else if(window.sessionStorage.getItem("userType")==2){
			zhiwei="部门主管";
		}
		
		var content = "<div class='title'>我的首页</div>"+ 
		"<div class='content'>" +
		"<div class='user-info'>" +
		"<img src='images/sq.jpg'/>"+
		"<p class='h2'>客户经理信息</p>"+
		"<p>姓名："+objs.result.name+"</p>"+
		"<p>性别："+objs.result.sex+"</p>"+
		"<p>年龄："+objs.result.age+"</p>"+
		"<p>所属银行："+objs.result.org+"</p>"+
		"<p>客户经理编号："+objs.result.externalId+"</p>"+
		"<p>职位："+zhiwei+"</p>"+
		"</div>"+
		"</div>";
		
		$("#mainPage").html(content);
		$("#nimei").html("上次登录时间：<br/>"+objs.LastLogin);
		$(".right").hide();
		$("#mainPage").show();
	}
}


//function xxxxx(){
//	window.plugins.GpsToBd09llPlugin.startActivity(succs,wrongs,"","get");
////	window.location.href="file:///android_asset/www/map.html";
////	window.location.href="bdapp://map/marker?location=40.05740665572,116.2964407172&title=Marker&content=makeamarker&traffic=on";
////	window.plugins.CoordinateTranslatePlugin.startActivity(succ,wrong,ss);
//}
//function wrongs(ob){
//	alert("111"+ob);
//}
//function succs(ob){
//	alert(ob);
////		alert("---"+ob.Longitude+"-----"+ob.Longitude);
//}
//客户进件信息
function khjjxx(){
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mywdsy()'/>客户进件信息</div>"+  
			"<div class='content'>" +
			"<div id='ex_1' class='zingchart'></div>"+ 
			"<div class='ban'></div>"+
			"<p>" +
			/*	"<input type='button' class='tab-button' style='margin-left:40px;' value='补充进件' onclick='bcjj()'/>" +
								"<input type='button' class='tab-button' value='拒绝进件' onclick='jjjj()'/>" +*/
			"<input type='button' class='tab-button' value='查看详情' onclick='jjxxlb()'/>" +
			"</p>" +
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
}
function pie() {
	var get = crud.dom.factory("GET");
	var userId = window.sessionStorage.getItem("userId");
	var userType = window.sessionStorage.getItem("userType");
//	wsAppInfo ="/ipad/custAppInfo/browse1.json?userId="+userId;
	wsAppInfo ="/ipad/custAppInfo/browse1.json?userId="+userId+"&userType="+userType;
	var url = wsAppInfo;
	get.doGet(url,initAppInfoManagerContentCallback,"加载进件信息失败！");
	function initAppInfoManagerContentCallback(json){
		var obj = $.evalJSON(json);
		// example one data
		var ex1 = {                         
				"type": "pie",
				"legend":{},
				"backgroundColor":"#fff",
				"series": [
				           {   
				        	   "backgroundColor":"#e62163","text": "拒绝进件数量  "+obj.result.refuseNum,"values": [obj.result.refuseNum]
				           },
				           {   
				        	   "backgroundColor":"#4e74c0","text": "审核通过数量  "+obj.result.approvedNum,"values": [obj.result.approvedNum]
				           },
				           {   
				        	   "backgroundColor":"#edd400","text": "进件总数 "+obj.sums
				           }
				           ]
		};
		// render example one
		$('#ex_1').zingchart({
			data:ex1
		}); 
	}
}
//客户进件信息列表
function jjxxlb(){
	var userId = window.sessionStorage.getItem("userId");
	var userType = window.sessionStorage.getItem("userType");
	var jjcxurl="/ipad/customerIntopiece/browse.json";
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var head ="<tr>"+                             
	"<th></th>"+  
	"<th>客户姓名</th>"+
	"<th>产品名称</th>"+
	"<th>申请金额</th>"+
	"<th>审贷金额</th>"+
	"<th>合同金额</th>"+
	"<th>证件号码</th>"+
	"<th>审核状态</th>"+
	"<th>节点名称</th>"+
	"<th>退回原因</th>"+
	"<th>拒绝原因</th>"+
	"</tr>";
	$.ajax({
		url:wsHost + jjcxurl,
		type: "GET",
		dataType:'json',
		data:{
			userId: userId,
			userType:userType,
		},
		success: function (json) {
			obj = $.evalJSON(json);
			for(var i = 0;i<obj.items.length;i++){
				if(obj.items[i].status=="save"){
					obj.items[i].status="未申请";
				}else if(obj.items[i].status=="audit"){
					obj.items[i].status="已申请";
				}else if(obj.items[i].status=="returnedToFirst"){
					obj.items[i].status="退回至客户经理";
				}else if(obj.items[i].status=="end"){
					obj.items[i].status="放款成功";
				}else if(obj.items[i].status=="nopass"){
					obj.items[i].status="申请未通过";
				}else if(obj.items[i].status=="refuse"){
					obj.items[i].status="被拒接";
				}else if(obj.items[i].status=="approved"){
					obj.items[i].status="审批结束";
				}else if(obj.items[i].status=="succeed"){
					obj.items[i].status="申请成功";
				}
				tmp=tmp+"<tr onclick='check(this)'>"+
				"<td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.items[i].chineseName+"@"+
				obj.items[i].productName+"@"+obj.items[i].id+"@"+obj.items[i].customerId+"@"+obj.items[i].productId+"@"+obj.items[i].status+"'"+"/>"+"</span></td>"+
				"<td>"+obj.items[i].chineseName+"</td>"+
				"<td>"+obj.items[i].productName+"</td>"+
				"<td>"+obj.items[i].applyQuota+"</td>"+
				"<td>"+obj.items[i].finalApproval+"</td>"+
				"<td>"+obj.items[i].reqlmt+"</td>"+
				"<td>"+obj.items[i].cardId+"</td>"+
				"<td>"+obj.items[i].status+"</td>"+
				"<td>"+obj.items[i].nodeName+"</td>"+
				"<td>"+obj.items[i].fallBackReason+"</td>"+
				"<td>"+obj.items[i].refusqlReason+"</td>"+
				"</tr>";

				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}
			result[j]=tmp;
			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='khjjxx();pie()'/>客户进件信息-进件详情</div>"+ 
					"<div class='content'>"+
					"<table class='cpTable' id='llll' style='text-align:center;'>"+
					head+result[page]+
					"</table>"+
					"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
					"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
					"<input type='button' class='btn btn-large btn-primary' value='补充调查' id = 'bcdc'/>"+
					"<input type='button' class='btn btn-large' value='返回' onclick='khjjxx();pie()'/></p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();
			$("#xyy").click(function(){
				page=page+1;
				if(result[page]){
					$("#llll").html(head+result[page]);
				}else{
//					alert("当前已经是最后一页");
					window.wxc.xcConfirm("当前已经是最后一页", "info");
					page=page-1;
				}
			})
			$("#syy").click(function(){
				page=page-1;
				if(result[page]){
					$("#llll").html(head+result[page]);
				}else{
//					alert("当前已经是第一页");
					window.wxc.xcConfirm("当前已经是第一页", "info");
					page = page+1;
				}
			})
			$("#bcdc").click(function(){
			if ($("input[type='radio']").is(':checked')) {
				var values =$('input[name="checkbox"]:checked').attr("value").split("@");
             if(values[5]=="退回至客户经理"){
			var res={};
			res.appId=values[2];
			res.customerId=values[3];
			res.productId=values[4];
			bcdcimage(res);
                }else{
                	window.wxc.xcConfirm("进件状态非退回不能补充资料", "info");
                }
			}else{
//				alert("请选择一行");
				window.wxc.xcConfirm("请选择一行", "warning");
			}

		})
		}
	})
}   
//补充调查
function bcdcimage(res){
	
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title' onclick='jjxxlb()'><img src='images/back.png'/>客户进件列表-补充调查</div>"+  
			"<div class='content' style='text-align:center;'>" + 
								"<table id='qtyxzl' class='cpTable' style='text-align:center;margin-top:20px;'>"+
									"<tr>"+    
										"<th style='width:40px;'>序号</th>"+ 
										"<th>文件路径</th>"+
										"<th>操作</th>"+
									"</tr>"+
									"<tr>"+  
										"<td>1</td>"+
										"<td><input type='text' id='qtyxzl_sheet1' name='imageuri' uri='' class='readonly' readonly='readonly'/><input type='button' class='btn' onclick='getMedia(\"qtyxzl_sheet1\",\"img\",\"imageuri\",\"1\");' value='选择文件'/></td>"+
										"<td><img src='images/ugc_icon_type_photo.png' id ='takepucture'/></td>"+
//										"<td><img src='images/ugc_icon_type_photo.png' onclick='capturePhoto(\"fcz_sheet1\",\"img\",\"imageuri\");'/></td>"+
									"</tr>"+
								"</table>"+
								"<p class='Left'>" +
								"<button class='add-button' onclick='addTd(\"qtyxzl\")'><img src='images/add.png'/></button>" +
								"<button class='add-button' onclick='removeTd(\"qtyxzl\")'><img src='images/del.png'/></button>" +
								"</p>"+
								"<p>" +
								"<input type='button' class='btn btn-primary btn-large' value='确定' id='sure' />" +
								"<input type='button' class='btn btn-primary btn-large' value='查看已上传列表' id='ysctplb' />" +
								"<input type='button' class='btn btn-large' value='返回' id='back' onclick='jjxxlb()'/>" +
								"</p>"+
							"</div>");
	  $(".right").hide();
	  $("#mainPage").show();
	  $("#sure").click(function(){
		  window.wxc.xcConfirm("是否开始上传影像资料","confirm",{onOk:sckss});
		  function sckss(){
		  var num= $('#qtyxzl tr').length;
		  show_upload(0);
		  for(var i=0;i<num;i++){
		 var fileURI = document.getElementsByName("imageuri")[i].getAttribute("uri");
		 var j=i+1;
		 var fileName = $("#qtyxzl_sheet"+j).val();
		 var options = new FileUploadOptions();  
		    options.fileKey = "file";  
		    options.fileName = fileName; 
		    options.mimeType = "multipart/form-data";  
		    options.chunkedMode = false;  
		    ft = new FileTransfer();  
		    var uploadUrl=encodeURI(wsHost+"/ipad/addIntopieces/imageImport.json?productId="+res.productId+"&customerId="+res.customerId+"&fileName="+options.fileName+"&applicationId="+res.appId);  
		    $("#uploadInfo").html("正在上传第"+(i+1)+"张，请稍后...");
		    ft.upload(fileURI,uploadUrl,uploadSuccess, uploadFailed, options); 
		  }
		  }
	  })
	  $("#ysctplb").click(function(){
		  bcdcimagelb(res);
	  })
//	  /** 
//	   * 上传成功回调. 
//	   * @param r 
//	   */ 
//	  function uploadSuccesss(r) { 
//	  	var obj = $.evalJSON(r.response);
////	  	hide_upload();
//	  	if(obj.success==false){
//	  	if(obj.message=="001"){
////	  		alert("调查模板不一致！导入失败！");
//	  		$("#uploadInfo").html("调查模板不一致！导入失败！");
//	  		 $("#diss").attr('disabled',false);
//	  		 $("#sure").attr('disabled',false);
//	  	}else{
////	  		alert("导入失败！");
//	  		$("#uploadInfo").html("导入失败！");
//	  		 $("#diss").attr('disabled',false);
//	      $("#sure").attr('disabled',false);
//	  	}
//	  	}else{
////	  		alert("导入成功！");
//	  		$("#uploadInfo").html("导入成功！");
//	  		 $("#diss").attr('disabled',false);
//	  		 $("#sure").attr('disabled',false);
//	  	}
//	  	 clearProcess();
//	  }  
//
//	  /** 
//	   * 上传失败回调. 
//	   * @param error 
//	   */  
//	  function uploadFaileds(error) {  
////	  	hide_upload();
////	      alert('文件上传失败'); 
//	      $("#uploadInfo").html("导入失败！");
//	      $("#diss").attr('disabled',false);
//	      $("#sure").attr('disabled',false);
//	      clearProcess();  
//	      
//	  } 
}
//补充调查已上传列表
function bcdcimagelb(res){
	var ysctpurl ="/ipad/JnpadImageBrowse/uploadYx.json";
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var head="<tr>"+                         
	"<th></th>"+                 
	"<th>文件名</th>"+  
	"<th>产品名称</th>"+
	"<th>客户名称</th>"+
	"<th>上传时间</th>"+
	"</tr>";
	$.get(wsHost+ysctpurl,{customerId:res.customerId,productId:res.productId,applicationId:res.appId},callbackfunction);
	function  callbackfunction (json){
		obj = $.evalJSON(json);
		for(var i = 0;i<obj.imagerList.length;i++){

			tmp=tmp+"<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.imagerList[i].id+"@"+
			obj.imagerList[i].applicationId+"'/>"+"</span></td>"+  
			"<td>"+obj.imagerList[i].attachment+"</td>"+
			"<td>"+obj.imagerList[i].productName+"</td>"+
			"<td>"+obj.imagerList[i].customerName+"</td>"+
			"<td>"+obj.imagerList[i].createdTime+"</td></tr>"

			if((i+1)%5==0){
				result[j]=tmp;
				j++;
				tmp="";
			}
		}

		result[j]=tmp;

		window.scrollTo(0,0);//滚动条回到顶端
		$("#mainPage").html("<div class='title'><img src='images/back.png' id='backs'/>已上传图片列表</div>"+  
				"<div class='content'>" +                        
				"<table id='bzsplb' class='cpTable jjTable' style='text-align:center;'>"+
				head+result[page]+
				"</table>"+
				"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
				"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
				"<input type='button' class='btn btn-large btn-primary' value='查看' id = 'browse'/>"+
				"<input type='button' class='btn btn-primary btn-large' value='删除' id='delete' />" +
				"<input type='button' class='btn btn-large' value='返回' id='backk'/></p>"+
		"</div>");
		$(".right").hide();
		$("#mainPage").show();  
		$("#xyy").click(function(){
			page=page+1;
			if(result[page]){
				$("#bzsplb").html(head+result[page]);
			}else{
//				alert("当前已经是最后一页");
				window.wxc.xcConfirm("当前已经是最后一页", "info"); 
				page=page-1;
			}
		})
		$("#syy").click(function(){
			page=page-1; 
			if(result[page]){
				$("#bzsplb").html(head+result[page]);
			}else{
//				alert("当前已经是第一页");
				window.wxc.xcConfirm("当前已经是第一页", "info"); 
				page = page+1;
			}
		})

		$("#backk").click(function(){
			bcdcimage(res);
		})
		$("#backs").click(function(){
			bcdcimage(res);
		})
		$("#browse").click(function(){
			if ($("input[type='radio']").is(':checked')) {

				var values =$('input[name="checkbox"]:checked').attr("value").split("@");
				res.imageId=values[0];
				res.back="bcdcimage";
				browseimage(res);
			}else{
//				alert("请选择一行");
				window.wxc.xcConfirm("请选择一行", "warning");
			}	
		})
		$("#delete").click(function(){
			if ($("input[type='radio']").is(':checked')) {

				var values =$('input[name="checkbox"]:checked').attr("value").split("@");
				var deletetpurl ="/ipad/JnpadImageBrowse/deleteImage.json";
				$.ajax({
					url:wsHost+deletetpurl,
					type: "GET",
					dataType:'json',
					data:{
						imageId:values[0],
					},
					cache:false,
					success: function (json){
						var obj = $.evalJSON(json);
//						alert(obj.mess);
						window.wxc.xcConfirm(obj.mess, "success");
						ckimage(res);
					}
				})  

			}else{
//				alert("请选择一行");
				window.wxc.xcConfirm("请选择一行", "warning");
			}

		})
	}
}
//退回客户列表
function thkhlb(){
	var userId = window.sessionStorage.getItem("userId");
	var userType = window.sessionStorage.getItem("userType");
	var jjcxurl="/ipad/customerIntopiece/returnToFirst.json";
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var head ="<tr>"+                             
	"<th></th>"+  
	"<th>客户姓名</th>"+
	"<th>产品名称</th>"+
	"<th>申请金额</th>"+
	"<th>审贷金额</th>"+
	"<th>合同金额</th>"+
	"<th>证件号码</th>"+
	"<th>审核状态</th>"+
	"<th>节点名称</th>"+
	"<th>退回原因</th>"+
	"<th>拒绝原因</th>"+
	"</tr>";
	$.ajax({
		url:wsHost + jjcxurl,
		type: "GET",
		dataType:'json',
		data:{
			userId: userId,
			userType:userType,
			status:"returnedToFirst",
		},
		success: function (json) {
			obj = $.evalJSON(json);
			for(var i = 0;i<obj.items.length;i++){
				if(obj.items[i].status=="save"){
					obj.items[i].status="未申请";
				}else if(obj.items[i].status=="audit"){
					obj.items[i].status="已申请";
				}else if(obj.items[i].status=="returnedToFirst"){
					obj.items[i].status="退回至客户经理";
				}else if(obj.items[i].status=="end"){
					obj.items[i].status="放款成功";
				}else if(obj.items[i].status=="nopass"){
					obj.items[i].status="申请未通过";
				}else if(obj.items[i].status=="refuse"){
					obj.items[i].status="被拒接";
				}else if(obj.items[i].status=="approved"){
					obj.items[i].status="审批结束";
				}else if(obj.items[i].status=="succeed"){
					obj.items[i].status="申请成功";
				}
				tmp=tmp+"<tr onclick='check(this)'>"+
				"<td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.items[i].chineseName+"@"+
				obj.items[i].productName+"'"+"/>"+"</span></td>"+
				"<td>"+obj.items[i].chineseName+"</td>"+
				"<td>"+obj.items[i].productName+"</td>"+
				"<td>"+obj.items[i].applyQuota+"</td>"+
				"<td>"+obj.items[i].finalApproval+"</td>"+
				"<td>"+obj.items[i].reqlmt+"</td>"+
				"<td>"+obj.items[i].cardId+"</td>"+
				"<td>"+obj.items[i].status+"</td>"+
				"<td>"+obj.items[i].nodeName+"</td>"+
				"<td>"+obj.items[i].fallBackReason+"</td>"+
				"<td>"+obj.items[i].refusqlReason+"</td>"+
				"</tr>";

				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}
			result[j]=tmp;
			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tz()'/>重新调查客户</div>"+ 
					"<div class='content'>"+
					"<table class='cpTable' id='llll' style='text-align:center;'>"+
					head+result[page]+
					"</table>"+
					"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
					"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
					"<input type='button' class='btn btn-large' value='返回' onclick='tz()'/></p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();
			$("#xyy").click(function(){
				page=page+1;
				if(result[page]){
					$("#llll").html(head+result[page]);
				}else{
//					alert("当前已经是最后一页");
					window.wxc.xcConfirm("当前已经是最后一页", "info");
					page=page-1;
				}
			})
			$("#syy").click(function(){
				page=page-1;
				if(result[page]){
					$("#llll").html(head+result[page]);
				}else{
//					alert("当前已经是第一页");
					window.wxc.xcConfirm("当前已经是第一页", "info");
					page = page+1;
				}
			})
		}
	})
}   
//拒绝客户列表
function jjkhlb(){
	var userId = window.sessionStorage.getItem("userId");
	var userType = window.sessionStorage.getItem("userType");
	var jjcxurl="/ipad/customerIntopiece/refuse.json";
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var head ="<tr>"+                             
	"<th></th>"+  
	"<th>客户姓名</th>"+
	"<th>产品名称</th>"+
	"<th>申请金额</th>"+
	"<th>审贷金额</th>"+
//	"<th>合同金额</th>"+
	"<th>证件号码</th>"+
	"<th>审核状态</th>"+
	"<th>节点名称</th>"+
	"<th>拒绝原因</th>"+
	"</tr>";
	$.ajax({
		url:wsHost + jjcxurl,
		type: "GET",
		dataType:'json',
		data:{
			userId: userId,
			userType:userType,
			status:"refuse",
		},
		success: function (json) {
			obj = $.evalJSON(json);
			for(var i = 0;i<obj.items.length;i++){
				if(obj.items[i].status=="save"){
					obj.items[i].status="未申请";
				}else if(obj.items[i].status=="audit"){
					obj.items[i].status="已申请";
				}else if(obj.items[i].status=="returnedToFirst"){
					obj.items[i].status="退回至客户经理";
				}else if(obj.items[i].status=="end"){
					obj.items[i].status="放款成功";
				}else if(obj.items[i].status=="nopass"){
					obj.items[i].status="申请未通过";
				}else if(obj.items[i].status=="refuse"){
					obj.items[i].status="被拒接";
				}else if(obj.items[i].status=="approved"){
					obj.items[i].status="审批结束";
				}else if(obj.items[i].status=="succeed"){
					obj.items[i].status="申请成功";
				}
				tmp=tmp+"<tr onclick='check(this)'>"+
				"<td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.items[i].chineseName+"@"+
				obj.items[i].productName+"'"+"/>"+"</span></td>"+
				"<td>"+obj.items[i].chineseName+"</td>"+
				"<td>"+obj.items[i].productName+"</td>"+
				"<td>"+obj.items[i].applyQuota+"</td>"+
//				"<td>"+obj.items[i].finalApproval+"</td>"+
				"<td>"+obj.items[i].reqlmt+"</td>"+
				"<td>"+obj.items[i].cardId+"</td>"+
				"<td>"+obj.items[i].status+"</td>"+
				"<td>"+obj.items[i].nodeName+"</td>"+
//				"<td>"+obj.items[i].fallBackReason+"</td>"+
				"<td>"+obj.items[i].refusqlReason+"</td>"+
				"</tr>";

				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}
			result[j]=tmp;
			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tz()'/>拒绝客户</div>"+ 
					"<div class='content'>"+
					"<table class='cpTable' id='llll' style='text-align:center;'>"+
					head+result[page]+
					"</table>"+
					"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
					"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
					"<input type='button' class='btn btn-large' value='返回' onclick='tz()'/></p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();
			$("#xyy").click(function(){
				page=page+1;
				if(result[page]){
					$("#llll").html(head+result[page]);
				}else{
//					alert("当前已经是最后一页");
					window.wxc.xcConfirm("当前已经是最后一页", "info");
					page=page-1;
				}
			})
			$("#syy").click(function(){
				page=page-1;
				if(result[page]){
					$("#llll").html(head+result[page]);
				}else{
//					alert("当前已经是第一页");
					window.wxc.xcConfirm("当前已经是第一页", "info");
					page = page+1;
				}
			})
		}
	})
}   
//客户进件信息-补充进件
function bcjj(){
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='khjjxx();pie()'/>客户进件信息-补充进件</div>"+ 
			"<div class='content'>"+
			"<table class='cpTable' style='text-align:center;'>"+
			"<tr>"+                             
			"<th>序号</th>"+  
			"<th>客户姓名</th>"+
			"<th>客户身份标识</th>"+
			"<th>接受</th>"+
			"<th>拒绝</th>"+
			"<th>是否变更维护计划</th>"+
			"</tr>"+
			"<tr>"+    
			"<td>1</td>"+
			"<td>郝俊芝</td>"+
			"<td></td>"+
			"<td><img src='images/success.png'/></td>"+
			"<td></td>"+
			"<td><input type='button' class='btn btn-warning' value='是'/></td>"+
			"</tr>"+
			"<tr>"+    
			"<td>2</td>"+
			"<td>郝俊芝</td>"+
			"<td></td>"+
			"<td></td>"+
			"<td><img src='images/wrong.png'/></td>"+
			"<td><input type='button' class='btn btn-warning' value='是'/></td>"+
			"</tr>"+
			"</table>"+
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
}   

//客户进件信息-拒绝进件
function jjjj(){
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='khjjxx();pie()'/>客户进件信息-拒绝进件</div>"+ 
			"<div class='content'>"+
			"<table class='cpTable' style='text-align:center;'>"+
			"<tr>"+                             
			"<th>序号</th>"+  
			"<th>客户姓名</th>"+
			"<th>客户身份标识</th>"+
			"<th>接受</th>"+
			"<th>拒绝</th>"+
			"</tr>"+
			"<tr>"+    
			"<td>1</td>"+
			"<td>郝俊芝</td>"+
			"<td></td>"+
			"<td><img src='images/success.png'/></td>"+
			"<td></td>"+
			"</tr>"+
			"<tr>"+    
			"<td>2</td>"+
			"<td>郝俊芝</td>"+
			"<td></td>"+
			"<td></td>"+
			"<td><img src='images/wrong.png'/></td>"+
			"</tr>"+
			"</table>"+
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
}   
//客户运营状况
function khyyzk(){
	window.scrollTo(0,0);//滚动条回到顶端

	var get = crud.dom.factory("GET");
	var wsYunyin ="/ipad/user/findYunyinstatus.json";
	var userType =window.sessionStorage.getItem("userType");
	var show="";
	if(userType=="1"){
		var url = wsYunyin+"?userId="+window.sessionStorage.getItem("userId");
	}else{
		var url = wsYunyin+"?userId=";
		show="<p>" +
		"<input type='button' class='tab-button' value='查看其他统计图' onclick='ckqttjt()'/>" +
		"</p>"; 
	}
	get.doGet(url,initCustManagerContentCallback,"加载客户运营状况失败！");
	function initCustManagerContentCallback(json){
		var objs = $.evalJSON(json);

		$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mywdsy()'/>客户运营状况</div>"+  
				"<div class='content' style='width:70%;margin:0 auto;'>" +
				"<div class='span3' style='background:#f86817;'>客户授信总额<br/><span>"+objs.result.ksze+"</span></div>"+
				"<div class='span3' style='background:#e93c3f;'>客户用信总额<br/><span>"+objs.result.kyze+"</span></div>"+
				"<div class='span3' style='background:#67cdcc;'>客户逾期余额总额<br/><span>"+objs.result.kyyeze+"</span></div>"+
				"<div class='span2' style='background:#046589;'>逾期客户数<br/><span>"+objs.result.yqkhs+"</span></div>"+
				"<div class='span2' style='background:#d6bf00;'>核销客户数<br/><span>"+objs.result.hxkhs+"</span></div>"+
				show+
		"</div>");
	}
	$(".right").hide();
	$("#mainPage").show();
}

function ckqttjt(){
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='khyyzk()'/>客户运营状况-统计图</div>"+
			"<div class='contents' id='allmap'  style='text-align:center;height:580px;margin:auto auto;'>" +
			"<div class='spinner'>"+
			"<div class='bounce1'></div>"+
			"<div class='bounce2'></div>"+
			"<div class='bounce3'></div>"+
			"</div>"+
			"</div>"+
	"</div>");
	var url = "/ipad/tongji.json";
	var get = crud.dom.factory("GET");
	get.doGet(url,initTongjituCallback,"加载统计图失败！");

	function initTongjituCallback(json){
		var objs = $.evalJSON(json);
		var value1 = objs.organApplicationAuditNumJson;		
		value1=value1.replace(/\]/,"");
		value1=value1.replace(/\[/,"");
				var value11 = value1.split(",");
				var value2 = objs.organApplicationApprovedNumJson;	
				value2=value2.replace(/\]/,"");
				value2=value2.replace(/\[/,"");
						var value22 = value2.split(",");
						var zonged = objs.organApplicationjineJson;
						zonged=zonged.replace(/\]/,"");
						zonged=zonged.replace(/\[/,"");
								zonged=zonged.split(",");
								var shouxin =objs.organApplicationsxJson;
								shouxin=shouxin.replace(/\]/,"");
								shouxin=shouxin.replace(/\[/,"");
										shouxin=shouxin.split(",");
										var yuqi=objs.organApplicationyqJson;
										yuqi=yuqi.replace(/\]/,"");
										yuqi=yuqi.replace(/\[/,"");
												yuqi=yuqi.split(",");
												var buliang=objs.organApplicationblJson;
												buliang=buliang.replace(/\]/,"");
												buliang=buliang.replace(/\[/,"");
														buliang=buliang.split(",");
														var nnnn=objs.applicationStatusJson;
														$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='khyyzk()'/>客户运营状况-统计图</div>"+  
																"<div class='content'>" +
																"<div class='zingchartt' id='container' ></div>"+
																"<p><input type='button' class='btn btn-large btn-primary' value='进件状况统计' id = 'jjzktj' />"+
																"<input type='button' class='btn btn-large btn-primary' value='进件数量统计' id = 'jjsltj' />"+
																"<input type='button' class='btn btn-large btn-primary' value='总额度状况统计' id = 'zedtj' />"+
																"<input type='button' class='btn btn-large btn-primary' value='支行额度状况统计' id = 'zhedtj'/>"+
																"<input type='button' class='btn btn-large' value='返回' onclick='khyyzk()'/></p>"+
														"</div>");
														$(".right").hide();
														$("#mainPage").show();

														var chartData = {
																"type": "bar", 
																"series": [    
																           {"text":"已申请进件数量","values":[Number(value11[0]),Number(value11[1]),Number(value11[2]),Number(value11[3]),Number(value11[4]),Number(value11[5]),Number(value11[6])]},
																           {"text":"通过进件数量","values":[Number(value22[0]),Number(value22[1]),Number(value22[2]),Number(value22[3]),Number(value22[4]),Number(value22[5]),Number(value22[6])]}
																           ],
																           "scale-x":{ 
																        	   "values":["高新","天桥","长清","历城","历下","润丰","槐荫"],
																           },
																           "scale-y":{ 
																        	   "zooming":false,
//																        	   "zoom-to":[0,5]
																           },
																           "title": {
																        	   "text":"统计各支行已申请和通过的进件数量"
																           },
																           "legend":{

																           }
														};
														var chartData2 = {
																"type": "bar", 
																"series": [    
																           {"text":"金额","values":[Number(zonged[0]),Number(zonged[1]),Number(zonged[2])]},

																           ],
																           "scale-x":{ 
																        	   "values":["授信总额度","逾期总额度","不良总额度"],
																           },
																           "scale-y":{ 
																        	   "zooming":false,
//																        	   "zoom-to":[0,5]
																           },
																           "title": {
																        	   "text":"统计各支行已申请和通过的进件数量"
																           },
																           "legend":{

																           }
														};
														var chartData3 = {
																"type": "bar", 
																"series": [    
																           {"text":"授信金额","values":[Number(shouxin[0]),Number(shouxin[1]),Number(shouxin[2]),Number(shouxin[3]),Number(shouxin[4]),Number(shouxin[5]),Number(shouxin[6])]},
																           {"text":"逾期金额","values":[Number(yuqi[0]),Number(yuqi[1]),Number(yuqi[2]),Number(yuqi[3]),Number(yuqi[4]),Number(yuqi[5]),Number(yuqi[6])]},
																           {"text":"不良金额","values":[Number(buliang[0]),Number(buliang[1]),Number(buliang[2]),Number(buliang[3]),Number(buliang[4]),Number(buliang[5]),Number(buliang[6])]}
																           ],
																           "scale-x":{ 
																        	   "values":["高新","天桥","长清","历城","历下","润丰","槐荫"],
																           },
																           "scale-y":{ 
																        	   "zooming":false,
//																        	   "zoom-to":[0,5]
																           },
																           "title": {
																        	   "text":"统计各支行已申请和通过的进件数量"
																           },
																           "legend":{

																           }
														};

														var myConfig = {
																"type":"pie",
																"title":{
																	"text":"进件状况统计"
																},
																"plot":{
																	"border-width":1,
																	"border-color":"#cccccc",
																	"line-style":"dotted",
																	"value-box":{
																		"font-size":10,
																		"text":"%t: %v (%npv%)",
																		"font-weight":"normal",
																		"placement":"out"
																	}
																},
																"series":[
																          {
																        	  "values":[Number($.evalJSON(nnnn)[0].y)],
																        	  "background-color":"#cc0000",
																        	  "text":"审批中"
																          },
																          {
																        	  "values":[Number($.evalJSON(nnnn)[1].y)],
																        	  "background-color":"#ff9933",
																        	  "text":"拒绝"
																          },
																          {
																        	  "values":[Number($.evalJSON(nnnn)[2].y)],
																        	  "background-color":"#88cc00",
																        	  "text":"放款成功"
																          },
																          {
																        	  "values":[Number($.evalJSON(nnnn)[3].y)],
																        	  "background-color":"#3399ff",
																        	  "text":"退回"
																          },
																          {
																        	  "values":[Number($.evalJSON(nnnn)[4].y)],
																        	  "background-color":"#9933ff",
																        	  "text":"已审批"
																          }
																          ]
														};
														        zingchart.render({ 
															            id: "container",    
															            height: 500,       
															            width: 700,        
															            data: chartData
															        });
														$("#zedtj").click(function(){
															 zingchart.render({ 
																            id: "container",    
																            height: 500,       
																            width: 700,        
																            data: chartData2
																        });

														})
														$("#jjsltj").click(function(){
															 zingchart.render({ 
																            id: "container",    
																            height: 500,       
																            width: 700,        
																            data: chartData
																        });

														})
														$("#zhedtj").click(function(){
															 zingchart.render({ 
																            id: "container",    
																            height: 500,       
																            width: 700,        
																            data: chartData3
																        });

														})
														$("#jjzktj").click(function(){
															 zingchart.render({ 
																            id: "container",    
																            height: 500,       
																            width: 700,        
																            data: myConfig
																        });

														})
	}
}
//通知
function tz(){
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mywdsy()'/>通知</div>"+ 
			"<div class='contents' id='allmap'  style='text-align:center;height:580px;margin:auto auto;'>" +
			"<div class='spinner'>"+
			"<div class='bounce1'></div>"+
			"<div class='bounce2'></div>"+
			"<div class='bounce3'></div>"+
			"</div>"+
			"</div>"+
	"</div>");
	var get = crud.dom.factory("GET");
	wsNotifiyMessage ="/ipad/custAppInfo/notifiyMessageNum.json";
	var url = wsNotifiyMessage+"?userId="+window.sessionStorage.getItem("userId")+"&userType="+window.sessionStorage.getItem("userType");
	get.doGet(url,initNotifiyMessageContentCallback,"加载通知信息失败！");
	function initNotifiyMessageContentCallback(json){
		var objs = $.evalJSON(json);
		//alert(json);
		window.scrollTo(0,0);//滚动条回到顶端
		$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mywdsy()'/>通知</div>"+  
				"<div class='content'>" +
				"<table class='cpTable' style='width:100%;height:85%;position:fixed;top:100px;bottom:0;text-align:center;'>"+
				"<tr>"+                             
				"<td style='width:33.3%;' onclick='sdhtz()'>" +// onclick='sdhtz()'
				"<img src='images/sdh.png'/><br/><span class='tongzhi'>"+objs.shendaihui+"</span><br/>" +
				"<span class='tz_message'>审贷会通知</span>" +
				"</td>"+                           
				"<td style='width:33.3%;' onclick='pxjh()'>" +
				"<img src='images/px.png'/><br/><span class='tongzhi'>"+objs.peixun+"</span><br/>" +
				"<span class='tz_message'>培训通知</span>" +
				"</td>"+                      
				"<td onclick='cskhtz()'>" +
				"<img src='images/cs.png'/><br/><span class='tongzhi'>"+objs.yuqi+"</span><br/>" +
				"<span class='tz_message'>催收客户通知</span>" +
				"</td>"+   
				"</tr>"+
				"<tr>"+                         
				"<td onclick='fxsxtz()'>" +
				"<img src='images/fxsx.png'/><br/><span class='tongzhi'>"+objs.risk+"</span><br/>" +
				"<span class='tz_message'>风险客户通知</span>" +
				"</td>"+                    
				"<td onclick='thkhlb()'>" +
				"<img src='images/bcdc.png'/><br/><span class='tongzhi'>"+objs.returnCount+"</span><br/>" +
				"<span class='tz_message'>补充调查通知</span>" +
				"</td>"+                  
				"<td onclick='jjkhlb()'>" +
				"<img src='images/jjjj.png'/><br/><span class='tongzhi'>"+objs.refuseCount+"</span><br/>" +
				"<span class='tz_message'>拒绝进件通知</span>" +
				"</td>"+ 
				"</tr>"+
				"<tr>"+ 
				"<td style='width:33.3%;' onclick='zbjjlb(1)'>" +
				"<img src='images/fpjj.png'/><br/><span class='tongzhi'>"+objs.qita+"</span><br/>" +
				"<span class='tz_message'>分配进件通知</span>" +
				"</td>"+
				"<td id='kkkk'>" +
				"<img src='images/khzlbg.png'/><br/><span class='tongzhi'>"+objs.ziliaobiangeng+"</span><br/>" +
				"<span class='tz_message'>客户资料变更通知</span>" +
				"</td>"+                  
				"<td></td>"+ 
				"</tr>"+
				"</table>"+
		"</div>");
		$("#kkkk").click(function(){
			khzlbgtz(objs.bianggeng);
		})
	}
	$(".right").hide();
	$("#mainPage").show();


}
//通知-审贷会通知
function sdhtz(){
	var khjlurl="/ipad/custAppInfo/cxshendaihuitz.json";
	var tmp="";
	var result=[];
	var page=1;
	var j=1;
	$.get(wsHost+khjlurl,{managerId:window.sessionStorage.getItem("userId")},shendaihuicallbackInfor);
	function shendaihuicallbackInfor(json){
		var obj = $.evalJSON(json);
		for(var i =0;i<obj.result.length;i++){
			tmp += "<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].id+"@"+obj.result[i].createdBy+"'/></span></td>"+
			"<td>"+obj.result[i].noticeTitle+"</td>"+
			"<td>"+obj.result[i].userId+"</td>"+
			"<td>"+obj.result[i].noticeContent+"</td>" +
			"<td>"+obj.result[i].modifiedTime+"</td>" +
			"</tr>";
			if((i+1)%5==0){
				result[j]=tmp;
				tmp="";
				j++;
			}
		}
		result[j]=tmp;
	var head ="<tr>"+                             
	"<th></th>"+  
	"<th>上会客户</th>"+
	"<th>上会客户经理</th>"+
	"<th>通知内容</th>"+
	"<th>上会时间时间</th>"+
	"</tr>";
	
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mywdjh()'/>通知-审贷会通知</div>"+ 
			"<div class='content'>"+
			"<table class='cpTable' id='pxll' style='text-align:center;'>"+
			head+result[page]+
			"</table>"+
			"<p>" +
			"<input type='button' class='btn btn-large btn-primary' value='接受' id = 'oks'/>"+
			"<input type='button' class='btn btn-large btn-primary' value='拒绝' id = 'refuse'/>"+
			"<input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
			"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
			"<input type='button' class='btn btn-large' value='返回' onclick='tz()'/></p>"+
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
	$("#xyy").click(function(){
		page=page+1;
		if(result[page]){
			$("#pxll").html(head+result[page]);
		}else{
//			alert("当前已经是最后一页");
			window.wxc.xcConfirm("当前已经是最后一页", "info");
			page=page-1;
		}
	})
	$("#syy").click(function(){
		page=page-1;
		if(result[page]){
			$("#pxll").html(head+result[page]);
		}else{
//			alert("当前已经是第一页");
			window.wxc.xcConfirm("当前已经是第一页", "info");
			page = page+1;
		}
	})
	$("#oks").click(function(){
	var	sdhscurl="/ipad/custAppInfo/changesdhtzstatus.json";
	var values =$('input[name="checkbox"]:checked').attr("value").split("@");
	if ($("input[type='radio']").is(':checked')) {
		$.ajax({
			url:wsHost+sdhscurl,
			dateType:'json',
			type:'GET',
			data:{
				id:values[0],
				status:"1"
			},			
			success:function (json){
				var obj = $.evalJSON(json);
//				alert(obj.mess);
				window.wxc.xcConfirm(obj.mess, "info");
				sdhtz();
			}
		})
	}else{
//		alert("请选择一行");
		window.wxc.xcConfirm("请选择一行", "warning");
	}
	})
	$("#refuse").click(function(){
	var	sdhscurl="/ipad/custAppInfo/changesdhtzstatus.json";
	var values =$('input[name="checkbox"]:checked').attr("value").split("@");
	if ($("input[type='radio']").is(':checked')) {
		window.wxc.xcConfirm("是否拒绝上会", "confirm",{onOk:function(){
		$.ajax({
			url:wsHost+sdhscurl,
			dateType:'json',
			type:'GET',
			data:{
				id:values[0],
				status:"2"
			},			
			success:function (json){
				var obj = $.evalJSON(json);
//				alert(obj.mess);
				window.wxc.xcConfirm(obj.mess, "info");
				sdhtz();
			}
		})
		}});
	}else{
//		alert("请选择一行");
		window.wxc.xcConfirm("请选择一行", "warning");
	}
	})
	}
}
//通知-审贷会通知
//function sdhtz(){
//	window.scrollTo(0,0);//滚动条回到顶端
//	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tz()'/>通知-审贷会通知</div>"+  
//			"<div class='content' style='margin-top:146px;'>" +
//			"<div class='rcap' onclick='show_sdhtz()'>" +
//			"<table>" +
//			"<tr>" +
//			"<td class='center' style='width:20%;'>2015-06-12 13:00<br/>~<br/>2015-06-12 14:00</td>"+
//			"<td style='width:40%;'>" +
//			"<p class='rcTitle'>王军忠进件002316审贷会</p>" +
//			"<p class='cyz'>参与者</p>" +
//			"<p class='cyzxm'>王旭、朱远炎、宋辰、谭文华</p>" +
//			"</td>"+
//			"<td style='width:35%;'>" +
//			"<p class='center'>江苏省常州市九州环宇505</p>" +
//			"</td>"+
//			"<td style='width:5%;'>" +
//			"<img src='images/right.png'/>" +
//			"</td>"+
//			"</tr>"+                            
//			"</table>"+
//			"</div>"+
//			"<div class='rcap' onclick='show_sdhtz()'>" +
//			"<table>" +
//			"<tr>" +
//			"<td class='center' style='width:20%;'>2015-06-13 13:00<br/>~<br/>2015-06-13 14:00</td>"+
//			"<td style='width:40%;'>" +
//			"<p class='rcTitle'>王军忠进件02356561审贷会</p>" +
//			"<p class='cyz'>参与者</p>" +
//			"<p class='cyzxm'>王旭、朱远炎</p>" +
//			"</td>"+
//			"<td style='width:35%;'>" +
//			"<p class='center'>江苏省常州市九州环宇505</p>" +
//			"</td>"+
//			"<td style='width:5%;'>" +
//			"<img src='images/right.png'/>" +
//			"</td>"+
//			"</tr>"+                            
//			"</table>"+
//			"</div>"+
//			/*"<table class='cpTable' style='text-align:center;'>"+
//                            "<tr>"+                       
//                                "<th></th>"+           
//                                "<th style='width:25%;'>审贷会时间</th>"+          
//                                "<th>审贷会地点</th>"+       
//                                "<th>审贷会进件提示</th>"+   
//                            "</tr>"+
//                            "<tr onclick='check(this)'>"+       
//                                "<td><span class='radio'><input type='radio'/></span></td>"+              
//                                "<td>2015-06-12</td>"+          
//                                "<td>综合部</td>"+          
//                                "<td></td>"+
//                            "</tr>"+
//                            "<tr onclick='check(this)'>"+       
//                                "<td><span class='radio'><input type='radio'/></span></td>"+              
//                                "<td>2015-06-15</td>"+          
//                                "<td>综合部</td>"+          
//                                "<td></td>"+
//                            "</tr>"+
//                        "</table>"+
//                        "<p>" +
//                            "<button class='success-button'><img src='images/yes.png'/> 确认</button>" +
//                            "<button class='error-button'><img src='images/no.png'/> 拒绝</button>" +
//                        "</p>" +*/
//	"</div>");
//	$(".right").hide();
//	$("#mainPage").show();
//}
function show_sdhtz(){
	$("#text").html("<div class='display-div sdhtz'>"+
			"<div class='dialog-head'>"+
			"<h4>王军忠进件02356561审贷会</h4>"+
			"<div style='border-right:1px solid #57c5f7;'>开始时间<br/><span>2015-06-12 13:00</span></div>"+
			"<div>结束时间<br/><span>2015-06-12 14:00</span></div>"+
			"<img src='images/sdhClose.jpg' onclick='hide_dcts()'/>"+
			"</div>"+
			"<div class='dialog-content'>"+
			"<p>创建人</p>"+
			"<p class='cy'>管理员</p>"+
			"<p>参与者</p>"+
			"<p class='cy'>王旭、朱远炎、宋辰、谭文华</p>"+
			"<p>地点</p>"+
			"<p class='cy'>江苏省常州市九州环宇505</p>"+
			"</div>"+
			"<div class='dialog-bottom'>"+
			"<button type='button' class='btn btn-success' onclick='hide_dcts()'>接受</button>"+
			"<button type='button' class='btn btn-danger' onclick='hide_dcts()'>拒绝</button>"+
			"</div>"+
	"</div><!-- /display-div -->");
	$("#text").animate({top:"0px"},"500");
}
//通知-培训通知
function pxtz(){
	window.scrollTo(0,0);//滚动条回到顶端
	var get = crud.dom.factory("GET");
	wsNotice ="/ipad/custAppInfo/findRetraining.json";
	var url = wsNotice;
	get.doGet(url,initNoticeContentCallback,"加载培训通知信息失败！");
	function initNoticeContentCallback(json){
		var objs = $.evalJSON(json);
		//alert(json);
		var content ="";
		var contsnt ="";
		var title ="<div class='title'><img src='images/back.png' onclick='tz()'/>通知-培训通知</div>"+  
		"<div class='content' style='margin-top:146px;'>" +"";
		for(var i = 0;i<objs.totalCount;i++){
			contsnt = "<div class='rcap' onclick='show_pxtz('"+objs.result[i].id+"')'>" +
			"<table>" +
			"<tr>" +
			"<td class='center' style='width:20%;'>"+objs.result[i].id+"<br/>~<br/>"+objs.result[i].trainingTime+"</td>"+
			"<td style='width:40%;'>" +
			"<p class='rcTitle'>"+objs.result[i].trainingObjective+"</p>" +
			"<p class='cyz'>参与者</p>" +
			"<p class='cyzxm'>"+objs.result[i].userList+"</p>" +
			"</td>"+
			"<td style='width:35%;'>" +
			"<p class='center'>"+objs.result[i].trainingLocation+"</p>" +
			"</td>"+
			"<td style='width:5%;'>" +
			"<img src='images/right.png'/>" +
			"</td>"+
			"</tr>"+                            
			"</table>"+
			"</div>"+""; 
			content = content+contsnt;
		}
		$("#mainPage").html(title+content+"</div>");
		window.parent.resizeFrame();
	}
	$(".right").hide();
	$("#mainPage").show();
}
function show_pxtz(id){
	$("#text").html("<div class='display-div sdhtz'>"+
			"<div class='dialog-head'>"+
			"<h4>客户经理业务培训</h4>"+
			"<div style='border-right:1px solid #57c5f7;'>开始时间<br/><span>2015-06-12</span></div>"+
			"<div>结束时间<br/><span>2015-06-13</span></div>"+
			"<img src='images/sdhClose.jpg' onclick='hide_dcts()'/>"+
			"</div>"+
			"<div class='dialog-content'>"+
			"<p>创建人：<span class='cy'>管理员</span></p>"+
			"<p>参与者：<span class='cy'>王旭、朱远炎、宋辰、谭文华</span></p>"+
			"<p>地点：<span class='cy'>江苏省常州市九州环宇505</span></p>"+
			"<p>培训方式：<span class='cy'>上课</span></p>"+
			"<p>考核方式：<span class='cy'>笔试</span></p>"+
			"</div>"+
			"<div class='dialog-bottom'>"+
			"<button type='button' class='btn btn-success' onclick='hide_dcts()'>接受</button>"+
			"<button type='button' class='btn btn-danger' onclick='hide_dcts()'>拒绝</button>"+
			"</div>"+
	"</div>");
	$("#text").animate({top:"0px"},"500");
}
//通知-分配进件通知
function fpjjtz(){
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tz()'/>通知-分配进件通知</div>"+  
			"<div class='content' style='margin-top:146px;'>" +
			"<div class='rcap' onclick='show_fpjjtz()'>" +
			"<table>" +
			"<tr>" +
			"<td class='center' style='width:20%;'>2015-06-12<br/>13:00:58</td>"+
			"<td style='width:40%;'>" +
			"<p class='rcTitle'>王军忠 / 00023</p>" +
			"<p class='cyz'>分配人</p>" +
			"<p class='cyzxm'>管理员</p>" +
			"</td>"+
			"<td style='width:35%;'>" +
			"<p class='center'>济南农商行</p>" +
			"</td>"+
			"<td style='width:5%;'>" +
			"<img src='images/right.png'/>" +
			"</td>"+
			"</tr>"+                            
			"</table>"+
			"</div>"+   
			/*"<table class='cpTable' style='text-align:center;'>"+
                            "<tr>"+                             
                                "<th>序号</th>"+  
                                "<th>客户姓名</th>"+
                                "<th>客户身份标识</th>"+
                                "<th>接受</th>"+
                                "<th>拒绝</th>"+
                                "<th>是否变更维护计划</th>"+
                            "</tr>"+
                            "<tr>"+    
                                "<td>1</td>"+
                                "<td></td>"+
                                "<td></td>"+
                                "<td></td>"+
                                "<td></td>"+
                                "<td></td>"+
                            "</tr>"+
                        "</table>"+*/
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
}
function show_fpjjtz(){
	$("#text").html("<div class='display-div sdhtz'>"+
			"<div class='dialog-head'>"+
			"<h4>王军忠 / 00023</h4>"+
			"<div style='width:80%'>分配时间<br/><span>2015-06-12&nbsp;&nbsp;&nbsp;&nbsp;13:00:58</span></div>"+                           
			"<img src='images/sdhClose.jpg' onclick='hide_dcts()'/>"+
			"</div>"+
			"<div class='dialog-content'>"+
			"<p>分配人</p>"+
			"<p class='cy'>管理员</p>"+
			"<p>客户所属银行</p>"+
			"<p class='cy'>济南农商行</p>"+
			"<p>变更维护计划</p>"+
			"<p class='cy'>否</p>"+
			"</div>"+
			"<div class='dialog-bottom'>"+
			"<button type='button' class='btn btn-success' onclick='hide_dcts()'>接受</button>"+
			"<button type='button' class='btn btn-danger' onclick='hide_dcts()'>拒绝</button>"+
			"</div>"+
	"</div><!-- /display-div -->");
	$("#text").animate({top:"0px"},"500");
}
//通知-风险事项通知
function fxsxtz(){
	var get = crud.dom.factory("GET");
	var fxsxurl ="/ipad/NotifictionMessage/managerbrowse.json";
	var url = fxsxurl+"?userId="+window.sessionStorage.getItem("userId");
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var head ="<tr>"+                             
	"<th>序号</th>"+  
	"<th>客户名称</th>"+
	"<th>证件类型</th>"+
	"<th>证件号码</th>"+
	"<th>状态</th>"+
	"<th>风险类型</th>"+
	"<th>拒绝原因</th>"+
	"<th>上报人</th>"+
	"<th>产品名称</th>"+
	"</tr>";
	get.doGet(url,initNotifiyMessageContentCallback,"加载通知信息失败！");
	function initNotifiyMessageContentCallback(json){
		var obj = $.evalJSON(json);
		for(var i = 0;i<obj.result.length;i++){
			if(obj.result[i].cardType=="0"){
				obj.result[i].cardType="身份证";
			}else if(obj.result[i].cardType=="1"){
				obj.result[i].cardType="军官证";
			}else if(obj.result[i].cardType=="2"){
				obj.result[i].cardType="护照";
			}else if(obj.result[i].cardType=="3"){
				obj.result[i].cardType="香港身份证";
			}else if(obj.result[i].cardType=="4"){
				obj.result[i].cardType="澳门身份证";
			}else if(obj.result[i].cardType=="5"){
				obj.result[i].cardType="台湾身份证";
			}

			if(obj.result[i].riskCreateType=="manual"){
				obj.result[i].riskCreateType="手动";
			}else if(obj.result[i].riskCreateType=="system"){
				obj.result[i].riskCreateType="系统";
			}
			if(obj.result[i].status=="UNREPORTED"){
				obj.result[i].status="未上报";
			}else if(obj.result[i].status=="UNREPORTED_CARDCENTER"||obj.result[i].status=="unreported_cardcenter"){
				obj.result[i].status="未上报";
			}else if(obj.result[i].status=="REPORTED_SUPERVISOR"||obj.result[i].status=="reported_supervisor"){
				obj.result[i].status="上报机构主管";
			}else if(obj.result[i].status=="REPORTED_SUPERVISOR"||obj.result[i].status=="reported_supervisor"){
				obj.result[i].status="上报卡中心";
			}else if(obj.result[i].status=="CONFIRMED_SUPERVISOR"||obj.result[i].status=="confirmed_supervisor"){
				obj.result[i].status="机构主管确认";
			}else if(obj.result[i].status=="CONFIRMED_CARDCENTER"||obj.result[i].status=="confirmed_cardcenter"){
				obj.result[i].status="卡中心确认";
			}else if(obj.result[i].status=="REJECT_SUPERVISOR"||obj.result[i].status=="reject_supervisor"){
				obj.result[i].status="机构主管拒绝";
			}else if(obj.result[i].status=="REJECT_CARDCENTER"||obj.result[i].status=="reject_cardcenter"){
				obj.result[i].status="卡中心拒绝";
			}

			tmp=tmp+"<tr onclick='check(this)'>"+"<td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].customerId+"@"+
			obj.result[i].id+"'/>"+"</span></td>"+  
			"<td>"+obj.result[i].customerName+"</td>"+
			"<td>"+obj.result[i].cardType+"</td>"+
			"<td>"+obj.result[i].cardId+"</td>"+
			"<td>"+obj.result[i].status+"</td>"+			
			"<td>"+obj.result[i].riskCreateType+"</td>"+			
			"<td>"+obj.result[i].refuseReason+"</td>"+			
			"<td>"+obj.result[i].reportedManager+"</td>"+			
			"<td>"+obj.result[i].productName+"</td>"+			
			"</tr>"
			if((i+1)%5==0){
				result[j]=tmp;
				j++;
				tmp="";
			}
		}
		result[j]=tmp;

		window.scrollTo(0,0);//滚动条回到顶端
		$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tz()'/>通知-风险事项通知</div>"+  
				"<div class='content'>" +
				"<table class='cpTable' id='fxkh' style='text-align:center;'>"+
				head+result[page]+
				"</table>"+
				"<p>"+
				"<input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
				"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
				"<input type='button' class='btn btn-large btn-primary' value='移除风险名单' id = 'ycfx'/>"+
				"<input type='button' class='btn btn-large btn-primary' value='返回' onclick='tz()'/></p>"+
		"</div>");
		$(".right").hide();
		$("#mainPage").show();
		$("#xyy").click(function(){
			page=page+1;
			if(result[page]){
				$("#fxkh").html(head+result[page]);
			}else{
//				alert("当前已经是最后一页");
				window.wxc.xcConfirm("当前已经是最后一页", "info");
				page=page-1;
			}
		})
		$("#syy").click(function(){
			page=page-1; 
			if(result[page]){
				$("#fxkh").html(head+result[page]);
			}else{
//				alert("当前已经是第一页");
				window.wxc.xcConfirm("当前已经是第一页", "info");
				page = page+1;
			}
		})
		$("#ycfx").click(function(){
			if ($("input[type='radio']").is(':checked')) {

				var values =$('input[name="checkbox"]:checked').attr("value").split("@");
				var ycfxurl="/ipad/NotifictionMessage/removeRisk.json";
				window.wxc.xcConfirm("是否确定将该客户移除风险客户名单", "confirm",{onOk:function(){
					$.get(wsHost+ycfxurl,{customerId:values[1]},yichucallback);
					function yichucallback(json){
						var obj = $.evalJSON(json);
//						alert(obj.mess);
						window.wxc.xcConfirm(obj.mess, "success");
						fxsxtz();
					}
				}});
			}else{
//				alert("请选择一行");
				window.wxc.xcConfirm("请选择一行", "warning");
			}
		})
	}
}
//通知-催收客户通知
function cskhtz(){
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tz()'/>通知-催收客户通知</div>"+ 
			"<div class='contents' id='allmap'  style='text-align:center;height:580px;margin:auto auto;'>" +
			"<div class='spinner'>"+
			"<div class='bounce1'></div>"+
			"<div class='bounce2'></div>"+
			"<div class='bounce3'></div>"+
			"</div>"+
			"</div>"+
	"</div>");
	var csurl="/ipad/risk/getCustomerRiskInfo.json";
	$.ajax({
		url:wsHost+csurl,
		dateType:'json',
		type:'GET',
		data:{
			userType:window.sessionStorage.getItem("userType"),
			managerId:window.sessionStorage.getItem("userId")
		},			
		success:function (json){
			var obj = $.evalJSON(json);
			var tmp ="";
			var result={};
			var page=1;
			var j = 1;
			var head= "<tr>"+                        
			"<th>序号</th>"+  
			"<th>客户姓名</th>"+
			"<th>客户身份标识</th>"+
			"<th>放款金额</th>"+
			"<th>逾期金额</th>"+
			"<th>本金逾期天数</th>"+
			"<th>本金逾期天数</th>"+
			"<th>是否创建催收计划</th>"+
			"</tr>";
			for(var i=0;i<obj.length;i++){
				tmp+="<tr onclick='check(this)'>"+    
				"<td>"+(i+1)+"</td>"+
				"<td>"+obj[i].name+"</td>"+
				"<td>"+obj[i].cardId+"</td>"+
				"<td>"+obj[i].money+"</td>"+
				"<td>"+obj[i].dlaymat+"</td>"+
				"<td>"+obj[i].delayamtdays+"</td>"+
				"<td>"+obj[i].delayinterestdays+"</td>"+
				"<td><input type='button' onclick='cjcsjh(1)' class='btn btn-warning' value='是'/></td>"+
				"</tr>";

				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}

			}
			result[j]=tmp;
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tz()'/>通知-催收客户通知</div>"+  
			"<div class='content'>" +
			"<table class='cpTable' style='text-align:center;' id='fxkh'>"+
			head+result[page]+
			"</table>"+
			"<p>"+
			"<input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
			"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
			"<input type='button' class='btn btn-large btn-primary' value='返回' onclick='tz()'/></p>"+
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
	$("#xyy").click(function(){
		page=page+1;
		if(result[page]){
			$("#fxkh").html(head+result[page]);
		}else{
//			alert("当前已经是最后一页");
			window.wxc.xcConfirm("当前已经是最后一页", "info");
			page=page-1;
		}
	})
	$("#syy").click(function(){
		page=page-1; 
		if(result[page]){
			$("#fxkh").html(head+result[page]);
		}else{
//			alert("当前已经是第一页");
			window.wxc.xcConfirm("当前已经是第一页", "info");
			page = page+1;
		}
	})
		}
	})
}
//通知-客户资料变更通知
function khzlbgtz(customerInfo){
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var head =	"<tr>"+  
	"<th></th>"+
	"<th>客户姓名</th>"+
	"<th>证件类型</th>"+
	"<th>证件号码</th>"+
	"<th>手机</th>"+
	"<th>状态</th>"+
	"</tr>"; 
	for(var i=0;i<customerInfo.length;i++){
		if(customerInfo[i].cardType=="0"){
			customerInfo[i].cardType="身份证";
		}else if(customerInfo[i].cardType=="1"){
			customerInfo[i].cardType="军官证";
		}else if(customerInfo[i].cardType=="2"){
			customerInfo[i].cardType="护照";
		}else if(customerInfo[i].cardType=="3"){
			customerInfo[i].cardType="香港身份证";
		}else if(customerInfo[i].cardType=="4"){
			customerInfo[i].cardType="澳门身份证";
		}else if(customerInfo[i].cardType=="5"){
			customerInfo[i].cardType="台湾身份证";
		}
		if(customerInfo[i].islook==1||customerInfo[i].islook=="1"){
			customerInfo[i].islook="未查看"
		}
		tmp=tmp+"<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+customerInfo[i].id+"@"+
		customerInfo[i].cardId+"'/>"+"</span></td>"+  
		"<td>"+customerInfo[i].chineseName+"</td>"+
		"<td>"+customerInfo[i].cardType+"</td>"+
		"<td>"+customerInfo[i].cardId+"</td>"+
		"<td>"+customerInfo[i].telephone+"</td>"+
		"<td>"+customerInfo[i].islook+"</td>"+
		"</tr>"

		if((i+1)%5==0){
			result[j]=tmp;
			j++;
			tmp="";
		}
	}
	result[j]=tmp;
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tz()'/>通知-客户资料变更通知</div>"+  
			"<div class='content'>" +
			"<table id='cslb' class='cpTable' style='text-align:center;'>"+
//			"<tr>"+                        
//			"<th>序号</th>"+  
//			"<th>客户姓名</th>"+
//			"<th>客户身份标识</th>"+
//			"<th>产品标识</th>"+
//			"<th>变更项</th>"+
//			"<th>是否变更维护计划</th>"+
//			"</tr>"+
//			"<tr>"+    
//			"<td>1</td>"+
//			"<td></td>"+
//			"<td></td>"+
//			"<td></td>"+
//			"<td></td>"+
//			"<td></td>"+
//			"</tr>"+
			head +result[page]+
			"</table>"+
			"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
			"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
			"<input type='button' class='btn btn-large btn-primary' value='标记为查看' id = 'bjck'/>"+
			"<input type='button' class='btn btn-large'' value='返回' onclick='tz()'/></p>"+
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
	$("#syy").click(function(){
		page=page-1; 
		if(result[page]){
			$("#cslb").html(head+result[page]);
		}else{
//			alert("当前已经是第一页");
			window.wxc.xcConfirm("当前已经是第一页", "info");
			page = page+1;
		}
	})

	$("#xyy").click(function(){
		page=page+1;
		if(result[page]){
			$("#cslb").html(head+result[page]);
		}else{
//			alert("当前已经是最后一页");
			window.wxc.xcConfirm("当前已经是最后一页", "info");
			page=page-1;
		}
	})
	$("#bjck").click(function(){
		if ($("input[type='radio']").is(':checked')) {
			var values =$('input[name="checkbox"]:checked').attr("value").split("@");
			var chakanurl="/ipad/custAppInfo/changestate.json";
			$.ajax({
				url:wsHost+chakanurl,
				type: "GET",
				dataType:'json',
				data:{
					id:values[0],
					cardId:values[1],
				},
				success: function (json){
					var obj = $.evalJSON(json);
//					alert(obj.mess);
					window.wxc.xcConfirm(obj.mess, "success");
					tz();
				}
			})
		}else{
//			alert("请选择一行");
			window.wxc.xcConfirm("请选择一行", "warning");
		}
	})
}

//额度评估工具
function edpggj(){
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mywdsy()'/>额度评估工具</div>"+  
			"<div class='content'>" +
			"<table class='cpTable'>"+  
			"<tr>"+                     
			"<th colspan='2'>"+
			"客户：<input type='text'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
			"证件号码：<input type='text'/>"+
			"</th>"+ 
			"</tr>"+
			"<tr>"+                             
			"<th style='width:180px;'>住房情况</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio1\")' class='checkbox'><input type='radio' name='radio1' value='A11'/>自置房屋(无贷款)</label>" +
			"<label onclick='checkBox(this,\"radio1\")' class='checkbox'><input type='radio' name='radio1' value='B7'/>自置房屋(有贷款)</label>" +
			"<label onclick='checkBox(this,\"radio1\")' class='checkbox'><input type='radio' name='radio1' value='C5'/>与父母同住</label>" +
			"<label onclick='checkBox(this,\"radio1\")' class='checkbox'><input type='radio' name='radio1' value='D4'/>租房</label>" +
			"<label onclick='checkBox(this,\"radio1\")' class='checkbox'><input type='radio' name='radio1' value='E0'/>无房</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>金融资产情况（我行）</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio2\")' class='checkbox'><input type='radio' name='radio2' value='A7'/>20万以上</label>" +
			"<label onclick='checkBox(this,\"radio2\")' class='checkbox'><input type='radio' name='radio2' value='B4'/>20万以下</label>" +
			"<label onclick='checkBox(this,\"radio2\")' class='checkbox'><input type='radio' name='radio2' value='C0'/>无</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>大件消费品拥有情况</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio3\")' class='checkbox'><input type='radio' name='radio3' value='A5'/>完全产权车</label>" +
			"<label onclick='checkBox(this,\"radio3\")' class='checkbox'><input type='radio' name='radio3' value='B2'/>贷款购车</label>" +
			"<label onclick='checkBox(this,\"radio3\")' class='checkbox'><input type='radio' name='radio3' value='C0'/>无</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>单位性质</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio4\")' class='checkbox'><input type='radio' name='radio4' value='A16'/>机关/事业单位</label>" +
			"<label onclick='checkBox(this,\"radio4\")' class='checkbox'><input type='radio' name='radio4' value='B14'/>国有</label>" +
			"<label onclick='checkBox(this,\"radio4\")' class='checkbox'><input type='radio' name='radio4' value='C13'/>独资</label>" +
			"<label onclick='checkBox(this,\"radio4\")' class='checkbox'><input type='radio' name='radio4' value='D10'/>合资</label>" +
			"<label onclick='checkBox(this,\"radio4\")' class='checkbox'><input type='radio' name='radio4' value='E6'/>股份制</label>" +
			"<label onclick='checkBox(this,\"radio4\")' class='checkbox'><input type='radio' name='radio4' value='F8'/>私营</label>" +
			"<label onclick='checkBox(this,\"radio4\")' class='checkbox'><input type='radio' name='radio4' value='G4'/>其他</label>" +
			"<label onclick='checkBox(this,\"radio4\")' class='checkbox'><input type='radio' name='radio4' value='H0'/>失业无社会救济</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+ 
			"</tr>"+
			"<tr>"+                             
			"<th>现工作单位工龄</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio5\")' class='checkbox'><input type='radio' name='radio5' value='A3'/>10年以上</label>" +
			"<label onclick='checkBox(this,\"radio5\")' class='checkbox'><input type='radio' name='radio5' value='B2'/>5-10年</label>" +
			"<label onclick='checkBox(this,\"radio5\")' class='checkbox'><input type='radio' name='radio5' value='C1'/>1-5年</label>" +
			"<label onclick='checkBox(this,\"radio5\")' class='checkbox'><input type='radio' name='radio5' value='D0'/>一年以下</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>在现址居住时间</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio6\")' class='checkbox'><input type='radio' name='radio6' value='A7'/>6年以上</label>" +
			"<label onclick='checkBox(this,\"radio6\")' class='checkbox'><input type='radio' name='radio6' value='B5'/>2-6年</label>" +
			"<label onclick='checkBox(this,\"radio6\")' class='checkbox'><input type='radio' name='radio6' value='C2'/>2年以下</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+ 
			"</tr>"+
			"<tr>"+                             
			"<th>婚姻状况</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio7\")' class='checkbox'><input type='radio' name='radio7' value='A8'/>已婚有子女</label>" +
			"<label onclick='checkBox(this,\"radio7\")' class='checkbox'><input type='radio' name='radio7' value='B5'/>已婚无子女</label>" +
			"<label onclick='checkBox(this,\"radio7\")' class='checkbox'><input type='radio' name='radio7' value='C3'/>未婚</label>" +
			"<label onclick='checkBox(this,\"radio7\")' class='checkbox'><input type='radio' name='radio7' value='D4'/>离婚</label>" +
			"<label onclick='checkBox(this,\"radio7\")' class='checkbox'><input type='radio' name='radio7' value='E5'/>再婚</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>户籍情况</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio8\")' class='checkbox'><input type='radio' name='radio8' value='A5'/>本地户口</label>" +
			"<label onclick='checkBox(this,\"radio8\")' class='checkbox'><input type='radio' name='radio8' value='B4'/>本地农户</label>" +
			"<label onclick='checkBox(this,\"radio8\")' class='checkbox'><input type='radio' name='radio8' value='C2'/>外地户口</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+ 
			"</tr>"+
			"<tr>"+                             
			"<th>教育程度</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio9\")' class='checkbox'><input type='radio' name='radio9' value='A5'/>硕士及以上</label>" +
			"<label onclick='checkBox(this,\"radio9\")' class='checkbox'><input type='radio' name='radio9' value='B4'/>本科</label>" +
			"<label onclick='checkBox(this,\"radio9\")' class='checkbox'><input type='radio' name='radio9' value='C3'/>大专</label>" +
			"<label onclick='checkBox(this,\"radio9\")' class='checkbox'><input type='radio' name='radio9' value='D1'/>高中及中专</label>" +
			"<label onclick='checkBox(this,\"radio9\")' class='checkbox'><input type='radio' name='radio9' value='E0'/>初中及以下</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+ 
			"</tr>"+
			"<tr>"+                             
			"<th>职业资格证书拥有情况</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio10\")' class='checkbox'><input type='radio' name='radio10' value='A5'/>高级</label>" +
			"<label onclick='checkBox(this,\"radio10\")' class='checkbox'><input type='radio' name='radio10' value='B4'/>中级</label>" +
			"<label onclick='checkBox(this,\"radio10\")' class='checkbox'><input type='radio' name='radio10' value='C3'/>初级</label>" +
			"<label onclick='checkBox(this,\"radio10\")' class='checkbox'><input type='radio' name='radio10' value='D1'/>其他</label>" +
			"<label onclick='checkBox(this,\"radio10\")' class='checkbox'><input type='radio' name='radio10' value='E0'/>无</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>职称</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio11\")' class='checkbox'><input type='radio' name='radio11' value='A5'/>高级</label>" +
			"<label onclick='checkBox(this,\"radio11\")' class='checkbox'><input type='radio' name='radio11' value='B4'/>中级</label>" +
			"<label onclick='checkBox(this,\"radio11\")' class='checkbox'><input type='radio' name='radio11' value='C3'/>初级</label>" +
			"<label onclick='checkBox(this,\"radio11\")' class='checkbox'><input type='radio' name='radio11' value='D1'/>其他</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>年龄</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio12\")' class='checkbox'><input type='radio' name='radio12' value='A3'/>18-30岁</label>" +
			"<label onclick='checkBox(this,\"radio12\")' class='checkbox'><input type='radio' name='radio12' value='B5'/>30-45岁</label>" +
			"<label onclick='checkBox(this,\"radio12\")' class='checkbox'><input type='radio' name='radio12' value='C4'/>45-55岁</label>" +
			"<label onclick='checkBox(this,\"radio12\")' class='checkbox'><input type='radio' name='radio12' value='D2'/>55岁以上</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>健康情况</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio13\")' class='checkbox'><input type='radio' name='radio13' value='A10'/>良好</label>" +
			"<label onclick='checkBox(this,\"radio13\")' class='checkbox'><input type='radio' name='radio13' value='B5'/>一般</label>" +
			"<label onclick='checkBox(this,\"radio13\")' class='checkbox'><input type='radio' name='radio13' value='C0'/>差</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+  
			"</tr>"+
			"<tr>"+                             
			"<th>公共记录</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio14\")' class='checkbox'><input type='radio' name='radio14' value='A20'/>无</label>" +
			"<label onclick='checkBox(this,\"radio14\")' class='checkbox'><input type='radio' name='radio14' value='B-5'/>拖欠记录</label>" +
			"<label onclick='checkBox(this,\"radio14\")' class='checkbox'><input type='radio' name='radio14' value='C-7'/>不良诉讼记录</label>" +
			"<label onclick='checkBox(this,\"radio14\")' class='checkbox'><input type='radio' name='radio14' value='D-20'/>治安处罚记录</label>" +
			"<label onclick='checkBox(this,\"radio14\")' class='checkbox'><input type='radio' name='radio14' value='E-40'/>犯罪记录</label>" +
			"<label onclick='checkBox(this,\"radio14\")' class='checkbox'><input type='radio' name='radio14' value='F0'/>未确认</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>职务</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio15\")' class='checkbox'><input type='radio' name='radio15' value='A10'/>厅局级及以上(公务员)</label>" +
			"<label onclick='checkBox(this,\"radio15\")' class='checkbox'><input type='radio' name='radio15' value='B7'/>处级(公务员)</label>" +
			"<label onclick='checkBox(this,\"radio15\")' class='checkbox'><input type='radio' name='radio15' value='C5'/>科级(公务员)</label>" +
			"<label onclick='checkBox(this,\"radio15\")' class='checkbox'><input type='radio' name='radio15' value='D3'/>一般干部(公务员)</label>" +
			"<label onclick='checkBox(this,\"radio15\")' class='checkbox'><input type='radio' name='radio15' value='E5'/>企业负责人</label>" +
			"<label onclick='checkBox(this,\"radio15\")' class='checkbox'><input type='radio' name='radio15' value='F3'/>中高层管理人员</label>" +
			"<label onclick='checkBox(this,\"radio15\")' class='checkbox'><input type='radio' name='radio15' value='G1'/>一般管理人员</label>" +
			"<label onclick='checkBox(this,\"radio15\")' class='checkbox'><input type='radio' name='radio15' value='H4'/>私营业主</label>" +
			"<label onclick='checkBox(this,\"radio15\")' class='checkbox'><input type='radio' name='radio15' value='I0'/>一般员工</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>个人月收入（税前）</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio16\")' class='checkbox'><input type='radio' name='radio16' value='A26'/>1万元以上</label>" +
			"<label onclick='checkBox(this,\"radio16\")' class='checkbox'><input type='radio' name='radio16' value='B22'/>0.8-1万元</label>" +
			"<label onclick='checkBox(this,\"radio16\")' class='checkbox'><input type='radio' name='radio16' value='C18'/>0.5-0.8万元</label>" +
			"<label onclick='checkBox(this,\"radio16\")' class='checkbox'><input type='radio' name='radio16' value='D12'/>0.3-0.5万元</label>" +
			"<label onclick='checkBox(this,\"radio16\")' class='checkbox'><input type='radio' name='radio16' value='E7'/>0.1-0.3万元</label>" +
			"<label onclick='checkBox(this,\"radio16\")' class='checkbox'><input type='radio' name='radio16' value='F5'/>0.1万元以下</label>" +
			"<label onclick='checkBox(this,\"radio16\")' class='checkbox'><input type='radio' name='radio16' value='G0'/>无</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>债务收入比</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio17\")' class='checkbox'><input type='radio' name='radio17' value='A17'/>0</label>" +
			"<label onclick='checkBox(this,\"radio17\")' class='checkbox'><input type='radio' name='radio17' value='B13'/>0-15%</label>" +
			"<label onclick='checkBox(this,\"radio17\")' class='checkbox'><input type='radio' name='radio17' value='C10'/>15-25%</label>" +
			"<label onclick='checkBox(this,\"radio17\")' class='checkbox'><input type='radio' name='radio17' value='D7'/>26-35%</label>" +
			"<label onclick='checkBox(this,\"radio17\")' class='checkbox'><input type='radio' name='radio17' value='E2'/>36-49%</label>" +
			"<label onclick='checkBox(this,\"radio17\")' class='checkbox'><input type='radio' name='radio17' value='F0'/>>50%</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>赡养人口</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio18\")' class='checkbox'><input type='radio' name='radio18' value='A5'/>无</label>" +
			"<label onclick='checkBox(this,\"radio18\")' class='checkbox'><input type='radio' name='radio18' value='B4'/>1人</label>" +
			"<label onclick='checkBox(this,\"radio18\")' class='checkbox'><input type='radio' name='radio18' value='C3'/>2人</label>" +
			"<label onclick='checkBox(this,\"radio18\")' class='checkbox'><input type='radio' name='radio18' value='D2'/>3人</label>" +
			"<label onclick='checkBox(this,\"radio18\")' class='checkbox'><input type='radio' name='radio18' value='E0'/>3人以上</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+ 
			"</tr>"+
			"<tr>"+                             
			"<th>推荐人</th>"+         
			"<td>" +
			"<label onclick='checkBox(this,\"radio19\")' class='checkbox'><input type='radio' name='radio19' value='A3'/>本公司员工推荐</label>" +
			"<label onclick='checkBox(this,\"radio19\")' class='checkbox'><input type='radio' name='radio19' value='B2'/>其他中介推荐</label>" +
			"<label onclick='checkBox(this,\"radio19\")' class='checkbox'><input type='radio' name='radio19' value='C5'/>银行推荐</label>" +
			"<label onclick='checkBox(this,\"radio19\")' class='checkbox'><input type='radio' name='radio19' value='D1'/>已担保客户推荐</label>" +
			"<label onclick='checkBox(this,\"radio19\")' class='checkbox'><input type='radio' name='radio19' value='E0'/>无</label>" +
			"<font class='dj'></font><font class='score'>0</font>"+
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>客户经理主观印象</th>"+         
			"<td>" +
			"<input type='text' onchange='qh(this)'/><font color='gray'>最高15分<font class='score'>0</font></font>" +
			"</td>"+ 
			"</tr>"+
			"<tr>"+                             
			"<th>客户单月可支配收入</th>"+         
			"<td>" +
			"<input type='text' onchange='jyed1(this)'/><font id='ed2'>1000000</font>" +
			"</td>"+
			"</tr>"+
			"<tr>"+                             
			"<th>是否属于超优客户</th>"+         
			"<td>" +
			"<input type='text' onchange='jyed2(this)'/><font color='gray'>“是”填“1”，“否”填“0”</font><font id='ed3'>500000</font>" +
			"</td>"+
			"</tr>"+
			"</table>"+
			"<table class='cpTable' style='margin-top:-20px;'>"+ 
			"<tr>"+    
			"<td style='width:33%;background:#fcd357;border:none;color:#fff;'>总分<font class='pf' id='zf'>0</font></td>"+
			"<td style='width:33%;background:#f49857;border:none;color:#fff;'>评分等级<font class='pf' id='pfdj'>B</font><font id='ed1'>20000</font></td>"+
			"<td style='background:#f26d6e;border:none;color:#fff;'>建议额度<font class='pf' id='jyed'>0</font></td>"+   
			"</tr>"+
			"</table>"+
			"<p>" +
			"<input type='button' class='btn btn-large btn-primary' value='确定'/>"+  
			"</p>" +
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
}


//客户经理日报
function khjlrb(){
	var khjirburl ="/ipad/dailyAccount/browse.json";
	var userId = window.sessionStorage.getItem("userId"); 
	var userType = window.sessionStorage.getItem("userType"); 
	var opin=window.sessionStorage.getItem("managerList");
	var body =	"<select id ='user'>"+"<option value = '0'>请选择客户经理</option>"+
	opin+
	"</select>"+
	"<input type='button' id='ckkhjlrb' class='btn btn-primary btn-large' value='筛选客户经理'/>";
	if(userType==1){
		body="";
	}
	$.get(wsHost+khjirburl,{"userId":userId,"userType":userType},callbackInfor);
	function callbackInfor(json){
		var obj = $.evalJSON(json);
		var tmp ="";
		var result={};
		var page=1;
		var j = 1;
		var head= "<tr>"+                             
		"<th></th>"+  
		"<th>客户经理</th>"+
		"<th>周几</th>"+
		"<th>周报名称</th>"+
		"<th>创建时间</th>"+
		"<th>修改时间</th>"+
		"</tr>";
		for(var i=0;i<obj.totalCount;i++){
			tmp+="<tr onclick='check(this)'>"+    
			"<td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.items[i].id+"@"+obj.items[i].displayName+"@"+
			obj.items[i].whatDay+"@"+obj.items[i].tomorrowplan+"@"+obj.items[i].todayplan+
			"@"+obj.items[i].modifiedTime+"@"+obj.items[i].reportDate+"@"+obj.items[i].managerId+"'/>"+"</span></td>"+
			"<td>"+obj.items[i].displayName+"</td>"+
			"<td>"+obj.items[i].whatDay+"</td>"+
			"<td>"+obj.items[i].title+"</td>"+
			"<td>"+obj.items[i].createdTime+"</td>"+
			"<td>"+obj.items[i].modifiedTime+"</td>"+
			"</tr>";

			if((i+1)%5==0){
				result[j]=tmp;
				j++;
				tmp="";
			}

		}
		result[j]=tmp;
		window.scrollTo(0,0);//滚动条回到顶端
		$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mywdjh()'/>客户经理日报</div>"+  
				"<div class='content'>" +
				"<table class='cpTable' id='rblb' style='text-align:center;'>"+
				head+result[page]+ 
				"</table>"+
				"<p>" +
				body+
				"<input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
				"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
				"<input type='button' class='btn btn-large btn-primary' value='修改' id ='xgrb'/>"+
				"<input type='button' class='btn btn-large btn-primary' value='查看' id ='ckrb'/>"+
				"<input type='button' class='btn btn-large' value='返回' onclick='mywdjh()'/></p>"+
		"</div>");
		$(".right").hide();
		$("#mainPage").show();
		$("#xyy").click(function(){
			page=page+1;
			if(result[page]){
				$("#rblb").html(head+result[page]);
			}else{
//				alert("当前已经是最后一页");
				window.wxc.xcConfirm("当前已经是最后一页", "info");
				page=page-1;
			}
		})
		$("#ckkhjlrb").click(function(){
			var userids=$("#user").val();
			if(userids!="0"){
			result={};
			page=1;
			j = 1;
			$.get(wsHost+khjirburl,{"loginId":userids,"userType":userType},callbackInforlist);
			function callbackInforlist(json){
				var obj = $.evalJSON(json);
			for(var i=0;i<obj.totalCount;i++){
				tmp+="<tr onclick='check(this)'>"+    
				"<td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.items[i].id+"@"+obj.items[i].displayName+"@"+
				obj.items[i].whatDay+"@"+obj.items[i].tomorrowplan+"@"+obj.items[i].todayplan+
				"@"+obj.items[i].modifiedTime+"@"+obj.items[i].reportDate+"@"+obj.items[i].managerId+"'/>"+"</span></td>"+
				"<td>"+obj.items[i].displayName+"</td>"+
				"<td>"+obj.items[i].whatDay+"</td>"+
				"<td>"+obj.items[i].title+"</td>"+
				"<td>"+obj.items[i].createdTime+"</td>"+
				"<td>"+obj.items[i].modifiedTime+"</td>"+
				"</tr>";

				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}
			result[j]=tmp;
			$("#rblb").html(head+result[page]);
			}
		}else{
			window.wxc.xcConfirm("请选择客户经理", "info");
		}
		})
		$("#syy").click(function(){
			page=page-1; 
			if(result[page]){
				$("#rblb").html(head+result[page]);
			}else{
//				alert("当前已经是第一页");
				window.wxc.xcConfirm("当前已经是第一页", "info");
				page = page+1;
			}
		})

		$("#xgrb").click(function(){
			if ($("input[type='radio']").is(':checked')) {
			var values =$('input[name="checkbox"]:checked').attr("value").split("@");
			var resu={};
			resu.rbId =values[0];
			resu.tomorrowplan =values[3];
			resu.todayplan =values[4];
			resu.reportDate=values[6];
			resu.managerId=values[7];
			xgkhrb(resu);
			}else{
//				alert("请选择一行");
				window.wxc.xcConfirm("请选择一行", "warning");
			}

		})
		$("#ckrb").click(function(){
			if ($("input[type='radio']").is(':checked')) {
			var values =$('input[name="checkbox"]:checked').attr("value").split("@");
			var resu={};
			resu.rbId =values[0];
			resu.tomorrowplan =values[3];
			resu.todayplan =values[4];
			resu.reportDate=values[6];
			resu.managerId=values[7];
			xsrbxx(resu);
		}else{
//			alert("请选择一行");
			window.wxc.xcConfirm("请选择一行", "warning");
		}
		})
	}



}

function xgkhrb(resu){
	var pmcurl="/ipad/dailyAccount/getpermanceByDateandId.json";
	$.ajax({
		url:wsHost+pmcurl,
		dateType:'json',
		type:'GET',
		//是否异步		
		//			async:false,
		data:{
			userId:resu.managerId,
			reportDate:resu.reportDate
		},
		success:function (json){
			var obj = $.evalJSON(json);
			var promance="";
			if(obj!=null){
				promance="<table id='cslb' class='cpTable jjTable' style='text-align:center;'>"+
				"<tr>"+                             
				"<th style='width:100px;'>拜访数</th>"+  
				"<td><input type='text' class='yejijindu' id='visitcount' name='visitcount' value='"+obj.visitcount+"' onfocus='onfocuss' readonly='true' /></td>"+
				"<th style='width:100px;'>申请数</th>"+  
				"<td><input type='text' class='yejijindu' value='"+obj.applycount+"' id='applycount' name='applycount' readonly='true'/></td>"+
				"<th style='width:100px;'>申请拒绝数</th>"+  
				"<td><input type='text' class='yejijindu' value='"+obj.applyrefuse+"' id='applyrefuse' name='applyrefuse' readonly='true'/></td>"+
				"</tr>"+
				"<tr>"+                             
				"<th style='width:100px;'>征信数</th>"+  
				"<td><input type='text' class='' value='"+obj.creditcount+"' id='creditcount' name='creditcount' readonly='true'/></td>"+
//				"<td><input type='text' class='addinput' value='0' id='creditcount' name='creditcount'/></td>"+
				"<th style='width:100px;'>征询拒绝数</th>"+  
				"<td><input type='text' class='' value='"+obj.creditrefuse+"' id='creditrefuse' name='creditrefuse' readonly='true'/></td>"+
				"<th style='width:100px;'>实调数</th>"+  
				"<td><input type='text' class='' value='"+obj.realycount+"' id='realycount' name='realycount' readonly='true'/></td>"+
				"</tr>"+
				"<tr>"+                             
				"<th style='width:100px;'>报告数</th>"+  
				"<td><input type='text' class='' value='"+obj.reportcount+"' id='reportcount' name='reportcount' readonly='true'/></td>"+
				"<th style='width:100px;'>内审数</th>"+  
				"<td><input type='text' class='' value='"+obj.internalcount+"' id='internalcount' name='internalcount' readonly='true'/></td>"+
				"<th style='width:100px;'>上会数</th>"+  
				"<td><input type='text' class='' value='"+obj.meetingcout+"' id='meetingcout' name='meetingcout' readonly='true'/></td>"+
				"</tr>"+
				"<tr>"+                             
				"<th style='width:100px;'>通过数</th>"+  
				"<td><input type='text' class='' value='"+obj.passcount+"' id='passcount' name='passcount' readonly='true'/></td>"+
				"<th style='width:100px;'>签约数</th>"+  
				"<td><input type='text' class='' value='"+obj.signcount+"' id='signcount' name='signcount' readonly='true'/></td>"+
				"<th style='width:100px;'>放款数</th>"+  
				"<td><input type='text' class='' value='"+obj.givemoneycount+"' id='givemoneycount' name='givemoneycount' readonly='true'/></td>"+
				"</tr>"+
				"</table>";
			}else{
				promance="<table id='cslb' class='cpTable jjTable' style='text-align:center;'>"+
				"<tr>"+                             
				"<th style='width:100px;'>拜访数</th>"+  
				"<td><input type='text' class='yejijindu' id='visitcount' name='visitcount' value='' onfocus='onfocuss' readonly='true'/></td>"+
				"<th style='width:100px;'>申请数</th>"+  
				"<td><input type='text' class='yejijindu' value='' id='applycount' name='applycount' readonly='true'/></td>"+
				"<th style='width:100px;'>申请拒绝数</th>"+  
				"<td><input type='text' class='yejijindu' value='' id='applyrefuse' name='applyrefuse' readonly='true'/></td>"+
				"</tr>"+
				"<tr>"+                             
				"<th style='width:100px;'>征信数</th>"+  
				"<td><input type='text' class='' value='' id='creditcount' name='creditcount' readonly='true'/></td>"+
//				"<td><input type='text' class='addinput' value='0' id='creditcount' name='creditcount'/></td>"+
				"<th style='width:100px;'>征询拒绝数</th>"+  
				"<td><input type='text' class='' value='' id='creditrefuse' name='creditrefuse' readonly='true'/></td>"+
				"<th style='width:100px;'>实调数</th>"+  
				"<td><input type='text' class='' value='' id='realycount' name='realycount' readonly='true'/></td>"+
				"</tr>"+
				"<tr>"+                             
				"<th style='width:100px;'>报告数</th>"+  
				"<td><input type='text' class='' value='' id='reportcount' name='reportcount' readonly='true'/></td>"+
				"<th style='width:100px;'>内审数</th>"+  
				"<td><input type='text' class='' value='' id='internalcount' name='internalcount' readonly='true'/></td>"+
				"<th style='width:100px;'>上会数</th>"+  
				"<td><input type='text' class='' value='' id='meetingcout' name='meetingcout' readonly='true'/></td>"+
				"</tr>"+
				"<tr>"+                             
				"<th style='width:100px;'>通过数</th>"+  
				"<td><input type='text' class='' value='' id='passcount' name='passcount' readonly='true'/></td>"+
				"<th style='width:100px;'>签约数</th>"+  
				"<td><input type='text' class='' value='' id='signcount' name='signcount' readonly='true'/></td>"+
				"<th style='width:100px;'>放款数</th>"+  
				"<td><input type='text' class='' value='' id='givemoneycount' name='givemoneycount' readonly='true'/></td>"+
				"</tr>"+
				"</table>";
			}
	var rbxgurl="/ipad/dailyAccount/update.json";
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='khjlrb()'/>客户经理日报</div>"+  
			"<div class='content'>" +
			promance+
			"<table class='cpTable khjbxx' style='margin-top:20px;'>"+//审核审批任务信息
			"<tr>"+                        
			"<th colspan='4'>今日工作内容</th></tr>"+ 
			"<tr>"+
			"<td><textarea name='todayplan' id='todayplan' style='height:200px'>"+resu.todayplan+"</textarea>"+
			"</tr>"+
			"<tr><td colspan='4'><h3><b>今日工作内容：</b>（工作地点、工作内容明细、工作总结与感悟等）。</h3></td></tr>"+

			"<tr>"+                        
			"<th colspan='4'>明日工作安排</th></tr>"+ 
			"</tr>"+
			"<td><textarea name='tomorrowplan' id='tomorrowplan' style='height:200px'>"+resu.tomorrowplan+"</textarea>"+
			"</tr>"+
			"<tr><td colspan='4'><h3><b>明日工作计划：</b>（工作计划区域、计划工作事项、业务目标等）。</h3></td></tr>"+

			"</table>"+
			"<p>" +
			"<input type='button' class='btn btn-primary btn-large' value='保存' id='save' />" +
			"<input type='button' class='btn btn-large' value='返回' onclick='khjlrb()'/>" +
			"</p>"+
	"</div>");

	$("#save").click(function(){
		$.ajax({
			url:wsHost+rbxgurl,
			dateType:'json',
			type:'GET',
			//是否异步		
			//			async:false,
			data:{
				userId:window.sessionStorage.getItem("userId"),
				todayplan:$("#todayplan").val(),
				tomorrowplan:$("#tomorrowplan").val(),
				id:resu.rbId,
			},
			success:function (json){
				var obj = $.evalJSON(json);
//				alert(obj.message);
				window.wxc.xcConfirm(obj.message, "info");
				if(obj.success=="true"){
					khjlrb();
				}
			}
		})
	})

		}
	})
}


//显示日报信息

function xsrbxx(resu){
	var pmcurl="/ipad/dailyAccount/getpermanceByDateandId.json";
	$.ajax({
		url:wsHost+pmcurl,
		dateType:'json',
		type:'GET',
		//是否异步		
		//			async:false,
		data:{
			userId:resu.managerId,
			reportDate:resu.reportDate
		},
		success:function (json){
			var obj = $.evalJSON(json);
			var promance="";
			if(obj!=null){
				promance="<table id='cslb' class='cpTable jjTable' style='text-align:center;'>"+
				"<tr>"+                             
				"<th style='width:100px;'>拜访数</th>"+  
				"<td><input type='text' class='yejijindu' id='visitcount' name='visitcount' value='"+obj.visitcount+"' onfocus='onfocuss' readonly='true' /></td>"+
				"<th style='width:100px;'>申请数</th>"+  
				"<td><input type='text' class='yejijindu' value='"+obj.applycount+"' id='applycount' name='applycount' readonly='true'/></td>"+
				"<th style='width:100px;'>申请拒绝数</th>"+  
				"<td><input type='text' class='yejijindu' value='"+obj.applyrefuse+"' id='applyrefuse' name='applyrefuse' readonly='true'/></td>"+
				"</tr>"+
				"<tr>"+                             
				"<th style='width:100px;'>征信数</th>"+  
				"<td><input type='text' class='' value='"+obj.creditcount+"' id='creditcount' name='creditcount' readonly='true'/></td>"+
//				"<td><input type='text' class='addinput' value='0' id='creditcount' name='creditcount'/></td>"+
				"<th style='width:100px;'>征询拒绝数</th>"+  
				"<td><input type='text' class='' value='"+obj.creditrefuse+"' id='creditrefuse' name='creditrefuse' readonly='true'/></td>"+
				"<th style='width:100px;'>实调数</th>"+  
				"<td><input type='text' class='' value='"+obj.realycount+"' id='realycount' name='realycount' readonly='true'/></td>"+
				"</tr>"+
				"<tr>"+                             
				"<th style='width:100px;'>报告数</th>"+  
				"<td><input type='text' class='' value='"+obj.reportcount+"' id='reportcount' name='reportcount' readonly='true'/></td>"+
				"<th style='width:100px;'>内审数</th>"+  
				"<td><input type='text' class='' value='"+obj.internalcount+"' id='internalcount' name='internalcount' readonly='true'/></td>"+
				"<th style='width:100px;'>上会数</th>"+  
				"<td><input type='text' class='' value='"+obj.meetingcout+"' id='meetingcout' name='meetingcout' readonly='true'/></td>"+
				"</tr>"+
				"<tr>"+                             
				"<th style='width:100px;'>通过数</th>"+  
				"<td><input type='text' class='' value='"+obj.passcount+"' id='passcount' name='passcount' readonly='true'/></td>"+
				"<th style='width:100px;'>签约数</th>"+  
				"<td><input type='text' class='' value='"+obj.signcount+"' id='signcount' name='signcount' readonly='true'/></td>"+
				"<th style='width:100px;'>放款数</th>"+  
				"<td><input type='text' class='' value='"+obj.givemoneycount+"' id='givemoneycount' name='givemoneycount' readonly='true'/></td>"+
				"</tr>"+
				"</table>";
			}else{
				promance="<table id='cslb' class='cpTable jjTable' style='text-align:center;'>"+
				"<tr>"+                             
				"<th style='width:100px;'>拜访数</th>"+  
				"<td><input type='text' class='yejijindu' id='visitcount' name='visitcount' value='' onfocus='onfocuss' readonly='true'/></td>"+
				"<th style='width:100px;'>申请数</th>"+  
				"<td><input type='text' class='yejijindu' value='' id='applycount' name='applycount' readonly='true'/></td>"+
				"<th style='width:100px;'>申请拒绝数</th>"+  
				"<td><input type='text' class='yejijindu' value='' id='applyrefuse' name='applyrefuse' readonly='true'/></td>"+
				"</tr>"+
				"<tr>"+                             
				"<th style='width:100px;'>征信数</th>"+  
				"<td><input type='text' class='' value='' id='creditcount' name='creditcount' readonly='true'/></td>"+
//				"<td><input type='text' class='addinput' value='0' id='creditcount' name='creditcount'/></td>"+
				"<th style='width:100px;'>征询拒绝数</th>"+  
				"<td><input type='text' class='' value='' id='creditrefuse' name='creditrefuse' readonly='true'/></td>"+
				"<th style='width:100px;'>实调数</th>"+  
				"<td><input type='text' class='' value='' id='realycount' name='realycount' readonly='true'/></td>"+
				"</tr>"+
				"<tr>"+                             
				"<th style='width:100px;'>报告数</th>"+  
				"<td><input type='text' class='' value='' id='reportcount' name='reportcount' readonly='true'/></td>"+
				"<th style='width:100px;'>内审数</th>"+  
				"<td><input type='text' class='' value='' id='internalcount' name='internalcount' readonly='true'/></td>"+
				"<th style='width:100px;'>上会数</th>"+  
				"<td><input type='text' class='' value='' id='meetingcout' name='meetingcout' readonly='true'/></td>"+
				"</tr>"+
				"<tr>"+                             
				"<th style='width:100px;'>通过数</th>"+  
				"<td><input type='text' class='' value='' id='passcount' name='passcount' readonly='true'/></td>"+
				"<th style='width:100px;'>签约数</th>"+  
				"<td><input type='text' class='' value='' id='signcount' name='signcount' readonly='true'/></td>"+
				"<th style='width:100px;'>放款数</th>"+  
				"<td><input type='text' class='' value='' id='givemoneycount' name='givemoneycount' readonly='true'/></td>"+
				"</tr>"+
				"</table>";
			}
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='khjlrb()'/>客户经理日报</div>"+  
			"<div class='content'>" +
			promance+
			"<table class='cpTable khjbxx' style='margin-top:20px;'>"+//审核审批任务信息
			"<tr>"+                        
			"<th colspan='4'>今日工作内容</th></tr>"+ 
			"<tr>"+
			"<td><textarea name='todayplan' id='todayplan' style='height:200px' disabled='disabled'>"+resu.todayplan+"</textarea>"+
			"</tr>"+
			"<tr><td colspan='4'><h3><b>今日工作内容：</b>（工作地点、工作内容明细、工作总结与感悟等）。</h3></td></tr>"+

			"<tr>"+                        
			"<th colspan='4'>明日工作安排</th></tr>"+ 
			"</tr>"+
			"<td><textarea name='tomorrowplan' id='tomorrowplan' style='height:200px' disabled='disabled'>"+resu.tomorrowplan+"</textarea>"+
			"</tr>"+
			"<tr><td colspan='4'><h3><b>明日工作计划：</b>（工作计划区域、计划工作事项、业务目标等）。</h3></td></tr>"+

			"</table>"+
			"<p>" +
			"<input type='button' class='btn btn-large' value='返回' onclick='khjlrb()'/>" +
			"</p>"+
	"</div>");


		}
	})
}

function jljlxx(){
	var jlxxurl="/ipad/custAppInfo/returnPrepareAmount.json";
	$.ajax({
		url:wsHost+jlxxurl,
		dateType:'json',
		type:'GET',
		//是否异步		
		//			async:false,
		data:{
			userId:window.sessionStorage.getItem("userId"),
			userType:window.sessionStorage.getItem("userType"),
		},
		success:function (json){
			var obj = $.evalJSON(json);
			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mywdsy()'/>客户经理日报</div>"+  
					"<div class='content'>" +
					"<table class='cpTable' id='rblb' style='text-align:center;'>"+
					"<tr>"+
					"<td style='width:300px;'>上月奖励激励金额</td>"+
					"<td>"+obj.reward_incentive+
					"</td>"+
					"</tr>"+
					"<tr>"+
					"<td style='width:300px;'>风险保证金余额</td>"+
					"<td>"+obj.return_prepare_amount+
					"</td>"+
					"</tr>"+
					"</table>"+
					"<p>" +
					"<input type='button' class='btn btn-large' value='返回' onclick='mywdsy()'/></p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();
		}
	})
}
//地图
function myMap(){
	alert("开发中,敬请期待!");
}
function wzxx(){
	var khjlxxlurl = "/ipad/intopieces/managerInfoi.json";
	var opin=window.sessionStorage.getItem("managerList");
	var userType=window.sessionStorage.getItem("userType");
	var body =	"<select id ='user'>"+"<option value = '0'>请选择客户经理</option>"+
	opin+
	"</select>"+
	"<input type='button' id='ckkhjlwz' class='btn btn-primary btn-large' value='查看客户经理位置'/>";
	if(userType==1){
		body="";
	}

	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mywdsy()'/>位置信息</div>"+  
			"</div>"+
			"<div class='contents' id='allmap'  style='text-align:center;height:580px;margin:auto auto;'>" +
			"<div class='spinner'>"+
			"<div class='bounce1'></div>"+
			"<div class='bounce2'></div>"+
			"<div class='bounce3'></div>"+
			"</div>"+
			"</div>"+
			"<div class='content' style ='margin:0 auto;'><p align='center'>" +
			body+
			"<input type='button' id='fswdwz' class='btn btn btn-primary btn-large' value='发送我的位置'/>"+  
			"<input type='button' id='ddddd' class='btn btn btn-primary btn-large' value='刷新'/>"+  
			"<input type='button' class='btn btn-large'  value='返回' onclick='mywdsy()'/>"+  
			"</p></div>"
	);
	$(".right").hide();
	$("#mainPage").show();
	locationOnline();
	$("#ddddd").click(function(){
		lon="";
		lat="";
		wzxx();
	})
	$("#ckkhjlwz").click(function(){
		var userId = $("#user").val();
		var gxwzUrl = "/ipad/intopieces/selectLocation.json";
		$.ajax({
			url:wsHost+gxwzUrl,
			dateType:'json',
			type:'GET',
			//是否异步		
			//			async:false,
			data:{
				userId:userId,
			},
			success:function (json){
				var obj = $.evalJSON(json);
				if(obj.success=="true"){
					Message.showNotify("点击地图上的marker可以在百度地图中查看更详细的信息",3000);
					$("#allmap").removeClass("contents").addClass("content");
					$("#allmap").html("");
					var map = new BMap.Map("allmap"); 
					map.setMaxZoom(15);
					map.setMinZoom(4);
					map.enableScrollWheelZoom(); 
					for(var i=0;i<obj.size;i++){
						var lonnn = obj.LocationInfoForm[i].longitude; 
						var lattt = obj.LocationInfoForm[i].latitude; 
						var updatetime=obj.LocationInfoForm[i].updateTime;
						var userName=obj.LocationInfoForm[i].userName;
						var point = new BMap.Point(""+lonnn+"",""+lattt+""); 
						
							var marker  = new BMap.Marker(point); 
							map.centerAndZoom(point,12); 
							map.addOverlay(marker); 
							var label = new BMap.Label(userName+":"+updatetime,{offset:new BMap.Size(20,-10)});
							marker.setLabel(label);
							showInformation(marker,updatetime,lonnn,lattt,map,userName);
					}
				}else if(obj.success=="false"){

					window.wxc.xcConfirm("该客户经理位置信息不存在", "info");
				}else{

					window.wxc.xcConfirm("未知错误", "error");
				}


			}

		})
	})
	$("#fswdwz").click(function(){
		
		if(lon!=""&&lat!=""){
		var gxwzUrl = "/ipad/intopieces/updateLocation.json";
		var userId = window.sessionStorage.getItem("userId");
			$.ajax({
				url:wsHost+gxwzUrl,
				dateType:'json',
				type:'GET',
				//是否异步		
				//			async:false,
				data:{
					lat:lat,
					lon:lon,
					userId:userId,
				},
				success:function (json){
					var obj = $.evalJSON(json);
					window.wxc.xcConfirm(obj.message, "info");
					lon="";
					lat="";
				}

			})
//		}
		}else{
			
			window.wxc.xcConfirm("位置信息为空，等待获取位置信息", "info");
		}
	})
}
var lon="";
var lat="";

function getLocation(){ 
	window.plugins.CoordinateTranslatePlugin.startActivity(locationsuccess,SdkLicationErro,"","get");
} 
function locationsuccess(position){
	if(position.LocType=="61"||position.LocType=="161"||position.LocType=="65"||position.LocType=="66"){
	$("#allmap").removeClass("contents").addClass("content");
	$("#allmap").html("");
	var LocType;
	var adress;
	if(position.LocType=="61"){
		LocType="GPS定位结果";
	}else if(position.LocType=="161"){
		LocType="网络定位结果";
	}else if(position.LocType=="65"){
		LocType="缓存位置结果";
	}
	if(position.AddrStr){
		adress=position.AddrStr;
	}else{
		adress="无法从网络获取地址信息,请根据地图marker辨别位置";
	}
	lon=position.Longitude;
	lat=position.Latitude;
	var map = new BMap.Map("allmap"); 
	var points = new BMap.Point(""+lon+"",""+lat+""); 
	map.centerAndZoom(points,12); 
	var gc = new BMap.Geocoder(); 
	var marker = new BMap.Marker(points);
	var infoWindow;
	map.addOverlay(marker); 
	map.setCenter(points); 
	map.setMaxZoom(15);
	map.setMinZoom(4);
	var sContent = 
		"<div><h4 style='margin:0 0 5px 0;padding:0.2em 0'>当前"+LocType+"是：</h4>" +  
		"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+adress+"</p>" +  
		"</div>"; 
	var infoWindow = new BMap.InfoWindow(sContent); 
	map.openInfoWindow(infoWindow,points); 
	marker.addEventListener("click", function () {  
		window.wxc.xcConfirm("是否在百度地图中查看详细位置", "confirm",{onOk:function(){
			window.location.href="bdapp://map/marker?location="+lat+","+lon+"&title=您当前的位置&content=makeamarker&traffic=on";
			}});
	}); 
	}
else if(position.LocType=="62"){
	$("#allmap").html("");
	$("#allmap").removeClass("content").addClass("contents");
	$("#allmap").html("<div class='spinner'>62 ：无法获取有效定位依据，定位失败，请检查运营商网络或者WiFi网络是否正常开启，尝试重新请求定位。</div>");
}
else if(position.LocType=="63"){
	$("#allmap").html("");
	$("#allmap").removeClass("content").addClass("contents");
	$("#allmap").html("<div class='spinner'>63 ：网络异常，没有成功向服务器发起请求，请确认当前测试手机网络是否通畅，尝试重新请求定位。</div>");
}
else if(position.LocType=="67"){
	$("#allmap").html("");
	$("#allmap").removeClass("content").addClass("contents");
	$("#allmap").html("<div class='spinner'>67 ：离线定位失败。通过requestOfflineLocaiton调用时对应的返回结果。</div>");
}
else if(position.LocType=="167"){
	$("#allmap").html("");
	$("#allmap").removeClass("content").addClass("contents");
	$("#allmap").html("<div class='spinner'>167 ：服务端定位失败，请您检查是否禁用获取位置信息权限，尝试重新请求定位。</div>");
}
else if(position.LocType=="162"){
	$("#allmap").html("");
	$("#allmap").removeClass("content").addClass("contents");
	$("#allmap").html("<div class='spinner'>162 ： 请求串密文解析失败。</div>");
}else{
	$("#allmap").html("");
	$("#allmap").removeClass("content").addClass("contents");
	$("#allmap").html("<div class='spinner'>错误代码："+position.LocType+"</div>");
}
}
function SdkLicationErro(erro){
	$("#allmap").html("");
	$("#allmap").removeClass("content").addClass("contents");
	$("#allmap").html("<div class='spinner'>未知错误</div>");
}
function getLocations(){ 
	window.plugins.CoordinateTranslatePlugin.startActivity(mapIts,SdkLicationErro,"","get");
} 
function mapIts(position){  
	var gxwzUrl = "/ipad/intopieces/updateLocation.json";
	var userId = window.sessionStorage.getItem("userId");
	lon=position.Longitude;
	lat=position.Latitude;
	if(lon!=""&&lat!=""&&(position.LocType=="61"||position.LocType=="161")){
		$.ajax({
			url:wsHost+gxwzUrl,
			dateType:'json',
			type:'GET',
			//是否异步		
			//			async:false,
			data:{
				lat:lat,
				lon:lon,
				userId:userId,
			},
			success:function (json){
				var obj = $.evalJSON(json);
				window.wxc.xcConfirm(obj.message, "info");
				lat="";
				lon="";
			}

		})

	}else{
//		alert("无法获取当前位置，请检查网络连接和GPS权限"); 
		window.wxc.xcConfirm("获取位置失败，无法自动提交位置信息", "error");

	}
//	}
}
//调用嗯本地百度APP
function showInformation(marker,updatetime,lonnn,lattt,map,username){
	marker.addEventListener("click", function(){
			window.wxc.xcConfirm("是否在百度地图中查看详细位置", "confirm",{onOk:function(){
				window.location.href="bdapp://map/marker?location="+lattt+","+lonnn+"&title="+username+updatetime+"的位置&content=makeamarker&traffic=on";
				}});
})
}

function wzxx2(){
//百度sdk
	var khjlxxlurl = "/ipad/intopieces/managerInfoi.json";
	var opin=window.sessionStorage.getItem("managerList");
	var userType=window.sessionStorage.getItem("userType");
	var body =	"<select id ='user'>"+"<option value = '0'>请选择客户经理</option>"+
	opin+
	"</select>"+
	"<input type='button' id='ckkhjlwz' class='btn btn-primary btn-large' value='查看客户经理位置'/>";
	if(userType==1){
		body="";
	}

	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mywdsy()'/>位置信息</div>"+  
			"</div>"+
			"<div class='contents' id='allmap'  style='text-align:center;height:580px;margin:auto auto;'>" +
			"<div class='spinner'>"+
			"<div class='bounce1'></div>"+
			"<div class='bounce2'></div>"+
			"<div class='bounce3'></div>"+
			"</div>"+
			"</div>"+
			"<div class='content' style ='margin:0 auto;'><p align='center'>" +
			body+
			"<input type='button' id='fswdwz' class='btn btn btn-primary btn-large' value='发送我的位置'/>"+  
			"<input type='button' id='ddddd' class='btn btn btn-primary btn-large' value='刷新'/>"+  
			"<input type='button' class='btn btn-large'  value='返回' onclick='mywdsy()'/>"+  
			"</p></div>"
	);
	$(".right").hide();
	$("#mainPage").show();
	getLocation();
	$("#ddddd").click(function(){
		lon="";
		lat="";
		wzxx2();
	})
	$("#ckkhjlwz").click(function(){
		var userId = $("#user").val();
		var gxwzUrl = "/ipad/intopieces/selectLocation.json";
		$.ajax({
			url:wsHost+gxwzUrl,
			dateType:'json',
			type:'GET',
			//是否异步		
			//			async:false,
			data:{
				userId:userId,
			},
			success:function (json){
				var obj = $.evalJSON(json);
				if(obj.success=="true"){
					Message.showNotify("点击地图上的marker可以在百度地图中查看更详细的信息",3000);
					$("#allmap").removeClass("contents").addClass("content");
					$("#allmap").html("");
					var map = new BMap.Map("allmap"); 
					map.setMaxZoom(15);
					map.setMinZoom(4);
					map.enableScrollWheelZoom(); 
					for(var i=0;i<obj.size;i++){
						var lonnn = obj.LocationInfoForm[i].longitude; 
						var lattt = obj.LocationInfoForm[i].latitude; 
						var updatetime=obj.LocationInfoForm[i].updateTime;
						var userName=obj.LocationInfoForm[i].userName;
						var point = new BMap.Point(""+lonnn+"",""+lattt+""); 
						
							var marker  = new BMap.Marker(point); 
							map.centerAndZoom(point,12); 
							map.addOverlay(marker); 
							var label = new BMap.Label(userName+":"+updatetime,{offset:new BMap.Size(20,-10)});
							marker.setLabel(label);
							showInformation(marker,updatetime,lonnn,lattt,map,userName);
//						}
					}
				}else if(obj.success=="false"){

					window.wxc.xcConfirm("该客户经理位置信息不存在", "info");
				}else{

					window.wxc.xcConfirm("未知错误", "error");
				}


			}

		})
	})
	$("#fswdwz").click(function(){
		
		if(lon!=""&&lat!=""){
		var gxwzUrl = "/ipad/intopieces/updateLocation.json";
		var userId = window.sessionStorage.getItem("userId");
			$.ajax({
				url:wsHost+gxwzUrl,
				dateType:'json',
				type:'GET',
				//是否异步		
				//			async:false,
				data:{
					lat:lat,
					lon:lon,
					userId:userId,
				},
				success:function (json){
					var obj = $.evalJSON(json);
					window.wxc.xcConfirm(obj.message, "info");
					lon="";
					lat="";
				}

			})
		}else{
			
			window.wxc.xcConfirm("位置信息为空，等待获取位置信息", "info");
		}
	})

}