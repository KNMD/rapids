var _packid;
var packPop = Ext.create('Ext.window.Window', {
	id: 'packWin',
	title: '增加',
	height: 200,
	width: 300,
	bodyPadding: 5,
	maximizable: true,
	modal: true,
	closeAction: 'hide',
	overflowX: 'hidden',
	overflowY: 'auto',
	items: [
		Ext.create('Ext.form.Panel', {
			id: 'packForm',
			url: path + '/pack/savePack?adminName='+adminName,
			layout: 'anchor',
			defaults: {
				anchor: '80%',
				labelAlign: 'right',
				labelWidth: 80,
				blankText: '必填项'
			},
			// The fields
			defaultType: 'textfield',
			items: [{//隐藏域
				name: 'id',
				hidden: true
			}, {

				fieldLabel: '知识包名称',
				name: 'name',
				allowBlank: false
			},
				{
					fieldLabel: '知识包类型',
					name: 'type',
					xtype: 'combo',
					store: Ext.create('Ext.data.ArrayStore', {
						fields: ['text'],
						data: [
							['ENGLISH'],
							['MATH'],
							['LITERATURE'],
						]
					}),
					editable: false,
					allowBlank: false,
					displayField: 'text',
					valueField: 'text'
				},
				{
					fieldLabel: '知识包描述',
					name: 'description',
					allowBlank: false
				}]
		})
	],
	buttons: [
		{
			text: '保存',
			handler: function () {

				if (!Ext.getCmp('packForm').getForm().isValid()) {
					Ext.Msg.alert('系统提示', '请按要求填写表格！');
					return;
				}
				Ext.getCmp('packForm').submit({
					waitTitle: '系统提示',
					waitMsg: '保存中......',
					success: function (form, action) {
						Ext.getCmp('packWin').hide();
						centerPanel.getStore().reload();
						Ext.Msg.alert('系统提示', '保存成功！');
					},
					failure: function (form, action) {
						Ext.Msg.alert('系统提示', action.result.msg);
					}
				});
			}
		}, {
			text: '取消',
			handler: function () {
				packPop.hide();
			}
		}
	]
});

