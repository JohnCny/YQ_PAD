function kdjj(){
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'>快审通-待调查进件</div>"+  
			"<div class='content'>" +
			"<div class='box shspp1' onclick='cusbc()'><img src='images/shsp1.png'/>" +                            
			"<span>补充申请客户资料</span>"+
			"</div>"+
			"<div class='box shspp1' onclick='ks()'><img src='images/shsp2.png'/>" +
			"<span>快审</span>"+
			"</div>"+
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
}
function cusbc(){
	var sdrwurl= "/ipad/intopieces/csBrowse.json";
	var userId = window.sessionStorage.getItem("userId");
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var head ="<tr>"+                         
	"<th></th>"+                 
	"<th>客户名称</th>"+  
	"<th>身份证号码</th>"+
	"<th>手机号</th>"+
	"<th>申请金额(元)</th>"+
	"<th>申请期限</th>"+
	"<th>申请时间</th>"+
	"<th>状态</th>"+ 
	"</tr>"
	/*$.ajax({
		url:wsHost+sdrwurl,
		type: "GET",
		dataType:'json',
		data:{
			userId:userId,
		},
		success: function (json){
			var obj = $.evalJSON(json);
			for(var i = 0;i<obj.items.length;i++){

				tmp=tmp+"<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.items[i].productId+"@"+
				obj.items[i].applyQuota+"@"+obj.items[i].customerId+"@"+obj.items[i].id+
				"@"+obj.items[i].status+"@"+obj.items[i].examineAmount+"'/>"+"</span></td>"+  
				"<td>"+obj.items[i].chineseName+"</td>"+
				"<td>"+obj.items[i].applyQuota+"</td>"+
				"<td>"+obj.items[i].cardType+"</td>"+
				"<td>"+obj.items[i].cardId+"</td>"+
				"<td>"+obj.items[i].status+"</td>"+
				"<td>"+obj.items[i].createdTime+"</td>"+			
				"<td>"+obj.items[i].nodeName+"</td></tr>"

				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}

			result[j]=tmp;*/

			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='myshsp()'/>进件初审</div>"+  
					"<div class='content' >"+ 
					"<table id='cslb' class='cpTable jjTable' style='text-align:center;'>"+
					head+
					//head+result[page]+
					"</table>"+
					"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
					"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
					"<input type='button' class='btn btn-large btn-primary' value='补充调查' id ='xszlxx'/>"+
					"<input type='button' class='btn btn-large btn-primary' value='上传资料' id ='xsyxzl'/>"+
					"<input type='button' class='btn btn-primary btn-large' value='调查历史' id='csjl'/>"+
					"<input type='button' class='btn btn-large' value='返回' onclick='kdjj()'/></p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();   

			$("#xyy").click(function(){
				page=page+1;
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
//					alert("当前已经是最后一页");
					window.wxc.xcConfirm("当前已经是最后一页", "info");
					page=page-1;
				}
			})
			$("#syy").click(function(){
				page=page-1; 
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
//					alert("当前已经是第一页");
					window.wxc.xcConfirm("当前已经是第一页", "info");
					page = page+1;
				}
			})

			$("#csjl").click(function() {
				if ($("input[type='radio']").is(':checked')) {

					var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					var res ={};
					res.appId = values[3];
					res.customerId = values[2];
					res.productId =values[0];
					res.applyQuota = values[1];
					csresult(res);
				}else{
//					alert("请选择一行");
					window.wxc.xcConfirm("请选择一行", "warning");
				}
			})
			$("#xsyxzl").click(function() {
				/*if ($("input[type='radio']").is(':checked')) {
					var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					var res ={};
					res.customerId = values[2];
					res.productId =values[0];
					res.applicationId =values[3];
					res.currentLoc ="cysdrw()";
					xsyxzl(res);
				}else{
//					alert("请选择一行");
					window.wxc.xcConfirm("请选择一行", "warning");
				}*/
				zpsc();
			})
			$("#xszlxx").click(function() {
				//kdbcdc();
			/*	if ($("input[type='radio']").is(':checked')) {
					$("#xszlxx").attr('disabled',"true");
					var values =$('input[name="checkbox"]:checked').attr("value").split("@");

					var appId = values[3];
					var res={};
					res.appId = appId;
					res.currentLoc ="cysdrw()";
					kdbcdc(res);
				}else{
					window.wxc.xcConfirm("请选择一行", "warning");
				}*/
			})
}



