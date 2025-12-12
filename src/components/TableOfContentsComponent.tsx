import { useEffect } from "react";

function TableOfContents({ content }) {
  useEffect(() => {
    const headings = document.querySelectorAll(
      ".prose-styles h1, .prose-styles h2, .prose-styles h3"
    );
    const tocContainer = document.getElementById("table-of-contents");

    if (headings.length > 0 && tocContainer) {
      const tocList = document.createElement("ul");
      tocList.classList.add("text-md", "[&>*:nth-child(1)]:uppercase");
      headings.forEach((heading) => {
        const listItem = document.createElement("li");
        listItem.classList.add("py-0");
        const link = document.createElement("a");
        link.textContent = heading.textContent;
        link.href = `#${heading.id}`;
        link.classList.add(
          "text-md",
          "hover:underline",
          "hover:text-accent-600"
        );
        listItem.appendChild(link);
        tocList.appendChild(listItem);
      });
      tocContainer.appendChild(tocList);
      tocContainer.classList.remove("hidden");
    }
  }, [content]);

  return <></>;
}

export default TableOfContents;
