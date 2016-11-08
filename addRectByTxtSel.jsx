/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 08.11.2016
 *
 * https://forums.adobe.com/thread/2232244
 *
 * makes frame around TextRange.textSelection
 * */
//@target illustrator
(function addRectByTxtSel () {
  var d        = activeDocument,
      fr       = d.textFrames[0],
      re       = /\s/gmi,
      marg     = 2,
      col      = new CMYKColor (),

      selStart = fr.textSelection[0].characterOffset - 1, // first selected char
      selLen   = fr.textSelection[0].length, // text selection lenght
      selEnd   = selLen + selStart - 1, // last selected char

      fixSelLen, selSpaces,
      past, fixPastLen, pastSpaces,

      frCurv, gr, rect,
      selItems = [];

  col.magenta = 100;
  col.yellow  = 100;

  fixSelLen = selLen;
  selSpaces = fr.textSelection[0].contents.match (re);
  if (selSpaces) {
    fixSelLen = selLen - selSpaces.length;
  }

  past        = fr.textRange.characters[selEnd + 1];
  past.length = fr.contents.length - selEnd - 1;

  fixPastLen = past.length;
  pastSpaces = past.contents.match (re);
  if (pastSpaces) {
    fixPastLen = past.length - pastSpaces.length;
  }

  frCurv = (fr.duplicate ()).createOutline ();

  for (var i = fixPastLen; i < fixPastLen + fixSelLen; i++) {
    var obj1 = frCurv.pageItems[i];
    selItems.push (obj1);
  }

  gr = d.activeLayer.groupItems.add ();

  for (var j = 0; j < selItems.length; j++) {
    var obj2 = selItems[j];
    obj2.move (gr, ElementPlacement.INSIDE);
  }

  rect = d.activeLayer.pathItems.rectangle (
    gr.position[1] + marg, gr.position[0] - marg, gr.width + marg * 2, gr.height + marg * 2);

  rect.filled      = false;
  rect.strokeColor = col;
  gr.remove ();
  frCurv.remove ();

} ());
