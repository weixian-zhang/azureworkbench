#https://ochzhen.com/blog/azure-bicep-parameters#should-i-use-parameters

import json
from io import StringIO
from BicepGenerator.azcontext import StorageAccount
from resource_types import ResourceTypes
from jinja2 import Environment, FileSystemLoader
from types import SimpleNamespace

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
    templateLoader: FileSystemLoader = None

    def __init__(self) -> None:
         self.templateBuilder = TemplateBuilder()
         self.templateLoader = FileSystemLoader('templates')

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


    def gen_storage_account_template(self, azcontext: StorageAccount):
        # self.templateLoader
        filename = ResourceTypes.StorageAccount.join('j2')
        template = self.templateLoader.load(filename)

        template.render()
        pass

            