/* ********************* 补充调查  ********************* */
function kdbcdc(){
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='cusbc()'/>快审通-补充调查</div>"+  
			"<div class='content'>" +
	"<table class='cpTable khjbxx' style='margin-top:20px;'>"+
			"<tr>"+                        
			"<th colspan='4'>客户基本信息</th>"+  
			"</tr>"+
			"<tr>"+
			"<th>申请人:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
			"<th>性别:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+
			"<th>年龄:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
			"<th>身份证号:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+
			"<th>手机号:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
			"<th>婚姻状况:</th>"+
			"<td><select id='hyzk'>" +
				"<option value = '未婚'>未婚</option>" +
				"<option value = '已婚'>已婚</option>" +
				"<option value = '离婚'>离婚</option>" +
				"<option value = '再婚'>再婚</option>" +
				"</select></td>"+
			"</tr>"+
			"<tr>"+
			"<th>户籍所在地:</th>"+
			"<td><select id='hyzk'>" +
			"<option value = '本省'>本省</option>" +
			"<option value = '本省外地'>本省外地</option>" +
			"<option value = '外地'>外地</option>" +
			"</select></td>"+
			"<th>最高学位学历:</th>"+
			"<td><select id='hyzk'>" +
				"<option value = '初中及以下'>初中及以下</option>" +
				"<option value = '高中或技校'>高中或技校</option>" +
				"<option value = '大学或以上'>大学或以上</option>" +
				"</select></td>"+
			"</tr>"+
			"<tr>"+                        
			"<th colspan='4'>家庭资产:</th>"+  
			"</tr>"+
			"<tr>"+
			"<th>自有房产数量:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
			"<th>按揭房产数量:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+
			"<th>按揭贷款余额:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/> &nbsp;元</td>"+
			"<th>自有车辆数量:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+                        
			"<th colspan='4'>征信状况:</th>"+  	
			"</tr>"+
			"<tr>"+
			"<th >信用状况:</th>"+
			"<td><select id='hyzk'>" +
			"<option value = '正常'>正常</option>" +
			"<option value = '不正常'>不正常</option>" +
			"<option value = '无记录'>无记录</option>" +
			"</select></td>"+
			"<th>信用逾期次数:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
			"</tr>"+
			
			"<tr>"+
			"<th>贷款逾期次数:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
			"<th>贷款余额:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+
			"<tr>"+
			"<th>担保余额:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+
			
			
			
			"<tr>"+                        
			"<th colspan='4'>家庭状况</th>"+ 
			"</tr>"+
			"<tr>"+  
			"<th>经济上依赖的人数:</th>"+
			"<td><input  type='text' value='' /></td>"+
			"<th>配偶年收入:</th>"+
			"<td><input  type='text' value='' />&nbsp;元</td>"+
			"</tr>"+
			"<tr>"+
			"<th>子女教育状况:</th>"+
			"<td><select id='hyzk'>" +
			"<option value = '正常'>正常</option>" +
			"<option value = '不正常'>不正常</option>" +
			"<option value = '无记录'>无记录</option>" +
			"</select></td>"+
			"</tr>"+
			
			
			
			
			
			"<tr>"+                        
			"<th colspan='4'>经营及财务状况</th>"+  
			"</tr>"+
			"<tr>"+
			"<th>业务年限:</th>"+
			"<td><input  type='text' value='' />&nbsp;年</td>"+
			"</tr>"+
			"<tr>"+
			"<th>流动资产:</th>"+
			"<td><input  type='text' value='' /> &nbsp;元</td>"+
			"<th>存货:</th>"+
			"<td><input  type='text' value='' />&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>固定资产:</th>"+
			"<td><input  type='text' value='' /> &nbsp;元</td>"+
			"<th>资产总计:</th>"+
			"<td><input  type='text' value='' />&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>短期负债:</th>"+
			"<td><input  type='text' value='' /> &nbsp;元</td>"+
			"<th>负债总计:</th>"+
			"<td><input  type='text' value='' />&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>所有者权益:</th>"+
			"<td><input  type='text' value='' /> &nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>主营业务收入:</th>"+
			"<td><input  type='text' value='' /> &nbsp;元</td>"+
			"<th>其他工作年收入:</th>"+
			"<td><input  type='text' value='' />&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>私人用途分期付款:</th>"+
			"<td><input  type='text' value='' /> &nbsp;元</td>"+
			"<th>年可支配收入:</th>"+
			"<td><input  type='text' value='' />&nbsp;元</td>"+
			"</tr>"+  

			"</table>"+
			"<p>" +
			"<input type='button' class='btn btn-primary btn-large' value='提交' id='save' />" +
			"<input type='button' class='btn btn-large' value='返回' onclick='cusbc()'/>" +
			"</p>"+
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
}





