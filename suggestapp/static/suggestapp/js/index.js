var q_number = 0;//分岐をグラフとして持っておく．
const QUESTION_DIM = 12;
const OUTVEC_DIM = 10;
const Q_NUM_INF = 999;
var out_vector = new Array(OUTVEC_DIM);

//外部ローカルのJSON読み込みがChromeでエラーを吐くので中に書いてみる。
//ansは解答欄表示用，anssは回答確認のプルダウン表示用
var data = [
  {

  },
  {
    "question": "Q1. 何人分作りますか？",
    "ans0": "1人",
    "ans1": "2人",
    "ans2": "3人",
    "ans3": "4人",
    "ans4": "5人",
    "ans0s": "1人",
    "ans1s": "2人",
    "ans2s": "3人",
    "ans3s": "4人",
    "ans4s": "5人",
  },
  {
    "question": "Q2. 調理時間はどのくらいが良いですか？",
    "ans0": "手短かにお願い！",
    "ans1": "あまり時間ないけど...",
    "ans2": "ある程度はかけても良い",
    "ans3": "そこそこの時間はある。",
    "ans4": "じっくり料理をしたい！",
    "ans0s": "手短かに!",
    "ans1s": "時間ない",
    "ans2s": "ある程度は",
    "ans3s": "そこそこ",
    "ans4s": "じっくり",
  },
  {
    "question": "Q3. がっつり食べたいですか？",
    "ans0": "ダイエット中なので...",
    "ans1": "お腹あまり空いてない。",
    "ans2": "いい感じでお願い！",
    "ans3": "今日はちょっと多めに。",
    "ans4": "お腹ペコペコです!",
    "ans0s": "ダイエット中",
    "ans1s": "空いてない",
    "ans2s": "いい感じで",
    "ans3s": "多めに",
    "ans4s": "お腹ペコペコ",
  },
  {
    "question": "Q4. 塩分は気にしますか？",
    "ans0": "塩っ気は嫌い！",
    "ans1": "塩分控えめで...",
    "ans2": "ほどほどなら...",
    "ans3": "ちょっと塩味が良い",
    "ans4": "塩分気にせず！",
    "ans0s": "塩嫌い",
    "ans1s": "塩控えめ",
    "ans2s": "塩ほどほど",
    "ans3s": "塩味少し",
    "ans4s": "塩気にせず",
  },
  {
    "question": "Q5. 今日作るのは？",
    "ans0": "主菜（メイン）",
    "ans1": "副菜（サイド）",
    "ans2": "",
    "ans3": "",
    "ans4": "",
    "ans0s": "メイン",
    "ans1s": "サイド",
    "ans2s": "",
    "ans3s": "",
    "ans4s": "",
  },
  {
    "question": "Q6.　何を食べたい？",
    "ans0": "お肉〜！",
    "ans1": "お魚^^",
    "ans2": "ヘルシーに豆腐・厚揚げ",
    "ans3": "",
    "ans4": "",
    "ans0s": "肉",
    "ans1s": "魚",
    "ans2s": "豆腐",
    "ans3s": "",
    "ans4s": "",
  },
  {
    "question": "Q7. 好きなお肉は？",
    "ans0": "とり肉",
    "ans1": "ぶた肉",
    "ans2": "ぎゅう肉",
    "ans3": "",
    "ans4": "",
    "ans0s": "鶏肉",
    "ans1s": "豚肉",
    "ans2s": "牛肉",
    "ans3s": "",
    "ans4s": "",
  },
  {
    "question": "Q8. とり肉だったらどこが良い？",
    "ans0": "ジューシーなモモ肉",
    "ans1": "健康志向のササミ肉",
    "ans2": "ひき肉",
    "ans3": "",
    "ans4": "",
    "ans0s": "もも肉",
    "ans1s": "ササミ肉",
    "ans2s": "ひき肉",
    "ans3s": "",
    "ans4s": "",
  },
  {
    "question": "Q9. 豚肉だったらどこが良い？",
    "ans0": "美味しいバラ肉",
    "ans1": "ひき肉",
    "ans2": "",
    "ans3": "",
    "ans4": "",
    "ans0s": "バラ肉",
    "ans1s": "ひき肉",
    "ans2s": "",
    "ans3s": "",
    "ans4s": "",
  },
  {
    "question": "Q10. 牛肉だったらどこが良い？",
    "ans0": "薄切り肉",
    "ans1": "ひき肉",
    "ans2": "",
    "ans3": "",
    "ans4": "",
    "ans0s": "薄切り肉",
    "ans1s": "ひき肉",
    "ans2s": "",
    "ans3s": "",
    "ans4s": "",
  },
  {
    "question": "Q11.　どんなお魚が好き？",
    "ans0": "シャケやホッケ",
    "ans1": "サバやアジ",
    "ans2": "ブリ？",
    "ans3": "エビ・ホタテ",
    "ans4": "",
    "ans0s": "シャケ",
    "ans1s": "サバ",
    "ans2s": "ブリ",
    "ans3s": "エビ",
    "ans4s": "",
  },
  {
    "question": "Q12.　この中だったらどれが良い？",
    "ans0": "サラダ",
    "ans1": "和え物",
    "ans2": "マリネ",
    "ans3": "きんぴら",
    "ans4": "",
    "ans0s": "サラダ",
    "ans1s": "和え物",
    "ans2s": "マリネ",
    "ans3s": "きんぴら",
    "ans4s": "",
  },

  //山下流だと，あとは「絶対に消費しなくてはならない食材」
  //家の調理器具を確認->上の2つはページを変えてリストで？（あるいはユーザ登録時に情報を持つ？）
  //脂っこいものか，あっさりしたものか
  //味の系統を絞る：和洋中か，味からか？
  //プチ贅沢の有無
  //家の調理器具を確認
]
//分岐が複雑ではないので，ひとまずページ整形のところに書いておく．

