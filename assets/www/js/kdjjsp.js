/* ********************* maoya 开始  ********************* */
//加载提额管理界面
function kdjj(){
	var htDiv = "";
    var htmDiv = "";
    var htmlDiv = "";
    var th = "";
   
	// 客户经理
	if(window.sessionStorage.getItem("userType")==1){
       htmlDiv = "<div class='box shspp1' onclick='cusbc()'><img src='images/shsp1.png'/>" +                            
				 "<span>提额申请</span>"+
				 "</div>"
	}
	
	// 客户经理  
	if(window.sessionStorage.getItem("userType")==1){
       htDiv = "<div class='box shspp1' onclick='qd()'><img src='images/shsp1.png'/>" +                            
				 "<span>抢单查询</span>"+
				 "</div>"
	}
	
	 // 审批岗
    if(window.sessionStorage.getItem("userType")==3){
       htmDiv = "<div class='box shspp1' onclick='kssp()'><img src='images/shsp2.png'/>" +
				"<span>提额审批</span>"+
				"</div>"
	}
	
	// 模型测试
	if(window.sessionStorage.getItem("userType")==4){
       th = "<div class='box shspp1' onclick='modelinput()'><img src='images/shsp2.png'/>" +
				"<span>模型</span>"+
				"</div>"
	}
	
	window.scrollTo(0,0);
	$("#mainPage").html("<div class='title'>快审通-待调查进件</div>"+  
			"<div class='content'>" + htDiv + htmlDiv + htmDiv +
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
}

// 抢单查询
function qd(){
	var sdrwurl= "/ipad/Customer/selectOrder.json";
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
	"<th>初始额度(元)</th>"+
	"<th>申请时间</th>"+
	"</tr>"
	$.ajax({
		url:wsHost+sdrwurl,
		type: "GET",
		dataType:'json',
		success: function (json){
			var obj = $.evalJSON(json);
			for(var i = 0;i<obj.size;i++){
				tmp=tmp+"<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].ID+"@"+
				obj.result[i].CUSTOMER_NAME+"@"+obj.result[i].CARD_ID+"@"+obj.result[i].PHONE_NO+
				"@"+obj.result[i].APPLY_AMT+"@"+obj.result[i].LOAN_TERM+"@"+obj.result[i].AGE+"@"+obj.result[i].SEX+"'/>"+"</span></td>"+  
				"<td>"+obj.result[i].CUSTOMER_NAME+"</td>"+
				"<td>"+obj.result[i].CARD_ID+"</td>"+
				"<td>"+obj.result[i].PHONE_NO+"</td>"+
				"<td>"+obj.result[i].APPLY_AMT+"</td>"+
				"<td>"+obj.result[i].APPLY_TIME+"</td></tr>"

				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}

			result[j]=tmp;
			window.scrollTo(0,0);
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='kdjj()'/>新申请客户</div>"+  
					"<div class='content' >"+ 
					"<p style='margin-bottom:10px;margin-top:10px;'>"+
					"<span style='float:left; margin-top:10px; margin-bottom:10px; margin-left:30px;'>客户姓名:<input type ='text' id='chineseName'/></span>"+
					"<input type='button' style='margin-bottom:10px; margin-top:10px;' class='btn btn-large btn-primary next' value='筛选' id ='sure'/></p>"+
					"<table id='cslb' class='cpTable jjTable' style='text-align:center;'>"+
					head+result[page]+
					"</table>"+
					"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
					"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
					"<input type='button' class='btn btn-primary btn-large' value='抢单' id='qdd'/>"+
					"<input type='button' class='btn btn-large' value='返回' onclick='kdjj()'/></p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();
			
			
			// 筛选
			$("#sure").click(function(){
			  if($("#chineseName").val()==""){
			  	window.wxc.xcConfirm("查询条件客户姓名必输", "warning");
			  	return;
			  }
			 	$.ajax({
					url:wsHost + sdrwurl,
					type: "GET",
					dataType:'json',
					data:{
						chineseName:$("#chineseName").val(),
					},
					success: function (json) {
						obj = $.evalJSON(json);
						var booo="";
						for(var i = 0;i<obj.size;i++){
							booo=booo+"<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].ID+"@"+
							obj.result[i].CUSTOMER_NAME+"@"+obj.result[i].CARD_ID+"@"+obj.result[i].PHONE_NO+
							"@"+obj.result[i].APPLY_AMT+"@"+obj.result[i].LOAN_TERM+"@"+obj.result[i].AGE+"@"+obj.result[i].SEX+"'/>"+"</span></td>"+  
							"<td>"+obj.result[i].CUSTOMER_NAME+"</td>"+
							"<td>"+obj.result[i].CARD_ID+"</td>"+
							"<td>"+obj.result[i].PHONE_NO+"</td>"+
							"<td>"+obj.result[i].APPLY_AMT+"</td>"+
							"<td>"+obj.result[i].APPLY_TIME+"</td></tr>"
						}
							$("#cslb").html(head+booo);
						}
					})
			})   
			
			// 上一页
			$("#xyy").click(function(){
				page=page+1;
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
					window.wxc.xcConfirm("当前已经是最后一页", "info");
					page=page-1;
				}
			})
			
			// 下一页
			$("#syy").click(function(){
				page=page-1; 
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
					window.wxc.xcConfirm("当前已经是第一页", "info");
					page = page+1;
				}
			})
			
			// 抢单
			// save
			$("#qdd").click(function(){
				if ($("input[type='radio']").is(':checked')) {
						var values =$('input[name="checkbox"]:checked').attr("value").split("@");
						window.wxc.xcConfirm("确定要抢单吗?", "confirm",{onOk:function(){
							$("#qdd").attr('disabled',"true");
							var url ="/ipad/ks/grabOrder.json";
							$.ajax({
								url:wsHost+url,
								dateType:'json',
								type:'GET',
								data:{
									order:values[0],
									customerManagerId:userId,
									cardId:values[2],
								},
								success:function(json){
									var mes = $.evalJSON(json);
									//alert(mes.result.status);
									//alert(mes.result.reason);
									if(mes.result.status == 'fail'){
										window.wxc.xcConfirm(mes.result.reason, "error");
										qd();
									}else{
										window.wxc.xcConfirm(mes.result.reason, "success");
										qd();
									}
								},  
					         	error : function(json) {  
					         		window.wxc.xcConfirm(mes.reason, "error");
					         	}  
							})
						}});
				 }else{
					window.wxc.xcConfirm("请选择一行", "error");
				 }
			})
			
			
		}})
}



// 提额申请查询
function cusbc(){
	var sdrwurl= "/ipad/Customer/selectSqCustomer.json";
	var userId = window.sessionStorage.getItem("userId");
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var td="";
	var dh="";
	var head ="<tr>"+                         
	"<th></th>"+                 
	"<th>客户名称</th>"+  
	"<th>身份证号码</th>"+
	"<th>手机号</th>"+
	"<th>初始额度(元)</th>"+
	//"<th>申请期限</th>"+
	"<th>申请时间</th>"+
	"<th>状态</th>"+ 
	"</tr>"
	$.ajax({
		url:wsHost+sdrwurl,
		type: "GET",
		dataType:'json',
		data:{
			userId:userId,
		},
		success: function (json){
			var obj = $.evalJSON(json);
			for(var i = 0;i<obj.size;i++){
				
				if(obj.result[i].LOAN_STATE=="0"){
					td="待调查";
				}else if(obj.result[i].LOAN_STATE=="1"){
					td="补充调查";
				}else if(obj.result[i].LOAN_STATE=="2"){
					td="快审中";
				}else if(obj.result[i].LOAN_STATE=="3"){
					td="通过";
				}else if(obj.result[i].LOAN_STATE=="4"){
					td="拒绝";
				}
				
				tmp=tmp+"<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].ID+"@"+
				obj.result[i].CUSTOMER_NAME+"@"+obj.result[i].CARD_ID+"@"+obj.result[i].PHONE_NO+
				"@"+obj.result[i].APPLY_AMT+"@"+obj.result[i].LOAN_TERM+"@"+obj.result[i].AGE+"@"+obj.result[i].SEX+"'/>"+"</span></td>"+  
				"<td>"+obj.result[i].CUSTOMER_NAME+"</td>"+
				"<td>"+obj.result[i].CARD_ID+"</td>"+
				"<td>"+obj.result[i].PHONE_NO+"</td>"+
				"<td>"+obj.result[i].APPLY_AMT+"</td>"+
				//"<td>"+obj.result[i].LOAN_TERM+"</td>"+
				"<td>"+obj.result[i].APPLY_TIME+"</td>"+			
				"<td>"+td+"</td></tr>"

				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}

			result[j]=tmp;

			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='kdjj()'/>快审通-新申请客户</div>"+  
					"<div class='content' >"+ 
					"<p style='margin-bottom:10px;margin-top:10px;'>"+
					"<span style='float:left; margin-top:10px; margin-bottom:10px; margin-left:30px;'>客户姓名:<input type ='text' id='chineseName'/></span>"+
					"<input type='button' style='margin-bottom:10px; margin-top:10px;' class='btn btn-large btn-primary next' value='筛选' id ='sure'/></p>"+
					"<table id='cslb' class='cpTable jjTable' style='text-align:center;'>"+
					head+result[page]+
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
			
			
			// 筛选
			$("#sure").click(function(){
			  if($("#chineseName").val()==""){
			  	window.wxc.xcConfirm("查询条件客户姓名必输", "warning");
			  	return;
			  }
			 	$.ajax({
					url:wsHost + sdrwurl,
					type: "GET",
					dataType:'json',
					data:{
						chineseName:$("#chineseName").val(),
						userId:userId,
					},
					success: function (json) {
						obj = $.evalJSON(json);
						var booo="";
						for(var i = 0;i<obj.size;i++){
							if(obj.result[i].loanState=="0"){
								dh="待调查";
							}else if(obj.result[i].loanState=="1"){
								dh="补充调查";
							}else if(obj.result[i].loanState=="2"){
								dh="快审中";
							}else if(obj.result[i].loanState=="3"){
								dh="通过";
							}else if(obj.result[i].loanState=="4"){
								dh="拒绝";
							}
							booo=booo+"<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].ID+"@"+
							obj.result[i].CUSTOMER_NAME+"@"+obj.result[i].CARD_ID+"@"+obj.result[i].PHONE_NO+
							"@"+obj.result[i].APPLY_AMT+"@"+obj.result[i].LOAN_TERM+"@"+obj.result[i].AGE+"@"+obj.result[i].SEX+"'/>"+"</span></td>"+  
							"<td>"+obj.result[i].CUSTOMER_NAME+"</td>"+
							"<td>"+obj.result[i].CARD_ID+"</td>"+
							"<td>"+obj.result[i].PHONE_NO+"</td>"+
							"<td>"+obj.result[i].APPLY_AMT+"</td>"+
							//"<td>"+obj.result[i].LOAN_TERM+"</td>"+
							"<td>"+obj.result[i].APPLY_TIME+"</td>"+			
							"<td>"+dh+"</td></tr>"
						}
							$("#cslb").html(head+booo);
						}
					})
			})   

			$("#xyy").click(function(){
				page=page+1;
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
					window.wxc.xcConfirm("当前已经是最后一页", "info");
					page=page-1;
				}
			})
			$("#syy").click(function(){
				page=page-1; 
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
					window.wxc.xcConfirm("当前已经是第一页", "info");
					page = page+1;
				}
			})

			$("#csjl").click(function() {
				findHistory();
			})
			$("#xsyxzl").click(function() {
				if ($("input[type='radio']").is(':checked')) {
					var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					var res ={};
					res.id = values[0];
					res.name = values[1];
					ksczp(res);
				}else{
					window.wxc.xcConfirm("请选择一行", "error");
				}
			})
			$("#xszlxx").click(function() {
				if ($("input[type='radio']").is(':checked')) {
					var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					var res ={};
					res.id = values[0];
					res.appId = values[0];
					res.name = values[1];
					res.cardId =values[2];
					res.phoneNo = values[3];
					res.applyAmt = values[4];
					res.loanTerm = values[5];
					res.age = values[6];
					res.sex = values[7];
					aa(res);
				}else{
					window.wxc.xcConfirm("请选择一行", "warning");
				}

			})
		}})
}