/* ********************* 照片上传  ********************* */
function zpsc(){
	var sdrwurl= "/ipad/intopieces/csBrowse.json";
	var userId = window.sessionStorage.getItem("userId");
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var td="";
	var head ="<tr>"+ 
	
	"<th></th>"+                 
	"<th>文件名称</th>"+  
	"<th>上传时间</th>"+
	"<th>文件</th>"+
	"</tr>"
	/*$.ajax({
		url:wsHost+sdrwurl,
		type: "GET",
		dataType:'json',
		data:{
			userId:userId,
		},
		success: function (json){
			var obj = $.evalJSON(json);
			for(var i = 0;i<obj.items.length;i++){

				tmp=tmp+"<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.items[i].productId+"@"+
				obj.items[i].applyQuota+"@"+obj.items[i].customerId+"@"+obj.items[i].id+
				"@"+obj.items[i].status+"@"+obj.items[i].examineAmount+"'/>"+"</span></td>"+  
				"<td>"+obj.items[i].chineseName+"</td>"+
				"<td>"+obj.items[i].applyQuota+"</td>"+
				"<td>"+obj.items[i].cardType+"</td>"+
				"<td>"+obj.items[i].cardId+"</td>"+
				"<td>"+obj.items[i].status+"</td>"+
				"<td>"+obj.items[i].createdTime+"</td>"+			
				"<td>"+obj.items[i].nodeName+"</td></tr>"

				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}

			result[j]=tmp;*/
	for(var i=0;i<10;i++){
		td=td+"<a href='images/shsp1.png'  data-type='image'>"+
					"<img class='images' id='ima'style='width:65px;height:30px;padding-left:3px;' border='0' src='images/shsp1.png'/>"+    
					  "</a>";
	}
			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='myshsp()'/>快审通-上传资料</div>"+  
					"<div class='content' >"+ 
					"<div  class='plusview'>"+ 
					"<table id='cslb' class='cpTable jjTable' style='text-align:center;'>"+
					head+
					"<td></td>"+
					"<td>身份证</td>"+
					"<td>2018-02-12</td>"+
					"<td >"+td+"</td>"+
					"</table>"+
					"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
					"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
					"<input type='button' class='btn btn-large btn-primary' value='拍照' onclick='capture(\"qtyxzl_sheet1\",\"img\",\"imageuri\",\"1\",\""+name+ "\");'/>"+
					"<input type='button' class='btn btn-large btn-primary' value='上传本地文件' id ='xsyxzl'/>"+
					"<input type='button' class='btn btn-primary btn-large' value='下载' id='csjl'/>"+
					"<input type='button' class='btn btn-large' value='删除' onclick='kdjj()'/></p>"+
			"</div></div>");
			$(".right").hide();
			$("#mainPage").show();   
			$(function(){
				$('.plusview').plusview();
			});
			$("#xyy").click(function(){
				page=page+1;
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
//					alert("当前已经是最后一页");
					window.wxc.xcConfirm("当前已经是最后一页", "info");
					page=page-1;
				}
			})
			$("#syy").click(function(){
				page=page-1; 
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
//					alert("当前已经是第一页");
					window.wxc.xcConfirm("当前已经是第一页", "info");
					page = page+1;
				}
			})

			$("#csjl").click(function() {
				if ($("input[type='radio']").is(':checked')) {

					var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					var res ={};
					res.appId = values[3];
					res.customerId = values[2];
					res.productId =values[0];
					res.applyQuota = values[1];
					csresult(res);
				}else{
//					alert("请选择一行");
					window.wxc.xcConfirm("请选择一行", "warning");
				}
			})
}


