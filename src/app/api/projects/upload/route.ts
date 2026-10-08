import { randomUUID } from "node:crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const imageTypes: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif", "image/avif": "avif" };

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host")) return NextResponse.json({ message: "Invalid upload origin." }, { status: 403 });
    } catch { return NextResponse.json({ message: "Invalid upload origin." }, { status: 403 }); }
  }
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Invalid upload request." }, { status: 400 }); }
  const { fileType, fileSize } = body || {};
  if (typeof fileType !== "string" || !imageTypes[fileType] || !Number.isSafeInteger(fileSize) || fileSize <= 0 || fileSize > 10 * 1024 * 1024) {
    return NextResponse.json({ message: "Choose a JPG, PNG, WebP, GIF, or AVIF image up to 10 MB." }, { status: 400 });
  }
  const region = process.env.NEXT_PUBLIC_S3_REGION;
  const bucket = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  const accessKeyId = process.env.NEXT_PUBLIC_S3_ACCESS_KEY;
  const secretAccessKey = process.env.NEXT_S3_SECRET_KEY;
  if (!region || !bucket || !accessKeyId || !secretAccessKey) return NextResponse.json({ message: "Image uploads aren’t configured yet. You can add an existing image URL instead." }, { status: 503 });
  try {
    const client = new S3Client({ region, credentials: { accessKeyId, secretAccessKey }, requestChecksumCalculation: "WHEN_REQUIRED" });
    const key = `personal/v1/projects/${randomUUID()}.${imageTypes[fileType]}`;
    const url = await getSignedUrl(client, new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: fileType }), { expiresIn: 300 });
    const baseUrl = (process.env.S3_PUBLIC_URL || `https://${bucket}.s3.${region}.amazonaws.com`).replace(/\/$/, "");
    return NextResponse.json({ url, imageUrl: `${baseUrl}/${key}` });
  } catch {
    return NextResponse.json({ message: "Couldn’t prepare this upload. Please try again." }, { status: 500 });
  }
}
