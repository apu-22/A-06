import Banner from "@/components/homepage/banner";
import FitlogLibrary from "@/components/homepage/workout_card";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Banner />
      <FitlogLibrary />
    </>
  );
}
