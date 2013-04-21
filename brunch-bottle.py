import os
from os import environ as env
from sys import argv
import bottle
import pywapi
from bottle import route, run, static_file, redirect, request, error, template
from beaker.middleware import SessionMiddleware

bottle.debug(True)

# session set up
app = bottle.default_app()
session_opts = {
    'session.type': 'file',
    'session.cookie_expires': 300,
    'session.data_dir': './session',
    'session.auto': True
}
app = SessionMiddleware(app, session_opts)

# static files (js,css,partials) set up

@route('/favicon.ico')
def favicon():
    return static_file('favicon.ico', root='./app/')

@route('/stylesheets/:path#.+#')
def server_static(path):
    return static_file(path, root='./public/stylesheets/')

@route('/images/:path#.+#')
def server_static(path):
    return static_file(path, root='./public/images/')

@route('/javascripts/:path#.+#')
def server_static(path):
    return static_file(path, root='./public/javascripts/')

@route('/')
@route('/index.html')
def index():
    return template('public/index.html')

@error(404)
def mistake404(code):
    return static_file('404.html', root='./app')

# start application
bottle.run(app=app,host='0.0.0.0', port=argv[1], reloader=True)
