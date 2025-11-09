import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectBlogCategories({ value, onChange }: any) {
  return (
    <div className="flex w-full flex-col gap-1">
      <p className="font-medium">Blog Category</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mb-4 w-full">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Blog Categories</SelectLabel>
            {blogCategories.map((item) => {
              return (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export const blogCategories = [
  { value: "web-development", label: "Web Development" },
  { value: "app-development", label: "App Development" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "personal-projects", label: "Personal Projects" },
  { value: "case-studies", label: "Case Studies" },
  { value: "portfolio-tips", label: "Portfolio Tips" },
  { value: "freelancing", label: "Freelancing" },
  { value: "career-growth", label: "Career Growth" },
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "next-js", label: "Next.js" },
  { value: "node-js", label: "Node.js" },
  { value: "typescript", label: "TypeScript" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "ai-tools", label: "AI Tools" },
  { value: "blockchain", label: "Blockchain" },
  { value: "devops", label: "DevOps" },
  { value: "product-design", label: "Product Design" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "flutter", label: "Flutter" },
  { value: "adobe-photoshop", label: "Adobe Photoshop" },
  { value: "branding", label: "Branding" },
  { value: "content-creation", label: "Content Creation" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "seo", label: "SEO" },
  { value: "entrepreneurship", label: "Entrepreneurship" },
  { value: "remote-work", label: "Remote Work" },
  { value: "tech-news", label: "Tech News" },
  { value: "productivity", label: "Productivity" },
  { value: "tools-resources", label: "Tools & Resources" },
];

export const blogCategorySummery = [
  { value: "all", label: "All" },
  { value: "app-development", label: "App Development" },
  { value: "dating", label: "Dating" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "blockchain", label: "Blockchain" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "shopify", label: "Shopify" },
];

export const blogUser = [
  {
    name: "Ashish Bishnoi",
    image:
      "https://av-blog.s3.ap-south-1.amazonaws.com/uploads/ashish-bishnoi.jpeg",
    value: "ashish-bishnoi",
  },
];
