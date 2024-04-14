
// function openAddModal(){
//     var model = document.getElementById("addNoteModal");
//     var closeSpan = document.getElementById("closeAdd");
//     var cancelButton = document.getElementById("cancelAddNoteBtn"); 
//     clearAddModal()
//     model.style.display = "block";
//     closeSpan.onclick = ()=>{
//         model.style.display="none";
//     }
//     cancelButton.onclick = ()=>{
//         model.style.display="none";
//     }
// }
// function clearAddModal(){
//     document.getElementById("addTitle").value = " ";
//     document.getElementById("Content").value = " ";
//     document.getElementById("addError").innerHTML=" ";
// }
// function saveNewNote(){
//     const titleStr = document.getElementById("addTitle").value;
//     const contentStr = document.getElementById("addContent").value;
//     const noteData = {title: titleStr , content : contentStr};
//     addNote(noteData).then(response=>{
//         if(response.ok){
//             var model = document.getElementById("addNoteModal");
//             model.style.display="none";
//             updateNotesTable();
//         }else{
//             response.text().then(error=>{
//             document.getElementById("addError").innerHTML= error;
//             })
//             }
//     })
//     .catch(error=>{
//         console.log(error);
//         document.getElementById("addError").innerHTML= error;

//     })

// }
// function openEditModal(noteId){
//     var model = document.getElementById("editNoteModal");
//     var closeSpan = document.getElementById("closeEdit");
//     var cancelButton = document.getElementById("cancelEditNoteBtn"); 
//     clearAddModal()
//     model.style.display = "block";
//     closeSpan.onclick = ()=>{
//         model.style.display="none";
//     }
//     cancelButton.onclick = ()=>{
//         model.style.display="none";
//     }
//    loadNoteData(noteId);

// }

// function loadNoteData(noteId){
//     getNoteById(noteId).then(data=>{
//         document.getElementById("editTitle").value = data["title"];
//         document.getElementById("editContent").value = data["content"];
//     })

// }
function openAddModal() {
    var model = document.getElementById("addNoteModal");
    var closeSpan = document.getElementById("closeAdd");
    var cancelButton = document.getElementById("cancelAddNoteBtn");

    // Check if modal and buttons exist
    if (model && closeSpan && cancelButton) {
        clearAddModal();
        model.style.display = "block";

        closeSpan.onclick = () => {
            model.style.display = "none";
        };

        cancelButton.onclick = () => {
            model.style.display = "none";
        };
    } else {
        console.error("One or more elements not found.");
    }
}

function clearAddModal() {
    var addTitleInput = document.getElementById("addTitle");
    var addContentInput = document.getElementById("addContent");
    var addError = document.getElementById("addError");

    // Check if inputs and error element exist
    if (addTitleInput && addContentInput && addError) {
        addTitleInput.value = "";
        addContentInput.value = "";
        addError.innerHTML = "";
    } else {
        console.error("One or more elements not found.");
    }
}

function saveNewNote() {
    const titleStr = document.getElementById("addTitle").value;
    const contentStr = document.getElementById("addContent").value;
    const noteData = { title: titleStr, content: contentStr };

    addNote(noteData)
        .then(response => {
            if (response.ok) {
                var model = document.getElementById("addNoteModal");
                if (model) {
                    model.style.display = "none";
                    response.json().then(json=>{
                        var newNoteId = json["_id"];
                        updateNotesTable(newNoteId);

                    })
                    
                }
            } else {
                response.text().then(error => {
                    var addError = document.getElementById("addError");
                    if (addError) {
                        addError.innerHTML = error;
                    }
                });
            }
        })
        .catch(error => {
            console.error(error);
            var addError = document.getElementById("addError");
            if (addError) {
                addError.innerHTML = error;
            }
        });
}

function openEditModal(noteId) {
    var model = document.getElementById("editNoteModal");
    var closeSpan = document.getElementById("closeEdit");
    var cancelButton = document.getElementById("cancelEditNoteBtn");

    // Check if modal and buttons exist
    if (model && closeSpan && cancelButton) {
        clearAddModal();
        model.style.display = "block";

        closeSpan.onclick = () => {
            model.style.display = "none";
        };

        cancelButton.onclick = () => {
            model.style.display = "none";
        };

        loadNoteData(noteId);
    } else {
        console.error("One or more elements not found.");
    }
}

function loadNoteData(noteId) {
    var modal = document.getElementById("editNoteModal");
    var nodeIdAttribute = document.createAttribute("noteId");
    nodeIdAttribute.value = noteId;
    modal.setAttributeNode(nodeIdAttribute);
    getNoteById(noteId)
        .then(data => {
            var editTitleInput = document.getElementById("editTitle");
            var editContentInput = document.getElementById("editContent");

            // Check if inputs exist
            if (editTitleInput && editContentInput) {
                editTitleInput.value = data["title"];
                editContentInput.value = data["content"];
            } else {
                console.error("One or more elements not found.");
            }
        })
        .catch(error => {
            console.error(error);
        });
        
}
function saveEditNote(){
    var modal = document.getElementById("editNoteModal");
    const noteId = modal.getAttribute("noteId")
    const titleStr = document.getElementById("editTitle").value;
    const contentStr = document.getElementById("editContent").value;
    const noteData = {_id:noteId, title: titleStr, content:contentStr};
    updateNote(noteData).then(response=>{
        if(response.ok){
          var modal = document.getElementById("editNoteModal");
          modal.style.display = "none";
          updateNotesTable(noteId);  
        }else{
            response.text().then(error=>{
                document.getElementById("editError").innerHTML=error;
            })
        }
    }).catch(error=>{
        document.getElementById("editError").innerHTML=error;
    })

}
