__author__ = 'aub3'
import webapp2,jinja2,os,logging
import config,model
from google.appengine.api import users

jinja = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), config.TEMPLATES_PATH)))




class Controller(webapp2.RequestHandler):

    def get(self,*args,**kw):
        self.process_request(*args,**kw)


    def process_request(self,*args,**kw):
        return None

    def generate(self, user_name, template_name, template_values=None):
        if not template_values:
            template_values = {}
        values = {
              'request': self.request,
              'config' : config,
              'user': user_name,
              'user_name': user_name,
              'login': "",
              'logout': "",
              'application_name': 'JSVisionEditor',
              'entry_values': template_values,
        }
        values.update(template_values)
        template = jinja.get_template(template_name)
        output = template.render(values, debug=config.DEBUG)
        self.response.headers['Content-Type'] = 'text/html'
        self.response.out.write(output)

class Gallery(Controller):
    pass

class Editor(Controller):
    def process_request(self):
        self.generate("",'editor.html', template_values={'payload':{}})





Routes =[('/', Editor)]
# ('/Gallery', Gallery)]