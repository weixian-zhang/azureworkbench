#https://github.com/Azure/bicep/tree/main/docs/examples

import os
from io import StringIO
from resource_types import ResourceTypes
from jinja2 import Environment, FileSystemLoader, Template
from contexts import DiagramInfo
from loguru import logger

class TemplateBuilder:
    bicep_snippets = []

    def __init__(self):
        self.bicep_snippets = []
    
    def add(self, bicepSnippets):
        self.bicep_snippets.append(bicepSnippets)
        
    def get_template(self) -> str:
       return '\n\n'.join(self.bicep_snippets)

class BicepGenerator:
    
    templateBuilder: TemplateBuilder = None
    templateEnv: Environment = None

    def __init__(self):
         self.templateBuilder = TemplateBuilder()
         
         templateLoader = FileSystemLoader(searchpath='./templates')
         self.templateEnv = Environment(loader=templateLoader)
         self.templateEnv.lstrip_blocks = True
         self.templateEnv.trim_blocks = True

    # portal azcontexts resource name need to be cleansed from special characters
    # as resource name is unique and is natural to use as bicep resource name
    #special chars include: '_', '-', ' ', ',', '@', '~', '`'
    def generate(self, diagramInfo: DiagramInfo):
        
        #diagramInfo = self.diagramInfo_add_metaInfo(diagramInfo)

        diagramContext = diagramInfo.diagramContext
        
        for azcontext in diagramContext.azcontexts:
            
            ok, template = self.internal_generate_template(azcontext.ResourceType, azcontext, diagramContext)
            
            if ok:
                self.templateBuilder.add(template)

        return self.templateBuilder.get_template()
    
    # def diagramInfo_add_metaInfo(self, diagram: DiagramInfo) -> DiagramInfo:
        
    #     for context in diagram.diagramContext.azcontexts:
    #         context.bicepRscName = self.set_bicep_rsc_name(context.Name)
            
    #     return diagramContext
    
    # def set_bicep_rsc_name(self, rscName: str) -> str:
        
    #     bicepRscName = rscName
        
    #     bicepRscNameViolationChars = ['_', '-', ' ', ',', '@', '~', '`']
        
    #     hasViolationChars = [c for c in bicepRscName if c in bicepRscNameViolationChars]

    #     if len(hasViolationChars) > 0:
    #         for vChar in bicepRscNameViolationChars:
    #             bicepRscNAme = bicepRscName.replace(vChar, '')
                
    #     return bicepRscName

    def internal_generate_template(self, resourceType, azcontext, diagramContext):
        try:
            template = self.load_template_from_file(resourceType)
            bicep = template.render(azcontext=azcontext, diagramContext=diagramContext)
            
            if not bicep:
                #TODO log
                pass
            return True, bicep
        except Exception as e:
            logger.exception(e)
            return False, ''

    def load_template_from_file(self, resourceType: str):
        
        fileName = self.with_template_ext(resourceType)
        template = self.templateEnv.get_template(fileName)
        return template
    
    def with_template_ext(self, resourceType: str):
        fileName = resourceType + '.j2'
        #templatePath = os.path.join('templates', fileName)
        return fileName
            