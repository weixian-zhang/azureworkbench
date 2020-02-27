export default class Messages {
    static VMInSubnet() {return "A VM or VM Scale Sets must be in a subnet, select the subnet then drag VM onto canvas";}
    static ASEInSubnet() {return "App Service Environment must be in a dedicated subnet, select the subnet then drag ASE onto canvas";}
    static SharedDiagramLoadError() {return "Unable to load shared diagram";}
    static NoCellOnGraph() {return "There is no resource on canvas";}
    static SharedDiagramLinkCopied() {return "Link copied";}
    static AppGatewayNotInSubnetError() {return "Application Gateway must be in a dedicated subnet with no other resource";}
    static DiagramSavedInBrowser() {return "Diagram saved in browser";}
    static SavedSuccessfully() {return "Saved successully";}
    static GetCollectionError() {return "An error occurred when retrieving collection";}
    static GetDiagramFromWorkspaceError() {return "An error occurred when retrieving diagrams from your workspace";}
    static LoadDiagramFromWorkspaceError() {return "An error occurred when loading diagram from your workspace";}
    static DeleteDiagramFromWorkspaceIsFalse() {return "An error occurred when deleting diagram";}
    static DeleteDiagramFromWorkspaceTrue() {return "Diagram deleted successfully"};
    static SubnetUngroupVNetNotAllowed() {return "Subnet must be in a Virtual Network"};
    static SaveWorkspaceFieldNotEmpty() {return "Collection and diagram name cannot be empty"};
    static PDFDownloaded() {return "PDF downloaded"};
    static VNetGatewayNotInGatewaySubnet() {return "Virtual Network Gateway must be in GatewaySubnet. Add a GatewaySubnet, select the subnet and drag Virtual Network Gateway onto canvas"};
}