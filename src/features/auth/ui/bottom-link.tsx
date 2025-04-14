import Link from "next/link";

type LinkProps = {
  text: string;
  linkText: string;
  url: string;
};

export function BottomLink({ text, linkText, url }: LinkProps) {
  return (
    <p className="text-sm text-primary/50">
      {text}{" "}
      <Link href={url} className="font-medium text-primary hover:underline">
        {linkText}
      </Link>
    </p>
  );
}