/********************** 快审  **********************/
function ks(){
	var ksurl= "/ipad/intopieces/csBrowse.json";//快审查询url
	var userId = window.sessionStorage.getItem("userId");//获取登录客户id
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var head ="<tr>"+                         
	"<th></th>"+                 
	"<th>客户名称</th>"+  
	"<th>身份证号码</th>"+
	"<th>手机号</th>"+
	"<th>申请金额(元)</th>"+
	"<th>申请期限</th>"+
	"<th>申请时间</th>"+
	"<th>状态</th>"+ 
	"</tr>"
	
	/*$.ajax({
		url:wsHost+sdrwurl,
		type: "GET",
		dataType:'json',
		data:{
			userId:userId,
		},
		success: function (json){
			var obj = $.evalJSON(json);
			for(var i = 0;i<obj.items.length;i++){

				tmp=tmp+"<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.items[i].productId+"@"+
				obj.items[i].applyQuota+"@"+obj.items[i].customerId+"@"+obj.items[i].id+
				"@"+obj.items[i].status+"@"+obj.items[i].examineAmount+"'/>"+"</span></td>"+  
				"<td>"+obj.items[i].chineseName+"</td>"+
				"<td>"+obj.items[i].applyQuota+"</td>"+
				"<td>"+obj.items[i].cardType+"</td>"+
				"<td>"+obj.items[i].cardId+"</td>"+
				"<td>"+obj.items[i].status+"</td>"+
				"<td>"+obj.items[i].createdTime+"</td>"+			
				"<td>"+obj.items[i].nodeName+"</td></tr>"

				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}

			result[j]=tmp;*/

			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='myshsp()'/>快审审批</div>"+  
					"<div class='content' >"+ 
					"<table id='cslb' class='cpTable jjTable' style='text-align:center;'>"+
					head+
					head+result[page]+
					"</table>"+
					"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
					"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
					"<input type='button' class='btn btn-large btn-primary' value='补充调查资料查看' id ='xszlxx'/>"+
					"<input type='button' class='btn btn-large btn-primary' value='上传资料查看' id ='xsyxzl'/>"+
					"<input type='button' class='btn btn-primary btn-large' value=快审审批' id='csjl'/>"+
					"<input type='button' class='btn btn-large' value='返回' onclick='kdjj()'/></p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();   
			
			//下一页
			$("#xyy").click(function(){
				page=page+1;
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
					window.wxc.xcConfirm("当前已经是最后一页", "info");
					page=page-1;
				}
			})
			
			//下一页
			$("#syy").click(function(){
				page=page-1; 
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
					window.wxc.xcConfirm("当前已经是第一页", "info");
					page = page+1;
				}
			})
			
			//补充调查资料查看
			//上传资料查看
			//快审审批
}

/********************** 快审  **********************/