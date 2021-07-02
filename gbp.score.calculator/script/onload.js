window.onload = function init() {
    $.getJSON('database/BGM.json', (data) => {
        var select_bgm = document.getElementById("input_bgm");
        for (i=0; i<data.BGM.length; i++) {
            var option = document.createElement("option");
            option.text = data.BGM[i][0];
            option.value = data.BGM[i][1];
            select_bgm.appendChild(option);
        }
    });
    $.getJSON('database/SKILL.json', (data) => {
        var select_skill1 = document.getElementById("input_skill1");
        var select_skill2 = document.getElementById("input_skill2");
        var select_skill3 = document.getElementById("input_skill3");
        var select_skill4 = document.getElementById("input_skill4");
        var select_skill5 = document.getElementById("input_skill5");
        for (i=0; i<data.SKILL.length; i++) {
            var option = document.createElement("option");
            option.text = data.SKILL[i][0];
            option.value = data.SKILL[i][1];
            select_skill1.appendChild(option);
            select_skill2.appendChild(option);
            select_skill3.appendChild(option);
            select_skill4.appendChild(option);
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
            select_skilltime1.appendChild(option);
            select_skilltime2.appendChild(option);
            select_skilltime3.appendChild(option);
            select_skilltime4.appendChild(option);
            select_skilltime5.appendChild(option);
        }
    });
};