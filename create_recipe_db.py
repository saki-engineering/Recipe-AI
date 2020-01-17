#coding: utf-8

import requests
import re
from bs4 import BeautifulSoup as bs

MAX_DATA_SIZE = 118217
BASE_URL = 'https://www.orangepage.net/recipes/detail_'

for id in range(118216,MAX_DATA_SIZE):
    #指定urlにGETリクエストを送信、ステータスコードが200の場合はhtmlを取得
    url = BASE_URL + str(id)
    res = requests.get(url, allow_redirects=False)
    if res.status_code != 200:
        continue
    bsObj = bs(res.text, "html.parser")


    #レシピtitleをソースから抽出
    title = bsObj.find("h1", class_="title").text

    #調理工程数をソースから抽出
    step = len(bsObj.find_all("div", class_="direction"))-1
    
    """
    1人あたりのカロリーをソースから抽出
    calory_info → 配列で[総カロリー,　人数]と抽出される
    calory →　per personに処理
    """
    calory_info = re.findall('\d+', bsObj.find("span", itemprop="calories").text)
    calory = int(calory_info[0])
    if len(calory_info) > 1:
        calory = calory/int(calory_info[1])

    """
    1人あたりの塩分量をソースから抽出
    salt_contents →　htmlから塩分量を含むli要素配列を抽出
    salt_info → 配列で[総塩分量,　人数]と抽出される
    salt →　per personに処理
    """
    salt_contents = bsObj.find("ul", class_="subInfo").contents
    for tag in salt_contents:
        if 'Salt' in str(tag):
            salt_info = re.findall('\d+\.?\d*', str(tag))
            salt = float(salt_info[0])
            if len(salt_info) > 1:
                salt = salt/int(salt_info[1])

    print(title)
    print(step)
    print('{:.2f}'.format(calory))
    print('{:.2f}'.format(salt))
