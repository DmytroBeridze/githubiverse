export const scrollUtils = (isOpen: boolean) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else document.body.style.overflow = "auto";
};

export const resize = (
  setIsBurgerOpen: React.Dispatch<React.SetStateAction<boolean>>,
  scrollUtils: (state: boolean) => void
) => {
  if (window.innerWidth > 768) {
    setIsBurgerOpen(false);
    scrollUtils(false);
  }
};
