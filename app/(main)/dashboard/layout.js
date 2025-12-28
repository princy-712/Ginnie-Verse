import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="px-5">
     <div className="text-6xl font-bold mb-5">
        Indus<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          try In
        </span>
        sights
      </div>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
      >
        {children}
      </Suspense>
    </div>
  );
}
