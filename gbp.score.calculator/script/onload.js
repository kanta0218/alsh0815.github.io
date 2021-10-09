function sortBGM() {
  var type = document.getElementById('sort_bgm').value;
  loadBGM(type);
}

function changeLV() {
  var minLv = document.getElementById("range-1").value;
  var maxLv = document.getElementById("range-2").value;
  document.getElementById("input_rangeLV").innerHTML = 'Lv.'+minLv+' 〜 Lv.'+maxLv;
  sortBGM();
}

$(function(){
  // #で始まるアンカーをクリックした場合に処理
  $('.s_02 a[href^="#"]').click(function(){
    // 移動先を50px上にずらす
    var adjust = 50;
    // スクロールの速度
    var speed = 400; // ミリ秒
    // アンカーの値取得
    var href= $(this).attr("href");
    // 移動先を取得
    var target = $(href == "#" || href == "" ? 'html' : href);
    // 移動先を調整
    var position = target.offset().top - adjust;
    // スムーススクロール
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
});

window.onload = function init() {
    loadBGM('diff-down');
    $.getJSON('database/SKILL.json', (data) => {
        var select_skill1 = document.getElementById("input_skill1");
        for (i=0; i<data.SKILL.length; i++) {
            var option = document.createElement("option");
            option.text = data.SKILL[i][0];
            option.value = data.SKILL[i][1];
            select_skill1.appendChild(option);
        }
        var select_skill2 = document.getElementById("input_skill2");
        for (i=0; i<data.SKILL.length; i++) {
            var option = document.createElement("option");
            option.text = data.SKILL[i][0];
            option.value = data.SKILL[i][1];
            select_skill2.appendChild(option);
        }
        var select_skill3 = document.getElementById("input_skill3");
        for (i=0; i<data.SKILL.length; i++) {
            var option = document.createElement("option");
            option.text = data.SKILL[i][0];
            option.value = data.SKILL[i][1];
            select_skill3.appendChild(option);
        }
        var select_skill4 = document.getElementById("input_skill4");
        for (i=0; i<data.SKILL.length; i++) {
            var option = document.createElement("option");
            option.text = data.SKILL[i][0];
            option.value = data.SKILL[i][1];
            select_skill4.appendChild(option);
        }
        var select_skill5 = document.getElementById("input_skill5");
        for (i=0; i<data.SKILL.length; i++) {
            var option = document.createElement("option");
            option.text = data.SKILL[i][0];
            option.value = data.SKILL[i][1];
            select_skill5.appendChild(option);
        }
        var select_skilltime1 = document.getElementById("input_skillTime1");
        var select_skilltime2 = document.getElementById("input_skillTime2");
        var select_skilltime3 = document.getElementById("input_skillTime3");
        var select_skilltime4 = document.getElementById("input_skillTime4");
        var select_skilltime5 = document.getElementById("input_skillTime5");
        for (i=0; i<data.TIME.length; i++) {
            var option = document.createElement("option");
            option.text = data.TIME[i];
            option.value = data.TIME[i];
            if (data.TIME[i]=='7.0秒') { option.selected = true; }
            select_skilltime1.appendChild(option);
        }
        for (i=0; i<data.TIME.length; i++) {
            var option = document.createElement("option");
            option.text = data.TIME[i];
            option.value = data.TIME[i];
            if (data.TIME[i]=='7.0秒') { option.selected = true; }
            select_skilltime2.appendChild(option);
        }
        for (i=0; i<data.TIME.length; i++) {
            var option = document.createElement("option");
            option.text = data.TIME[i];
            option.value = data.TIME[i];
            if (data.TIME[i]=='7.0秒') { option.selected = true; }
            select_skilltime3.appendChild(option);
        }
        for (i=0; i<data.TIME.length; i++) {
            var option = document.createElement("option");
            option.text = data.TIME[i];
            option.value = data.TIME[i];
            if (data.TIME[i]=='7.0秒') { option.selected = true; }
            select_skilltime4.appendChild(option);
        }
        for (i=0; i<data.TIME.length; i++) {
            var option = document.createElement("option");
            option.text = data.TIME[i];
            option.value = data.TIME[i];
            if (data.TIME[i]=='7.0秒') { option.selected = true; }
            select_skilltime5.appendChild(option);
        }
    });
};

function setBGM(list) {
  var select_bgm = document.getElementById("input_bgm");
  select_bgm.innerHTML = '';
  for (i=0; i<list.length; i++) {
      var option = document.createElement("option");
      if (list[i].name!=undefined) {
        option.text = list[i].name;
        option.value = list[i].id;
        select_bgm.appendChild(option);
      }
    }
}

function loadBGM(sortType) {
  document.getElementById('waiting').style.display = 'block';
  var minLv = document.getElementById("range-1").value;
  var maxLv = document.getElementById("range-2").value;
  var diff = $("input[name='sortDF']:checked").val();
  var band = parseInt($("input[name='sortBD']:checked").val());
  console.log('Sort BGM (diff): '+diff);
  var list = [];
  var ct = (new Date()).getTime();
  $.getJSON('database/BGM.json?p='+ct, (data) => {
    for (i=0; i<data.BGM.length; i++) {
        var x = {
          name:'',
          id:data.BGM[i].id,
          time:data.BGM[i].time,
          band:data.BGM[i].band,
          notes:0,
          level:0
        };
        if (diff=='0') {
          if (data.BGM[i].notes.easy!=undefined) {
            if (minLv<=data.BGM[i].level.easy&&data.BGM[i].level.easy<=maxLv) {
              x.name = data.BGM[i].name+' - Lv.'+data.BGM[i].level.easy;
              x.notes = data.BGM[i].notes.easy;
              x.level = data.BGM[i].level.easy;
              list.push(x);
            }
          }
        } else if (diff=='1') {
          if (data.BGM[i].notes.normal!=undefined) {
            if (minLv<=data.BGM[i].level.normal&&data.BGM[i].level.normal<=maxLv) {
              x.name = data.BGM[i].name+' - Lv.'+data.BGM[i].level.normal;
              x.notes = data.BGM[i].notes.normal;
              x.level = data.BGM[i].level.normal;
              list.push(x);
            }
          }
        } else if (diff=='2') {
          if (data.BGM[i].notes.hard!=undefined) {
            if (minLv <= data.BGM[i].level.hard && data.BGM[i].level.hard <= maxLv) {
              x.name = data.BGM[i].name + ' - Lv.' + data.BGM[i].level.hard;
              x.notes = data.BGM[i].notes.hard;
              x.level = data.BGM[i].level.hard;
              list.push(x);
            }
          }
        } else if (diff=='3') {
          if (data.BGM[i].notes.expert!=undefined) {
            if (minLv <= data.BGM[i].level.expert && data.BGM[i].level.expert <= maxLv) {
              var sub = '';
              if (data.BGM[i].sheet != undefined && data.BGM[i].sheet.expert != undefined) {
                sub = '[シート分析対応]';
              }
              x.name = data.BGM[i].name + ' - Lv.' + data.BGM[i].level.expert + ' ' + sub;
              x.notes = data.BGM[i].notes.expert;
              x.level = data.BGM[i].level.expert;
              list.push(x);
            }
          }
        } else if (diff=='4') {
          if (data.BGM[i].notes.special!=undefined) {
            if (minLv <= data.BGM[i].level.special && data.BGM[i].level.special <= maxLv) {
              var sub = '';
              if (data.BGM[i].sheet != undefined && data.BGM[i].sheet.special != undefined) {
                sub = '[シート分析対応]';
              }
              x.name = data.BGM[i].name + ' - Lv.' + data.BGM[i].level.special + ' ' + sub;
              x.notes = data.BGM[i].notes.special;
              x.level = data.BGM[i].level.special;
              list.push(x);
            }
          }
        }
    }
    if (sortType=='diff-up') {
      list.sort(function(a,b){
        if (a.band > b.band) {
          return 1;
        } else {
          return -1;
        }
      });
      list.sort(function(a,b){
        if (a.level > b.level) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    
    if (band != 100) {
      list = list.filter((item) => {
        return (item.band == band);
      });
      console.log('Sort BGM (band): '+band);
    }
    
    if (sortType=='diff-down') {
      list.sort(function(a,b){
        if (a.band > b.band) {
          return 1;
        } else {
          return -1;
        }
      });
      list.sort(function(a,b){
        if (a.level < b.level) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    if (sortType=='title-up') {
      list.sort(function(a,b){
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    if (sortType=='title-down') {
      list.sort(function(a,b){
        if (b.name > a.name) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    setBGM(list);
    setAP();
    document.getElementById('waiting').style.display = 'none';
  });
}