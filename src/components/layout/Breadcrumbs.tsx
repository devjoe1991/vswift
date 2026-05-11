import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

interface BreadcrumbsProps {
  items: Crumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 pt-6 text-sm text-[#1e3a5f]/70"
      >
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1">
                {isLast ? (
                  <span aria-current="page" className="text-[#1e3a5f] font-medium">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="hover:text-[#87CEEB] transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast && <span className="mx-1 text-[#1e3a5f]/40">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