var knowledgePop = Ext.create('Ext.window.Window', {
	id: 'knowledgeWin',
	title: '增加',
	height: 720,
	width: 600,
	bodyPadding: 5,
	maximizable: true,
	modal: true,
	closeAction: 'hide',
	overflowX: 'hidden',
	overflowY: 'auto',
	items: [
		Ext.create('Ext.form.Panel', {
			id: 'knowledgeForm',
			url: path + '/pack/saveKnowledge?adminName='+adminName,
			layout: 'anchor',
			defaults: {
				anchor: '80%',
				labelAlign: 'right',
				labelWidth: 100,
				blankText: '必填项'
			},
			// The fields
			defaultType: 'textfield',
			items: [{
				name: 'id',
				hidden: true
			},{
				fieldLabel: '知识包id',
				name: 'packIdF',
				readonly: true,
				hidden: true
			},
				{
					fieldLabel: '标题',
					name: 'title',
					allowBlank: false
				},
				{
					fieldLabel: '内容',
					xtype: 'textarea',
					name: 'description',
					allowBlank: false,
					grow      : true
				},
				{
					fieldLabel: '内容图片地址',
					name: 'descPic',
					editable: false
				},
				{
					xtype: 'image',
					name: 'descPicSrc',
					id: 'descPicSrc',
					src:  Ext.BLANK_IMAGE_URL,
					width: 90,
					height: 180,
					renderTo: Ext.getBody(),
					style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);' //必不可少，否则IE下无法预览
				},
				{
					fieldLabel: '秒记忆',
					name: 'memo',
					xtype: 'textarea',
					allowBlank: false,
					grow      : true
				},
				{
					fieldLabel: '秒记忆图片地址',
					name: 'memoPic',
					editable: false
				}
				,
				{
					xtype: 'image',
					name: 'memoPicSrc',
					id: 'memoPicSrc',
					src:  Ext.BLANK_IMAGE_URL,
					width: 90,
					height: 180,
					renderTo: Ext.getBody(),
					style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);' //必不可少，否则IE下无法预览
				}
			]
		}),
		//覆盖图片的选择上传功能
		Ext.create('Ext.form.Panel', {
			url: path + '/upload/pic',
			width: 560,
			height: 27,
			layout: 'hbox',
			id: 'picUploadForm',
			items: [
				{
					fieldLabel: '上传内容图片:',
					labelWidth: 100,
					labelAlign: 'right',
					xtype: 'textfield',
					width: 320,
					margin: '0 5 0 0',
					id: 'picText',
					readOnly: true
				},{
					xtype: 'filefield',
					buttonText: '浏览',
					name: 'picFile',
					buttonOnly: true,
					listeners: {
						change: function(fileField, string, eOpts){
							Ext.getCmp('picText').setValue(string);
							Ext.getCmp('picUploadBtn').setDisabled(false);
						}
					}
				},{
					xtype: 'button',
					id: 'picUploadBtn',
					text: '上传',
					disabled: true,
					margin: '0 0 0 10',
					handler: function(){
						Ext.getCmp('picUploadForm').getForm().submit({
							waitTitle: '系统提示',
							waitMsg: '图片上传中，请稍候......',
							success: function(form, action){
								Ext.getCmp('picUploadBtn').setDisabled(true);
								Ext.getCmp('knowledgeForm').getForm().findField('descPic').setValue(action.result.msg);
								Ext.getCmp('descPicSrc').setSrc(action.result.msg);
								Ext.Msg.alert('系统提示', '图片上传成功！');
							}
						});
					}
				}
			]
		}),
		//覆盖图片的选择上传功能
		Ext.create('Ext.form.Panel', {
			url: path + '/upload/memo',
			width: 560,
			height: 27,
			layout: 'hbox',
			id: 'memoUploadForm',
			items: [
				{
					fieldLabel: '上传妙记图片',
					labelWidth: 100,
					labelAlign: 'right',
					xtype: 'textfield',
					width: 320,
					margin: '0 5 0 0',
					id: 'memoText',
					readOnly: true
				},{
					xtype: 'filefield',
					buttonText: '浏览',
					name: 'memoFile',
					buttonOnly: true,
					listeners: {
						change: function(fileField, string, eOpts){
							Ext.getCmp('memoText').setValue(string);
							Ext.getCmp('memoUploadBtn').setDisabled(false);
						}
					}
				},{
					xtype: 'button',
					id: 'memoUploadBtn',
					text: '上传',
					disabled: true,
					margin: '0 0 0 10',
					handler: function(){
						Ext.getCmp('memoUploadForm').getForm().submit({
							waitTitle: '系统提示',
							waitMsg: '图片上传中，请稍候......',
							success: function(form, action){
								Ext.getCmp('memoUploadBtn').setDisabled(true);
								Ext.getCmp('knowledgeForm').getForm().findField('memoPic').setValue(action.result.msg);
								Ext.getCmp('memoPicSrc').setSrc(action.result.msg);
								Ext.Msg.alert('系统提示', '图片上传成功！');
							}
						});
					}
				}
			]
		})
	],
	buttons: [
		{
			text: '保存',
			handler: function () {
				var knowledgeForm = Ext.getCmp('knowledgeForm').getForm();
				if (!knowledgeForm.isValid()) {
					return;
				}

				knowledgeForm.submit({
					waitTitle: '系统提示',
					waitMsg: '保存中......',
					success: function (form, action) {
						if (!action.result.success) {
							Ext.Msg.alert('系统提示', action.result.msg);
						} else {
							Ext.getCmp('knowledgeWin').hide();
							southPanel.getStore().reload();
							Ext.Msg.alert('系统提示', '保存成功！');
						}
					},
					failure: function (form, action) {
						Ext.Msg.alert('系统提示', action.result.msg);
					}
				});
			}
		}, {
			text: '取消',
			handler: function () {
				knowledgePop.hide();
			}
		}
	]
});

