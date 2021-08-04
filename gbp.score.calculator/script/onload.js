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
        for (i=0; i<data.TIME.length; i++) {
            var option = document.createElement("option");
            option.text = data.TIME[i];
            option.value = data.TIME[i];
            select_skilltime1.appendChild(option);
        }
        var select_skilltime2 = document.getElementById("input_skillTime2");
        for (i=0; i<data.TIME.length; i++) {
            var option = document.createElement("option");
            option.text = data.TIME[i];
            option.value = data.TIME[i];
            select_skilltime2.appendChild(option);
        }
        var select_skilltime3 = document.getElementById("input_skillTime3");
        for (i=0; i<data.TIME.length; i++) {
            var option = document.createElement("option");
            option.text = data.TIME[i];
            option.value = data.TIME[i];
            select_skilltime3.appendChild(option);
        }
        var select_skilltime4 = document.getElementById("input_skillTime4");
        for (i=0; i<data.TIME.length; i++) {
            var option = document.createElement("option");
            option.text = data.TIME[i];
            option.value = data.TIME[i];
            select_skilltime4.appendChild(option);
        }
        var select_skilltime5 = document.getElementById("input_skillTime5");
        for (i=0; i<data.TIME.length; i++) {
            var option = document.createElement("option");
            option.text = data.TIME[i];
            option.value = data.TIME[i];
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
  var list = [];
  $.getJSON('database/BGM.json', (data) => {
    for (i=0; i<data.BGM.length; i++) {
      if (minLv<=data.BGM[i].level&&data.BGM[i].level<=maxLv) {
        var x = {
          name:data.BGM[i].name,
          id:data.BGM[i].id,
          time:data.BGM[i].time,
          notes:data.BGM[i].notes,
          level:data.BGM[i].level
        };
        list.push(x);
      }
    }
    if (sortType=='diff-up') {
      list.sort(function(a,b){
        if (a.level > b.level) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    if (sortType=='diff-down') {}
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
    document.getElementById('waiting').style.display = 'none';
  });
}