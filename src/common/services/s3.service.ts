import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor() {
    this.s3Client = new S3Client({
      // region: ""
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.bucketName = process.env.AWS_S3_BUCKET_NAME;
  }

 async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
  const fileExtension = file.originalname.split('.').pop();
  const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

  console.log("Uploading file:", file.originalname);

  const upload = new Upload({
    client: this.s3Client,
    params: {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer, // ✅ use buffer directly
      ContentType: file.mimetype,
    },
  });

  upload.on("httpUploadProgress", (progress) => {
    console.log(progress);
  });

  await upload.done();
  console.log("✅ File uploaded successfully!");

  return `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;
}

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }
}
