document.getElementById("textForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  var name = document.getElementById("name").value.trim();
  var subjectCode = document.getElementById("subjectCode").value.trim();
  var date = new Date().toLocaleDateString();
  var time = new Date().toLocaleTimeString();

  var textOutput = "https://example.com/link.php?name=" + encodeURIComponent(name) + "&Subject_Code=" + encodeURIComponent(subjectCode) + "&Date=" + encodeURIComponent(date) + "&Time=" + encodeURIComponent(time);

  var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: textOutput,
    width: 256,
    height: 256
  });

  document.getElementById("outputContainer").style.display = "block";

  var qrImage = document.querySelector("#qrcode img");
  var downloadButton = document.getElementById("downloadButton");
  var viewButton = document.getElementById("viewButton");

  qrImage.alt = "QR Code";
  qrImage.id = "qrImage"; // Add an ID to the image for easy access

  downloadButton.addEventListener("click", function() {
    var canvas = document.createElement("canvas");
    canvas.width = qrImage.width;
    canvas.height = qrImage.height;

    var context = canvas.getContext("2d");
    context.drawImage(qrImage, 0, 0);

    var link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = name + subjectCode + date.replace(/\s/g, "") + time.replace(/:/g, "") + ".png";
    link.click();
  });

  viewButton.addEventListener("click", function() {
    var newTab = window.open("", "_blank");
    newTab.document.write('<html><head><title>QR Code</title><style>body { margin: 0; display: flex; justify-content: center; align-items: center; background-color: #f0f0f0; }</style></head><body><img src="' + qrImage.src + '" alt="QR Code" style="max-width: 90vw; max-height: 90vh;"></body></html>');
    newTab.document.close();
  });

  document.getElementById("textOutput").textContent = textOutput;
});

function copyToClipboard() {
  var textOutput = document.getElementById("textOutput");

  var range = document.createRange();
  range.selectNode(textOutput);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();

  alert("Copied to clipboard!");
}