var southStore = Ext.create('Ext.data.JsonStore', {
	storeId: 'southStore',
	pageSize: itemsPerPage, // 每页显示条数
	fields: ['id', 'packId', 'name', 'title', 'description', 'descPic', 'memo', 'memoPic'],
	proxy: {
		type: 'ajax',
		url: path + '/pack/packKnowledge',
		reader: {
			type: 'json',
			totalProperty: 'result',
			root: 'rows'
		}
	}
});

var centerPanel = Ext.create('Ext.grid.Panel', {
	region: 'center',
	title: '知识包列表',
	columns: [
		{header: '知识包ID', dataIndex: 'id', width: 100, sortable: true},
		{header: '知识包名称', dataIndex: 'name', width: 100},
		{header: '知识包类型', dataIndex: 'type', width: 200},
		{header: '知识包描述', dataIndex: 'description', width: 100},
		{header: '知识包添加人', dataIndex: 'createBy', width: 100},
		{header: '知识包添加时间', dataIndex: 'createTime', width: 200, renderer: function (value) {
			var now = new Date(parseInt(value));
			return now.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
		}}
	],
	selModel: {
		listeners: {
			select: function (rowModel, record, index, eOpts) {
				southPanel.getStore().load({params: {packid: record.data.id}});
			}
		},
		mode: 'MULTI'
	},
	store: Ext.create('Ext.data.JsonStore', {
		autoLoad: true,
		storeId: 'centerStore',
		pageSize: 6, // 每页显示条数
		fields: ['id', 'name', 'type', 'description', 'createBy', 'createTime'],
		proxy: {
			type: 'ajax',
			url: path + '/pack/list',
			reader: {
				type: 'json',
				totalProperty: "result",
				root: 'rows'
			}
		}
	}),
	tbar: [
		{
			xtype: 'button',
			text: '增加知识包',
			handler: function () {
				Ext.getCmp('packForm').getForm().reset();
				packPop.setTitle('增加知识包');
				packPop.show();
			}
		},
		{
			xtype: 'button',
			text: '修改知识包',
			handler: function () {
				var models = centerPanel.getSelectionModel().getSelection();
				if (models.length <= 0) {
					Ext.Msg.alert('系统提示', '请选择要编辑的数据');
					return;
				}
				packPop.setTitle('编辑');
				packPop.show();
				Ext.getCmp('packForm').loadRecord(models[0]);
			}

		},
		{
			xtype: 'button',
			text: '删除知识包',
			handler: function () {
				var pack = centerPanel.getSelectionModel().getSelection();
				if (pack.length == 0) {
					Ext.Msg.alert('系统提示', '请选择要删除的知识包。');
					return;
				}
				Ext.Msg.confirm('系统提示', '您确认要删除吗?', function (option) {
					if ('yes' === option) {
						Ext.Ajax.request({
							url: path + '/pack/delPack?id=' + pack[0].data.id,
							scope: this,
							async: true,
							success: function (response, options) {
								Ext.Msg.alert('系统提示', Ext.decode(response.responseText).msg);
								centerPanel.getStore().reload();
								southPanel.getStore().reload();
							},
							failure: function (form, action) {
								Ext.Msg.alert('系统提示', action.result.msg);
							}
						});
					}
				});
			}
		}
	],
	bbar: Ext.create('Ext.toolbar.Paging', {
		store: Ext.data.StoreManager.get('centerStore'),
		displayInfo: true,
		displayMsg: '第{0}-{1}条，共{2}条',
		emptyMsg: "没有数据",
		beforePageText: '第',
		afterPageText: '页，共 {0} 页'
	})
});