/* ********************* 补充调查  ********************* */
function aa(res){
	  window.scrollTo(0,0);//滚动条回到顶端
	    $("#mainPage").html("<div class='title'><img src='images/back.png' onclick='cusbc()'/>快审通-补充调查</div>"+  
			"<form class='content' id='bcdcForm'>" +
			"<table  class='cpTable khjbxx' style='margin-top:20px;'>"+
			
			"<tr><th colspan='4'>客户基本信息</th></tr>"+ 
			"<tr>"+
			"<th>申请人姓名:</th>"+
			"<td><input  type='hidden' value='"+res.appId+"' name='applyId'/><input  type='text' value='"+res.name+"' disabled='isabled'/></td>"+
			"<th>当前额度:</th>"+
			"<td><input  type='text' value='"+res.applyAmt+"' disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+
			
			//"<tr>"+
			//"<th>贷款期限:</th>"+
			//"<td><input  type='text' value='"+res.loanTerm+"' disabled='isabled'/></td>"+
			//"<th>还款方式:</th>"+
			//"<td><input  type='text' value='' disabled='isabled'/></td>"+
			//"</tr>"+
			
			"<tr><th colspan='4'>个人信息</th></tr>"+ 
			"<tr>"+
			"<th>性别:</th>"+
			"<td><input  type='text' value='"+res.sex+"' disabled='isabled'/></td>"+
			"<th>身份证号:</th>"+
			"<td><input  type='text' value='"+res.cardId+"' name='cardId' readonly='readonly'/></td>"+
			"</tr>"+
			
			
			"<tr>"+
			"<th>年龄:</th>"+
			"<td><input  type='text' value='"+res.age+"' disabled='isabled'/></td>"+
			"<th>手机号:</th>"+
			"<td><input  type='text' value='"+res.phoneNo+"' disabled='isabled'/></td>"+
			"</tr>"+
			
			"<tr>"+
			"<th>婚姻状况:</th>"+
			"<td><select id='hyzk' name='maritalStatus'>" +
				"<option value = '0'>未婚</option>" +
				"<option value = '1'>已婚</option>" +
				"<option value = '2'>离婚</option>" +
				"<option value = '3'>再婚</option>" +
				"</select></td>"+
			"<th>最高学位学历:</th>"+
			"<td><select id='hyzk' name='highEdu'>" +
				"<option value = '0'>初中及以下</option>" +
				"<option value = '1'>高中或技校</option>" +
				"<option value = '2'>大学或以上</option>" +
				"</select></td>"+
			"</tr>"+
			
			"<tr>"+
			"<th>户籍所在地:</th>"+
			"<td><select id='hyzk' name='domicile'>" +
			"<option value = '0'>本省</option>" +
			"<option value = '1'>本省外地</option>" +
			"<option value = '2'>外地</option>" +
			"</select></td>"+
			"</tr>"+
			
			"<tr><th colspan='4'>家庭资产:</th></tr>"+  
			"<tr>"+
			"<th>自有房产数量:</th>"+
			"<td><input  type='text' value='0' name='ownHouses' /></td>"+
			"<th>按揭房产数量:</th>"+
			"<td><input  type='text' value='0' name='mortgageHouses' /></td>"+
			"</tr>"+
			
			"<tr>"+
			"<th>按揭贷款余额:</th>"+
			"<td><input  type='text' value='0' name='mortgageBalamt' /> &nbsp;元</td>"+
			"<th>自有车辆数量:</th>"+
			"<td><input  type='text' value='0' name='ownVehicles' /></td>"+
			"</tr>"+
			"<tr>"+                        
			"<th colspan='4'>征信状况:</th>"+  	
			"</tr>"+
			"<tr>"+
			"<th >信用状况:</th>"+
			"<td><select id='hyzk' name='creditStatus'>" +
			"<option value = '0'>正常</option>" +
			"<option value = '1'>不正常</option>" +
			"<option value = '2'>无记录</option>" +
			"</select></td>"+
			"<th>信用逾期次数:</th>"+
			"<td><input  type='text' value='0' name='creditOverdueTimes' /></td>"+
			"</tr>"+
			
			"<tr>"+
			"<th>贷款逾期次数:</th>"+
			"<td><input  type='text' value='0' name='loanOverdueTimes' /></td>"+
			"<th>贷款余额:</th>"+
			"<td><input  type='text' value='0' name='loanBalamt' />&nbsp;元</td>"+
			"</tr>"+
			"<tr>"+
			"<th>担保余额:</th>"+
			"<td><input  type='text' value='0' name='guaranteed' />&nbsp;元</td>"+
			"</tr>"+
			
			
			
			"<tr><th colspan='4'>家庭状况</th></tr>"+ 
			"<tr>"+  
			"<th>经济上依赖的人数:</th>"+
			"<td><input  type='text' value='0' name='numOfEcoDepend' /></td>"+
			"<th>配偶年收入:</th>"+
			"<td><input  type='text' value='0' name='annualIncomeSpouse' />&nbsp;元</td>"+
			"</tr>"+
			"<tr>"+
			"<th>子女教育状况:</th>"+
			"<td><select id='hyzk' name='childEdu'>" +
			"<option value = '0'>无子女</option>" +
			"<option value = '1'>上学</option>" +
			"<option value = '2'>学龄前</option>" +
			"<option value = '3'>工作</option>" +
			"</select></td>"+
			"</tr>"+
			
			
			
			
			"<tr><th colspan='4'>经营及财务状况</th></tr>"+  
			"<tr>"+
			"<th>业务年限:</th>"+
			"<td><input  type='text' value='0' name='serviceLife' />&nbsp;年</td>"+
			"<th>年可支配收入:</th>"+
			"<td><input  type='text' value='0' name='annualDisIncome' />&nbsp;元</td>"+
			"</tr>"+
			
			"<tr>"+
			"<th>主营业务收入:</th>"+
			"<td><input  type='text' value='0' name='mainBusinessIncome' /> &nbsp;元</td>"+
			"<th>其他工作收入:</th>"+
			"<td><input  type='text' value='0' name='otherImcome' />&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>流动资产:</th>"+
			"<td><input  type='text' value='0' name='currentAssets' /> &nbsp;元</td>"+
			"<th>存货:</th>"+
			"<td><input  type='text' value='0' name='stock' />&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>固定资产:</th>"+
			"<td><input  type='text' value='0' name='fixedAssets' /> &nbsp;元</td>"+
			"<th>资产总计:</th>"+
			"<td><input  type='text' value='0' name='totalAssets' />&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>短期负债:</th>"+
			"<td><input  type='text' value='0' name='shortTermLiab' /> &nbsp;元</td>"+
			"<th>负债总计:</th>"+
			"<td><input  type='text' value='0' name='totalLiab' /> &nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>所有者权益:</th>"+
			"<td><input  type='text' value='0' name='ownedEqu' />&nbsp;元</td>"+
			"<th>私人用途分期付款:</th>"+
			"<td><input  type='text' value='0' name='payPrivateUse' /> &nbsp;元</td>"+
			"</tr>"+  

			"</table>"+
			"<p>" +
			"<input type='button' class='btn btn-primary btn-large' value='上传文件资料' id='uploadData'/>" +
			"<input type='button' class='btn btn-primary btn-large' value='提交' id='save' onclick='saveBcdc()'/>" +
			"<input type='button' class='btn btn-large' value='返回' onclick='cusbc()'/>" +
			"</p>"+
	"</form");
	$(".right").hide();
	$("#mainPage").show();
	
	$("#uploadData").click(function() {
		ksczp(res)
	});
}

