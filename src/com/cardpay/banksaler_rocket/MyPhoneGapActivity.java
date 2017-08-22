package com.cardpay.banksaler_rocket;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.json.JSONArray;
import org.json.JSONObject;

import com.phonegap.DroidGap;

import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.app.Dialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.content.pm.PackageManager.NameNotFoundException;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ProgressBar;
public class MyPhoneGapActivity extends  DroidGap{
	Intent intent;  
    /*版本号检查路径*/
  //private String checkPath ="http://172.20.10.3:8080/PCCredit/js/padupdate.js";
  //private String checkPath ="http://139.196.31.230:8080//PCCredit/js/padupdate.js";
	private String checkPath ="http://192.168.3.41:8080//pccredit_remote/js/padupdate.js";
	/* 新版本号*/
	private int newVerCode;
	/* 新版本名称 */
	private String newVerName;
	/* APK 下载路径*/
	private String  downloadPath;
	/* 下载中 */
    private static final int DOWNLOAD = 1;
    /* 下载结束 */
    private static final int DOWNLOAD_FINISH = 2;
    /* 下载保存路径 */
    private String mSavePath;
    /* 记录进度条数量 */
    private int progress;
    /* 是否取消更新 */
    private boolean cancelUpdate = false;
    /* 更新进度条 */
    private ProgressBar mProgress;
    private Dialog mDownloadDialog;
	@Override
	public void onCreate(Bundle savedInstanceState) {
		//加载程序
		super.onCreate(savedInstanceState);
		super.setIntegerProperty("loadUrlTimeoutValue", 20000);
		super.loadUrl("file:///android_asset/www/index.html");
		//启动后台upload服务
		intent = new Intent(getApplicationContext(),UploadService.class);
		startService(intent);
		checkAndUpdate();//启动时就检查新版本
	}
	
