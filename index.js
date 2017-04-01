var app = angular.module('formApp', []);
app.controller("FormCtrl", function($scope) {
  var airtable_write_endpoint = "https://api.airtable.com/v0/app8gXVtwtE22xEeN/%E5%95%8F%E5%8D%B7?api_key=keyuyGOiuYZmOzFeV";
  $scope.step = 0
  $scope.question_answer = {}
  $scope.next_section = function() {
    $scope.step += 1
    jQuery(document).scrollTop(0,0);
  }
  $scope.submitAndUpdateRadar = function() {
    var fields = {}
    var flatten_question = _.flatten($scope.questions)
    _.each(flatten_question, (q) => {
      fields[q] = $scope.question_answer[q]
    })
    _.mapKeys($scope.form, function(value, key) {
      fields[key] = value
    });
    var scores = _.map($scope.questions, function(question_set) {
      return _.reduce(question_set, function(sum, elememt) {
        if (!!$scope.question_answer[elememt]) {
          sum += parseInt($scope.question_answer[elememt])
        }
        return sum
      }, 0)
    })
    var data = {
      labels: ["逃避型", "依賴型", "強迫型", "自戀型", "反社會型", "邊緣型", "演技型", "亞斯伯格型", "妄想型"],
      datasets: [{
        label: "戀愛這種病：測你的戀愛人格",
        backgroundColor: "rgba(252,66,89,0.2)",
        borderColor: "rgba(252,66,89,1)",
        pointBackgroundColor: "rgba(252,66,89,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(252,66,89,1)",
        data: scores
      }]
    };
    buildChart(data);
    axios.post(airtable_write_endpoint, {
      "fields": fields
    })
    $scope.next_section()
  }

  function buildChart(data) {
    var ctx = document.getElementById("myChart");
    var myRadarChart = new Chart(ctx, {
      type: 'radar',
      data: data,
      options: {
        scale: {
          ticks: {
            labelOffset: 20,
            autoSkip: false,
            stepSize: 10,
            min:  0,
            max: 40
          }
        }
      }
    });
  }
  $scope.questions = [
    [
      '因為討厭被拒絕、被貶低，所以不想從事要與許多人往來的工作。',
      '不想跟那些對自己沒有好感的人扯上關係。',
      '因為不能被討厭，所以即使很親的人也會壓抑自己去配合他。',
      '總是擔心自己會不會被嘲笑、會不會被排擠。',
      '約好要出門與人碰面，但常常事到臨頭才取消。',
      '覺得反正自己沒有魅力，不太受人喜歡。',
      '想要做些新的嘗試時，總會擔心不成功，常常在還沒做之前就先放棄了。',
      '不太喜歡穿泳衣或是與對方有身體上的接觸。',
      '很不喜歡與人面對面說話。',
      '覺得要表現自己的心情或感覺是很可恥的事，所以很不擅長。',
    ],
    [
      '連一點點小事，也不能自己一個人決定。',
      '重要的事或麻煩的事大多都請人幫忙做。',
      '人家一拜託，就無法說No，最後就會答應。',
      '與其自己去計畫率先去做，還不如跟在別人後面走比較符合自己的個性。',
      '為了讓對方覺得自己好，會去做一些其實不想做的事。',
      '沒有自信靠自己一個人活下去。',
      '要是跟戀人或是朋友分手，就會馬上去找下一個人來代替。',
      '對誰都表現得很和氣，外表看起來優點很多。',
      '就算知道這樣不好，但要是覺得對方可憐，就會忍不住寵愛他。',
      '喜歡服務別人，讓別人開心。'
    ],
    [
      '總是太拘泥細節。',
      '想做得很完美，但常常時間不夠。',
      '太過忙於工作或讀書，往往把娛樂跟與人交往放在次要。',
      '對不正當或敷衍了事的事，會覺得不可原諒。',
      '就算知道這些東西沒什麼用，還是很難丟棄。',
      '跟不按照自己的話做事的人很難合得來。',
      '會盡量節約金錢，為了將來存錢。',
      '有非常頑固且無法妥協之處。',
      '比起損失利益，更重視人情義理或責任、面子。',
      '很有禮貌，有古板拘謹的一面。',
    ],
    [
      '認為自己有世人還未察覺的才能或優點。',
      '會夢想自己可以成功成名，然後遇見理想的戀人。',
      '自己有與眾不同之處，是特別的人。',
      '最喜歡得到周圍人的讚賞，但一被批評就十分憤慨。',
      '就算多少有點勉強，自己的願望大致上還是會有人聽。',
      '如果是為了得到自己想要的東西，有自信可以利用別人或是巧言哄騙。',
      '有自私不體貼之處。',
      '看到朋友或認識的人很幸福，有時候心裡就會覺得嫉妒。',
      '常被認為態度傲慢或是自尊心太強。',
      '對沒有利用價值的人就很冷淡。',
    ],
    [
      '曾經一再做出違法的事。',
      '曾經為了自己的利益或快樂欺騙過別人。',
      '想到什麼做什麼，比起考慮將來，覺得及時行樂就好。',
      '一有什麼事馬上就動手訴諸暴力。',
      '對危險沒什麼感覺，有時喜歡玩命。',
      '曾經有過工作做一下子就辭職，或是借錢不還的情形。',
      '曾經一時衝動做出冷酷的事。',
      '喜歡做緊張刺激的事。',
      '與其被當成膽小鬼，寧願選擇戰鬥。',
      '比起安全又平凡的日常生活，更愛充滿刺激與冒險的人生。',
    ],
    [
      '擔心害怕被重要的人拋棄，拼命地抓住或者是為了不讓對方離開做出一些事讓他困擾。',
      '不是把對方想得太理想，就是幻滅得太嚴重，兩者落差很大。',
      '有時候會越來越搞不清楚自己究竟是怎樣的人。',
      '會做出衝動、危險的事情來。',
      '曾經想自殺或是宣稱自己想自殺，使周圍的人困擾。',
      '一天當中心情在兩種極端之間變化。',
      '心裡總覺得有空虛感。',
      '就算只是一點小事，只要不如己意就會陷入激烈的憤怒之中。',
      '對自己想法深信不疑，或是有時候會突然失去部分記憶。',
      '覺得自己是沒什麼價值的人。',
    ],
    [
      '喜歡成為眾人關心注目的目標。',
      '很懂得吸引異性的眼光。',
      '有很善變，容易見異思遷的一面。',
      '很熱衷於研究外表或服裝打扮。',
      '很會講話，常有人說跟你在一起就很開心。',
      '很善於利用豐富的表情或動作來表現自己的心情。',
      '很容易被對方的態度或當場的氣氛影響。',
      '一認識之後馬上就能很輕鬆地與人交談。',
      '很擅長把謊話講得像真的一樣，讓對方相信。',
      '穿著打扮有模有樣的，很有魅力。',
    ],
    [
      '因為喜歡孤獨，所以並不會想要跟任何人有親密的關係。',
      '比較適合一個人行動。',
      '有時候會被人說反應或是說話不懂得看場合。',
      '曾被人說是怪人或很獨特。',
      '會自己一個人面自顧自的說話。',
      '對清楚規定的做法或特定的東西非常執著。',
      '對有興趣的領域擁有非常豐富的知識。',
      '比起把人當成對象，把物品當成對象更符合你的性格。',
      '不太在乎別人怎麼想。',
      '沒有什麼喜怒哀樂，總是很冷靜。',
    ],
    [
      '覺得他人是不可輕忽的。',
      '雖說是朋友或夥伴也是有不可信任的時候。',
      '不會對別人說出自己的秘密或隱私。',
      '經常被別人說的話刺傷。',
      '很長時間都不會忘記曾經受到傷害的怨恨。',
      '被人諷刺或是責難，就會怒上心頭。',
      '曾經懷疑配偶或戀人是不是瞞著自己背叛過自己。',
      '會把別人的言外之意往壞處想。',
      '不能原諒對方爽約或是說錯話。',
      '經常覺得別人好像都在說自己的壞話。'
    ]
  ]
})

$("#reset").click(function (e) {
  $('html, body').animate({
    scrollTop: $("body").offset().top
  }, 500);
}).click(function (e) { e.preventDefault();});