/*
//JSONを別ファイルでやりたくなったら，ここを有効にして，この中にそれぞれの処理を全部入れ子にする．．
question_path = "./question.json";
fetch(question_path, {
  headers : {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
  }
})
  .then((response) => response.json())
  .then((out_json) => {
    ***ここに従来の処理を全部入れ込む．
  });
  }
}
*/

async function nextButton(ans_num) {
  var next_q_number = -1;//次の質問番号を入れる．
  //HTML上から要素取得
  var qText = document.getElementById('question');
  var aButton0 = document.getElementById('ansButton0');
  var aButton1 = document.getElementById('ansButton1');
  var aButton2 = document.getElementById('ansButton2');
  var aButton3 = document.getElementById('ansButton3');
  var aButton4 = document.getElementById('ansButton4');
  var ansicons = document.querySelector('.ans-icons');
  var dropList = document.getElementById('dropList');
  //質問番号 0：トップページ -> 質問ページ
  if (q_number == 0) {
    var asheet1 = document.getElementById('asheet1');
    asheet1.style.display = "block";
    var backButton = document.getElementById('backButton');
    var playButton = document.getElementById('playButton');
    backButton.style.display = "";
    playButton.style.display = "none";
    for (var i = 0; i < OUTVEC_DIM; i++) {
      out_vector[i] = -1;
    }
    next_q_number = 1;
    //次の質問内容に更新する．
    qText.innerText = data[next_q_number].question;
    aButton0.innerText = data[next_q_number].ans0;
    aButton1.innerText = data[next_q_number].ans1;
    if (data[next_q_number].ans2 == "") {
      aButton2.style.display = "none";
    }
    else {
      aButton2.innerText = data[next_q_number].ans2;
      aButton2.style.display = "";
    }
    if (data[next_q_number].ans3 == "") {
      aButton3.style.display = "none";
    }
    else {
      aButton3.innerText = data[next_q_number].ans3;
      aButton3.style.display = "";
    }
    if (data[next_q_number].ans4 == "") {
      aButton4.style.display = "none";
    }
    else {
      aButton4.innerText = data[next_q_number].ans4;
      aButton4.style.display = "";
    }
  }
  //質問番号1 ~ N : 質問番号を格納し，next_qがINFのやつのみ最終ページに移動．
  if (q_number >= 1 && q_number <= QUESTION_DIM) {
    //ドロップダウンへの要素の追加
    var ans_s = "";
    if (ans_num == 0) ans_s = data[q_number].ans0s;
    else if (ans_num == 1) ans_s = data[q_number].ans1s;
    else if (ans_num == 2) ans_s = data[q_number].ans2s;
    else if (ans_num == 3) ans_s = data[q_number].ans3s;
    else if (ans_num == 4) ans_s = data[q_number].ans4s;
    var elemLi = document.createElement('li');
    elemLi.textContent = 'Q' + q_number + '. : ' + ans_s;
    dropList.appendChild(elemLi);
    //回答番号を格納する場所を，素朴に書き下す．:質問構造を変更する際はここを書き換える．
    //同時に次の回答番号をnext_q_numberに投げる．
    //Q4まで：分岐なし
    if (q_number <= 4 && q_number >= 1) {
      out_vector[q_number - 1] = ans_num + 1;
      next_q_number = q_number + 1;
    }
    //Q5-0 -> Q6, Q5-1 -> Q12
    else if (q_number == 5) {
      if (ans_num == 0) next_q_number = 6;
      else if (ans_num == 1) next_q_number = 12;
    }
    //Q6-0 -> Q7, Q6-1 -> Q11, Q6-2 -> Q_NUM_INF
    else if (q_number == 6) {
      out_vector[4] = ans_num + 1;
      if (ans_num == 0) next_q_number = 7;
      else if (ans_num == 1) next_q_number = 11;
      else if (ans_num == 2) next_q_number = Q_NUM_INF;
    }
    //Q7-0 -> Q8, Q7-1 -> Q9, Q7-2 -> Q10
    else if (q_number == 7) {
      if (ans_num == 0) next_q_number = 8;
      else if (ans_num == 1) next_q_number = 9;
      else if (ans_num == 2) next_q_number = 10;
    }
    //Q8 - Q12 -> Q_NUM_INF
    else if (q_number >= 8) {
      out_vector[q_number - 3] = ans_num + 1;
      next_q_number = Q_NUM_INF;
    }

    //next_q_numer != INF : 回答選択肢を次のQへ．
    //""だったらdisplay-noneにして，それ以外だったら戻す．
    if (next_q_number != Q_NUM_INF) {
      qText.innerText = data[next_q_number].question;
      aButton0.innerText = data[next_q_number].ans0;
      aButton1.innerText = data[next_q_number].ans1;
      if (data[next_q_number].ans2 == "") {
        aButton2.style.display = "none";
      }
      else {
        aButton2.innerText = data[next_q_number].ans2;
        aButton2.style.display = "";
      }
      if (data[next_q_number].ans3 == "") {
        aButton3.style.display = "none";
      }
      else {
        aButton3.innerText = data[next_q_number].ans3;
        aButton3.style.display = "";
      }
      if (data[next_q_number].ans4 == "") {
        aButton4.style.display = "none";
      }
      else {
        aButton4.innerText = data[next_q_number].ans4;
        aButton4.style.display = "";
      }
    }
    //next_q_numberがQ_NUM_INFの時：質問から回答フェーズに移行．
    //ajaxでサーバサイドにデータを送信し，受け取ってきたものを表示。
    if (next_q_number == Q_NUM_INF) {
      q_number = next_q_number;
      //サジェストページへの移行。ここでqueryを投げて返ってくるのを待つ。
      document.getElementById('asheet1').style.display = "none";
      document.getElementById('suggest-sheet').style.display = "block";
      qText.innerText = "あなたにオススメするのは...";
      //値を送信して，サーバ上のコードを実行．URlを返してもらう．
      // 仮置き
      const stocks = [
        100, 100, 100, 100, 100, 100, 500, 100, 100, 100,
        100, 100, 100, 100, 100, 10, 100, 300, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 40
      ];

      //out_vectorの値を10桁の整数に変換しrequest_paramにする
      var request_param = 0;
      for(var i=0; i<OUTVEC_DIM; i++){
        request_param = request_param * 10 + out_vector[i];
      }
      const server_url = location.href + "search/" + request_param;

      //ajaxでviews.pyのsearchにデータを送信
      const errmes = "サーバーAIとの通信に失敗しました……\n通信状況が悪いか，またはAIの調子が悪いかもしれません。\nしばらく待ってから再度お試しください。";
      $.ajax({
        url: server_url,
        type: "GET",
        dataType: 'json'
      }) 
      .done(function(data, textStatus, jqXHR){
        //空のデータが返ってきたらエラー表示
        if(data.title==null){
          alert("AIが適切な献立を見つけられませんでした……！\nお役に立てず，申し訳ありません。");
        }
        //正常なデータが返ってきたらそれを表示
        else{
          document.getElementById('recipe-title').innerText = data.title;
          document.getElementById('recipe-img').src = data.image_url;
          const recipe_url = "https://www.orangepage.net/recipes/detail_" + data.url_id;
          const recipe_ref = document.getElementById('recipe-ref');
          recipe_ref.href = recipe_url;
          recipe_ref.style.display = "inline";
          const recipe_imageref = document.getElementById('recipe-imageref');
          recipe_imageref.href = recipe_url;
          recipe_imageref.rel = "external";
          recipe_imageref.innerText = recipe_url;
        }
      }).fail(function(jqXHR, textStatus, errorThrown){
        //データが返ってこなかったらエラーメッセージ表示
        alert(errmes);
      });
    }
  }
  q_number = next_q_number;
}

