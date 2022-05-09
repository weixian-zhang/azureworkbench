
import * as go from 'gojs';

export default function MakeVIRResourceStayInSubnet(part, pt, gridpt) {

    // don't constrain top-level nodes
    var grp = part.containingGroup;
    if (grp === null) return pt;
    // try to stay within the background Shape of the Group
    var back = grp.resizeObject;
    if (back === null) return pt;
    // allow dragging a Node out of a Group if the Shift key is down
    //if (part.diagram.lastInput.shift) return pt;
    var p1 = back.getDocumentPoint(go.Spot.TopLeft);
    var p2 = back.getDocumentPoint(go.Spot.BottomRight);
    var b = part.actualBounds;
    var loc = part.location ;
    // no placeholder -- just assume some Margin
    var m = new go.Margin(1);
    // now limit the location appropriately
    var x = Math.max(p1.x + m.left, Math.min(pt.x, p2.x - m.right - b.width - 1)) + (loc.x - b.x);
    var y = Math.max(p1.y + m.top, Math.min(pt.y, p2.y - m.bottom - b.height - 1)) + (loc.y - b.y);
    return new go.Point(x, y);
}