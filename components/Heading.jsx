import { orbitron } from "@/app/fonts";

export default function Heading({ children }) {
  return (
    <h1
      className={`pb-3 font-orbitron font-bold text-2xl ${orbitron.className}`}
    >
      {children}
    </h1>
    //   <h1
    //   className={`pb-3 font-orbitron font-bold text-2xl ${orbitron.className}`}
    // >
    //   {children}
    // </h1>
  );
}
