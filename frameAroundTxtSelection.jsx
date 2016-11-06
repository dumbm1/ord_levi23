/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 07.11.2016
 *
 * https://forums.adobe.com/thread/2232244
 * draw rectangle arround a textRange or textSelection
 * outline alogorithm:
 * * find the numbers of the needed characters
 * * copy the text frame
 * * make it curves
 * * find the desired paths by numbers
 * * edit (e.g., add a frame around)
 * * remove the copy
 */

  // make document and txt frame with content "Please avoid questions",
  // then copy this and make curves
  // uncommented one of the commeted blocks
  // after that run script

var d= activeDocument;

/*
// block 1
var fr =  d.textFrames[0];
var re = /avoid/;
var res = fr.contents.match(re);
var index = res.index;
fr.characters[index].select();
var len = res[0].length;
fr.characters[index + len - 1].select(true);
*/

/*
// block 2
 var index = 6;
 var len = 5;
 var gr = d.groupItems[0];

 for (var i = gr.pageItems.length -  index - len; i < gr.pageItems.length  - index; i++){
 var item = gr.pageItems[i];
 item.selected  = true;
 }*/