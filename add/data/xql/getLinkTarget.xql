xquery version "3.0";
(:
  Edirom Online
  Copyright (C) 2011 The Edirom Project
  http://www.edirom.de

  Edirom Online is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Edirom Online is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Edirom Online.  If not, see <http://www.gnu.org/licenses/>.

  ID: $Id: getLinkTarget.xql 1334 2012-06-14 12:40:33Z daniel $
:)

import module namespace eutil="http://www.edirom.de/xquery/util" at "../xqm/util.xqm";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";

declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";

import module namespace functx = "http://www.functx.com" at "../xqm/functx-1.0-nodoc-2007-01.xq";

declare function local:getViews($type, $docUri, $doc) {
    
    string-join((
        (: SummaryView :)
        if($type != 'html') then(concat("{type:'summaryView',uri:'", $docUri, "'}")) else(),
        
        (: HeaderView :)
        if($doc//mei:meiHead or $doc//tei:teiHeader) then(concat("{type:'headerView',uri:'", $docUri, "'}")) else(),

        (: SourceDescriptionView :)
        if($doc//mei:annot[@type='descLink']) then(concat("{type:'textView', label: 'Quellenbeschreibung', uri:'", ($doc//mei:annot[@type='descLink'])[1]/@plist, "'}")) else(),
        
        (: SourceView :)
        if($doc//mei:facsimile//mei:graphic[@type='facsimile']) then(concat("{type:'sourceView',uri:'", $docUri, "'}")) else(),

        (: AudioView :)
        if($doc//mei:recording) then(concat("{type:'audioView', defaultView:true, uri:'", $docUri, "'}")) else(),

		(: VerovioView :)
        if($doc//mei:body//mei:measure) then(concat("{type:'verovioView',uri:'", $docUri, "'}")) else(),

        (: TextView :)
        if($doc//tei:body[matches(.//text(), '[^\s]+')]) then(concat("{type:'textView',uri:'", $docUri, "'}")) else(),

        (: SourceView :)
        if($doc//tei:facsimile//tei:graphic) then(concat("{type:'facsimileView', uri:'", $docUri, "'}")) else(),

        (: TextFacsimileSplitView :)
        if($doc//tei:facsimile//tei:graphic and $doc//tei:pb[@facs]) then(concat("{type:'textFacsimileSplitView', uri:'", $docUri, "'}")) else(),

        (: AnnotationView :)
        if($doc//mei:annot[@type='editorialComment']) then(concat("{type:'annotationView',uri:'", $docUri, "'}")) else(),
        
        (: SearchView :)
(:        if($doc//mei:note) then(concat("{type:'searchView',uri:'", $docUri, "'}")) else(),
:)

        (: iFrameView :)
        if($type = 'html') then(concat("{type:'iFrameView', label: '", $doc//head/data(title) ,"' ,uri:'", $docUri, "'}")) else(),
        
        (: XmlView :)
        concat("{type:'xmlView',uri:'", $docUri, "'}"),

        (: SourceDescriptionView :)
        if($doc//mei:annot[@type='descLink']) then(concat("{type:'xmlView', label: 'XML Quellenbeschreibung', uri:'", ($doc//mei:annot[@type='descLink'])[1]/@plist, "'}")) else()
    ), ',')
};

declare function local:getMdivUri($uri) {
    (:xmldb:exist://mdivLink-litiganti-Bs_Sinfonia_AllegroAssai_D:)
    let $sourceSigle := substring-before(substring-after($uri, '-'), '_')
    let $mdivLabel := substring-after($uri, '_')
    let $sourceUri := if($sourceSigle = 'litiganti-Dd1')
                    then('xmldb:exist:///db/contents/sources/edirom_source_e14f6dee-7956-4f27-85e9-dc28e2eeed83.xml')
                    else if($sourceSigle = 'litiganti-Dd2')
                    then('xmldb:exist:///db/contents/sources/edirom_source_70d463e5-682a-40b3-9687-d44f3ab50a7d.xml')
                    else if($sourceSigle = 'litiganti-Pa')
                    then('xmldb:exist:///db/contents/sources/edirom_source_35eecc80-abf9-42e5-aae5-361e1b66aedb.xml')
                    else if($sourceSigle = 'litiganti-Ps1')
                    then('xmldb:exist:///db/contents/sources/edirom_source_906a653b-2fcd-4f4e-8bde-074cdc0b494a.xml')
                    else if($sourceSigle = 'litiganti-Bo')
                    then('xmldb:exist:///db/contents/sources/edirom_source_467dac82-7005-404e-b5b7-7a8b85e16b4f.xml')
                    else if($sourceSigle = 'litiganti-Wf')
                    then('xmldb:exist:///db/contents/sources/edirom_source_2566d354-1ea3-4e44-bcd8-375b5ed0ecef.xml')
                    else if($sourceSigle = 'litiganti-Pb')
                    then('xmldb:exist:///db/contents/sources/edirom_source_ef5471f4-3883-4408-8e53-a4ccd8d7f2d4.xml')
                    else if($sourceSigle = 'litiganti-Sn')
                    then('xmldb:exist:///db/contents/sources/edirom_source_e372ebe5-a7d7-4102-b929-392cbe9b281c.xml')
                    else if($sourceSigle = 'litiganti-Na')
                    then('xmldb:exist:///db/contents/sources/edirom_source_7f79745f-89d9-49ff-9068-baf64d85ef09.xml')
                    else if($sourceSigle = 'litiganti-Wn2')
                    then('xmldb:exist:///db/contents/sources/edirom_source_7b3e39b7-efda-4c7e-95e6-4169a5d36b7e.xml')
                    else if($sourceSigle = 'litiganti-Ps2')
                    then('xmldb:exist:///db/contents/sources/edirom_source_050ec62a-3d07-4e20-9360-a4db0d02b833.xml')
                    else if($sourceSigle = 'litiganti-Ps3')
                    then('xmldb:exist:///db/contents/sources/')
                    else if($sourceSigle = 'litiganti-Bu')
                    then('xmldb:exist:///db/contents/sources/edirom_source_69c9e3b4-9c6f-4d31-86ac-853ccbc61307.xml')
                    else if($sourceSigle = 'litiganti-Rb')
                    then('xmldb:exist:///db/contents/sources/edirom_source_74a00b71-d211-4448-9dd1-13f21e286b21.xml')
                    else if($sourceSigle = 'litiganti-Wn1')
                    then('xmldb:exist:///db/contents/sources/edirom_source_93ad5ca3-3ef7-4716-b41a-0f78cf9fb51b.xml')
                    else if($sourceSigle = 'litiganti-Ff')
                    then('xmldb:exist:///db/contents/sources/edirom_source_732c8f2a-3e52-4bd6-9592-4c8a40f4a988.xml')
                    else if($sourceSigle = 'litiganti-Mu')
                    then('xmldb:exist:///db/contents/sources/edirom_source_8100f2f8-ec5d-4ea4-8355-604f3c134946.xml')
                    else if($sourceSigle = 'litiganti-Be1')
                    then('xmldb:exist:///db/contents/sources/edirom_source_4077a63c-edac-4748-9d7f-3a8e5fc419d0.xml')
                    else if($sourceSigle = 'litiganti-Be2')
                    then('xmldb:exist:///db/contents/sources/edirom_source_245ab816-6dd3-4d7d-acb7-39c1c131990f.xml')
                    else if($sourceSigle = 'litiganti-Bs')
                    then('xmldb:exist:///db/contents/sources/edirom_source_029a9945-b95d-439b-8f64-34d5a071ed28.xml')
                    (:
                        TODO: Kristin: für Sabino erweitern
                    else if($sourceSigle = 'litiganti-Bs')
                    then('xmldb:exist:///db/contents/sources/edirom_source_029a9945-b95d-439b-8f64-34d5a071ed28.xml'):)
                    else()
    let $source := doc($sourceUri)
    let $mdiv := $source//mei:mdiv[@label = $mdivLabel]
    let $zoneId := ($mdiv//mei:measure)[1]/string(@facs)
    let $zoneId := if(starts-with($zoneId, '#'))
                then(substring($zoneId, 2))
                else($zoneId)
    let $surface := $source/id($zoneId)/parent::mei:surface/string(@xml:id)
    return
        concat($sourceUri, '#', $surface)
};

let $uri := request:get-parameter('uri', '')
let $uri := if(starts-with($uri, 'xmldb:exist://mdivLink-'))then(local:getMdivUri($uri))else($uri)

let $uriParams := if(contains($uri, '?')) then(substring-after($uri, '?')) else('')
let $uri := if(contains($uri, '?')) then(replace($uri, '[?&amp;](term|path)=[^&amp;]*', '')) else($uri)
let $docUri := if(contains($uri, '#')) then(substring-before($uri, '#')) else($uri)
let $internalId := if(contains($uri, '#')) then(substring-after($uri, '#')) else()
let $internalIdParam := if(contains($internalId, '?')) then(concat('?', substring-after($internalId, '?'))) else('')
let $internalId := if(contains($internalId, '?')) then(substring-before($internalId, '?')) else($internalId)

let $term := if(contains($uriParams, 'term='))then(substring-after($uriParams, 'term='))else()
let $term := if(contains($term, '&amp;'))then(substring-before($term, '&amp;'))else($term)

let $path := if(contains($uriParams, 'path='))then(substring-after($uriParams, 'path='))else()
let $path := if(contains($path, '&amp;'))then(substring-before($path, '&amp;'))else($path)

let $doc := eutil:getDoc($docUri)
let $internal := $doc/id($internalId)

(: Specific handling of virtual measure IDs for parts in OPERA project :)
let $internal := if(exists($internal))then($internal)else(
                        if(starts-with($internalId, 'measure_') and $doc//mei:parts)
                        then(
                            let $mdivId := functx:substring-before-last(substring-after($internalId, 'measure_'), '_')
                            let $measureN := functx:substring-after-last($internalId, '_')
                            return
                                ($doc/id($mdivId)//mei:measure[@n eq $measureN])[1]
                        )
                        else($internal)
                    )

let $type := 
             (: Work :)
             if(exists($doc//mei:mei) and exists($doc//mei:work))
             then(string('work'))
             
             (: Recording :)
             else if(exists($doc//mei:mei) and exists($doc//mei:recording))
             then(string('recording'))
             
             (: Source / Score :)
             else if(exists($doc//mei:mei) and exists($doc//mei:source))
             then(string('source'))
             
             
             (: Text :)
             else if(exists($doc/tei:TEI))
             then(string('text'))
             
             (: HTML :)
             else if(exists($doc/html))
             then(string('html'))
             
             else(string('unknown'))
             
let $title := (: Work :)
              if(exists($doc//mei:mei) and exists($doc//mei:work))
              then(($doc//mei:work/mei:titleStmt)[1]/data(mei:title[1]))
              
              (: Recording :)
              else if(exists($doc//mei:mei) and exists($doc//mei:recording))
              then($doc//mei:fileDesc/mei:titleStmt[1]/data(mei:title[1]))

              (: Source / Score :)
              else if(exists($doc//mei:mei) and exists($doc//mei:source))
              then($doc//mei:source/mei:titleStmt[1]/data(mei:title[1]))
              
              (: Text :)
              else if(exists($doc/tei:TEI))
              then($doc//tei:fileDesc/tei:titleStmt/data(tei:title[1]))
              
              (: HTML :)
              else if($type = 'html')
              then($doc//head/data(title))
             
              else(string('unknown'))
              
let $internalIdType := if(exists($internal))
                       then(local-name($internal))
                       else('unknown')

return 
    concat("{",
          "type:'", $type, 
          "',title:'", $title, 
          "',doc:'", $docUri,
          "',views:[", local:getViews($type, $docUri, $doc), "]",
          ",internalId:'", $internalId, $internalIdParam, 
          "',term:'", $term,
          "',path:'", $path,
          "',internalIdType:'", $internalIdType, "'}")