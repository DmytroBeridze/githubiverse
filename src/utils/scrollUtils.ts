export const scrollUtils = (isOpen: boolean) => {
  if (isOpen) {
    document.body.style.overflow = "auto";
  } else document.body.style.overflow = "hidden";
};
