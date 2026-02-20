
import { useEffect } from "react";
export default function PhosphorIconInit() {

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css";
    document.head.appendChild(link);
  }, []);

  return null
}
