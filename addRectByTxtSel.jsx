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

/**
 * makes frame around TextRange.textSelection
 * */
(function addRectByTxtSel () {
  var d  = activeDocument;
  var fr = d.textFrames[0];
  var re = /\s/gmi;

  var selStart = fr.textSelection[0].characterOffset - 1; // first selected character
  var selLen   = fr.textSelection[0].length // selection length
  var selEnd   = selLen + selStart - 1; // last selected character

  var fixSelLen = selLen;
  var selSpaces = fr.textSelection[0].contents.match (re);
  if (selSpaces) {
    fixSelLen = selLen - selSpaces.length;
  }

  /**
   // previous characters is now now needed, but maybe later
   var prev    = fr.textRange;
   prev.length = selStart;

   var prevSpaces = prev.contents.match (re);
   var fixPrevLen = prev.length - prevSpaces.length;
   */

  var past    = fr.textRange.characters[selEnd + 1];
  past.length = fr.contents.length - selEnd - 1;

  var fixPastLen = past.length;
  var pastSpaces = past.contents.match (re);
  if (pastSpaces) {
    fixPastLen = past.length - pastSpaces.length;
  }

  var frCurv      = (fr.duplicate ()).createOutline ();
  frCurv.selected = false;

  var selArr = [];

  for (var i = fixPastLen; i < fixPastLen + fixSelLen; i++) {
    var item = frCurv.pageItems[i];
    selArr.push (item);
  }

  var gr = d.activeLayer.groupItems.add ();

  for (var j = 0; j < selArr.length; j++) {
    var elem = selArr[j];
    elem.move (gr, ElementPlacement.INSIDE);
  }

  var marg         = 2;
  var col          = new CMYKColor ();
  col.magenta      = 100;
  col.yellow       = 100;
  var rect         = d.activeLayer.pathItems.rectangle (
    gr.position[1] + marg, gr.position[0] - marg, gr.width + marg * 2, gr.height + marg * 2);
  rect.filled      = false;
  rect.strokeColor = col;
  gr.remove ();
  frCurv.remove ();

} ());