function saveBcdc(){
	//alert($('#bcdcForm').serialize())
	window.wxc.xcConfirm("确定要提交审批吗?", "confirm",{onOk:function(){
		var url= "/ipad/intopieces/saveBcdc.json";
		$.ajax({ 
	         url : wsHost + url,  
	         type : "POST",  
			 data : $('#bcdcForm').serialize(), 
	         success : function(result) {
	         	var objs = $.evalJSON(result); 
	         	if(objs.result.status == 'fail'){
	        		window.wxc.xcConfirm(objs.result.reason, "error");
	        	}else{
	        		window.wxc.xcConfirm("保存成功", "info");
	         		cusbc()
	        	}
	         },  
	         error : function(result) {  
	         	window.wxc.xcConfirm("保存失败", "error");
	         }  
	     });  
     }});
}











/* ********************* 调查历史  ********************* */
function sHistory(id){
	var sdrwurl= "/ipad/Customer/selectHistory.json";
	var tmp="";
	var td="";
	var head ="<tr>"+                         
	"<th>客户名称</th>"+  
	"<th>身份证号码</th>"+
	"<th>手机号</th>"+
	"<th>申请金额(元)</th>"+
	"<th>申请期限</th>"+
	"<th>申请时间</th>"+
	"<th>审批金额(元)</th>"+ 
	"<th>审批状态</th>"+ 
	"<th>审批时间</th>"+ 
	"</tr>";
	
	$.ajax({
		url:wsHost+sdrwurl,
		type: "GET",
		dataType:'json',
		data:{
			id:id,
		},
		success: function (json){
			var obj = $.evalJSON(json);
			if(obj.result.LOAN_STATE=="0"){
				td="待调查";
			}else if(obj.result.LOAN_STATE=="1"){
				td="补充调查";
			}else if(obj.result.LOAN_STATE=="2"){
				td="快审中";
			}else if(obj.result.LOAN_STATE=="3"){
				td="通过";
			}else if(obj.result.LOAN_STATE=="4"){
				td="拒绝";
			}
				tmp="<tr >"+
				"<td>"+obj.result.CUSTOMER_NAME+"</td>"+
				"<td>"+obj.result.CARD_ID+"</td>"+
				"<td>"+obj.result.PHONE_NO+"</td>"+
				"<td>"+obj.result.APPLY_AMT+"</td>"+
				"<td>"+obj.result.LOAN_TERM+"</td>"+
				"<td>"+obj.result.APPLY_TIME+"</td>"+	
				"<td>"+obj.result.AUDIT_AMT+"</td>"+	
				"<td>"+td+"</td>"+			
				"<td>"+obj.result.AUDIT_TIME+"</td></tr>";		



			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='cusbc()()'/>快审通-调查历史</div>"+  
					"<div class='content' >"+ 
					"<table id='cslb' class='cpTable jjTable' style='text-align:center;'>"+
					head+tmp+
					"</table>"+
					"<p><input type='button' class='btn btn-primary btn-large' value='补充调查资料查看' id ='xszlxx'/>"+
					"<input type='button' class='btn btn-primary btn-large' value='上传资料查看' id ='xsyxzl'/>"+
					"<input type='button' class='btn btn-large' value='返回' onclick='cusbc()()'/></p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();   

			$("#xszlxx").click(function() {
				//bcdcckbs(id);
				budcMethod(id,"1");
			});
			$("#xsyxzl").click(function() {
				HistoryIma(id,"1");
			});
		}})
}


/* ********************* 调查历史  update 20170823********************* */
function findHistory(){
	var sdrwurl= "/ipad/Customer/selectSqCustomerHistory.json";
	var userId = window.sessionStorage.getItem("userId");
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var td="";
	var dh="";
	var head ="<tr>"+                         
	"<th></th>"+                 
	"<th>客户名称</th>"+  
	"<th>身份证号码</th>"+
	"<th>手机号</th>"+
	"<th>初始额度(元)</th>"+
	//"<th>申请期限</th>"+
	"<th>申请时间</th>"+
	"<th>审批额度(元)</th>"+
	"<th>审批时间</th>"+
	"<th>状态</th>"+ 
	"</tr>"
	$.ajax({
		url:wsHost+sdrwurl,
		type: "GET",
		dataType:'json',
		data:{
			userId:userId,
		},
		success: function (json){
			var obj = $.evalJSON(json);
			for(var i = 0;i<obj.size;i++){
				if(obj.result[i].LOAN_STATE=="0"){
					td="待调查";
				}else if(obj.result[i].LOAN_STATE=="1"){
					td="补充调查";
				}else if(obj.result[i].LOAN_STATE=="2"){
					td="快审中";
				}else if(obj.result[i].LOAN_STATE=="3"){
					td="通过";
				}else if(obj.result[i].LOAN_STATE=="4"){
					td="拒绝";
				}
				tmp=tmp+"<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].ID+"@"+
				obj.result[i].CUSTOMER_NAME+"@"+obj.result[i].CARD_ID+"@"+obj.result[i].PHONE_NO+
				"@"+obj.result[i].APPLY_AMT+"@"+obj.result[i].LOAN_TERM+"@"+obj.result[i].AGE+"@"+obj.result[i].SEX+"'/>"+"</span></td>"+  
				"<td>"+obj.result[i].CUSTOMER_NAME+"</td>"+
				"<td>"+obj.result[i].CARD_ID+"</td>"+
				"<td>"+obj.result[i].PHONE_NO+"</td>"+
				"<td>"+obj.result[i].APPLY_AMT+"</td>"+
				//"<td>"+obj.result[i].LOAN_TERM+"</td>"+
				"<td>"+obj.result[i].APPLY_TIME+"</td>"+
				"<td>"+obj.result[i].AUDIT_AMT+"</td>"+
				"<td>"+obj.result[i].AUDIT_TIME+"</td>"+			
				"<td>"+td+"</td></tr>"

				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}

			result[j]=tmp;

			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='cusbc()'/>快审通-调查历史</div>"+  
					"<div class='content' >"+ 
					"<p style='margin-bottom:10px;margin-top:10px;'>"+
					"<span style='float:left; margin-top:10px; margin-bottom:10px; margin-left:30px;'>客户姓名:<input type ='text' id='chineseName'/></span>"+
					"<input type='button' style='margin-bottom:10px; margin-top:10px;' class='btn btn-large btn-primary next' value='筛选' id ='sure'/></p>"+
					"<table id='cslb' class='cpTable jjTable' style='text-align:center;'>"+
					head+result[page]+
					"</table>"+
					"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
					"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
					"<input type='button' class='btn btn-primary btn-large' value='补充调查资料查看' id ='xszlxx'/>"+
					"<input type='button' class='btn btn-primary btn-large' value='上传资料查看' id ='xsyxzl'/>"+
					"<input type='button' class='btn btn-large' value='返回' onclick='cusbc()'/></p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();
			
			
			// 筛选
			$("#sure").click(function(){
			  if($("#chineseName").val()==""){
			  	window.wxc.xcConfirm("查询条件客户姓名必输", "warning");
			  	return;
			  }
			 	$.ajax({
					url:wsHost + sdrwurl,
					type: "GET",
					dataType:'json',
					data:{
						chineseName:$("#chineseName").val(),
						userId:userId,
					},
					success: function (json) {
						obj = $.evalJSON(json);
						var booo="";
						for(var i = 0;i<obj.size;i++){
						if(obj.result[i].LOAN_STATE=="0"){
							dh="待调查";
						}else if(obj.result[i].LOAN_STATE=="1"){
							dh="补充调查";
						}else if(obj.result[i].LOAN_STATE=="2"){
							dh="快审中";
						}else if(obj.result[i].LOAN_STATE=="3"){
							dh="通过";
						}else if(obj.result[i].LOAN_STATE=="4"){
							dh="拒绝";
						}
							booo=booo+"<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].ID+"@"+
							obj.result[i].CUSTOMER_NAME+"@"+obj.result[i].CARD_ID+"@"+obj.result[i].PHONE_NO+
							"@"+obj.result[i].APPLY_AMT+"@"+obj.result[i].LOAN_TERM+"@"+obj.result[i].AGE+"@"+obj.result[i].SEX+"'/>"+"</span></td>"+  
							"<td>"+obj.result[i].CUSTOMER_NAME+"</td>"+
							"<td>"+obj.result[i].CARD_ID+"</td>"+
							"<td>"+obj.result[i].PHONE_NO+"</td>"+
							"<td>"+obj.result[i].APPLY_AMT+"</td>"+
							//"<td>"+obj.result[i].LOAN_TERM+"</td>"+
							"<td>"+obj.result[i].APPLY_TIME+"</td>"+
							"<td>"+obj.result[i].AUDIT_AMT+"</td>"+
							"<td>"+obj.result[i].AUDIT_TIME+"</td>"+			
							"<td>"+dh+"</td></tr>"
						}
							$("#cslb").html(head+booo);
						}
					})
			})   

			$("#xyy").click(function(){
				page=page+1;
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
					window.wxc.xcConfirm("当前已经是最后一页", "info");
					page=page-1;
				}
			})
			$("#syy").click(function(){
				page=page-1; 
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
					window.wxc.xcConfirm("当前已经是第一页", "info");
					page = page+1;
				}
			})
			
			$("#xszlxx").click(function() {
				if ($("input[type='radio']").is(':checked')) {
					var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					budcMethod(values[0],"1");
				}else{
					window.wxc.xcConfirm("请选择一行", "warning");
				}
			});
			
			
			$("#xsyxzl").click(function() {
				if ($("input[type='radio']").is(':checked')) {
					var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					HistoryIma(values[0],"1");
				}else{
					window.wxc.xcConfirm("请选择一行", "warning");
				}
			});

			
			
		}})
}








