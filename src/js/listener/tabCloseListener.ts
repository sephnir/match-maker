export default () => {
  window.addEventListener("beforeunload", function(e) {
    let confirmationMessage =
      "Unsaved changes will be lost. " +
      "Are you sure you want to leave this page?";

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
  });
};
