/**
 *  Edirom Online
 *  Copyright (C) 2014 The Edirom Project
 *  http://www.edirom.de
 *
 *  Edirom Online is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Edirom Online is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Edirom Online.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.define('EdiromOnline.controller.window.source.VerovioView', {
	
	extend: 'Ext.app.Controller',
	
	views:[
	'window.source.VerovioView'],
	
	init: function () {
		this.control({
			'verovioView': {
				afterlayout: this.onSourceViewRendered,
				single: true
			}
		});
	},
	
	onSourceViewRendered: function (view) {
		var me = this;
		
		if (view.initialized) return;
		view.initialized = true;
		
		view.on('gotoMovement', me.onGotoMovement, me);

		Ext.Ajax.request({
            url: 'data/xql/getMovements.xql',
            method: 'GET',
            params: {
                uri: view.uri
            },
            success: function(response){
                var data = response.responseText;

                var movements = Ext.create('Ext.data.Store', {
                    fields: ['id', 'name'],
                    data: Ext.JSON.decode(data)
                });

                me.movementsLoaded(movements, view);
            }
        });
	},
	
    movementsLoaded: function(movements, view) {
        view.setMovements(movements);
    },
    
    onGotoMovement: function(view, movId) {
        view.setIFrameURL('data/xql/getExtendedStaff.xql?uri=' + view.uri + "&movId=" + movId);
    },
    
    pagesLoaded: function (text, view) {
		view.setImageSet(text);
	}
});