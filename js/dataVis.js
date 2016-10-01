var data;

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "h2data.json", true);
oReq.send();

function reqListener(e) {
    data = JSON.parse(this.responseText);
}

function getVal(dataArr) {
    console.log(data[0].case_no);
}
