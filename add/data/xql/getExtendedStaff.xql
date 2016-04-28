xquery version "3.0";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";

declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

let $uri := request:get-parameter('uri', '')
let $movId := request:get-parameter('movId', '')

let $source := doc($uri)/mei:mei
let $sourceId := $source/string(@xml:id)
let $sourceId := if($sourceId = 'edirom_source_31d11f53-3427-40fc-b7cd-5bc9270d4f70')
                    then('sabino/DR_Wn') (: sabino :)
                    else if($sourceId = 'edirom_source_75afe354-9f64-4696-8fda-6b7e3dbecbf4')
                    then('sabino/DR_Lo') (: sabino :)                    
                    else if($sourceId = 'edirom_source_7d14fb6f-d015-4e80-b41b-637336f45ac3')
                    then('sabino/Wn1') (: sabino :)                    
                    else if($sourceId = 'edirom_source_f75b1ee8-594e-4a40-af26-7bf64bc3a5c3')
                    then('sabino/Lo') (: sabino :)                    
                    else if($sourceId = 'edirom_source_029a9945-b95d-439b-8f64-34d5a071ed28')
                    then('litiganti/DR_Bs') (: litiganti :)                    
                    else if($sourceId = 'edirom_source_69c9e3b4-9c6f-4d31-86ac-853ccbc61307')
                    then('litiganti/Bu') (: litiganti :)                    
                    else if($sourceId = 'edirom_source_e372ebe5-a7d7-4102-b929-392cbe9b281c')
                    then('litiganti/Sn') (: litiganti :)                    
                    else if($sourceId = 'edirom_source_93ad5ca3-3ef7-4716-b41a-0f78cf9fb51b')
                    then('litiganti/Wn1') (: litiganti :)                    
                    else('')
let $movLabel := $source/id($movId)/string(@label)
let $encodingUri := concat('/exist/rest/db/contents/encoding/', $sourceId, '_', $movLabel, '.xml')

return
<html>	
    <head>   	
        <title></title>
    	<!-- **VEROVIO** -->
    	<script src="../../resources/verovio/verovio-toolkit-0.9.10-dev-215f725-256Mb.js" type="text/javascript" charset="utf-8"></script>
    	
    	<!-- **JQUERY** -->
    	<script type="text/javascript" src="../../resources/jquery/jquery-2.1.3.js"  charset="utf-8"></script> 
    </head>
	<body>
        <div id="output"/>		 
	</body>	
	<script type="text/javascript">
		vrvToolkit = new verovio.toolkit();
	 	var verovioData;
	 	
	 	var initHeight = $(document).height()* 100 / 33;
	 	var initWidth = $(document).width()* 100 / 33;
	 	
                $.ajax({{
                    url: '{$encodingUri}'
                    ,async: false
                    , dataType: "text"
                    , success: function(data) {{
                        verovioData = data; 
                		allPages();               		
                    }}
                }});
                
                function allPages(){{
                	var options = JSON.stringify({{
                			scale: 33,
							noLayout: 0,
							pageHeight: initHeight,
							pageWidth: initWidth,
							adjustPageHeight: 1
                		}});
                		vrvToolkit.setOptions( options );
                		vrvToolkit.loadData(verovioData);
                		numberPages = vrvToolkit.getPageCount();
                		var svg = vrvToolkit.renderPage(1, options);
						for (i = 2; i !== vrvToolkit.getPageCount()+1; i++) {{
							svg = svg + vrvToolkit.renderPage(i, options);
						}}
                		$("#output").html(svg);
                }}
            
	 	function loadPage(pageNr){{
	 		var options = JSON.stringify({{
                			scale: 33,
							noLayout: 0,
							pageHeight: initHeight,
							pageWidth: initWidth,
							adjustPageHeight: 1
                		}});
                		vrvToolkit.setOptions( options );
                		vrvToolkit.loadData(verovioData);
                		var svg = vrvToolkit.renderPage(pageNr, "");
                		$("#output").html(svg);
                		return numberPages;
	 	}}
	 	
	 	
	 	function loadContinuousHight(){{
	 		var pageHeight_1 = $(document).height();
						var pageWidth_1 = $(document).width();
						var options = JSON.stringify({{
							scale: 33,
							pageHeight: pageHeight_1,
							pageWidth: pageHeight_1
						}});
						vrvToolkit.setOptions(options);
						vrvToolkit.redoLayout();		
						var svg = vrvToolkit.renderPage(1, options);
						for (i = 2; i !== vrvToolkit.getPageCount()+1; i++) {{
							svg = svg + vrvToolkit.renderPage(i, options);
						}}
						$("#output").html(svg);
	 	}}
	 	
	 	function loadContinuousWidth(){{
	 		var options = JSON.stringify({{
							scale: 33,
							noLayout: 1
						}});
						vrvToolkit.setOptions(options);
						vrvToolkit.loadData(verovioData);
						var svg = vrvToolkit.renderPage(1, options);
						$("#output").html(svg);
			 
	 	}}
	  	
		</script>		
</html>