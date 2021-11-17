window.addEventListener("DOMContentLoaded", function () {
    var email = document.getElementById("email");
    email.oninput = save;
    var nick = document.getElementById("nick");
    nick.oninput = save;
    var anotherInput = document.getElementById("anotherInput");
    anotherInput.oninput = save;
    var check = document.getElementById("check");
    check.onchange = save;

    email.value = localStorage.getItem("email");
    nick.value = localStorage.getItem("nick");
    anotherInput.value = localStorage.getItem("anotherInput");
    var q = localStorage.getItem("check");
    if (q==1) {
        check.checked = true;
    }
    if (q==0){
        check.checked = false;
    }
});

function save(){
  localStorage.setItem("email", email.value);
  localStorage.setItem("nick", nick.value);
  localStorage.setItem("anotherInput", anotherInput.value);
  if (check1.checked) {
      localStorage.setItem("check",1);
  }
  else {
      localStorage.setItem("check",0);
  }

}
$(function(){
    $(".ajaxForm").submit(function(e){
        e.preventDefault();
        var href = $(this).attr("action");
        $.ajax({
            type: "POST",
            dataType: "json",
            url: href,
            data: $(this).serialize(),
            success: function(response){
                if(response.status == "success"){
                    alert("Заявка отправлена !");
					localStorage.removeItem("email");
                    localStorage.removeItem("nick");
                    localStorage.removeItem("anotherInput");
					localStorage.removeItem("check");
					email.value = localStorage.getItem("email");
                    nick.value = localStorage.getItem("nick");
                    anotherInput.value = localStorage.getItem("anotherInput");
					check.checked = false;
                }else{
                    alert("Что-то пошло не так " + response.message);
                }
            }
        });
    });
});
window.onpopstate = function(event) {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
};

document.getElementById('formButton').addEventListener('click', e => {
history.pushState({page: 1}, "title 1", "?openForm");

});
document.getElementById('closeButton').addEventListener('click', e => {
	history.back();
});