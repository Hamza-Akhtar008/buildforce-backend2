# Labour Profile Module

This module handles labour profile creation with file uploads to S3.

## Features

- Multipart form data support for file uploads
- S3 integration for document storage
- Support for resume, ID proof, certificate, and portfolio uploads
- File type validation (PDF, images, Word documents)
- 10MB file size limit

## Environment Variables Required

Add these to your `.env` file:

```env
# AWS S3 Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
S3_BUCKET_NAME=buildforce-documents
```

## API Usage

### Create Labour Profile

**Endpoint:** `POST /labour-profile`

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `userId` (number, required): User ID to attach the profile to
- `resume` (file, optional): Resume document
- `idProof` (file, optional): ID proof document
- `certificate` (file, optional): Certificate document
- `portfolio` (file, optional): Portfolio document
- `skillLevel` (enum, optional): Skill level
- `experienceRange` (enum, optional): Experience range
- `verificationStatus` (enum, optional): Verification status
- `skillIds` (array, optional): Array of skill IDs

**Supported File Types:**
- PDF documents
- Images (JPEG, PNG, JPG)
- Word documents (.doc, .docx)

**File Size Limit:** 10MB per file

## File Storage

Files are uploaded to S3 with the following structure:
```
s3://your-bucket/labour-profiles/
├── resume/
│   └── {uuid}.{extension}
├── idProof/
│   └── {uuid}.{extension}
├── certificate/
│   └── {uuid}.{extension}
└── portfolio/
    └── {uuid}.{extension}
```

The service automatically generates unique filenames and returns public URLs for the uploaded documents.
