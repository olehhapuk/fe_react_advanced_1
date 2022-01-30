function uploadFile(inputElem) {
  const formData = new FormData();
  formData.append('avatar', inputElem.files[0]);

  fetch('/api/upload', {
    body: formData,
  });
}
