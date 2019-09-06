var popup = document.querySelector(".popup");
var layout = popup.querySelector(".popup__layout");
var wrapper = popup.querySelector(".popup__wrapper");
var popupShow = document.querySelector(".address__button");
var popupClose = popup.querySelector(".popup__close");
var username = popup.querySelector(".popup__username");
var email = popup.querySelector(".popup__email");
var textarea = popup.querySelector(".popup__textarea");
var form = popup.querySelector(".popup__form");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

if (popupShow.classList.contains("no-js")) {
  popup.classList.remove("popup__no-js");
  popupShow.classList.remove("no-js");
  popupShow.setAttribute("href", "#");
}

try {
  storageName = localStorage.getItem("username");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

popupShow.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.add("popup__show");
  layout.classList.add("popup__slide");

  if (!storageName && !storageEmail) {
    username.focus();
  } else if (!storageName && storageEmail) {
    email.value = storageEmail;
    username.focus();
  } else if (storageName && !storageEmail) {
    username.value = storageName;
    email.focus();
  } else {
    username.value = storageName;
    email.value = storageEmail;
    textarea.focus();
  }
});

form.addEventListener("submit", function(evt) {
  if (!username.value || !email.value || !textarea.value) {
    evt.preventDefault();
    wrapper.classList.remove("popup__error");
    setTimeout(function() {
      wrapper.classList.add("popup__error");
    }, 10);
  } else if (isStorageSupport) {
    localStorage.setItem("storageName", username.value);
    localStorage.setItem("storageEmail", email.value);
  }
});

popupClose.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.remove("popup__show");
  layout.classList.remove("popup__slide");
  wrapper.classList.remove("popup__error");
});

document.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("popup__show")) {
      popup.classList.remove("popup__show");
      layout.classList.remove("popup__slide");
      wrapper.classList.remove("popup__error");
    }
  }
});
