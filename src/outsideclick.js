module.exports = {
  bind: function (el, binding, vnode) {
    el.eventOnClick = function (event) {
      var dragging = el.getAttribute('data-dragging');
      // Check that the click was outside the el and its children, and wasn't a drag
      if (!(el == event.target || el.contains(event.target)) && !dragging) {
        // call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.addEventListener('click', el.eventOnClick);
    document.addEventListener('touchend', el.eventOnClick);
  }, unbind: function (el) {
    document.removeEventListener('click', el.eventOnClick);
    document.removeEventListener('touchend', el.eventOnClick);
    el.removeAttribute('data-dragging');
  },
};