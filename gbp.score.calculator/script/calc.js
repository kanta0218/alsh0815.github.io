var skillCoe1, skillCoe2, skillCoe3, skillCoe4, skillCoe5 = 0;

function comma(num) {
    return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

function getComboCoe(maxCombo) {
  var comboCoe = 1;
  if (20 < maxCombo) { comboCoe = 1.01; }
  if (50 < maxCombo) { comboCoe = 1.02; }
  if (100 < maxCombo) { comboCoe = 1.03; }
  if (150 < maxCombo) { comboCoe = 1.04; }
  if (200 < maxCombo) { comboCoe = 1.05; }
  if (250 < maxCombo) { comboCoe = 1.06; }
  if (300 < maxCombo) { comboCoe = 1.07; }
  if (400 < maxCombo) { comboCoe = 1.08; }
  if (500 < maxCombo) { comboCoe = 1.09; }
  if (600 < maxCombo) { comboCoe = 1.10; }
  if (700 < maxCombo) { comboCoe = 1.11; }
  return comboCoe;
}

function getSkillCoe(id, callback) {
  $.getJSON('database/SKILL.json', (data) => {
    for (i = 0; i < data.SKILL.length; i++) {
      if (id == data.SKILL[i][1]) {
        callback(data.SKILL[i][2]);
      }
    }
  });
  return 0;
}

function getSkillTime(time) {
  return parseInt(time.replace("秒", ""));
}

function setAP() {
  var tf = document.getElementById('set_ap').checked;
  if (tf==true) {
    var bgm = document.getElementById('input_bgm').value;
    $.getJSON('database/BGM.json', (data) => {
      for (i = 0; i < data.BGM.length; i++) {
        if (bgm == data.BGM[i].id) {
          document.getElementById('input_maxCombo').value = data.BGM[i].notes;
          document.getElementById('input_perfectNotes').value = data.BGM[i].notes;
          document.getElementById('input_greatNotes').value = '0';
          document.getElementById('input_goodNotes').value = '0';
        }
      }
    });
  }
}

function calc () {
  document.getElementById('waiting').style.display = 'block';
  var bgm = document.getElementById('input_bgm').value;
  $.getJSON('database/BGM.json', function(data) {
    for (i = 0; i < data.BGM.length; i++) {
      if (bgm == data.BGM[i].id) {
        var level = data.BGM[i].level;
        var notes = data.BGM[i].notes;
        var time = data.BGM[i].time;
        var diffCoe = (level - 5) * 0.01 + 1;
        var compPower = document.getElementById('input_CompPower').value;
        var compPower_theo = 300000; // 理論値バンド総合力
        var notePsec = notes / time;
        $("#output_nps").html(notePsec);
        
        var perfectNotes = parseInt(document.getElementById('input_perfectNotes').value);
        var greatNotes = parseInt(document.getElementById('input_greatNotes').value);
        var goodNotes = parseInt(document.getElementById('input_goodNotes').value);
        var missNotes = notes - (perfectNotes + greatNotes + goodNotes);
        var perfectNP = perfectNotes / notes;
        $("#output_perfectNP").html(perfectNP.toFixed(3));
        var greatNP = greatNotes / notes;
        $("#output_greatNP").html(greatNP.toFixed(3));
        var goodNP = goodNotes / notes;
        $("#output_goodNP").html(goodNP.toFixed(3));
        var judgeCoe = 1.1 * perfectNP + 0.8 * greatNP + 0.5 * goodNP;
        $("#output_judgeCoe").html(judgeCoe.toFixed(3));
        $("#output_diff").html(level);
        $("#output_totalNotes").html(notes);
        $("#output_diffCoe").html(diffCoe.toFixed(2));
        
        getSkillCoe(document.getElementById('input_skill1').value, function(skillCoe1) {
          getSkillCoe(document.getElementById('input_skill2').value, function(skillCoe2) {
            getSkillCoe(document.getElementById('input_skill3').value, function(skillCoe3) {
              getSkillCoe(document.getElementById('input_skill4').value, function(skillCoe4) {
                getSkillCoe(document.getElementById('input_skill5').value, function(skillCoe5) {
                  var basicScore_AP = 0; // スキル無しAP
                  var basicScore_SAP = 0; // スキル有りAP
                  var basicScore_preMin = 0; // 最小予測スコア
                  var basicScore_preMax = 0; // 最大予測スコア
                  var basicScore_Theo = 0; // 理論値
                  
                  var noteScore = compPower * 3 * diffCoe / notes * 1.1;
                  var noteScore_GR = compPower * 3 * diffCoe / notes * 0.8;
                  var noteScore_GD = compPower * 3 * diffCoe / notes * 0.5;
                  var noteScore_theo = compPower_theo * 3 * diffCoe / notes * 1.1;
                  // スコア計算 (スキル無しAP)
                  for (ii = 0; ii < notes; ii++) {
                    basicScore_AP = basicScore_AP + (noteScore * getComboCoe(ii));
                  }
                  // スコア計算 (スキル有りAP)
                  var skillTime1 = getSkillTime(document.getElementById('input_skillTime1').value);
                  var skillTime2 = getSkillTime(document.getElementById('input_skillTime2').value);
                  var skillTime3 = getSkillTime(document.getElementById('input_skillTime3').value);
                  var skillTime4 = getSkillTime(document.getElementById('input_skillTime4').value);
                  var skillTime5 = getSkillTime(document.getElementById('input_skillTime5').value);
                  var totalSkillTime = skillTime1 + skillTime2 + skillTime3 + skillTime4 + skillTime5 + skillTime1;
                  var normalNotesNum = (notes - (notePsec * totalSkillTime)).toFixed(0);
                  var skillTiming = parseInt((notes / 6).toFixed(0)); // 総ノーツ数 ÷ 6回
                  var STim_1st = parseInt(skillTiming - (notePsec * 12).toFixed(0)); // スキル間隔 - (ノーツ毎秒 × 12秒)
                  var SETim_1st = STim_1st + parseInt((notePsec * skillTime1).toFixed(0));
                  var STim_2nd = STim_1st + skillTiming;
                  var SETim_2nd = STim_2nd + parseInt((notePsec * skillTime2).toFixed(0));
                  var STim_3rd = STim_2nd + skillTiming;
                  var SETim_3rd = STim_3rd + parseInt((notePsec * skillTime3).toFixed(0));
                  var STim_4th = STim_3rd + skillTiming;
                  var SETim_4th = STim_4th + parseInt((notePsec * skillTime4).toFixed(0));
                  var STim_5th = STim_4th + skillTiming;
                  var SETim_5th = STim_5th + parseInt((notePsec * skillTime5).toFixed(0));
                  var STim_6th = STim_5th + skillTiming;
                  var SETim_6th = STim_6th + parseInt((notePsec * skillTime1).toFixed(0));
                  for (iii = 0; iii < notes; iii++) {
                    if (STim_1st <= iii && iii <= SETim_1st) {
                      basicScore_SAP = basicScore_SAP + (noteScore * getComboCoe(iii) * (1 + skillCoe1));
                    } else if (STim_2nd <= iii && iii <= SETim_2nd) {
                      basicScore_SAP = basicScore_SAP + (noteScore * getComboCoe(iii) * (1 + skillCoe2));
                    } else if (STim_3rd <= iii && iii <= SETim_3rd) {
                      basicScore_SAP = basicScore_SAP + (noteScore * getComboCoe(iii) * (1 + skillCoe3));
                    } else if (STim_4th <= iii && iii <= SETim_4th) {
                      basicScore_SAP = basicScore_SAP + (noteScore * getComboCoe(iii) * (1 + skillCoe4));
                    } else if (STim_5th <= iii && iii <= SETim_5th) {
                      basicScore_SAP = basicScore_SAP + (noteScore * getComboCoe(iii) * (1 + skillCoe5));
                    } else if (STim_6th <= iii && iii <= SETim_6th) {
                      basicScore_SAP = basicScore_SAP + (noteScore * getComboCoe(iii) * (1 + skillCoe1));
                    } else {
                      basicScore_SAP = basicScore_SAP + (noteScore * getComboCoe(iii));
                    }
                  }
                  for (v = 0; v < greatNotes; v++) {
                    if (STim_1st <= v && v <= SETim_1st) {
                      basicScore_preMax = basicScore_preMax + (noteScore_GR * getComboCoe(v) * (1 + skillCoe1));
                    } else if (STim_2nd <= v && v <= SETim_2nd) {
                      basicScore_preMax = basicScore_preMax + (noteScore_GR * getComboCoe(v) * (1 + skillCoe2));
                    } else if (STim_3rd <= v && v <= SETim_3rd) {
                      basicScore_preMax = basicScore_preMax + (noteScore_GR * getComboCoe(v) * (1 + skillCoe3));
                    } else if (STim_4th <= v && v <= SETim_4th) {
                      basicScore_preMax = basicScore_preMax + (noteScore_GR * getComboCoe(v) * (1 + skillCoe4));
                    } else if (STim_5th <= v && v <= SETim_5th) {
                      basicScore_preMax = basicScore_preMax + (noteScore_GR * getComboCoe(v) * (1 + skillCoe5));
                    } else if (STim_6th <= v && v <= SETim_6th) {
                      basicScore_preMax = basicScore_preMax + (noteScore_GR * getComboCoe(v) * (1 + skillCoe1));
                    } else {
                      basicScore_preMax = basicScore_preMax + (noteScore_GR * getComboCoe(v));
                    }
                  }
                  for (vi = 0; vi < goodNotes; vi++) {
                    if (STim_1st <= vi && vi <= SETim_1st) {
                      basicScore_preMax = basicScore_preMax + (noteScore_GD * getComboCoe(vi) * (1 + skillCoe1));
                    } else if (STim_2nd <= vi && vi <= SETim_2nd) {
                      basicScore_preMax = basicScore_preMax + (noteScore_GD * getComboCoe(vi) * (1 + skillCoe2));
                    } else if (STim_3rd <= vi && vi <= SETim_3rd) {
                      basicScore_preMax = basicScore_preMax + (noteScore_GD * getComboCoe(vi) * (1 + skillCoe3));
                    } else if (STim_4th <= vi && vi <= SETim_4th) {
                      basicScore_preMax = basicScore_preMax + (noteScore_GD * getComboCoe(vi) * (1 + skillCoe4));
                    } else if (STim_5th <= vi && vi <= SETim_5th) {
                      basicScore_preMax = basicScore_preMax + (noteScore_GD * getComboCoe(vi) * (1 + skillCoe5));
                    } else if (STim_6th <= vi && vi <= SETim_6th) {
                      basicScore_preMax = basicScore_preMax + (noteScore_GD * getComboCoe(vi) * (1 + skillCoe1));
                    } else {
                      basicScore_preMax = basicScore_preMax + (noteScore_GD * getComboCoe(vi));
                    }
                  }
                  for (vii = 0; vii < missNotes; vii++) {
                    basicScore_preMax = basicScore_preMax - noteScore;
                  }
                  
                  // スコア計算 (予測値)
                  console.log("miss: "+missNotes+' '+notes+' '+(perfectNotes+greatNotes+goodNotes));
                  for (iv = 0; iv < perfectNotes; iv++) {
                    if (STim_1st <= iv && iv <= SETim_1st) {
                      basicScore_preMax = basicScore_preMax + (noteScore * getComboCoe(iv) * (1 + skillCoe1));
                    } else if (STim_2nd <= iv && iv <= SETim_2nd) {
                      basicScore_preMax = basicScore_preMax + (noteScore * getComboCoe(iv) * (1 + skillCoe2));
                    } else if (STim_3rd <= iv && iv <= SETim_3rd) {
                      basicScore_preMax = basicScore_preMax + (noteScore * getComboCoe(iv) * (1 + skillCoe3));
                    } else if (STim_4th <= iv && iv <= SETim_4th) {
                      basicScore_preMax = basicScore_preMax + (noteScore * getComboCoe(iv) * (1 + skillCoe4));
                    } else if (STim_5th <= iv && iv <= SETim_5th) {
                      basicScore_preMax = basicScore_preMax + (noteScore * getComboCoe(iv) * (1 + skillCoe5));
                    } else if (STim_6th <= iv && iv <= SETim_6th) {
                      basicScore_preMax = basicScore_preMax + (noteScore * getComboCoe(iv) * (1 + skillCoe1));
                    } else {
                      basicScore_preMax = basicScore_preMax + (noteScore * getComboCoe(iv));
                    }
                  }
                  
                  // スコア計算 (理論値)
                  var skillTime_theo = 7;
                  var skillCoe_theo = [1.15, 1.15, 1.20, 1.20, 1.25];
                  var totalSkillTime_theo = skillTime_theo * 6;
                  var normalNotesNum_theo = (notes - (notePsec * totalSkillTime_theo)).toFixed(0);
                  var STim_1st_theo = parseInt(skillTiming - (notePsec * 12).toFixed(0)); // スキル間隔 - (ノーツ毎秒 × 12秒)
                  var SETim_1st_theo = STim_1st_theo + parseInt((notePsec * skillTime_theo).toFixed(0));
                  var STim_2nd_theo = STim_1st_theo + skillTiming;
                  var SETim_2nd_theo = STim_2nd_theo + parseInt((notePsec * skillTime_theo).toFixed(0));
                  var STim_3rd_theo = STim_2nd_theo + skillTiming;
                  var SETim_3rd_theo = STim_3rd_theo + parseInt((notePsec * skillTime_theo).toFixed(0));
                  var STim_4th_theo = STim_3rd_theo + skillTiming;
                  var SETim_4th_theo = STim_4th_theo + parseInt((notePsec * skillTime_theo).toFixed(0));
                  var STim_5th_theo = STim_4th_theo + skillTiming;
                  var SETim_5th_theo = STim_5th_theo + parseInt((notePsec * skillTime_theo).toFixed(0));
                  var STim_6th_theo = STim_5th_theo + skillTiming;
                  var SETim_6th_theo = STim_6th_theo + parseInt((notePsec * skillTime_theo).toFixed(0));
                  for (iii = 0; iii < notes; iii++) {
                    if (STim_1st_theo <= iii && iii <= SETim_1st_theo) {
                      basicScore_Theo = basicScore_Theo + (noteScore_theo * getComboCoe(iii) * (1 + skillCoe_theo[0]));
                    } else if (STim_2nd_theo <= iii && iii <= SETim_2nd_theo) {
                      basicScore_Theo = basicScore_Theo + (noteScore_theo * getComboCoe(iii) * (1 + skillCoe_theo[1]));
                    } else if (STim_3rd_theo <= iii && iii <= SETim_3rd_theo) {
                      basicScore_Theo = basicScore_Theo + (noteScore_theo * getComboCoe(iii) * (1 + skillCoe_theo[2]));
                    } else if (STim_4th_theo <= iii && iii <= SETim_4th_theo) {
                      basicScore_Theo = basicScore_Theo + (noteScore_theo * getComboCoe(iii) * (1 + skillCoe_theo[3]));
                    } else if (STim_5th_theo <= iii && iii <= SETim_5th_theo) {
                      basicScore_Theo = basicScore_Theo + (noteScore_theo * getComboCoe(iii) * (1 + skillCoe_theo[4]));
                    } else if (STim_6th_theo <= iii && iii <= SETim_6th_theo) {
                      basicScore_Theo = basicScore_Theo + (noteScore_theo * getComboCoe(iii) * (1 + skillCoe_theo[4]));
                    } else {
                      basicScore_Theo = basicScore_Theo + (noteScore_theo * getComboCoe(iii));
                    }
                  }
                  
                  console.log("1st skill: "+STim_1st+" - "+SETim_1st);
                  console.log('2nd skill: '+STim_2nd+' - '+SETim_2nd);
                  console.log('3rd skill: '+STim_3rd+' - '+SETim_3rd);
                  console.log('4th skill: '+STim_4th+' - '+SETim_4th);
                  console.log('5th skill: '+STim_5th+' - '+SETim_5th);
                  console.log('6th skill: '+STim_6th+' - '+SETim_6th);
                  
                  var theoretical = basicScore_preMax / basicScore_Theo * 100;
                  var ap_rate = basicScore_preMax / basicScore_SAP * 100;
                  $("#output_bScore").html(comma(basicScore_AP.toFixed(0)));
                  $("#output_apScore").html(comma(basicScore_SAP.toFixed(0)));
                  $("#output_fScore").html(comma(basicScore_preMax.toFixed(0)));
                  $("#output_theoScore").html(comma(basicScore_Theo.toFixed(0)));
                  $("#output_theoretical").html(theoretical.toFixed(5)+'%');
                  $("#output_achievementRate").html(ap_rate.toFixed(5)+'%');
                  
                  document.getElementById('waiting').style.display = 'none';
                });
              });
            });
          });
        });
      }
    }
  });
}