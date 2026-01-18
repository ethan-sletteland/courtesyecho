resource "aws_s3_bucket" "this" {
  bucket = local.domain_name

  force_destroy = false
}


resource "aws_s3_bucket_ownership_controls" "this" {
  bucket = aws_s3_bucket.this.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}


resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.this.id

  policy = templatefile("${path.module}/files/s3_policy_cloudfront.json.tftpl", {
    cloudfront_oai_iam_arn = aws_cloudfront_origin_access_identity.this.iam_arn
    s3_bucket_arn          = aws_s3_bucket.this.arn
  })
}


resource "aws_s3_bucket_website_configuration" "this" {
  bucket = aws_s3_bucket.this.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    //key = "error.html"
    key = "index.html"
  }
}


#resource "aws_s3_object" "index" {
#  bucket       = aws_s3_bucket.this.id
#  key          = "index.html"
#  content_type = "text/html"
#
#  content = templatefile("${path.module}/files/index.html.tftpl", {
#    domain_name = local.domain_name
#  })
#}