//戻るボタン：一つ前の画面に戻す。レンダリングを全部逆にするように実装。
function backButton() {
  document.getElementById('suggest-sheet').style.display = "none";

  //Top画面に戻る．
  if (q_number == 1) {
    var asheet1 = document.getElementById('asheet1');
    var question = document.getElementById('question');
    question.innerText = "簡単な質問に答えるだけでレシピをご提案！";
    asheet1.style.display = "none";
    //var nextButton = document.getElementById('nextButton');
    var backButton = document.getElementById('backButton');
    var playButton = document.getElementById('playButton');
    //nextButton.style.display = "none";
    backButton.style.display = "none";
    playButton.style.display = "inline-block";
    q_number = 0;
    out_vector[0] = -1;
  }
  //最後の質問画面以外
  else if (q_number >= 2 && q_number < Q_NUM_INF) {
    var prev_q_number = -1;
    var qText = document.getElementById('question');
    var aButton0 = document.getElementById('ansButton0');
    var aButton1 = document.getElementById('ansButton1');
    var aButton2 = document.getElementById('ansButton2');
    var aButton3 = document.getElementById('ansButton3');
    var aButton4 = document.getElementById('ansButton4');
    //質問に応じて分岐を書く：分岐を変える場合はここを書き換える．
    //Q4まで：分岐なし
    if (q_number <= 4 && q_number >= 1) {
      out_vector[q_number - 1] = - 1;
      prev_q_number = q_number - 1;
    }
    //Q5-0 -> Q6, Q5-1 -> Q12
    else if (q_number == 5) {
      prev_q_number = q_number - 1;
    }
    //Q6-0 -> Q7, Q6-1 -> Q11, Q6-2 -> Q_NUM_INF
    else if (q_number == 6) {
      out_vector[4] = -1;
      prev_q_number = q_number - 1;
    }
    //Q7-0 -> Q8, Q7-1 -> Q9, Q7-2 -> Q10
    else if (q_number == 7) {
      prev_q_number = q_number - 1;
    }
    //Q8 - Q12 -> Q_NUM_INF
    else if (q_number >= 8) {
      out_vector[q_number - 3] = -1;
      if (q_number <= 10) {
        prev_q_number = 7;
      }
      else if (q_number == 11) {
        prev_q_number = 6;
      }
      else if (q_number == 12) {
        prev_q_number = 5;
      }
    }

    //質問内容をprev_q_numberのものに更新，
    if (q_number != Q_NUM_INF) {
      qText.innerText = data[prev_q_number].question;
      aButton0.innerText = data[prev_q_number].ans0;
      aButton1.innerText = data[prev_q_number].ans1;
      if (data[prev_q_number].ans2 == "") {
        aButton2.style.display = "none";
      }
      else {
        aButton2.innerText = data[prev_q_number].ans2;
        aButton2.style.display = "inline-block";
      }
      if (data[prev_q_number].ans3 == "") {
        aButton3.style.display = "none";
      }
      else {
        aButton3.innerText = data[prev_q_number].ans3;
        aButton3.style.display = "inline-block";
      }
      if (data[prev_q_number].ans4 == "") {
        aButton4.style.display = "none";
      }
      else {
        aButton4.innerText = data[prev_q_number].ans4;
        aButton4.style.display = "inline-block";
      }
    }

    // ドロップダウンリストの削除
    var dropList = document.getElementById('dropList');
    //そこまでの回答数に応じて削除する場所が変わる．分岐を書き換える場合，ここを書き換える．
    var ans_cnt = -1;
    if (q_number <= 8) {
      ans_cnt = q_number - 1;
    }
    else if (q_number == 9 || q_number == 10) {
      ans_cnt = 7;
    }
    else if (q_number == 11) {
      ans_cnt = 6;
    }
    else if (q_number == 12) {
      ans_cnt = 5;
    }
    if (ans_cnt != -1) {
      dropList.removeChild(dropList.children[ans_cnt - 1]);
    }
    q_number = prev_q_number;
  }
  else if (q_number == Q_NUM_INF) {
    var asheet1 = document.getElementById('asheet1');
    var question = document.getElementById('question');
    var suggest = document.getElementById('suggest-sheet');
    question.innerText = "オススメレシピ、探します！";
    asheet1.style.display = "none";
    suggest.style.display = "none";
    //var nextButton = document.getElementById('nextButton');
    var backButton = document.getElementById('backButton');
    var playButton = document.getElementById('playButton');
    //nextButton.style.display = "none";
    backButton.style.display = "none";
    playButton.style.display = "inline-block";
    //ドロップダウンリスト内部の全要素の削除
    var dropList = document.getElementById('dropList');
    while (dropList.firstChild) {
      dropList.removeChild(dropList.firstChild);
    }
    q_number = 0;
    for (var i = 0; i < OUTVEC_DIM; i++) {
      out_vector[i] = -1;
    }
  }
}
