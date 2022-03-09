#https://github.com/Azure/bicep/tree/main/docs/examples

import os
from io import StringIO
import random
import string
from resource_types import ResourceTypes
from jinja2 import Environment, FileSystemLoader, Template
from contexts import DiagramInfo
from loguru import logger
from abc import ABC, abstractmethod

class TemplateGenerator(ABC):
    
    @abstractmethod
    def generate(self):
        pass


class TemplateBuilder:
    bicep_snippets = []

    def __init__(self):
        self.bicep_snippets = []
    
    def add(self, bicepSnippets):
        self.bicep_snippets.append(bicepSnippets)
        
    def get_template(self) -> str:
       return ''.join(self.bicep_snippets)
   


class BicepGenerator(TemplateGenerator):
    
    templateBuilder: TemplateBuilder = None
    templateEnv: Environment = None

    def __init__(self):
         self.templateBuilder = TemplateBuilder()
         
         templateLoader = FileSystemLoader(searchpath='./templates/bicep')
         self.templateEnv = Environment(loader=templateLoader)
         self.templateEnv.globals['resolve_bicep_resource'] = self.resolve_bicep_resource
         self.templateEnv.lstrip_blocks = True
         self.templateEnv.trim_blocks = True

    # portal azcontexts resource name need to be cleansed from special characters
    # as resource name is unique and is natural to use as bicep resource name
    #special chars include: '_', '-', ' ', ',', '@', '~', '`'
    def generate(self, diagramInfo: DiagramInfo):
        
        diagramContext = diagramInfo.diagramContext
        
        #load base template
        ok, baseTemplate = self.load_base_template()
        self.templateBuilder.add(baseTemplate)
        
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
    
    def load_base_template(self):
        try:
            template = self.load_template_from_file('base')
            bicep = template.render()
            
            if not bicep:
                #TODO log
                pass
            return True, bicep
        except Exception as e:
            logger.exception(e)
            return False, ''

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
    
    def resolve_bicep_resource(self, azcontextRscName: str):
        
        if not azcontextRscName.isalnum():
            return azcontextRscName
        
        specialChars = [' ', ',', '@', '~', '`']
        
        for sChar in specialChars:
            azcontextRscName = azcontextRscName.replace(sChar, '')
            
        azcontextRscName = azcontextRscName.replace('-', '_')
            
        #cleansedName = [s.replace(self.generateRandomThreeChars(s)) for s in azcontextRscName if s.isnumeric()]
        
        return azcontextRscName
    

    def load_template_from_file(self, resourceType: str):
        
        fileName = self.with_template_ext(resourceType)
        template = self.templateEnv.get_template(fileName)
        
        #template.globals.update(resolve_bicep_resource=self.resolve_bicep_resource)
        
        return template
    
    def with_template_ext(self, resourceType: str):
        fileName = resourceType + '.j2'
        return fileName
            