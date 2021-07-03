function getComboCoe(maxCombo) {
    var comboCoe = 1;
    if (20<maxCombo) { comboCoe = 1.01; }
    if (50<maxCombo) { comboCoe = 1.02; }
    if (100<maxCombo) { comboCoe = 1.03; }
    if (150<maxCombo) { comboCoe = 1.04; }
    if (200<maxCombo) { comboCoe = 1.05; }
    if (250<maxCombo) { comboCoe = 1.06; }
    if (300<maxCombo) { comboCoe = 1.07; }
    if (400<maxCombo) { comboCoe = 1.08; }
    if (500<maxCombo) { comboCoe = 1.09; }
    if (600<maxCombo) { comboCoe = 1.10; }
    if (700<maxCombo) { comboCoe = 1.11; }
    if (800<maxCombo) { comboCoe = 1.12; }
    if (900<maxCombo) { comboCoe = 1.13; }
    if (1000<maxCombo) { comboCoe = 1.14; }
    if (1100<maxCombo) { comboCoe = 1.15; }
    if (1200<maxCombo) { comboCoe = 1.16; }
    if (1300<maxCombo) { comboCoe = 1.17; }
    if (1400<maxCombo) { comboCoe = 1.18; }
    if (1500<maxCombo) { comboCoe = 1.19; }
    return comboCoe;
}

function getSkillCoe(id) {
    $.getJSON('database/SKILL.json', (data) => {
        for (i=0; i<data.SKILL.length; i++) {
            if (id==data.SKILL[i][1]) {
                return data.SKILL[i][2];
            }
        }
    });
    return 0;
}

function getSkillTime(time) {
    return parseInt(time.replace("秒",""));
}

function calc() {
    var bgm = document.getElementById('input_bgm').value;
    $.getJSON('database/BGM.json', (data) => {
        for (i=0; i<data.BGM.length; i++) {
            if (bgm==data.BGM[i].id) {
                var level = data.BGM[i].level;
                var notes = data.BGM[i].notes;
                var time = data.BGM[i].time;
                var diffCoe = (level-5)*0.01+1;
                $("#output_diff").html(level);
                $("#output_totalNotes").html(notes);
                $("#output_diffCoe").html(diffCoe.toFixed(2));
                var maxCombo = document.getElementById('input_maxCombo').value;
                var comboCoe = getComboCoe(maxCombo);
                $("#output_comboCoe").html(comboCoe.toFixed(2));
                var perfectNP = document.getElementById('input_perfectNotes').value / notes;
                $("#output_perfectNP").html(perfectNP.toFixed(3));
                var greatNP = document.getElementById('input_greatNotes').value / notes;
                $("#output_greatNP").html(greatNP.toFixed(3));
                var goodNP = document.getElementById('input_goodNotes').value / notes;
                $("#output_goodNP").html(goodNP.toFixed(3));
                var judgeCoe = 1.1*perfectNP + 0.8*greatNP + 0.5*goodNP;
                $("#output_judgeCoe").html(judgeCoe.toFixed(3));
                var compPower = document.getElementById('input_CompPower').value;
                var basicScore = compPower*3*diffCoe*1.1*comboCoe;
                var maxBasicScore = compPower*3*diffCoe*1.1*getComboCoe(notes);
                $("#output_bScore").html(basicScore.toFixed(0));
                var scorePnote = basicScore/notes;
                var maxScorePnote = maxBasicScore/notes;
                $("#output_spn").html(scorePnote.toFixed(2));
                var notesPsec = notes/time;
                $("#output_nps").html(notesPsec.toFixed(2));
                var skillCoe1 = getSkillCoe(document.getElementById('input_skill1'));
                var skillCoe2 = getSkillCoe(document.getElementById('input_skill2'));
                var skillCoe3 = getSkillCoe(document.getElementById('input_skill3'));
                var skillCoe4 = getSkillCoe(document.getElementById('input_skill4'));
                var skillCoe5 = getSkillCoe(document.getElementById('input_skill5'));
                var skillTime1 = getSkillTime(document.getElementById('input_skillTime1'));
                var skillTime2 = getSkillTime(document.getElementById('input_skillTime2'));
                var skillTime3 = getSkillTime(document.getElementById('input_skillTime3'));
                var skillTime4 = getSkillTime(document.getElementById('input_skillTime4'));
                var skillTime5 = getSkillTime(document.getElementById('input_skillTime5'));
                var notesWS = notesPsec*(skillTime1+skillTime2+skillTime3+skillTime4+skillTime5+skillTime1);
                $("output_notesWS").html(notesWS.toFixed(0));
                var fScore = basicScore+(skillCoe1+skillCoe2+skillCoe3+skillCoe4+skillCoe5+skillCoe1)/6*notesWS*scorePnote*(judgeCoe/1.1);
                $("#output_fScore").html(fScore.toFixed(0));
                var apScore = maxBasicScore+(skillCoe1+skillCoe2+skillCoe3+skillCoe4+skillCoe5+skillCoe1)/6*notesWS*maxScorePnote*(1.1/1.1);
                $("#output_apScore").html(apScore.toFixed(0));
            }
        }
    });
}