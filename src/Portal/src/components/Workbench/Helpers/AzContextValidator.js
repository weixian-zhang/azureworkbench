
import { utimesSync } from 'fs';
import Utils from './Utils';
import ResourceType from '../../../models/ResourceType'
import AzContextValidationResult from './AzContextValidationResult'

export default class AzContextValidator {

    static Validate(azcontexts) {

        if (azcontexts.length == 0)
            return azcontexts;

        var validatedContexts = AzContextValidator.ValidateInternal(azcontexts);

        return validatedContexts;
    }

    static ValidateInternal(azcontexts) {
        
        var result = new AzContextValidationResult();
        
        result.AzContexts = azcontexts;

        //check duplicate
        AzContextValidator.CheckDuplicatedResourceName(azcontexts, result.ErrorMessages);

        //check empty names
        azcontexts.forEach((azcontext, arrIndex, azcontexts) => {
            AzContextValidator.CheckEmptyResourceName(azcontext, result.ErrorMessages);
        });

        return result
    }

    static CheckEmptyResourceName(azcontext, errList) {
        if(!azcontext.Name)
            errList.push(`Resource type ${azcontext.ResourceType} cannot have empty name`);
    }

    static CheckDuplicatedResourceName(azcontexts, errList) {


        //get duplicated resource names
        var duplicateNames = azcontexts.map(azc => azc.Name).filter((name, pos, self) => self.indexOf(name) != pos );
        //filter azcontexts to find duplicated azcontexts. Main purpose is to also get Resource Type for meaningful
        //error messages
        var duplicateAzcs = azcontexts.filter((azc) => {
            return duplicateNames.some((dName) => {
                return dName == azc.Name
            })
        })

        if(duplicateAzcs.length > 0) {
            duplicateAzcs.forEach((azc) => {
                errList.push(`Duplicate resource name '${azc.Name}'  of type '${azc.ResourceType}' found`)
            })
        }

        AzContextValidator.CheckDuplicatedSubnetNames(azcontexts, errList);
    }

    static CheckDuplicatedSubnetNames(azcontexts, errList) {
        //check if subnet names in a VNet has duplicates
        azcontexts.forEach(azcontext => {
            if(azcontext.ResourceType == ResourceType.VNet()) {
                var dupSubnets = azcontext.Subnets.filter((s, pos) => azcontext.Subnets.indexOf(s.Name) != pos)

                if(dupSubnets.length > 0) {
                    dupSubnets.forEach((subnet) => {
                        errList.push(`Duplicate Subnet name '${subnet.Name}' found in VNet '${azcontext.Name}'`)
                    })
                } 
            }
        });
    }
     

    //special treatment for VNet as Subnets are embedded as array in VNet azcontext
    static setBicepNameForVNetSubnets(azcontext) {

        if (Utils.IsNullOrUndefine(azcontext.Subnets))
            return azcontext;

        azcontext.Name = AzContextValidator.removeSpecialChar(azcontext.Name);

        var subnets = azcontext.Subnets;
        azcontext.Subnets.forEach((subnet, arrIndex, subnets) => {
            var curatedSubnet =  subnet;
            curatedSubnet.BicepResourceName = AzContextValidator.removeSpecialChar(subnet.Name);
            subnet = curatedSubnet;
        })
    }


    static removeSpecialChar(name) {
        
        var specialChars = ['_', '-', ' ', ',', '@', '~', '`'];

        specialChars.forEach(c => {
            name = name.replaceAll(c, '')
        });

        return name;
    }

}