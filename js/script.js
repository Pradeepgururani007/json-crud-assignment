let flag = 0; 
var currentData;
if (localStorage.getItem("jsonData") === null) {
    var dataJson =  [  
        {"id":"1","name":"Ram", "email":"Ram@gmail.com","contact":123456784},
        {"id":"2","name":"Rama", "email":"Rama@gmail.com","contact":123456785},
        {"id":"3","name":"Ramesh", "email":"Ramesh@gmail.com","contact":123456786},
        {"id":"4","name":"Ram1", "email":"Ram1@gmail.com","contact":123456787},
        {"id":"5","name":"Ram2", "email":"Ram2@gmail.com","contact":123456788},
        {"id":"6","name":"Ram3", "email":"Ram3@gmail.com","contact":123456789},
        {"id":"7","name":"Ram4", "email":"Ram4@gmail.com","contact":123456782},
        {"id":"8","name":"Ram5", "email":"Ram5@gmail.com","contact":123456781},  
        {"id":"9","name":"Bob", "email":"bob32@gmail.com","contact":123456783}  
    ];
  }
  else{
     var dataJson = JSON.parse(localStorage.getItem("jsonData"));
  }

var mainDiv = document.getElementById("main");
var forThead = [];
function showData(){
        for (var i = 0; i < dataJson.length; i++) {
            for (var key in dataJson[i]) {
                if (forThead.indexOf(key) === -1) {
                    forThead.push(key);
                }
            }
        }

        var table = document.createElement("table");
        var tr = table.insertRow(-1); 

        for (var i = 0; i < forThead.length; i++) {
            var th = document.createElement("th");     
            th.innerHTML = forThead[i];
            tr.appendChild(th);
        }

        for (var i = 0; i < dataJson.length; i++) {
            tr = table.insertRow(-1);
            for (var j = 0; j < forThead.length; j++) {
                var tc = tr.insertCell(-1);
                tc.innerHTML = dataJson[i][forThead[j]];                         
            }                       
        } 
        mainDiv.appendChild(table);
}
showData();

//validate ID
function validateId(valId){
    let auth = false;
    for (var i = 0; i < dataJson.length; i++) {
        if (valId == dataJson[i].id){
            auth = true;
        }
        else{
            auth = false;
        }
    }
    return auth;
}

//new data
function insertNew(){
    if(flag == 0){
        let values = {id:$('#pid').val(),name:$('#name').val(),email:$('#mail').val(),contact:$('#num').val()};
        valToCheck = $('#pid').val();

        if(validateId(valToCheck) == false){            
            dataJson.push(values);
            localStorage.setItem('jsonData', JSON.stringify(dataJson));
            alert("inserted successfully");
            location.reload();
            flag++;
        }
        else{
            alert('this id is not available');
            location.reload();
        }
    }
    else{
        alert("you already added this data");
    }
    return false;
}

function update(upd,uKey){
            for (let i=0; i< dataJson.length; i++){
                if(uKey == dataJson[i].id){
                    dataJson[i].name = upd.name;
                    dataJson[i].email = upd.email;
                    dataJson[i].contact =upd.contact;
                }
            }
            localStorage.setItem('jsonData', JSON.stringify(dataJson));  
    // return false;
}

//delete element
function deleteElem(elem){
    if(flag == 0){
        for(let i=0;i<dataJson.length;i++){
            if(dataJson[i].id == elem){
                dataJson.splice(i,1);           
            }                   
        }
        flag++;
        localStorage.setItem('jsonData', JSON.stringify(dataJson));
        alert('deleted successfully');
        location.reload();    
    }
    else{
        alert('you already deleted that ID')
    }
    return false;
}

//append action
$('#main  table tbody tr:first-of-type').append("<th class='action' colspan='2'>action</th>"); 
$('#main table tbody tr:not(:first-child)').each(function(){
	$(this).append("<td class='update'>edit</td><td class='del' onclick=''>delete</td>");
});

//delete option
$('.del').click(function(){
    let delValue = $(this).siblings().first().html();
    if(confirm("Are you sure about this..?")){
        deleteElem(delValue);
    }
    else{
        window.location.reload;
    }    
    return false;
});

//update
$('.update').click(function(){
    var editVal = $(this).siblings().first().html();
    currentData = $(this);
    $('.edit-modal').toggleClass('on');

    $('#uid').val(editVal);
    for (var i = 0; i < dataJson.length; i++) {
        if (editVal == dataJson[i].id){
            $('#uname').val(dataJson[i].name);        
            $('#umail').val(dataJson[i].email);
            $('#ucont').val(dataJson[i].contact);
        }
    }    
    return false;
});
$(' #updateForm').click(function(){
    var updVal = {id:$('#uid').val(),name:$('#uname').val(),email:$('#umail').val(),contact:$('#ucont').val()};    
    currentData.siblings().first().next().html(updVal.name);
    currentData.siblings().first().next().next().html(updVal.email);
    currentData.siblings().first().next().next().next().html(updVal.contact);
    update(updVal,$('#uid').val());
    $('.edit-modal').removeClass('on');
    return false;
});


$('#esc').click(function(){
    $('.edit-modal').removeClass('on');
    return false;
});

