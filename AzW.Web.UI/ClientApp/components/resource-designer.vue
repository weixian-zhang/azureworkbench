<template>
    <v-container fluid class="pa-0 ma-0">
    
    <VMDialog ref="vmDialog"></VMDialog>

    <v-container fluid class="pa-0 ma-0">
        <v-layout right>
            <v-btn  color="info">Load</v-btn>
            <v-btn  color="info" @click="deploy">Deploy</v-btn>
        </v-layout>

        <svg id="designerCanvas" xmlns="http://www.w3.org/2000/svg" version="1.1"
                        width="100%" height="800" style="border:2px solid #000000; margin-left:48px">
                        viewBox="0 0 1024 768"
                        preserveAspectRatio="xMidYMid meet">
        </svg>
    </v-container>

    <!--rsource tool bar-->
    <v-navigation-drawer
            app
            clipped
            permanant
            enable-resize-watcher
            :mini-variant.sync="mini" 
            mini-variant-width=45
            style="margin-top: 66px">
                <v-flex right xs12>
                    <v-btn icon>
                        <v-icon v-if="!mini" @click="mini = true">chevron_left</v-icon>
                        <v-toolbar-side-icon v-if="mini==true" @click="mini = true"></v-toolbar-side-icon>
                    </v-btn>
                </v-flex>
                <v-container grid-list-md fluid v-if="!mini">
                    
                    <v-flex xs12 >
                        <v-subheader>Compute</v-subheader>
                        <v-divider></v-divider>
                    </v-flex>
                    <v-layout row wrap>
                        <v-flex md4 >
                            <button class="btn btn-default" v-on:click="paletteSetResourceToAdd('VM')">
                                <img :src="require('../assets/Azure/Compute/VirtualMachine.png')" width="40" height="40"/>
                                VM
                            </button>
                        </v-flex>

                        <v-flex md4>
                            <button class="btn btn-default" v-on:click="">
                                <img :src="require('../assets/Azure/Compute/VMScaleSet.png')" width="40" height="40"/>
                                VMSS
                            </button>
                        </v-flex>
                        <!--compute-->
                        <v-flex md4>
                            <button class="btn btn-default" v-on:click="">
                                <img :src="require('../assets/Azure/Compute/AKS.png')" width="40" height="40"/>
                                AKS
                            </button>
                        </v-flex>

                        <!--network-->
                        <v-flex xs12 >
                            <v-subheader>Network</v-subheader>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-layout row wrap >
                            <!--network-->
                            <v-flex md3>
                                <button class="btn btn-default" v-on:click="paletteSetResourceToAdd('VNet')">
                                    <img :src="require('../assets/Azure/Network/VNet.png')" width="40" height="40"/>
                                    VNet
                                </button>
                            </v-flex>
                            <v-flex md3>
                                <button class="btn btn-default" v-on:click="">
                                    <img :src="require('../assets/Azure/Network/VNet-Subnet.png')" width="40" height="40"/>
                                    Subnet
                                </button>
                            </v-flex>
                            <v-flex md3>
                                <button class="btn btn-default" v-on:click="">
                                    <img :src="require('../assets/Azure/Network/NLB.png')" width="40" height="40"/>
                                    NLB
                                </button>
                            </v-flex>
                            <v-flex md3>
                                <button class="btn btn-default" v-on:click="">
                                    <img :src="require('../assets/Azure/Network/UDR.png')" width="40" height="40"/>
                                    UDR
                                </button>
                            </v-flex>
                        </v-layout>

                        <!--storage-->
                        <v-flex xs12 >
                            <v-subheader>Storage</v-subheader>
                            <v-divider></v-divider>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-navigation-drawer>
    </v-container>
</template>


