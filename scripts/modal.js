export const Modal = (id) => {
  this.id = id;
  this.modal = document.getElementById(id);
  this.open = function () {
    this.modal.style.visibility = "visible";
  };
  this.close = function () {
    this.modal.style.visibility = "hidden";
  };
};
