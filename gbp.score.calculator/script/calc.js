function calc() {
    var bgm = document.getElementById('input_bgm').value;
    $.getJSON('database/BGM.json', (data) => {
        var select_bgm = document.getElementById("input_bgm");
        for (i=0; i<data.BGM.length; i++) {
            if (bgm==data.BGM[i].id) {
                var level = data.BGM[i].level;
                var notes = data.BGM[i].notes;
                var diffCoe = (level-5)*0.01+1;
                $("#output_diff").html(level);
                $("#output_totalNotes").html(notes);
                $("#output_diffCoe").html(diffCoe);
                var maxCombo = $("#input_maxCombo").value();
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
                $("#output_comboCoe").html(comboCoe);
            }
        }
    });
}