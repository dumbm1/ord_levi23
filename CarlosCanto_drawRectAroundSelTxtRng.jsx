//@target illustrator-19

// drawRectangleAroundSelectedTextRange  
// CarlosCanto  
// https://forums.adobe.com/thread/2232244  
  
  
function main () {  
     
    var idoc = app.activeDocument;  
    var sel = idoc.selection;  
  
  
    if (sel.typename == "TextRange") {  
        var iframe = sel.parent.textFrames[0];  
        var dup = iframe.duplicate();  
         
        var range = sel;  
        var rl = range.length;  
         
        var story = range.story.textRange.contents;  
        var sl = story.length;  
  
  
        var rangeStart = range.characterOffset-1; // 1 based  
        var rangeEnd = rangeStart+rl;  
         
        var chars = range.story.textRange.characters;  
         
        // remove from end of selected range to end of story  
        if (rangeEnd < sl) {  
            var delrange = chars[rangeEnd];  
            delrange.length = sl-(rangeEnd);  
            delrange.remove();  
        }  
         
        // remove from beginning of story to beginning of selected range  
        var dup2 = iframe.duplicate();  
      delrange = dup2.characters[0];  
      delrange.length = rangeStart;  
      delrange.remove();  
       
      // remove range itself to get the first part of the text frame  
      range.remove();  
       
      dup2.position = [iframe.position[0]+iframe.width, iframe.position[1]];  
       
      // make outlines and draw rectangle  
      var igroup = dup2.createOutline();  
      var margins = 1.5;  
      var ipath = idoc.pathItems.rectangle(igroup.top+margins, igroup.left-margins, igroup.width+margins*2, igroup.height+margins*2);  
      ipath.filled = false;  
      ipath.stroked = true;  
      ipath.move(dup, ElementPlacement.PLACEBEFORE);  
       
      // remove duplicates  
      igroup.remove();  
      iframe.remove();  
    }  
  
  
    else {  
        alert('Select a Text Range and try again');  
    }  
}  
main ();  