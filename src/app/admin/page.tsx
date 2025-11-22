import { db } from "@/dbConfig/dbConfig";
import React from "react";
import { blogTable } from "../../../db/schema";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const index = async () => {
  const blogData = await db.select().from(blogTable);
  return (
    <div className=" mt-24 max-w-7xl mx-auto px-4">
      <Link className=" my-2 hover:underline" href="/admin/blogs/">
        Create new blog
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Index</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>slug</TableHead>
            <TableHead>views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogData.map((data, idx) => {
            return (
              <TableRow key={idx}>
                <TableHead>{idx}</TableHead>
                <TableHead>{data?.title}</TableHead>
                <TableHead>
                  <Link href={"/admin/blogs/" + data?.slug || ""}>
                    {data?.slug}
                  </Link>
                </TableHead>
                <TableHead>{data?.viewCount}</TableHead>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default index;
