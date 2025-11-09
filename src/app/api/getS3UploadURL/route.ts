import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileType } = await req.json();
    if (
      !process.env.NEXT_PUBLIC_S3_REGION ||
      !process.env.NEXT_PUBLIC_S3_ACCESS_KEY ||
      !process.env.NEXT_S3_SECRET_KEY
    ) {
      throw new Error("Missing required S3 environment variables");
    }

    const s3 = new S3Client({
      region: process.env.NEXT_PUBLIC_S3_REGION,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_S3_SECRET_KEY,
      },
    });
    const key = `personal/v1/blogs/${Date.now()}.${fileType.split("/")[1]}`;

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 300 });

    return new NextResponse(JSON.stringify({ data: { url, key } }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
