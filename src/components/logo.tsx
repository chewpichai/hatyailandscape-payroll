import Link from "next/link";
import Image from "next/image";
import { getPath } from "@/libs/utils";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src={getPath("/logo.webp")}
        alt="Hatyai Landscape"
        width={50}
        height={50}
        priority={true}
      />
    </Link>
  );
}
