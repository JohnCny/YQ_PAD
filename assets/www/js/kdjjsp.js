/* ********************* maoya 开始  ********************* */
function kdjj(){
    var htmDiv="";
    if(window.sessionStorage.getItem("userType")==3){
       htmDiv = "<div class='box shspp1' onclick='kssp()'><img src='images/shsp2.png'/>" +
				"<span>快审</span>"+
				"</div>"
	}
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'>快审通-待调查进件</div>"+  
			"<div class='content'>" +
			"<div class='box shspp1' onclick='cusbc()'><img src='images/shsp1.png'/>" +                            
			"<span>补充申请客户资料</span>"+
			"</div>"+ htmDiv +
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
}

//提额申请查询
function cusbc(){
	var sdrwurl= "/ipad/Customer/selectSqCustomer.json";
	var userId = window.sessionStorage.getItem("userId");
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var td="";
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
				/*if((obj.result[i].APPLY_ID=="" || obj.result[i].APPLY_ID==null) && (obj.result[i].APPLY_ID1=="" || obj.result[i].APPLY_ID1==null)){
					td="待调查"	
				}else if((obj.result[i].APPLY_ID!="" && obj.result[i].APPLY_ID!=null) && (obj.result[i].APPLY_ID1!="" && obj.result[i].APPLY_ID1!=null)){
					td="调查完成"	
				}else{
					td="正在调查"	
				}*/
				
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
				"@"+obj.result[i].APPLY_AMT+"@"+obj.result[i].LOAN_TERM+"'/>"+"</span></td>"+  
				"<td>"+obj.result[i].CUSTOMER_NAME+"</td>"+
				"<td>"+obj.result[i].CARD_ID+"</td>"+
				"<td>"+obj.result[i].PHONE_NO+"</td>"+
				"<td>"+obj.result[i].APPLY_AMT+"</td>"+
				"<td>"+obj.result[i].LOAN_TERM+"</td>"+
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
					var id = values[0];
					sHistory(id);
				}else{
					window.wxc.xcConfirm("请选择一行", "warning");
				}
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
				//zpsc();
			})
			$("#xszlxx").click(function() {
				kdbcdc();
		
				
			})
		}})
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
	"<th>审批金额</th>"+ 
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
				bcdcckbs(id);
			});
			$("#xsyxzl").click(function() {
				HistoryIma(id);
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
	"<th>申请金额(元)</th>"+
	"<th>申请期限</th>"+
	"<th>申请时间</th>"+
	"<th>状态</th>"+ 
	"</tr>"

	var ksurl= "/ipad/ks/selectMetionApply.json";
	$.ajax({
		url:wsHost + ksurl,
		type: "GET",
		dataType:'json',
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
				"@"+obj.result[i].applyAmt+"@"+obj.result[i].loanTerm+"@"+obj.result[i].applyTime+"'/>"+"</span></td>"+ 
				"<td>"+obj.result[i].customerName+"</td>"+
				"<td>"+obj.result[i].cardId+"</td>"+
				"<td>"+obj.result[i].phoneNo+"</td>"+
				"<td>"+obj.result[i].applyAmt+"</td>"+
				"<td>"+obj.result[i].loanTerm+"</td>"+
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
							"@"+obj.result[i].applyAmt+"@"+obj.result[i].loanTerm+"@"+obj.result[i].applyTime+"'/>"+"</span></td>"+ 
							"<td>"+obj.result[i].customerName+"</td>"+
							"<td>"+obj.result[i].cardId+"</td>"+
							"<td>"+obj.result[i].phoneNo+"</td>"+
							"<td>"+obj.result[i].applyAmt+"</td>"+
							"<td>"+obj.result[i].loanTerm+"</td>"+
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
				   	budcMethod(id);
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
					HistoryIma(id);
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
				   	ksspxq(res);
				}else{
					window.wxc.xcConfirm("请选择一行", "warning");
				}
			})
			
		}
	})


}

//补充调查资料查看
function budcMethod(id){
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
	    $("#mainPage").html("<div class='title'><img src='images/back.png' onclick='cusbc()'/>快审通-补充调查</div>"+  
			"<div class='content'>" +
			"<table class='cpTable khjbxx' style='margin-top:20px;'>"+
			
			"<tr><th colspan='4'>客户基本信息</th></tr>"+ 
			"<tr>"+
			"<th>申请人姓名:</th>"+
			"<td><input  type='text' value='"+obj.result.customerName+"' disabled='isabled'/></td>"+
			"<th>申请金额:</th>"+
			"<td><input  type='text' value='"+obj.result.applyAmt+"' disabled='isabled'/>&nbsp;元</td>"+
			"</tr>"+
			
			"<tr>"+
			"<th>贷款期限:</th>"+
			"<td><input  type='text' value='"+obj.result.loanTerm+"' disabled='isabled'/></td>"+
			"<th>还款方式:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
			"</tr>"+
			
			"<tr><th colspan='4'>个人信息</th></tr>"+ 
			"<tr>"+
			"<th>性别:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
			"<th>身份证号:</th>"+
			"<td><input  type='text' value='"+obj.result.cardId+"' disabled='isabled'/></td>"+
			"</tr>"+
			
			
			"<tr>"+
			"<th>年龄:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
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
			"<td><input  type='text' value='"+obj.result.childEdu+"' disabled='isabled'/>&nbsp;元</td>"+
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

			"</table>"+
			"<p>" +
			/*"<input type='button' class='btn btn-primary btn-large' value='查看文件资料' id='save' />" +*/
			"<input type='button' class='btn btn-large' value='返回' onclick='kssp()'/>" +
			"</p>"+
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
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
			"<th>评估结果:</th>"+
			"<td><input  type='text' value='通过' disabled='isabled'/></td>"+
			"<th>评估金额(元):</th>"+
			"<td><input  type='text' value='20000' disabled='isabled'/></td>"+
			"</tr>"+
			"<tr>"+
			"<th>拒绝原因:</th>"+
			"<td><input  type='text' value='' disabled='isabled'/></td>"+
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
				if(teje!=""&&number.test(teje)){
					$("#save").attr('disabled',"true");
					var url ="/ipad/ks/update.json";
					$.ajax({
						url:wsHost+url,
						dateType:'json',
						type:'GET',
						data:{
							appId:res.id,
							status:$("#auditresult").val(),
							amt:$("#teje").val(),
						},
						success:function(json){
							var mes = $.evalJSON(json);
							window.wxc.xcConfirm(mes.message, "success");
							kssp();
						}
					})
				}else{
					window.wxc.xcConfirm("请输入正确的提额金额", "warning");
				}
	})
	
}
/********************** 快审  **********************/
