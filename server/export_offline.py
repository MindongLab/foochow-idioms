import json

BASE_FOLDER = "api/"

def export_file(url, content):
    file = open(BASE_FOLDER + url, "w")
    file.write(content)
    file.close()
    
