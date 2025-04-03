import { useEffect, useState } from "react";

const useRensponsiveRadius = () => {
  const [radius, setRadius] = useState({
    outerRadius: 50,
    innerRadius: 30,
    fontSize: 14,
    containerHeight: 180,
  });

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 480) {
        setRadius({
          outerRadius: 36,
          innerRadius: 10,
          fontSize: 10,
          containerHeight: 220,
        });
      } else if (window.innerWidth <= 620) {
        setRadius({
          outerRadius: 50,
          innerRadius: 30,
          fontSize: 14,
          containerHeight: 280,
        });
      } else if (window.innerWidth < 900 && window.innerWidth >= 768) {
        setRadius({
          outerRadius: 30,
          innerRadius: 10,
          fontSize: 10,
          containerHeight: 230,
        });
      } else if (window.innerWidth < 1180) {
        setRadius({
          outerRadius: 40,
          innerRadius: 20,
          fontSize: 12,
          containerHeight: 250,
        });
      } else
        setRadius({
          outerRadius: 50,
          innerRadius: 30,
          fontSize: 14,
          containerHeight: 280,
        });
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return radius;
};

export default useRensponsiveRadius;
