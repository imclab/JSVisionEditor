#!/usr/bin/env python
import webapp2,logging
from appcode import controller,config

app = webapp2.WSGIApplication(controller.Routes, debug=config.DEBUG)
