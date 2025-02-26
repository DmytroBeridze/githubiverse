import { FC, useEffect, useState } from "react";

type DecorName =
  | "bigCircle"
  | "fourTriangles"
  | "twoRectangles"
  | "twoTriangles"
  | "fourCircle"
  | "quadrant"
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
    return <></>;
  }

  return <DecorComponent width={size} height={size} className={className} />;
};

export default Decor;

// import { FC } from "react";
// import { ReactComponent as DefaultElement } from "../../../resources/decor/darkTeme/bigCircle.svg";
// import { ReactComponent as BigCircle } from "../../../resources/decor/darkTeme/bigCircle.svg";
// import { ReactComponent as FourTriangles } from "../../../resources/decor/darkTeme/fourTriangles.svg";
// import { ReactComponent as TwoRectangles } from "../../../resources/decor/darkTeme/twoRectangles.svg";
// import { ReactComponent as TwoTriangles } from "../../../resources/decor/darkTeme/twoTriangles.svg";
// import { ReactComponent as FourCircle } from "../../../resources/decor/darkTeme/fourCircle.svg";

// import { ReactComponent as Quadrant } from "../../../resources/decor/quadrant.svg";
// import { ReactComponent as Semicircles } from "../../../resources/decor/semicircles.svg";

// type DecorName =
//   | "bigCircle"
//   | "fourTriangles"
//   | "semicircles"
//   | "twoRectangles"
//   | "twoTriangles"
//   | "fourCircle"
//   | "quadrant";

// interface DecorProps {
//   name: DecorName;
//   size?: string;
//   className?: string;
// // isDarkTheme:boolean
// }

// const Decor: FC<DecorProps> = ({ name, size, className }) => {
//   const decorElements = {
//     bigCircle: BigCircle,
//     fourTriangles: FourTriangles,
//     quadrant: Quadrant,
//     semicircles: Semicircles,
//     twoRectangles: TwoRectangles,
//     twoTriangles: TwoTriangles,
//     fourCircle: FourCircle,
//   };
//   const DecorComponent = decorElements[name] || DefaultElement;
//   return <DecorComponent width={size} height={size} className={className} />;
// };

// export default Decor;