//******************查看补充调查资料*************
function bcdcckbs(appId){
	window.scrollTo(0,0);//滚动条回到顶端
	var cpxxurl="/ipad/Customer/selectHistoryBC.json?id="+appId;
	
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
		 $.get(wsHost+cpxxurl,callbackresult);
	 
	 function callbackresult(json){
			var obj = $.evalJSON(json);
		$("#mainPage").html("<div class='title'><img src='images/back.png' id='back'/>快审通-补充调查查看</div>"+  
			"<div class='content'>" +
	"<table class='cpTable khjbxx' style='margin-top:20px;'>"+
			"<tr>"+                        
			"<th colspan='4'>客户基本信息</th>"+  
			"</tr>"+
			"<tr>"+
			"<th>申请人:</th>"+
			"<td><input  type='text' value="+obj.result.CUSTOMER_NAME+" disabled='isabled'/></td>"+
			"<th>性别:</th>"+
			"<td><input  type='text' value="+obj.result.SEX+" disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+
			"<th>年龄:</th>"+
			"<td><input  type='text' value="+obj.result.AGE+" disabled='isabled'/></td>"+
			"<th>身份证号:</th>"+
			"<td><input  type='text' value="+obj.result.CARD_ID+" disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+
			"<th>手机号:</th>"+
			"<td><input  type='text' value="+obj.result.PHONE_NO+" disabled='isabled'/></td>"+
			"<th>婚姻状况:</th>"+
			"<td><input  type='text' value="+obj.result.MARITAL_STATUS+" disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+
			"<th>户籍所在地:</th>"+
			"<td><input  type='text' value="+obj.result.DOMICILE+" disabled='isabled'/></td>"+
			"<th>最高学位学历:</th>"+
			"<td><input  type='text' value="+obj.result.HIGH_EDU+" disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+                        
			"<th colspan='4'>家庭资产:</th>"+  
			"</tr>"+
			"<tr>"+
			"<th>自有房产数量:</th>"+
			"<td><input  type='text' value="+obj.result.OWN_HOUSES+" disabled='isabled'/></td>"+
			"<th>按揭房产数量:</th>"+
			"<td><input  type='text' value="+obj.result.MORTGAGE_HOUSES+" disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+
			"<th>按揭贷款余额:</th>"+
			"<td><input  type='text' value="+obj.result.MORTGAGE_BALAMT+" disabled='isabled'/> &nbsp;元</td>"+
			"<th>自有车辆数量:</th>"+
			"<td><input  type='text' value="+obj.result.OWN_VEHICLES+" disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+                        
			"<th colspan='4'>征信状况:</th>"+  	
			"</tr>"+
			"<tr>"+
			"<th >信用状况:</th>"+
			"<td><input  type='text' value="+obj.result.CREDIT_STATUS+" disabled='isabled'/></td>"+
			"<th>信用逾期次数:</th>"+
			"<td><input  type='text' value="+obj.result.CREDIT_OVERDUE_TIMES+" disabled='isabled'/></td>"+
			"</tr>"+
			
			"<tr>"+
			"<th>贷款逾期次数:</th>"+
			"<td><input  type='text' value="+obj.result.LOAN_OVERDUE_TIMES+" disabled='isabled'/></td>"+
			"<th>贷款余额:</th>"+
			"<td><input  type='text' value="+obj.result.LOAN_BALAMT+" disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+
			"<tr>"+
			"<th>担保余额:</th>"+
			"<td><input  type='text' value="+obj.result.GUARANTEED+" disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+
			
			
			
			"<tr>"+                        
			"<th colspan='4'>家庭状况</th>"+ 
			"</tr>"+
			"<tr>"+  
			"<th>经济上依赖的人数:</th>"+
			"<td><input  type='text' value="+obj.result.NUM_OF_ECO_DEPEND+" /></td>"+
			"<th>配偶年收入:</th>"+
			"<td><input  type='text' value="+obj.result.ANNUAL_INCOME_SPOUSE+" />&nbsp;元</td>"+
			"</tr>"+
			"<tr>"+
			"<th>子女教育状况:</th>"+
			"<td><input  type='text' value="+obj.result.CHILD_EDU+" disabled='isabled'/></td>"+
			"</tr>"+
			
			
			
			
			
			"<tr>"+                        
			"<th colspan='4'>经营及财务状况</th>"+  
			"</tr>"+
			"<tr>"+
			"<th>业务年限:</th>"+
			"<td><input  type='text' value="+obj.result.SERVICE_LIFE+" />&nbsp;年</td>"+
			"</tr>"+
			"<tr>"+
			"<th>流动资产:</th>"+
			"<td><input  type='text' value="+obj.result.CURRENT_ASSETS+" /> &nbsp;元</td>"+
			"<th>存货:</th>"+
			"<td><input  type='text' value="+obj.result.STOCK+" />&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>固定资产:</th>"+
			"<td><input  type='text' value="+obj.result.FIXED_ASSETS+" /> &nbsp;元</td>"+
			"<th>资产总计:</th>"+
			"<td><input  type='text' value="+obj.result.TOTAL_ASSETS+" />&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>短期负债:</th>"+
			"<td><input  type='text' value="+obj.result.SHORT_TERM_LIAB+" /> &nbsp;元</td>"+
			"<th>负债总计:</th>"+
			"<td><input  type='text' value="+obj.result.TOTAL_LIAB+" />&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>所有者权益:</th>"+
			"<td><input  type='text' value="+obj.result.OWNED_EQU+" /> &nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>主营业务收入:</th>"+
			"<td><input  type='text' value="+obj.result.MAIN_BUSINESS_INCOME+" /> &nbsp;元</td>"+
			"<th>其他工作年收入:</th>"+
			"<td><input  type='text' value="+obj.result.OTHER_IMCOME+" />&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>私人用途分期付款:</th>"+
			"<td><input  type='text' value="+obj.result.PAY_PRIVATE_USE+" /> &nbsp;元</td>"+
			"<th>年可支配收入:</th>"+
			"<td><input  type='text' value="+obj.result.ANNUAL_DIS_INCOME+" />&nbsp;元</td>"+
			"</tr>"+  

			"</table>"+
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
	$("#back").click(function() {
		sHistory(appId);
	});
			}	
	 }




/* ********************* maoya 结束********************* */


/********************** 快审  **********************/

//快审审批信息查询
function kssp(){
	window.scrollTo(0,0);//滚动条回到顶端	
	var userId = window.sessionStorage.getItem("userId");
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var obj;
	
	var head ="<tr>"+                         
	"<th></th>"+                 
	"<th>客户名称</th>"+  
	"<th>身份证号码</th>"+
	"<th>手机号</th>"+
	"<th>初始额度(元)</th>"+
	//"<th>申请期限</th>"+
	"<th>申请时间</th>"+
	"<th>状态</th>"+ 
	"</tr>"

	var ksurl= "/ipad/ks/selectMetionApply.json";
	$.ajax({
		url:wsHost + ksurl,
		type: "GET",
		dataType:'json',
		data:{
			userId:userId,
		},
		success: function (json) {
			obj = $.evalJSON(json);
			for(var i = 0;i<obj.size;i++){
				if(obj.result[i].loanState=="0"){
					obj.result[i].loanState="待调查";
				}else if(obj.result[i].loanState=="1"){
					obj.result[i].loanState="补充调查";
				}else if(obj.result[i].loanState=="2"){
					obj.result[i].loanState="快审中";
				}else if(obj.result[i].loanState=="3"){
					obj.result[i].loanState="通过";
				}else if(obj.result[i].loanState=="4"){
					obj.result[i].loanState="拒绝";
				}
				
			
				
				tmp=tmp+"<tr onclick='check(this)'>"+
				"<td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].id+"@"+
				obj.result[i].customerName+"@"+obj.result[i].cardId+"@"+obj.result[i].phoneNo+
				"@"+obj.result[i].applyAmt+"@"+obj.result[i].loanTerm+"@"+obj.result[i].applyTime+"@"+obj.result[i].creditAmt+"@"+obj.result[i].remarks+"@"+obj.result[i].quotaId+"'/>"+"</span></td>"+ 
				"<td>"+obj.result[i].customerName+"</td>"+
				"<td>"+obj.result[i].cardId+"</td>"+
				"<td>"+obj.result[i].phoneNo+"</td>"+
				"<td>"+obj.result[i].applyAmt+"</td>"+
				//"<td>"+obj.result[i].loanTerm+"</td>"+
				"<td>"+obj.result[i].applyTime+"</td>"+
				"<td>"+obj.result[i].loanState+"</td>"+
				"</tr>";

				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}
			result[j]=tmp;
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='kdjj()'/>快审审批</div>"+  
					"<div class='content'>"+
					"<p style='margin-bottom:10px;margin-top:10px;'>"+
					"<span style='float:left; margin-top:10px; margin-bottom:10px; margin-left:30px;'>客户姓名:<input type ='text' id='chineseName'/></span>"+
					"<input type='button' style='margin-bottom:10px; margin-top:10px;' class='btn btn-large btn-primary next' value='筛选' id ='sure'/></p>"+
					"<table id = 'kssppage' class='cpTable' style='text-align:center;'>"+
					head+result[page]+
					"</table>"+
					"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
					"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
					"<input type='button' class='btn btn-large btn-primary' value='补充调查资料查看' id ='bczlck'/>"+
					"<input type='button' class='btn btn-large btn-primary' value='上传资料查看' id ='sczlck'/>"+
					"<input type='button' class='btn btn-primary btn-large' value='快审审批' id='kssp'/>"+
					"<input type='button' class='btn btn-large' value='返回' onclick='kdjj()'/></p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();
			
			// 筛选
			$("#sure").click(function(){
			  if($("#chineseName").val()==""){
			  	window.wxc.xcConfirm("查询条件客户姓名必输", "warning");
			  	return;
			  }
			 	$.ajax({
					url:wsHost + ksurl,
					type: "GET",
					dataType:'json',
					data:{
						chineseName:$("#chineseName").val(),
						userId:userId,
					},
					success: function (json) {
						obj = $.evalJSON(json);
						var booo="";
						for(var i = 0;i<obj.size;i++){
							if(obj.result[i].loanState=="0"){
								obj.result[i].loanState="待调查";
							}else if(obj.result[i].loanState=="1"){
								obj.result[i].loanState="补充调查";
							}else if(obj.result[i].loanState=="2"){
								obj.result[i].loanState="快审中";
							}else if(obj.result[i].loanState=="3"){
								obj.result[i].loanState="通过";
							}else if(obj.result[i].loanState=="4"){
								obj.result[i].loanState="拒绝";
							}
							
							
							booo=booo+"<tr onclick='check(this)'>"+
							"<td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].id+"@"+
							obj.result[i].customerName+"@"+obj.result[i].cardId+"@"+obj.result[i].phoneNo+
							"@"+obj.result[i].applyAmt+"@"+obj.result[i].loanTerm+"@"+obj.result[i].applyTime+"@"+obj.result[i].creditAmt+"@"+obj.result[i].remarks+"@"+obj.result[i].quotaId+"'/>"+"</span></td>"+ 
							"<td>"+obj.result[i].customerName+"</td>"+
							"<td>"+obj.result[i].cardId+"</td>"+
							"<td>"+obj.result[i].phoneNo+"</td>"+
							"<td>"+obj.result[i].applyAmt+"</td>"+
							//"<td>"+obj.result[i].loanTerm+"</td>"+
							"<td>"+obj.result[i].applyTime+"</td>"+
							"<td>"+obj.result[i].loanState+"</td>"+
							"</tr>";
						}
							$("#kssppage").html(head+booo);
						}
					})
			})
			
			//下一页
			$("#xyy").click(function(){
				page=page+1;
				if(result[page]){
					$("#kssppage").html(head+result[page]);
				}else{
					window.wxc.xcConfirm("当前已经是最后一页", "info");
					page=page-1;
				}
			})
			
			//下一页
			$("#syy").click(function(){
				page=page-1; 
				if(result[page]){
					$("#kssppage").html(head+result[page]);
				}else{
					window.wxc.xcConfirm("当前已经是第一页", "info");
					page = page+1;
				}
			})
			
			//补充调查资料查看
			$("#bczlck").click(function(){
				if ($("input[type='radio']").is(':checked')) {
				    var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					var id = values[0];
				   	budcMethod(id,"2");
				}else{
					window.wxc.xcConfirm("请选择一行", "warning");
				}
			})
			
			//上传资料查看
			$("#sczlck").click(function(){
				if ($("input[type='radio']").is(':checked')) {
				    var id  =$('input[name="checkbox"]:checked').attr("value");
				    var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					var id = values[0];
					HistoryIma(id,"2");
				}else{
					window.wxc.xcConfirm("请选择一行", "warning");
				}
			})
			
			//快审审批
			$("#kssp").click(function() {
				if ($("input[type='radio']").is(':checked')) {
				    var id  =$('input[name="checkbox"]:checked').attr("value");
				    // 跳转审批详情页面
				    var values =$('input[name="checkbox"]:checked').attr("value").split("@");
				   	var res ={};
					res.id = values[0];
					res.customerName = values[1];
					res.cardId =values[2];
					res.phoneNo = values[3];
					res.applyAmt = values[4];
					res.loanTerm = values[5];
					res.applyTime = values[6];
					res.creditAmt = values[7];
					res.remarks = values[8];
					res.quotaId = values[9];
				   	ksspxq(res);
				}else{
					window.wxc.xcConfirm("请选择一行", "warning");
				}
			})
			
		}
	})


}

//补充调查资料查看
function budcMethod(id,type){
		var body="";
        if(type == "1"){
          body = "<div><p><input type='button' class='btn btn-large' value='返回' id ='re'><p></div>"
        }else if (type == "2"){
           body = "<div><p><input type='button' class='btn btn-large' value='返回' onclick='kssp()'/><p></div>"
        }
        
		var selectUrl = "/ipad/ks/selectSuppleMentInformation.json";
    	$.ajax({
		url:wsHost + selectUrl,
		type: "GET",
		dataType:'json',
		data:{
			appId:id,
		},
		success: function (json) {
	    var obj = $.evalJSON(json);
	    
	    
    	if(obj.result.maritalStatus=="0"){
			obj.result.maritalStatus="未婚";
		}else if(obj.result.maritalStatus=="1"){
			obj.result.maritalStatus="已婚";
		}else if(obj.result.maritalStatus=="2"){
			obj.result.maritalStatus="离婚";
		}else if(obj.result.maritalStatus=="3"){
			obj.result.maritalStatus="再婚";
		}
		
		if(obj.result.highEdu=="0"){
			obj.result.highEdu="初中及以下";
		}else if(obj.result.highEdu=="1"){
			obj.result.highEdu="高中或技校";
		}else if(obj.result.highEdu=="2"){
			obj.result.highEdu="大学或以上";
		}	
	
		if(obj.result.domicile=="0"){
			obj.result.domicile="本省";
		}else if(obj.result.domicile=="1"){
			obj.result.domicile="本省外地";
		}else if(obj.result.domicile=="2"){
			obj.result.domicile="外地";
		}	
	
		if(obj.result.creditStatus=="0"){
			obj.result.creditStatus="正常";
		}else if(obj.result.creditStatus=="1"){
			obj.result.creditStatus="不正常";
		}else if(obj.result.creditStatus=="2"){
			obj.result.creditStatus="无记录";
		}	

		if(obj.result.childEdu=="0"){
			obj.result.childEdu="无子女";
		}else if(obj.result.childEdu=="1"){
			obj.result.childEdu="上学";
		}else if(obj.result.childEdu=="2"){
			obj.result.childEdu="学龄前";
		}else if(obj.result.childEdu=="3"){
			obj.result.childEdu="工作";
		}
		
	    window.scrollTo(0,0);//滚动条回到顶端
	    $("#mainPage").html("<div class='title'><img src='images/back.png' id='pre'/>快审通-补充调查</div>"+  
			"<div class='content'>" +
			"<table class='cpTable khjbxx' style='margin-top:20px;'>"+
			
			"<tr><th colspan='4'>客户基本信息</th></tr>"+ 
			"<tr>"+
			"<th>申请人姓名:</th>"+
			"<td><input  type='text' value='"+obj.result.customerName+"' disabled='isabled'/></td>"+
			"<th>当前额度:</th>"+
			"<td><input  type='text' value='"+obj.result.applyAmt+"' disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+
			
			//"<tr>"+
			//"<th>贷款期限:</th>"+
			//"<td><input  type='text' value='"+obj.result.loanTerm+"' disabled='isabled'/></td>"+
			//"<th>还款方式:</th>"+
			//"<td><input  type='text' value='' disabled='isabled'/></td>"+
			//"</tr>"+
			
			"<tr><th colspan='4'>个人信息</th></tr>"+ 
			"<tr>"+
			"<th>性别:</th>"+
			"<td><input  type='text' value='"+obj.result.sex+"' disabled='isabled'/></td>"+
			"<th>身份证号:</th>"+
			"<td><input  type='text' value='"+obj.result.cardId+"' disabled='isabled'/></td>"+
			"</tr>"+
			
			
			"<tr>"+
			"<th>年龄:</th>"+
			"<td><input  type='text' value='"+obj.result.age+"' disabled='isabled'/></td>"+
			"<th>手机号:</th>"+
			"<td><input  type='text' value='"+obj.result.phoneNo+"' disabled='isabled'/></td>"+
			"</tr>"+
			
			"<tr>"+
			"<th>婚姻状况:</th>"+
			/*"<td><select id='hyzk'>" +
				"<option value = '未婚'>未婚</option>" +
				"<option value = '已婚'>已婚</option>" +
				"<option value = '离婚'>离婚</option>" +
				"<option value = '再婚'>再婚</option>" +
				"</select></td>"+*/
			"<td><input  type='text' value='"+obj.result.maritalStatus+"' disabled='isabled'/></td>"+
			"<th>最高学位学历:</th>"+
			/*"<td><select id='hyzk'>" +
				"<option value = '初中及以下'>初中及以下</option>" +
				"<option value = '高中或技校'>高中或技校</option>" +
				"<option value = '大学或以上'>大学或以上</option>" +
				"</select></td>"+*/
			"<td><input  type='text' value='"+obj.result.highEdu+"' disabled='isabled'/></td>"+
			"</tr>"+
			
			"<tr>"+
			"<th>户籍所在地:</th>"+
			/*"<td><select id='hyzk'>" +
			"<option value = '本省'>本省</option>" +
			"<option value = '本省外地'>本省外地</option>" +
			"<option value = '外地'>外地</option>" +
			"</select></td>"+*/
			"<td><input  type='text' value='"+obj.result.domicile+"' disabled='isabled'/></td>"+
			"</tr>"+
			
			"<tr><th colspan='4'>家庭资产:</th></tr>"+  
			"<tr>"+
			"<th>自有房产数量:</th>"+
			"<td><input  type='text' value='"+obj.result.ownHouses+"' disabled='isabled'/></td>"+
			"<th>按揭房产数量:</th>"+
			"<td><input  type='text' value='"+obj.result.mortgageHouses+"' disabled='isabled'/></td>"+
			"</tr>"+
			
			"<tr>"+
			"<th>按揭贷款余额:</th>"+
			"<td><input  type='text' value='"+obj.result.mortgageBalamt+"' disabled='isabled'/> &nbsp;元</td>"+
			"<th>自有车辆数量:</th>"+
			"<td><input  type='text' value='"+obj.result.ownVehicles+"' disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+                        
			"<th colspan='4'>征信状况:</th>"+  	
			"</tr>"+
			"<tr>"+
			"<th >信用状况:</th>"+
			/*"<td><select id='hyzk'>" +
			"<option value = '正常'>正常</option>" +
			"<option value = '不正常'>不正常</option>" +
			"<option value = '无记录'>无记录</option>" +
			"</select></td>"+*/
			"<td><input  type='text' value='"+obj.result.creditStatus+"' disabled='isabled'/></td>"+
			"<th>信用逾期次数:</th>"+
			"<td><input  type='text' value='"+obj.result.creditOverdueTimes+"' disabled='isabled'/></td>"+
			"</tr>"+
			
			"<tr>"+
			"<th>贷款逾期次数:</th>"+
			"<td><input  type='text' value='"+obj.result.loanOverdueTimes+"' disabled='isabled'/></td>"+
			"<th>贷款余额:</th>"+
			"<td><input  type='text' value='"+obj.result.loanBalamt+"' disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+
			"<tr>"+
			"<th>担保余额:</th>"+
			"<td><input  type='text' value='"+obj.result.guaranteed+"' disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+
			
			
			
			"<tr><th colspan='4'>家庭状况</th></tr>"+ 
			"<tr>"+  
			"<th>经济上依赖的人数:</th>"+
			"<td><input  type='text' value='"+obj.result.numOfEcoDepend+"' disabled='isabled'/></td>"+
			"<th>配偶年收入:</th>"+
			"<td><input  type='text' value='"+obj.result.annualIncomeSpouse+"' disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+
			"<tr>"+
			"<th>子女教育状况:</th>"+
			/*"<td><select id='hyzk'>" +
			"<option value = '无子女'>无子女</option>" +
			"<option value = '上学'>工作</option>" +
			"<option value = '学龄前'>工作</option>" +
			"<option value = '工作'>工作</option>" +
			"</select></td>"+*/
			"<td><input  type='text' value='"+obj.result.childEdu+"' disabled='isabled'/></td>"+
			"</tr>"+
			
			
			
			"<tr><th colspan='4'>经营及财务状况</th></tr>"+  
			"<tr>"+
			"<th>业务年限:</th>"+
			"<td><input  type='text' value='"+obj.result.serviceLife+"' disabled='isabled'/>&nbsp;年</td>"+
			"<th>年可支配收入:</th>"+
			"<td><input  type='text' value='"+obj.result.annualDisIncome+"' disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+
			
			"<tr>"+
			"<th>主营业务收入:</th>"+
			"<td><input  type='text' value='"+obj.result.mainBusinessIncome+"' disabled='isabled'/> &nbsp;元</td>"+
			"<th>其他工作收入:</th>"+
			"<td><input  type='text' value='"+obj.result.otherImcome+"' disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>流动资产:</th>"+
			"<td><input  type='text' value='"+obj.result.currentAssets+"' disabled='isabled'/> &nbsp;元</td>"+
			"<th>存货:</th>"+
			"<td><input  type='text' value='"+obj.result.stock+"' disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>固定资产:</th>"+
			"<td><input  type='text' value='"+obj.result.fixedAssets+"' disabled='isabled'/> &nbsp;元</td>"+
			"<th>资产总计:</th>"+
			"<td><input  type='text' value='"+obj.result.totalAssets+"' disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>短期负债:</th>"+
			"<td><input  type='text' value='"+obj.result.shortTermLiab+"' disabled='isabled'/> &nbsp;元</td>"+
			"<th>负债总计:</th>"+
			"<td><input  type='text' value='"+obj.result.totalLiab+"' disabled='isabled'/> &nbsp;元</td>"+
			"</tr>"+    
			
			"<tr>"+
			"<th>所有者权益:</th>"+
			"<td><input  type='text' value='"+obj.result.ownedEqu+"' disabled='isabled'/>&nbsp;元</td>"+
			"<th>私人用途分期付款:</th>"+
			"<td><input  type='text' value='"+obj.result.payPrivateUse+"' disabled='isabled'/> &nbsp;元</td>"+
			"</tr>"+  

			"</table>"+ body +
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
	$("#re").click(function(){
		findHistory();
	});
	$("#pre").click(function(){
	  if(type == "1"){
		findHistory();
	  }else{
		kssp();
	  }
	});
	}
	})
}


//快审审批界面
function ksspxq(res){
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='kssp()'/>快审审批界面</div>"+  
		    "<div class='content'>" +
			"<table class='cpTable khjbxx' style='margin-top:20px;'>"+
			"<tr><th colspan='4'>模型评估结果</th></tr>"+ 
			 
			"<tr>"+
			"<th>评估金额(元):</th>"+
			"<td><input  type='text' value='"+res.creditAmt+"' disabled='isabled'/></td>"+
			"<th>描述:</th>"+
			"<td><input  type='text' value='"+res.remarks+"' disabled='isabled'/></td>"+
			"</tr>"+
			
	
			"<tr><th colspan='4'>客户贷款申请信息</th></tr>"+  
			"<tr>"+
			"<th>客户名称:</th>"+
			"<td><input  type='text' value='"+res.customerName+"' disabled='isabled'/></td>"+
			"<th>身份证号码:</th>"+
			"<td><input  type='text' value='"+res.cardId+"' disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+
			"<th>手机号:</th>"+
			"<td><input  type='text' value='"+res.phoneNo+"' disabled='isabled'/></td>"+
			"<th>申请金额(元):</th>"+
			"<td><input  type='text' value='"+res.applyAmt+"' disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+
			"<th>申请期限:</th>"+
			"<td><input  type='text' value='"+res.loanTerm+"' disabled='isabled'/></td>"+
			"<th>申请时间:</th>"+
			"<td><input  type='text' value='"+res.applyTime+"' disabled='isabled'/></td>"+
			"</tr>"+
			
			"<tr><th colspan='4'>提额审批决议:</th></tr>"+  
			"<tr>"+
			"<th>审批结论：</th>"+
			"<td><select id ='auditresult' name = 'status'><option value = 'APPROVE'>通过</option>" +
			"<option value = 'REJECT'>拒绝</option>" +
			"<option value = 'SUPINVEST'>补充调查</option></select></td>" +
			"<th>提额金额(元):</th>"+
			"<td><input  type='text' id='teje'  value='' /></td>"+
			"</tr>"+

			"</table>"+
			"<p>" +
			"<input type='button' class='btn btn-primary btn-large' value='提交' id='ksspc' />" +
			"<input type='button' class='btn btn-large' value='返回' onclick='kssp()'/>" +
			"</p>"+
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
	
	// save
	$("#ksspc").click(function(){
				var number =/^\d+$/;
				var teje = $("#teje").val();
				if( $("#auditresult").val() == "APPROVE"){
					if(teje==""||teje==null||!number.test(teje)){
						window.wxc.xcConfirm("请输入正确的提额金额", "warning");
						return;
					}
				}
				window.wxc.xcConfirm("确定要保存吗?", "confirm",{onOk:function(){
					$("#ksspc").attr('disabled',"true");
					var url ="/ipad/ks/update.json";
					$.ajax({
						url:wsHost+url,
						dateType:'json',
						type:'GET',
						data:{
							appId:res.id,
							quotaId:res.quotaId,
							status:$("#auditresult").val(),
							amt:$("#teje").val(),
						},
						success:function(json){
							var mes = $.evalJSON(json);
							window.wxc.xcConfirm(mes.message, "success");
							kssp();
						}
					})
				}});
	})
	
	// change
	$("#auditresult").change(function (){
		var status = $("select[name=status]").val();
		
		if(status == "APPROVE"){
			$('#teje').removeAttr('disabled')
		}
		
		if(status == "REJECT"){
			$("#teje").attr('disabled',"true");
		}
		
		if(status == "SUPINVEST"){
			$("#teje").attr('disabled',"true");
		}
	})
}
/********************** 快审  **********************/




function modelinput(){
	
	var modelbody= "<div class='title' id='mjjgl2'><img src='images/back.png' onclick='mykhgl()'/>四维授信评估模型</div>"+  
	"<div class='content'>" +
		"<table class='cpTable jjTable' border='1' bordercolor='#CCCCCC'>"+
		"<tr>"+                        
		"<th colspan='6'>基本信息</th>"+  
		"</tr>"+
		"<tr>"+
       "<th id='xm'>姓名</th>"+
       "<td><input type='text' name='cname' id ='cname' value='' /></td>"+
       "<th  id='sfz'>身份证号</th>"+
       "<td><input type='text' name='cardNo' id ='cardNo' value='' /></td>"+
		"</td>"+
       "<th  id='hjsz'>户籍所在地</th>"+
       "<td><input type='text' name='domicileLocation' id ='domicileLocation' value='' /></td>"+
      
		"<tr>"+
       "<th  id='xxdz'>详细地址</th>"+
       "<td><input type='text' name='address' id ='address' value='' /></td>"+
       "<th  id='dh'>电话</th>"+
       "<td><input type='text' name='phoneNo' id ='phoneNo' value='' /></td>"+
		"</td>"+
       "<th  id='posfz'>配偶身份证号</th>"+
       "<td><input type='text' name='spouseIdNo' id ='spouseIdNo' value='' /></td>"+
       "<tr>"+
       "<th  id='qydz'>店铺/企业地址</th>"+
       "<td><input type='text' name='companyAddress' id ='companyAddress' value='' /></td>"+
       "<th  id='sshy'>所属行业</th>"+
       "<td colspan='3'><input type='text' name='industry' id ='industry' value='' /></td>"+
		"</td>"+ 
		"<tr>"+                        
		"<th colspan='6'>评估信息</th>"+  
		"</tr>"+
		"<tr>"+
		   "<th  >模型类型</th>"+ 
        "<td colspan='5'>"+
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='modelType' resu='CREDIT_CPY'/>信用-企业主模型</label>" +
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='modelType' resu='CREDIT_INDI'/>信用-受薪者模型</label>" +
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='modelType' resu='WARR_CPY'/>担保-企业主模型</label>" +
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='modelType' resu='WARR_INDI'/>担保-受薪者模型</label>" +
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='modelType' resu='COLLE_CPY'/>抵押-企业主模型</label>" +
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='modelType' resu='COLLE_INDI'/>抵押-受薪者模型</label>" +
		   "</td>"+
		"</tr>"+
		"<tr>"+   
       "<th  >申请贷款金额(元)</th>"+
       "<td><input type='text' class='rinpsty'  name='applyAmount' id ='applyAmount'   value=''/></td>"+
       
       "<th  >贷款用途</th>"+ 
       "<td>"+
       "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='loanUse' resu='0'/>消费</label>" +
       "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='loanUse' resu='1'/>经营</label>" +
		  "</td>"+
		"</td>"+
		   "<th  >性别</th>"+
        "<td>"+
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='sex' resu='0'/>男</label>" +
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='sex' resu='1'/>女</label>" +
		   "</td>"+
		"<tr>"+
        "<th  >最高学位学历</th>"+
        "<td>"+
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='education' resu='0'/>初中及以下</label>" +
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='education' resu='1'/>高中及技校</label>" +
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='education' resu='2'/>大学及以上</label>" +
		   "</td>"+
		   
		   "<th  >户籍所在地</th>"+
        "<td>"+
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='residence' resu='0'/>本地</label>" +
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='residence' resu='1'/>本省外地</label>" +
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='residence' resu='2'/>省外</label>" +
		  "</td>"+
		"</td>"+
		  "<th  >子女教育状况</th>"+
       "<td>"+
       "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='childrenEducation' resu='0'/>无子女</label>" +
       "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='childrenEducation' resu='1'/>上学</label>" +
       "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='childrenEducation' resu='2'/>学龄前</label>" +
       "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='childrenEducation' resu='3'/>工作</label>" +
		 "</td>"+
		"<tr>"+   
		   "<th  >年龄</th>"+
        "<td><input type='text' class='rinpstynum' name='age' id ='age' value=''/></td>"+
        
        "<th  >婚姻状况</th>"+
        "<td>"+
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='marriage' resu='0'/>已婚</label>" +
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='marriage' resu='1'/>未婚</label>" +
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='marriage' resu='2'/>离婚</label>" +
        "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='marriage' resu='3'/>再婚</label>" +
		  " </td>"+
		"</td>"+
		
		
		
		
       "<th  >自有房产数量</th>"+
       "<td><input type='text' class='rinpstynum'  name='ownedPropertyQuantity' id ='ownedPropertyQuantity'   value=''/></td>"+
       "<tr>"+
       "<th  >按揭房产数量</th>"+
       "<td><input type='text' class='rinpstynum' name='mortgagePropertyQuantity'   id ='mortgagePropertyQuantity' value=''/></td>"+
       
       "<th  >按揭贷款余额(元)</th>"+
       "<td><input type='text' class='rinpsty'  name='mortgateBalance' id ='mortgateBalance'  value=''/></td>"+
		"</td>"+
		
		
       "<th  >自有车辆数量</th>"+
       "<td><input type='text' class='rinpstynum'  name='ownedCarsQuantity' id ='ownedCarsQuantity'   value=''/></td>"+
       
		"<tr>"+
       "<th  >业务年限</th>"+
       "<td><input type='text' class='rinpstynum' name='businessYears'   id ='businessYears' value=''/></td>"+
       
       "<th  >信用状况</th>"+
       "<td>"+
       "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='credit' resu='1'/>正常</label>" +
       "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='credit' resu='2'/>不正常</label>" +
       "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='credit' resu='3'/>无记录</label>" +
       "</td>"+
       "<th  >信用逾期次数</th>"+
       "<td><input type='text' class='rinpstynum'  name='creditCardOverdueCount' id ='creditCardOverdueCount'   value=''/></td>"+
       
		"<tr>"+
       "<th  >贷款逾期次数</th>"+
       "<td><input type='text' class='rinpstynum' name='loanOverdueCount'   id ='loanOverdueCount' value=''/></td>"+
       
       "<th  >贷款余额(元)</th>"+
       "<td><input type='text' class='rinpsty' name='loanBalance'   id ='loanBalance' value=''/></td>"+
		"</td>"+
		
		
       "<th  >担保余额(元)</th>"+
       "<td><input type='text' class='rinpsty'  name='mortgageRemaining' id ='mortgageRemaining'   value=''/></td>"+
       
		"<tr>"+
       "<th  >经济上依赖的人数</th>"+
       "<td><input type='text' class='rinpstynum' name='numOfEconomicDependence'   id ='numOfEconomicDependence' value=''/></td>"+
       
       "<th  >流动资产(元)</th>"+
       "<td><input type='text' class='rinpsty'  name='liquidAssents'   id ='liquidAssents' value=''/></td>"+
		"</td>"+
		
		
       "<th  >存货(元)</th>"+
       "<td><input type='text' class='rinpsty'   name='stock' id ='stock'   value=''/></td>"+
       
		"<tr>"+
       "<th  >固定资产(元)</th>"+
       "<td><input type='text' class='rinpsty'  name='fixedAssents'   id ='fixedAssents' value=''/></td>"+
       
       "<th  >短期负债(元)</th>"+
       "<td><input type='text' class='rinpsty'  name='shortTermLiabilities'   id ='shortTermLiabilities' value=''/></td>"+
		"</td>"+
		
		
       "<th  >负债总计(元)</th>"+
       "<td><input type='text' class='rinpsty'   name='totalLiabilities' id ='totalLiabilities'   value=''/></td>"+
       
		"<tr>"+
       "<th  >资产总计(元)</th>"+
       "<td><input type='text' class='rinpsty'  name='totalAssents'   id ='totalAssents' value=''/></td>"+
       
       "<th  >所有者权益(元)</th>"+
       "<td><input type='text' class='rinpsty'  name='ownersEquity'   id ='ownersEquity' value=''/></td>"+
		"</td>"+
		
		
       "<th  >主营业务收入(元)</th>"+
       "<td><input type='text' class='rinpsty'   name='annualIncome' id ='annualIncome'   value=''/></td>"+
       
		"<tr>"+
       "<th  >其他工作年收入(元)</th>"+
       "<td><input type='text' class='rinpsty'  name='otherIncome'   id ='otherIncome' value=''/></td>"+
       
       "<th  >配偶年收入(元)</th>"+
       "<td><input type='text' class='rinpsty'  name='spouseIncome'   id ='spouseIncome' value=''/></td>"+
		"</td>"+
		
		
       "<th  >私人用途分期付款(元)</th>"+
       "<td><input type='text' class='rinpsty'   name='paymentByPrivateUse' id ='paymentByPrivateUse'   value=''/></td>"+
       
	    "<tr>"+
       "<th  >年可支配收入(元)</th>"+
       "<td><input type='text' class='rinpsty'  name='annualDisposableCapital'   id ='annualDisposableCapital' value=''/></td>"+
       
       "<th  >抵质押物品种类</th>"+
       "<td>"+
       "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='articleCategory' resu='0'/>商业房产</label>" +
       "<label onclick='checkBoxModel(this)' class='checkbox'><input type='radio' name='articleCategory' resu='1'/>住宅</label>" +
		  "</td>"+
       "<th  >抵押物估值(元)</th>"+
       "<td><input type='text' class='rinpsty' name='collateralValuation' id ='collateralValuation' value=''/></td>"+
		"</td>"+
  "</table>"+
  "<p>" +
	"<input type='button' class='btn btn-large btn-primary' value='确定' id='sure'/>"+
	"<input type='button' class='btn btn-large' value='返回' onclick='mykhgl()'/></p>"+
  "</div>";
		$("#mainPage").html(modelbody);
		$("#sure").click(function(){
			var modelFormData={};
			if($("#applyAmount").val()=="")  {
				  window.wxc.xcConfirm("申请贷款金额不能为空","warning")
				  return;
			}
			modelFormData.applyAmount=$("#applyAmount").val();
			var loanUse= $('input[name="loanUse"]:checked').attr("resu");
			if(loanUse==""||loanUse==undefined) {
				  window.wxc.xcConfirm("贷款用途不能为空","warning")
				  return;
			}
			modelFormData.loanUse=loanUse;
			var sex= $('input[name="sex"]:checked').attr("resu");
			if(sex==""||sex==undefined) {
				  window.wxc.xcConfirm("性别不能为空","warning")
				  return;
			}
			modelFormData.sex=sex;
			if($("#age").val()=="") {
				  window.wxc.xcConfirm("年龄不能为空","warning")
				  return;
			}
			modelFormData.age=$("#age").val();
			var education= $('input[name="education"]:checked').attr("resu");
			if(education==""||education==undefined) {
				  window.wxc.xcConfirm("最高学历学位不能为空","warning")
				  return;
			}
			modelFormData.education=education;
			var residence= $('input[name="residence"]:checked').attr("resu");
			if(residence==""||residence==undefined) {
				  window.wxc.xcConfirm("户籍所在地不能为空","warning")
				  return;
			}
			modelFormData.residence=residence;
			var marriage= $('input[name="marriage"]:checked').attr("resu");
			if(marriage==""||marriage==undefined) {
				  window.wxc.xcConfirm("婚姻状况不能为空","warning")
				  return;
			}
			modelFormData.marriage=marriage;
			var childrenEducation= $('input[name="childrenEducation"]:checked').attr("resu");
			if(childrenEducation==""||childrenEducation==undefined) {
				  window.wxc.xcConfirm("子女教育情况不能为空","warning")
				  return;
			}
			modelFormData.childrenEducation=childrenEducation;
			if($("#ownedPropertyQuantity").val()=="") {
				 window.wxc.xcConfirm("自有房产数量不能为空","warning")
				 return;
			}
			modelFormData.ownedPropertyQuantity=$("#ownedPropertyQuantity").val();
			if($("#mortgagePropertyQuantity").val()=="") {
				  window.wxc.xcConfirm("按揭房产数量不能为空","warning")
				  return;
			}
			modelFormData.mortgagePropertyQuantity=$("#mortgagePropertyQuantity").val();
			if($("#mortgateBalance").val()=="") {
				  window.wxc.xcConfirm("按揭贷款余额不能为空","warning")
				  return;
			}
			modelFormData.mortgateBalance=$("#mortgateBalance").val();
			if($("#ownedCarsQuantity").val()=="") {
				  window.wxc.xcConfirm("自有车辆数量不能为空","warning")
				  return;
			}
			modelFormData.ownedCarsQuantity=$("#ownedCarsQuantity").val();
			if($("#businessYears").val()=="") {
				  window.wxc.xcConfirm("业务年限不能为空","warning")
				  return;
			}
			modelFormData.businessYears=$("#businessYears").val();
			var credit= $('input[name="credit"]:checked').attr("resu");
			if(credit==""||credit==undefined) {
				  window.wxc.xcConfirm("信用状况不能为空","warning")
				  return;
			}
			modelFormData.credit=credit;
			if($("#creditCardOverdueCount").val()=="") {
				window.wxc.xcConfirm("信用逾期次数不能为空","warning")
				return;
			}
			modelFormData.creditCardOverdueCount=$("#creditCardOverdueCount").val();
			if($("#loanOverdueCount").val()=="") {
				window.wxc.xcConfirm("贷款逾期次数不能为空","warning")
				return;
			}
			modelFormData.loanOverdueCount=$("#loanOverdueCount").val();
			if($("#loanBalance").val()=="") {
				window.wxc.xcConfirm("贷款余额不能为空","warning")
				return;
			}
			modelFormData.loanBalance=$("#loanBalance").val();
			if($("#mortgageRemaining").val()=="") {
				window.wxc.xcConfirm("担保余额不能为空","warning")
				return;
			}
			modelFormData.mortgageRemaining=$("#mortgageRemaining").val();
			if($("#numOfEconomicDependence").val()=="") {
				window.wxc.xcConfirm("经济上依赖的人数不能为空","warning") 
				return;
			}
			modelFormData.numOfEconomicDependence=$("#numOfEconomicDependence").val();
			if($("#liquidAssents").val()=="") {
				window.wxc.xcConfirm("流动资产不能为空","warning")
				return;
			}
			modelFormData.liquidAssents=$("#liquidAssents").val();
			if($("#stock").val()=="") {
				window.wxc.xcConfirm("存货不能为空","warning")
				return;
			}
			modelFormData.stock=$("#stock").val();
			if($("#fixedAssents").val()=="") {
				window.wxc.xcConfirm("固定资产不能为空","warning")
				return;
			}
			modelFormData.fixedAssents=$("#fixedAssents").val();
			if($("#shortTermLiabilities").val()=="") {
				window.wxc.xcConfirm("短期负债不能为空","warning")
				return;
			}
			modelFormData.shortTermLiabilities=$("#shortTermLiabilities").val();
			if($("#totalLiabilities").val()=="") {
				window.wxc.xcConfirm("负债总计不能为空","warning")
				return;
			}
			modelFormData.totalLiabilities=$("#totalLiabilities").val();
			if($("#totalAssents").val()=="") {
				window.wxc.xcConfirm("资产总计不能为空","warning")
				return;
			}
			modelFormData.totalAssents=$("#totalAssents").val();
			if($("#ownersEquity").val()=="") {
				window.wxc.xcConfirm("所有者权益不能为空","warning")
				return;
			}
			modelFormData.ownersEquity=$("#ownersEquity").val();
			if($("#annualIncome").val()=="") {
				window.wxc.xcConfirm("主营业务收入不能为空","warning")
				return;
			}
			modelFormData.annualIncome=$("#annualIncome").val();
			if($("#otherIncome").val()=="") {
				window.wxc.xcConfirm("其他工作年收入不能为空","warning")
				return;
			}
			modelFormData.otherIncome=$("#otherIncome").val();
			if($("#spouseIncome").val()=="") {
				window.wxc.xcConfirm("配偶年收入不能为空","warning")
				return;
			}
			modelFormData.spouseIncome=$("#spouseIncome").val();
			if($("#paymentByPrivateUse").val()=="") {
				window.wxc.xcConfirm("私人用途分期付款不能为空","warning")
				return;
			}
			modelFormData.paymentByPrivateUse=$("#paymentByPrivateUse").val();
			if($("#annualDisposableCapital").val()=="") {
				window.wxc.xcConfirm("年可支配收入不能为空","warning")
				return;
			}
			modelFormData.annualDisposableCapital=$("#annualDisposableCapital").val();
			var articleCategory= $('input[name="articleCategory"]:checked').attr("resu");
			if(articleCategory==""||articleCategory==undefined) {
				window.wxc.xcConfirm("抵质押物品种类不能为空","warning")
				return;
			}
			modelFormData.articleCategory=articleCategory;
			if($("#collateralValuation").val()=="") {
				window.wxc.xcConfirm("抵押物估值不能为空","warning")
				return;
			}
			modelFormData.collateralValuation=$("#collateralValuation").val();
			if($("#cname").val()=="") {
				window.wxc.xcConfirm("姓名不能为空","warning")
				return;
			}
			modelFormData.cname=$("#cname").val();
			if($("#cardNo").val()=="") {
				window.wxc.xcConfirm("身份证号不能为空","warning")
				return;
			}
			modelFormData.cardNo=$("#cardNo").val();
			var modelType= $('input[name="modelType"]:checked').attr("resu");
			if(modelType==""||modelType==undefined) {
				window.wxc.xcConfirm("模型类型不能为空","warning")
				return;
			}
			modelFormData.address=$("#address").val();
			modelFormData.domicileLocation=$("#domicileLocation").val();
			modelFormData.phoneNo=$("#phoneNo").val();
			modelFormData.spouseIdNo=$("#spouseIdNo").val();
			modelFormData.companyAddress=$("#companyAddress").val();
			modelFormData.industry=$("#industry").val();
			modelFormData.modelType=modelType;
			modelFormData.userId=window.sessionStorage.getItem("userId");
			modelFormData.userType=window.sessionStorage.getItem("userType");
			modelFormData.userName=window.sessionStorage.getItem("displayName");
			var modelUrl="/ipad/modelForm/insertresult.json";
			$.ajax({
		        url:wsHost + modelUrl,
		        type: "GET",
		        dataType:'json',
		        data:modelFormData,
		        success: function (json) {
		        	var objs = $.evalJSON(json);
		        	if(objs.issuccess){
		        		window.wxc.xcConfirm("建议授信额度为："+objs.evaresult.money+"元","success");
		        	}else{
		        		window.wxc.xcConfirm(objs.mess,"success");
		        	}
		        }
			})
		})

		$(document).ready(function() {
			
		$(".rinpsty").live("keydown",function(e){
				
				$(this).moneyFormat();
				
			});

		$(".rinpstynum").live("keydown",function(e){
			
			$(this).numFormat();
			
		});
			
		});
		$.fn.extend({
			moneyFormat : function () {
				return this.each(function () {
					$(this).keyup(function () {
						var reg = /^\d*\.?\d{0,2}$/,
						reg2 = /(?:\d*\.\d{0,2}|\d+)/,
						reg3 = /[^.0-9]+/;
						var _val = $(this).val(),
						isPlus = /^-/.test(_val),
						_val = isPlus ? _val.substr(1) : _val;
						if (!reg.test(_val)) {
							_val = _val.replace(reg3, "").match(reg2);
							_val = _val == null ? "" : _val[0];
							$(this).val(isPlus ? ("-" + _val) : _val);
						}
					}).blur(function () {
						var reg1 = /^\d+$/,
						reg2 = /^\.\d{0,2}$/,
						reg3 = /^\d+\.\d{0,2}$/,
						reg4 = /^0+(?:[1-9]\d*|0)\.\d{0,2}$/,
						reg5 = /^0+((?:[1-9]\d*|0)\.\d{0,2})$/;
						var _val = $(this).val(),
						isPlus = /^-/.test(_val),
						_val = isPlus ? _val.substr(1) : _val;
						if (reg1.test(_val)) {
							_val = _val + ".00";
						}
						if (reg4.test(_val)) {
							_val = _val.replace(reg5, "$1");
						}
						if (reg2.test(_val)) {
							_val = "0" + _val;
						}
						if (reg3.test(_val)) {
							var len = _val.length - _val.indexOf(".") - 1,
							str = "";
							for (var i = 0; i < 2 - len; i++) {
								str += "0";
							}
							_val += str;
						}
						$(this).val(isPlus ? ("-" + _val) : _val);
					});
				});
			}
		});
		$.fn.extend({
			numFormat : function () {
				return this.each(function () {
					$(this).keyup(function () {
						var reg = /^\d+$/;
						var _val = $(this).val();
						if (reg.test(_val)) {
							_val = _val
						}else{
							
							_val = ""
						}
						$(this).val(_val);
					}).blur(function () {
						var reg1 = /^\d+$/;
						if (reg1.test(_val)) {
							_val = _val ;
						}else{
							
							_val = ""
						}
					
						$(this).val(_val);
					});
				});
			}
		});
}


