

function save_options() {
    var selectedEngine = document.getElementsByClassName('searchengine');
    var textToAppend = document.getElementById("append");
    var textToPrepend = document.getElementById("prepend");
    console.log(textToAppend.value);
    for (var i=0, len=selectedEngine.length; i<len; i++) {
        if(selectedEngine[i].checked){
            console.log(selectedEngine[i].value);
            chrome.storage.sync.set({
                selectedEngine: selectedEngine[i].value,
                appendText: textToAppend.value,
                prependText: textToPrepend.value
            });
        }
        }
    }

function restore_options() {
    console.log("restoring");
    chrome.storage.sync.get({
        selectedEngine: 'Google',
        appendText: '',
        prependText:''
    }, function(items) {
        console.log(items);
        var selectedEngine = document.getElementsByClassName('searchengine');
        for(i=0;i<selectedEngine.length;i++){
            if(items.selectedEngine == selectedEngine[i].value){
                selectedEngine[i].checked = true;
            }
        }
        document.getElementById('append').value = items.appendText;
        document.getElementById('prepend').value = items.prependText;
    });
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);