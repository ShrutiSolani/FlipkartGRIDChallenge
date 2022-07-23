#!/usr/bin/env python3
# from tryOn import TryOn as tryOn

from flask import Flask, render_template, redirect
import os

app = Flask(__name__)

CART = []


@app.route('/accessories')
def accessories():
    return render_template('accessories.html')


@app.route('/tryon/<file_path>', methods=['POST', 'GET'])
def tryon(file_path):
    file_path = file_path.replace(',', '/')
    os.system('python tryOn.py ' + file_path)
    return redirect('http://127.0.0.1:5000/accessories', code=302, Response=None)

if __name__ == '__main__':
    app.run()
