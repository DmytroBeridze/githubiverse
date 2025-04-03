import { FC, useEffect, useState } from "react";

type DecorName =
  | "bigCircle"
  | "fourTriangles"
  | "twoRectangles"
  | "twoTriangles"
  | "fourCircle"
  | "quadrant"
  | "fourCircleFooter"
  | "semicircles";

interface DecorProps {
  name: DecorName;
  size?: string;
  className?: string;
  isDarkTheme: boolean;
}

const Decor: FC<DecorProps> = ({ name, size, className, isDarkTheme }) => {
  const [DecorComponent, setDecorComponent] = useState<FC<
    React.SVGProps<SVGSVGElement>
  > | null>(null);

  const loadSVG = async () => {
    let component: FC | null = null;

    if (isDarkTheme) {
      switch (name) {
        case "bigCircle":
          component = (
            await import("../../../resources/decor/darkTheme/bigCircle.svg")
          ).ReactComponent;
          break;
        case "fourTriangles":
          component = (
            await import("../../../resources/decor/darkTheme/fourTriangles.svg")
          ).ReactComponent;
          break;
        case "twoRectangles":
          component = (
            await import("../../../resources/decor/darkTheme/twoRectangles.svg")
          ).ReactComponent;
          break;
        case "twoTriangles":
          component = (
            await import("../../../resources/decor/darkTheme/twoTriangles.svg")
          ).ReactComponent;
          break;
        case "fourCircle":
          component = (
            await import("../../../resources/decor/darkTheme/fourCircle.svg")
          ).ReactComponent;
          break;
        case "quadrant":
          component = (
            await import("../../../resources/decor/darkTheme/quadrant.svg")
          ).ReactComponent;
          break;
        case "fourCircleFooter":
          component = (
            await import(
              "../../../resources/decor/darkTheme/fourCircleFooter.svg"
            )
          ).ReactComponent;
          break;
        case "semicircles":
          component = (
            await import("../../../resources/decor/darkTheme/semicircles.svg")
          ).ReactComponent;
          break;
        default:
          break;
      }
    } else {
      switch (name) {
        case "bigCircle":
          component = (
            await import("../../../resources/decor/lightTheme/bigCircle.svg")
          ).ReactComponent;
          break;
        case "fourTriangles":
          component = (
            await import(
              "../../../resources/decor/lightTheme/fourTriangles.svg"
            )
          ).ReactComponent;
          break;
        case "twoRectangles":
          component = (
            await import(
              "../../../resources/decor/lightTheme/twoRectangles.svg"
            )
          ).ReactComponent;
          break;
        case "twoTriangles":
          component = (
            await import("../../../resources/decor/lightTheme/twoTriangles.svg")
          ).ReactComponent;
          break;
        case "fourCircle":
          component = (
            await import("../../../resources/decor/lightTheme/fourCircle.svg")
          ).ReactComponent;
          break;

        case "quadrant":
          component = (
            await import("../../../resources/decor/lightTheme/quadrant.svg")
          ).ReactComponent;
          break;
        case "fourCircleFooter":
          component = (
            await import(
              "../../../resources/decor/lightTheme/fourCircleFooter.svg"
            )
          ).ReactComponent;
          break;
        case "semicircles":
          component = (
            await import("../../../resources/decor/lightTheme/semicircles.svg")
          ).ReactComponent;
          break;

        default:
          break;
      }
    }
    setDecorComponent(component);
  };

  useEffect(() => {
    loadSVG();
  }, [name, isDarkTheme]);

  if (!DecorComponent) {
    return null;
  }

  return <DecorComponent width={size} height={size} className={className} />;
};

export default Decor;
