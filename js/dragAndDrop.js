let placeHolders = document.getElementById("place-holders");
let placeholderImage = document.getElementById("placeholder-image");

let dropArea = document.getElementById('drop-area');
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

;
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
})

;
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
    dropArea.classList.add('highlight')
    placeHolders.style.borderColor = "green";
    placeholderImage.style.opacity = null;
    placeholderImage.classList.add("image-hovered");
    placeHolders.style.color = "green";
}

function unhighlight(e) {
    dropArea.classList.remove('highlight')
    placeholderImage.classList.remove("image-hovered");
    placeHolders.style.borderColor = "gray";
    placeHolders.style.color = "black";
}

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files
        // alert(e.dataTransfer.readAsDataURL);
    handleFiles(files);
}

function handleFiles(files) {
    // ([...files]).forEach(uploadFile)
    files = [...files]
    files.forEach(previewFile)
}

function previewFile(file) {
    // alert("I have been called");
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
        placeholderImage.src = reader.result
        placeholderImage.style.width = "300px"
        let placeholderText = document.getElementById("placeholder-text")
        placeholderText.style.display = "none"
    }
}