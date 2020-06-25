import * as go from 'gojs';


import Utils from '../Helpers/Utils';
import Toast from './Toast';

export default class GojsManager
{
    constructor(diagram, diagramEditor)
    {
        this.diagram = diagram;
        this.diagramEditor = diagramEditor;
    }

    overrideResizeToNotMoveChildInGroup() {
        this.diagram.toolManager.resizingTool.resize = function(newr) {
          var diagram = this.diagram;
          if (diagram === null) return;
          var obj = this.adornedObject;
          var part = obj.part;
    
          // calculate new location
          var angle = obj.getDocumentAngle();
          var sc = obj.getDocumentScale();
    
          var radAngle = Math.PI * angle / 180;
          var angleCos = Math.cos(radAngle);
          var angleSin = Math.sin(radAngle);
    
          var angleRight = (angle > 270 || angle < 90) ? 1 : 0;
          var angleBottom = (angle > 0 && angle < 180) ? 1 : 0;
          var angleLeft = (angle > 90 && angle < 270) ? 1 : 0;
          var angleTop = (angle > 180 && angle < 360) ? 1 : 0;
    
          var deltaWidth = newr.width - obj.naturalBounds.width;
          var deltaHeight = newr.height - obj.naturalBounds.height;
    
          var pos = part.position.copy();
          pos.x += sc * ((newr.x + deltaWidth * angleLeft) * angleCos - (newr.y + deltaHeight * angleBottom) * angleSin);
          pos.y += sc * ((newr.x + deltaWidth * angleTop) * angleSin + (newr.y + deltaHeight * angleLeft) * angleCos);
    
          obj.desiredSize = newr.size;
          go.Node.prototype.move.call(part, pos);
        }
      }
  
      overridePasteSelectionHandleVNetSubnetPasteInGroup() {
        
        this.diagram.commandHandler.copySelection = function() {
          
          var items = this.diagram.selection;

          //if more than 1 selection, copy as usual, don't hinder paste
          if(items.count > 1) {
              this.diagram.commandHandler.copiedVIRAndSubnets = [];
              go.CommandHandler.prototype.copySelection.call(this.diagram.commandHandler);
            return;
          }

          if (items.count == 1) {  // only handles VIRs and subnets, rest copy/paste as usual
            
            var copiedVIRAndSubnets = [];

            var it = items.iterator;
            while(it.next()) {
              var part = it.value;
              if(Utils.isPartVIR(part) || Utils.isSubnet(part))
              copiedVIRAndSubnets.push(part);
            }

            if(copiedVIRAndSubnets.length > 0) {
              this.diagram.commandHandler.copiedVIRAndSubnets = copiedVIRAndSubnets;
              go.CommandHandler.prototype.copySelection.call(this.diagram.commandHandler);
            }
            else {
              this.diagram.commandHandler.copiedVIRAndSubnets = [];
              go.CommandHandler.prototype.copySelection.call(this.diagram.commandHandler);
            }
              
          } else {  // otherwise just copy nodes and/or links, as usual
            this.diagram.commandHandler.copiedVIRAndSubnets = [];
            go.CommandHandler.prototype.copySelection.call(this.diagram.commandHandler);
          }
        }

        var diagram = this.diagram;
        var diagramEditor = this.diagramEditor;
        //paste
        this.diagram.commandHandler.pasteSelection = function() {

          var itemClipboard = this.diagram.commandHandler.copiedVIRAndSubnets;

          if(itemClipboard == undefined) {
            go.CommandHandler.prototype.pasteSelection.call(this.diagram.commandHandler);
            return;
          }

          if(itemClipboard.length == 0) {
            go.CommandHandler.prototype.pasteSelection.call(this.diagram.commandHandler);
            return;
          }

          var pasteTarget = this.diagram.selection.first();  // assumes a single node is selected, may need to be changed
          
          if (itemClipboard && itemClipboard.length > 0) {
            
            this.diagram.startTransaction("paste items");

            for(var copiedPart of itemClipboard) {

              if(Utils.isPartVIR(copiedPart) && !Utils.isSubnet(pasteTarget)) {
                Toast.show('warning', 3000, 'Select a Subnet to paste into');
                return;
              }
              
              if(Utils.isSubnet(copiedPart) && !Utils.isVNet(pasteTarget)) {
                Toast.show('warning', 3000, 'Select a VNet to paste into');
                return;
              }
               
              if(Utils.isPartVIR(copiedPart)) {
                diagramEditor.createVIROntoSubnet({
                  resourceType: Utils.getAzContextResourceType(copiedPart),
                  azcontext: Utils.deepClone(copiedPart.data.azcontext)
                });
                continue;
              }

              if(Utils.isSubnet(copiedPart)) {
                var childVIRs = copiedPart.memberParts;
                var newSubnetKey = Utils.uniqueId('subnet');
                var vnetKey = pasteTarget.key;

                diagramEditor.createSubnet(vnetKey, newSubnetKey);

                childVIRs.each(function(part) {
                  diagramEditor.createVIROntoSubnet({
                    subnetNode: diagram.findNodeForKey(newSubnetKey),
                    resourceType: Utils.getAzContextResourceType(part),
                    azcontext: Utils.deepClone(part.data.azcontext)
                  });
                });

                continue;
              }
              
              //paste all non VIRs and Subnets normally
              go.CommandHandler.prototype.pasteSelection.call(this.diagram.commandHandler);
            }

            this.diagram.commitTransaction("paste items");

          } else {  // otherwise just paste nodes and/or links, as usual
            go.CommandHandler.prototype.pasteSelection.call(this.diagram.commandHandler);
          }
        }
      }
}