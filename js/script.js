// Tailwind Configration
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
};

const generateForm = document.querySelector("#qrcode-form");
const spinner = document.querySelector("#spinner");
const qr = document.querySelector("#qrcode");
const url = document.querySelector("#url");
const size = document.querySelector("#size");

const onGenerateSubmit = (e) => {
  e.preventDefault();
  clearUI();
  displaySpinner("block");
  setTimeout(() => {
    displaySpinner("none");
    generateQRcode(url.value, size.value);

    setTimeout(() => {
      const saveUrl = qr.querySelector("img").src;
      createSaveBtn(saveUrl);
    }, 50);
  }, 1000);
};

const displaySpinner = (s) => {
  spinner.style.display = s;
};
generateForm.addEventListener("submit", onGenerateSubmit);

const generateQRcode = (url, size) => {
  const qrcode = new QRCode(qr, {
    text: url,
    width: size,
    height: size,
  });
};

const clearUI = () => {
  qr.innerHTML = "";
  document.querySelector("#save-button")?.remove();
};

const createSaveBtn = (saveUrl) => {
  const saveButton = document.createElement("a");
  saveButton.id = "save-button";
  saveButton.classList =
    "bg-blue-900 text-white py-2 px-4 my-5 w-max self-center rounded hover:bg-blue-700";
  saveButton.href = saveUrl;
  saveButton.download = "qrcode";
  saveButton.innerHTML = "Export Image";
  document.querySelector("#generated").appendChild(saveButton);
};
