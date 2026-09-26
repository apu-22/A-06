import Banner from "@/components/homepage/banner";

import Image from "next/image";
import FitlogLibrary from "./workouts/page";

export default function Home() {
  return (
    <>
      <Banner />
      <FitlogLibrary />
    </>
  );
}
