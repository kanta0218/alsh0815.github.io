window.onload = function init() {
    $.getJSON('database/BGM.json', (data) => {
        var select = document.getElementById("input_bgm");
        for (i=0; i<data.BGM.length; i++) {
            var option = document.createElement("option");
            option.text = data.BGM[i][0];
            option.value = data.BGM[i][1];
            select.appendChild(option);
        }
    });
};