	 /**
     * 检查更新
     */
    private void checkAndUpdate(){
    	if(getServerVerInfo()){
    		int currentVerCode = getCurrentVerCode();
    		if(newVerCode>currentVerCode){
    			this.showNoticeDialog();
    		}
    	}
    }
	
	
	/**
     * 获取应用当前版本代码
     * @param context
     * @return
     */
    private int getCurrentVerCode(){
    	String packageName = this.getPackageName();
    	int currentVer = -1;
    	try {
			currentVer = this.getPackageManager().getPackageInfo(packageName, 0).versionCode;
			System.out.println("当前版本:"+currentVer);
		} catch (NameNotFoundException e) {
			e.printStackTrace();
		}
    	return currentVer;
    }
    /**
     * 获取服务器上的版本信息
     * @param path
     * @return
     * @throws Exception
     */
    private boolean getServerVerInfo(){
		try {
			StringBuilder verInfoStr = new StringBuilder();
			URL url = new URL(checkPath);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setConnectTimeout(5000);
			conn.setReadTimeout(5000);
			conn.connect();
			BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8"),8192);
			String line = null;
			while((line = reader.readLine()) != null){
				verInfoStr.append(line+"\n");
			}
			reader.close();
			
			JSONArray array = new JSONArray(verInfoStr.toString());
			if(array.length()>0){
				JSONObject obj = array.getJSONObject(0);
				newVerCode = obj.getInt("verCode");
				newVerName = obj.getString("verName");
				downloadPath = obj.getString("apkPath");
				System.out.println("服务器上版本"+newVerCode);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} 
    	
    	return true;
    	
    }
    
    /**
     * 显示软件更新对话框
     */
    private void showNoticeDialog() {
    	
        // 构造对话框
        AlertDialog.Builder builder = new Builder(this);
        builder.setTitle(R.string.soft_update_title);
        builder.setMessage(R.string.soft_update_info);
        builder.setCancelable(false);
        // 更新
        builder.setPositiveButton(R.string.soft_update_updatebtn, new OnClickListener(){
            public void onClick(DialogInterface dialog, int which){
                
                if(downloadPath.equals("nopath")){
                	showDownloadfiled();
                }else{
                // 显示下载对话框
                	dialog.dismiss();
                showDownloadDialog();
                }
            }
        });
        // 稍后更新
        builder.setNegativeButton(R.string.soft_update_later, new OnClickListener(){
            public void onClick(DialogInterface dialog, int which){
                dialog.dismiss();
                finish();
            }
        });
        Dialog noticeDialog = builder.create();
        noticeDialog.show();
    }
    private void showDownloadfiled(){
    	new  AlertDialog.Builder(this)    
        .setTitle("提示" )  
        .setMessage("无法自动下载，请卸载后，重新下载安装" )
        .setCancelable(false)
        .setPositiveButton("确定" ,  new OnClickListener(){

			@Override
			public void onClick(DialogInterface dialog, int which) {
				finish();
			}
        })  
        .show(); 
    }
    
    /**
     * 显示软件下载对话框
     */
    private void showDownloadDialog()
    {
        // 构造软件下载对话框
        AlertDialog.Builder builder = new Builder(this);
        builder.setTitle(R.string.soft_updating);
        // 给下载对话框增加进度条
        final LayoutInflater inflater = LayoutInflater.from(this);
        View v = inflater.inflate(R.layout.main, null);
        mProgress = (ProgressBar) v.findViewById(R.id.update_progress);
        builder.setView(v);
        // 取消更新
        builder.setNegativeButton(R.string.soft_update_cancel, new OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
                // 设置取消状态
                cancelUpdate = true;
                finish();
            }
        });
        mDownloadDialog = builder.create();
        mDownloadDialog.setCanceledOnTouchOutside(false);
        mDownloadDialog.show();
        // 现在文件
        downloadApk();
    }

    /**
     * 下载apk文件
     */
    private void downloadApk()
    {
        // 启动新线程下载软件
        new downloadApkThread().start();
    }

    private Handler mHandler = new Handler()
    {
        public void handleMessage(Message msg)
        {
            switch (msg.what)
            {
            // 正在下载
            case DOWNLOAD:
                // 设置进度条位置
                mProgress.setProgress(progress);
                break;
            case DOWNLOAD_FINISH:
                // 安装文件
                installApk();
                break;
            default:
                break;
            }
        };
    };
    
    /**
     * 下载文件线程
     */
	private class downloadApkThread extends Thread {
		@Override
		public void run() {
			try {
				// 判断SD卡是否存在，并且是否具有读写权限
				if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
					// 获得存储卡的路径
					String sdpath = Environment.getExternalStorageDirectory()+ "/";
					mSavePath = sdpath + "download";
					URL url = new URL(downloadPath);
					// 创建连接
					HttpURLConnection conn = (HttpURLConnection) url.openConnection();
					conn.connect();
					// 获取文件大小
					int length = conn.getContentLength();
					// 创建输入流
					InputStream is = conn.getInputStream();

					File file = new File(mSavePath);
					// 判断文件目录是否存在
					if (!file.exists()) {
						file.mkdir();
					}
					File apkFile = new File(mSavePath, newVerName);
					FileOutputStream fos = new FileOutputStream(apkFile);
					int count = 0;
					// 缓存
					byte buf[] = new byte[1024];
					// 写入到文件中
					do {
						int numread = is.read(buf);
						count += numread;
						// 计算进度条位置
						progress = (int) (((float) count / length) * 100);
						// 更新进度
						mHandler.sendEmptyMessage(DOWNLOAD);
						if (numread <= 0) {
							// 下载完成
							mHandler.sendEmptyMessage(DOWNLOAD_FINISH);
							break;
						}
						// 写入文件
						fos.write(buf, 0, numread);
					} while (!cancelUpdate);// 点击取消就停止下载.
					fos.close();
					is.close();
				}
			} catch (MalformedURLException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			// 取消下载对话框显示
			mDownloadDialog.dismiss();
		}
	};

	/**
	 * 安装APK文件
	 */
	private void installApk() {
		File apkfile = new File(mSavePath, newVerName);
		if (!apkfile.exists()) {
			return;
		}
		// 通过Intent安装APK文件
		Intent i = new Intent(Intent.ACTION_VIEW);
		i.setDataAndType(Uri.parse("file://" + apkfile.toString()),
				"application/vnd.android.package-archive");
		startActivity(i);
	}
    
}

