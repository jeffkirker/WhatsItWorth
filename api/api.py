import urllib.parse
import config
import requests 

from flask import Flask

app = Flask(__name__)

@app.route('/keywords/<keywords>')
def get_listings(keywords):
  # url = ("https://svcs.ebay.com" +
  #     "/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&" +
  #     "SERVICE-VERSION=1.7.0&" +
  #     "SECURITY-APPNAME=" +
  #     config.api_key +
  #     "&RESPONSE-DATA-FORMAT=JSON&" +
  #     "REST-PAYLOAD&" +
  #     "keywords=" +
  #     urllib.parse.quote(keywords) +
  #     "&" +
  #     "itemFilter(0).name=SoldItemsOnly&" +
  #     "itemFilter(0).value=true&" +
  #     "sortOrder=EndTimeSoonest" +
  #     "&paginationInput.entriesPerPage=100")
  url = "https://postman-echo.com/get?foo1=bar1&foo2=bar2"
  r = requests.get(url)
  print(r.request.body)
  print(r.request.headers)
  return r.json()