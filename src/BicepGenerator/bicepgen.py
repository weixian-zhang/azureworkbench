#https://github.com/Azure/bicep/tree/main/docs/examples

import os
from io import StringIO
from resource_types import ResourceTypes
from jinja2 import Environment, FileSystemLoader, Template
from contexts import DiagramInfo

class TemplateBuilder:
    bicep_snippets = []

    def __init__(self):
        self.bicep_snippets = []
        #self._bicep_snippets = StringIO()
    
    def add(self, bicepSnippets):
        self.bicep_snippets.append(bicepSnippets)
        
    def get_template(self) -> str:
       return '\n\n'.join(self.bicep_snippets)

class BicepGenerator:
    
    templateBuilder: TemplateBuilder = None
    templateEnv: Environment = None

    def __init__(self):
         self.templateBuilder = TemplateBuilder()
         
         templateLoader = FileSystemLoader('./templates')
         self.templateEnv = Environment(loader=templateLoader)
         self.templateEnv.lstrip_blocks = True
         self.templateEnv.trim_blocks = True

    def generate(self, azcontexts):
        bicep = self.build_template(azcontexts)
        return bicep

    def build_template(self, diagramInfo: DiagramInfo) -> str:

        diagramContext = diagramInfo.diagramContext
        
        for azcontext in diagramContext.azcontexts:

            #rscContext =  x = json.loads(azcontext, object_hook=lambda d: SimpleNamespace(**d))
            
            match azcontext.ResourceType:

                case ResourceTypes.PublicIp:
                    template = self.internal_generate_template(ResourceTypes.PublicIp, azcontext, diagramContext)
                    self.templateBuilder.add(template)
                case ResourceTypes.StorageAccount:
                    template = self.internal_generate_template(ResourceTypes.StorageAccount, azcontext, diagramContext)
                    self.templateBuilder.add(template)
                case _:
                    pass

        return self.templateBuilder.get_template()


    def internal_generate_template(self, resourceType, azcontext, diagramContext):
        try:
            template = self.load_template_from_file(resourceType)
            bicep = template.render(azcontext=azcontext, diagramContext=diagramContext)
            
            if not bicep:
                #TODO log
                pass
            return bicep
        except Exception as e:
            pass
            #TODO: log error

    def load_template_from_file(self, resourceType: str):
        
        fileName = self.with_template_ext(resourceType)
        template = self.templateEnv.get_template(fileName)
        return template
    
    def with_template_ext(self, resourceType: str):
        fileName = resourceType + '.j2'
        #templatePath = os.path.join('templates', fileName)
        return fileName
            