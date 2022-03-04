
export default class BicepDiagramInfo {
    constructor() {
        this.diagramInfo = {
            userEmail: '',
            blobClaimCheckFileIdentifier: '',
            diagramContext: {
                globalContext: {
                    location: '',
                    tags: []
                },
                azcontexts: []
            }
        }
    }
}