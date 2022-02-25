#https://ochzhen.com/blog/azure-bicep-parameters#should-i-use-parameters

import json
from io import StringIO
from BicepGenerator.azcontext import StorageAccount
from resource_types import ResourceTypes
from jinja2 import Environment, FileSystemLoader, Template
from types import SimpleNamespace
from utils import with_template_ext

class TemplateBuilder:
    
    _bicep_snippets = None

    def __init__(self) -> None:
        self._bicep_snippets = StringIO()

    def add(self, bicepSnippets) -> None:
        self._bicep_snippets.write('\n')
        self._bicep_snippets.write(bicepSnippets)

    def get_template(self) -> str:
        return self._bicep_snippets.getvalue()

# template file name follows resource type name as convention

class BicepGenerator:

    templateBuilder: TemplateBuilder = None
    templateEnv: Environment = None

    def __init__(self) -> None:
         self.templateBuilder = TemplateBuilder()
         
         templateLoader = FileSystemLoader('templates')
         self.templateEnv = Environment(loader=templateLoader)

    def generate(self, azcontexts) -> str:
         bicep = self.build_template(azcontexts)
         return bicep

    def build_template(self, azcontexts) -> str:

        for strContext in azcontexts:

            context =  x = json.loads(strContext, object_hook=lambda d: SimpleNamespace(**d))
            
            rscType = context.ResourceType

            match rscType:

                case ResourceTypes.StorageAccount:
                    pass
                case _:
                    template = self.gen_storage_account_template(context)
                    self.templateBuilder.add(template)

        return self.templateBuilder.get_template()


    def gen_storage_account_template(self, azcontext: StorageAccount) -> str:

        template = self.get_template(ResourceTypes.StorageAccount)
        bicep = template.render(azcontext)
        return bicep

    def get_template(self, resourceType: str) -> Template:

        fileName = with_template_ext(resourceType)
        template = self.templateEnv.get_template(fileName)
        return template

            