<script>
    import Vue from 'vue'
    import $ from 'jquery'
    import 'jquery-ui-dist/jquery-ui';
    import cuid from 'cuid';

    import { ProvisionContext } from './models/provision-context';
    import { ResourceIcon } from './models/resource-icon';
    import { ResourceTypes } from './models/resource-types';
    import { VMContext } from './models/vm-context';
    import { VNetContext } from './models/vnet-context';
    
    import {Urls} from './models/urls';

    import VMDialog from './dialogs/vm-dialog';

    var canvas = null;
    var resourceToAdd = null;
    var provisionContext = null;
    var urls = null;

    var vmDialog = null;

    export default {
        
        components: {
           VMDialog
        },

        name: 'ResourceDesigner',
        
        data () {
            return {
                drawer: null,
                mini: true
            }
        },

        mounted() {

            vmDialog = this.$refs.vmDialog;

            this.initCanvasEvents();

            provisionContext = ProvisionContext();

            urls = new Urls();
        },
        
        methods: {
            deploy: function(){
                var provisionContext = this.$store.getters.provisionContext;

                axios({
                    method: 'post',
                    url: '/provisioner/deploy',
                    data: {
                        provisionContext: provisionContext
                    },
                    validateStatus: (status) => {
                        return true; // I'm always returning true, you may want to do it depending on the status received
                    },
                    }).catch(error => {
                        console.log(error.message);
                    }).then(response => {
                        
                    });
            },

            paletteSetResourceToAdd(resourceType){

                switch (resourceType) {
                    case 'VM':
                       resourceToAdd = this.createNewVMResourceIcon();
                    break;
                    case 'VNet':
                        resourceToAdd = this.createNewVNetResourceIcon();
                    break;
                }

            },

            //for any resources creation other than VNet (mouse down)
            onCanvasClickAddResource(){
                if(resourceToAdd != null){
                    var iconWidth = 45, iconHeight = 45;
                    
                    resourceToAdd.x = d3.event.x;
                    resourceToAdd.y = d3.event.y -70;
                    resourceToAdd.labelX = resourceToAdd.x + (iconWidth / 2)
                    resourceToAdd.labelY = resourceToAdd.y + iconHeight + 10

                    switch (resourceToAdd.resourceType) {
                         case 'VM':
                            this.addVM(resourceToAdd);
                         break;
                         case 'VNet':
                            this.newVNet();
                        break;
                     }

                     resourceToAdd = null;
                }
            },

            dragstarted:function (icon) {
                d3.select("#" + icon.resourceIconId).classed("active", true);
            },
                
            dragged: function (icon) {

                d3.select('#' + icon.resourceIconId)
                    .attr("transform", "translate(" + d3.event.x + "," + d3.event.y + ")");
                //.attr("x", d3.event.x).attr("y", d3.event.y);
            },
                
            dragended: function (icon) {
               //update x , y in provisionContext -> vms -> [vm].x/y
            },

            addVM: function(vmIcon){

                //provisionContext.vms.push(vmIcon);

                var drag =  d3.drag()
                              .on("start", this.dragstarted)
                              .on("drag", this.dragged)
                              .on("end", this.dragended)

                var iconGroup = canvas.append('g')
                        .attr("id", vmIcon.resourceIconId)
                        .attr("x", vmIcon.x)
                        .attr("y", vmIcon.y)
                        .attr("width", 45)
                        .attr("height", 45)
                        
                    
                    iconGroup.append("image")
                        .attr("x", vmIcon.x)
                        .attr("y", vmIcon.y)
                        .attr("width", 45)
                        .attr("height", 45)
                        .attr("xlink:href", require("../assets/Azure/Compute/VirtualMachine.png"))
                    
                    var label = iconGroup.append("text")
                        .attr("x", parseInt(vmIcon.x, 10) + iconGroup.attr('width') /2)
                        .attr("y", parseInt(vmIcon.y, 10) + parseInt(iconGroup.attr('height'), 10) + 10)
                        .attr("text-anchor", "middle")
                        .style("fill", "steelblue")
                        .text("VM")

                    iconGroup.datum(vmIcon);

                    iconGroup
                        .on('contextmenu', d3.contextMenu(this.initializeVMIconContextMenu(vmIcon)));
                    

                    iconGroup.call(drag)
            },

            // addVNet: function(vnetIcon){
                
            //     canvas.append('rect')
            //     .attr("width", 70)
            //     .attr("height", 70)
            //     .attr("x", vnetIcon.x)
            //     .attr("y", vnetIcon.y)
            //     .attr("rx", 6)
            //     .attr("ry", 6)
            //     .style("fill", "none")
            //     .style("stroke", "blue") 
            
            // },

            newVNet: function(){
                
                //http://jsfiddle.net/dirtyd77/4Qm6A/7/

                var self = this, rect, rectData = [], isDown = false, m1, m2, isDrag = false;
                
                //on mouse down create rectangle
                canvas
                    .on('mousedown', function() {

                        m1 = d3.mouse(this);

                        if (!isDown && !isDrag) {
                            self.rectData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
                            self.rectangleElement = canvas.append('rect').attr('class', 'rectangle').call(dragR);
                            self.pointElement1 = canvas.append('circle').attr('class', 'pointC').call(dragC1);
                            self.pointElement2 = canvas.append('circle').attr('class', 'pointC').call(dragC2);            
                            self.pointElement3 = canvas.append('circle').attr('class', 'pointC').call(dragC3);
                            self.pointElement4 = canvas.append('circle').attr('class', 'pointC').call(dragC4);
                            updateRect();
                            isDrag = false;
                        } else { 
                            isDrag = true;
                        }
                        isDown = !isDown;  

                    })
                    //on mouse move resize rectangle
                    .on('mousemove', function() {

                        m2 = d3.mouse(this);
                        if(isDown && !isDrag) { 
                            self.rectData[1] = { x: m2[0], y: m2[1] };
                            updateRect();
                        } 

                    });


                //drag rectangle
                var dragRectangle = d3.behavior.drag().on('drag', dragRect);
                function dragRect() {
                    var e = d3.event;
                    for(var i = 0; i < self.rectData.length; i++){
                        d3.select(self.rectangleElement[0][0])
                            .attr('x', self.rectData[i].x += e.dx )
                            .attr('y', self.rectData[i].y += e.dy );
                    }
                    rect.style('cursor', 'move');
                    updateRect();
                }

                //resizable draggable points3
                var dragC1 = d3.behavior.drag().on('drag', dragPoint1);
                var dragC2 = d3.behavior.drag().on('drag', dragPoint2);
                var dragC3 = d3.behavior.drag().on('drag', dragPoint3);
                var dragC4 = d3.behavior.drag().on('drag', dragPoint4);
                
                function dragPoint1() {
                    var e = d3.event;
                    d3.select(self.pointElement1[0][0])
                        .attr('cx', function(d) { return d.x += e.dx })
                        .attr('cy', function(d) { return d.y += e.dy });        
                    updateRect();   
                }   
                
                function dragPoint2() {
                    var e = d3.event;
                    d3.select(self.pointElement2[0][0])
                        .attr('cx', self.rectData[1].x += e.dx )
                        .attr('cy', self.rectData[1].y += e.dy );
                    updateRect();   
                }   
                
                function dragPoint3() {
                    var e = d3.event;
                    d3.select(self.pointElement3[0][0])
                        .attr('cx', self.rectData[1].x += e.dx )
                        .attr('cy', self.rectData[0].y += e.dy );     
                    updateRect();   
                }   
                
                function dragPoint4() {
                    var e = d3.event;
                    d3.select(self.pointElement4[0][0])
                        .attr('cx', self.rectData[0].x += e.dx )
                        .attr('cy', self.rectData[1].y += e.dy );
                    updateRect();   
                }

                //update rectangle size based on drag points
                function updateRect() {  
                    rect = d3.select(self.rectangleElement[0][0]);
                    rect.attr({
                        x: self.rectData[1].x - self.rectData[0].x > 0 ? self.rectData[0].x :  self.rectData[1].x,
                        y: self.rectData[1].y - self.rectData[0].y > 0 ? self.rectData[0].y :  self.rectData[1].y,
                        width: Math.abs(self.rectData[1].x - self.rectData[0].x),
                        height: Math.abs(self.rectData[1].y - self.rectData[0].y)
                    });   
                    
                    var point1 = d3.select(self.pointElement1[0][0]).data(self.rectData);
                    point1.attr('r', 5)
                        .attr('cx', self.rectData[0].x)
                        .attr('cy', self.rectData[0].y);        
                    var point2 = d3.select(self.pointElement2[0][0]).data(self.rectData);
                    point2.attr('r', 5)
                        .attr('cx', self.rectData[1].x)
                        .attr('cy', self.rectData[1].y);
                    var point3 = d3.select(self.pointElement3[0][0]).data(self.rectData);
                    point3.attr('r', 5)
                        .attr('cx', self.rectData[1].x)
                        .attr('cy', self.rectData[0].y);        
                    var point3 = d3.select(self.pointElement4[0][0]).data(self.rectData);
                    point3.attr('r', 5)
                        .attr('cx', self.rectData[0].x)
                        .attr('cy', self.rectData[1].y);
                }
            },

            createNewVMResourceIcon: function() {
                
                var resourceIcon = new ResourceIcon();
                resourceIcon.resourceIconId = this.generateRandomStringId();
                resourceIcon.resourceType = "VM";
                resourceIcon.resourceContext =  VMContext();
                resourceIcon.x = 0;
                resourceIcon.y = 0;
                resourceIcon.labelX = 0;
                resourceIcon.labelY = 0;

                return resourceIcon;
            },

            createNewVNetResourceIcon: function() {
                var resourceIcon = new ResourceIcon();
                resourceIcon.resourceIconId = this.generateRandomStringId();
                resourceIcon.resourceType = "VNet";
                resourceIcon.resourceContext =  VNetContext();
                resourceIcon.x = 0;
                resourceIcon.y = 0;
                resourceIcon.labelX = 0;
                resourceIcon.labelY = 0;

                return resourceIcon;
            },


            initializeVMIconContextMenu: function() {

                var menu = [
                    {
                        title: 'set properties',
                        action: function(iconDatum, i) {
                            console.log(this.$refs);
                            vmDialog.openModal(iconDatum);

                        },
                        disabled: false // optional, defaults to false
                    },
                    {
                        title: 'delete',
                        action: function(iconDatum, i){
                            d3.select('#' + iconDatum.resourceIconId).removed();
                            //JSON.parse(jsondata).filter(({website}) => website === 'yahoo');
                        },
                        disabled: false
                    }
                ]

                return menu;
            },

            initCanvasEvents(){
                canvas = d3.select('#designerCanvas');

                //any resource creation event other than VNet creation
                canvas.on('click', this.onCanvasClickAddResource)

                this.initVNetCreateOnCanvasMouseDown();
            },

            generateRandomStringId: function() {
                return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
            }
        }
    }
</script>

<style>

.active circle {
  stroke: #000;
  stroke-width: 2px;
}

</style>