var southPanel = Ext.create('Ext.grid.Panel', {
	region: 'south',
	title: '知识点列表',
	height: 370,
	split: true,
	collapsible: true,
	columns: [
		{header: '知识包ID', align: 'center', width: 100, dataIndex: 'packId'},
		{header: '知识点ID', align: 'center', width: 100, dataIndex: 'id'},
		{header: '知识点名称', align: 'center', width: 200, dataIndex: 'name', hidden:true},
		{header: '标题', align: 'center', width: 200, dataIndex: 'title'},
		{header: '内容', align: 'center', width: 200, dataIndex: 'description'},
		{header: '内容图片地址', align: 'center', width: 200, dataIndex: 'descPic'},
		{header: '秒记忆', align: 'center', width: 200, dataIndex: 'memo'},
		{header: '秒记忆图片地址', align: 'center', width: 200, dataIndex: 'memoPic'}
	],
	store: southStore,
	tbar: [
		{	//计划列表表头添加按钮
			xtype: 'button',
			text: '增加知识点',
			handler: function () {
				var records = centerPanel.getSelectionModel().getSelection();
				if (records.length == 0) {
					Ext.Msg.alert('系统提示', '请选择知识包');
					return;
				}
				_packid = records[0].data.id;
				Ext.getCmp('knowledgeForm').getForm().reset();
				Ext.getCmp('knowledgeWin').setTitle('添加');
				Ext.getCmp('knowledgeWin').show();
				Ext.getCmp('knowledgeForm').getForm().findField('packIdF').setValue(_packid);
			}
		},
		{
			xtype: 'button',
			text: '修改知识点',
			handler: function () {
				var models = southPanel.getSelectionModel().getSelection();
				if (models.length <= 0) {
					Ext.Msg.alert('系统提示', '请选择要编辑的数据');
					return;
				}
				knowledgePop.setTitle('编辑');
				knowledgePop.show();
				Ext.getCmp('knowledgeForm').loadRecord(models[0]);
				Ext.getCmp('descPicSrc').setSrc(models[0].data.descPic);
				Ext.getCmp('memoPicSrc').setSrc(models[0].data.memoPic);
			}

		}, {
			xtype: 'button',
			text: '删除知识点',
			handler: function () {
				var records = southPanel.getSelectionModel().getSelection();
				if (records.length == 0) {
					Ext.Msg.alert('系统提示', '请选择要删除的知识点。');
					return;
				}
				Ext.Msg.confirm('系统提示', '您确认要删除吗?', function (option) {
					if ('yes' === option) {
						Ext.Msg.confirm('系统提示', '删除知识点将会同时删除该知识点在所有学生下的关联,且无法恢复,是否一定需要删除?', function (option) {
							if ('yes' === option) {
								Ext.Ajax.request({
									url: path + '/pack/delKnowledge?id=' + records[0].data.id,
									scope: this,
									async: true,
									success: function (response, options) {
										Ext.Msg.alert('系统提示', Ext.decode(response.responseText).msg);
										centerPanel.getStore().reload();
										southPanel.getStore().reload();
									},
									failure: function (form, action) {
										Ext.Msg.alert('系统提示', action.result.msg);
									}
								});
							}
						})
					}
				});
			}
		},
		'-',
		{
			xtype: 'textfield',
			fieldLabel: '标题',
			name: 'kTitle',
			id: 'kTitle'
		},
		{
			xtype: 'button',
			text: '查询',
			handler: function () {
				southPanel.getStore().load({url: path + '/pack/getKnowledge',
					params: {title: Ext.getCmp('kTitle').getValue()}});
				southPanel.clearValue();
			}
		}
	],
	bbar: Ext.create('Ext.toolbar.Paging', {
		store: southStore,
		displayInfo: true,
		displayMsg: '第{0}-{1}条，共{2}条',
		emptyMsg: "没有数据",
		beforePageText: '第',
		afterPageText: '页，共 {0} 页'
	})
});

southStore.on("beforeload",function(){
	var records = centerPanel.getSelectionModel().getSelection();
	if (records.length == 0) {
		Ext.Msg.alert('系统提示', '请选择班级');
		return;
	}
	Ext.apply(southStore.proxy.extraParams, {packid : records[0].data.id});
});

//domReady
Ext.onReady(function () {
	Ext.create('Ext.container.Viewport', {
		layout: 'border',
		items: [centerPanel, southPanel]
	});
});