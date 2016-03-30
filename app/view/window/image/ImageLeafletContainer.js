Ext.define('EdiromOnline.view.window.image.ImageLeafletContainer', {
	extend: 'Ext.panel.Panel',
	
	requires: [
        'Ext.layout.container.HBox'
    ],
    xtype: 'layout-horizontal-box',

	layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },

border:true
/*
	width: 500,
    height: 400,
    
    bodyPadding: 10,*/
    
   /* defaults: {
        frame: true,
        bodyPadding: 10
    }
	*/
	/*initComponent: function () {
		
		//this.ceTabView = new pmdCE.view.tabPanel.CETabPanel(),
		
		this.items =[],
		this.callParent();
	}*/
});