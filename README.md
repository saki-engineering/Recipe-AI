# Recipe-AI
2018年Utatane駒場祭展示にて披露した「献立提案アキネータ」のDjangoリメイク版です。

## 当時からの変更点(2020/1/18現在)
- クライアント-サーバー間の通信をDjangoでの方式に書き換え
- cssをhtmlから分離、外部ファイル読み込みにした
- サジェストする献立を、条件に合う献立の中からランダム選択するようにした(つまり、同じ入力をユーザーが繰り返したとしても違う献立がその度表示される)

## 導入法
前提：Webサーバー内にDjango+numpyが使えるPython3環境があること
1. このリポジトリをサーバー内にクローンしてください。
1. `config/localsettings.py`というファイルを作成して、以下を追記してください。
```
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = FALSE

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '(任意の文字列)'
```
