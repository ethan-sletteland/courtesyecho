resource "aws_cloudfront_origin_access_identity" "this" {
  comment = local.app-env
}


resource "aws_cloudfront_distribution" "this" {
  aliases = [
    local.domain_name
  ]

  comment             = local.app-env
  default_root_object = "index.html"
  enabled             = true
  is_ipv6_enabled     = true

  origin {
    domain_name = aws_s3_bucket.this.bucket_regional_domain_name
    origin_id   = "S3-static-site"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    target_origin_id       = "S3-static-site"
    viewer_protocol_policy = "redirect-to-https"
    
    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.this.arn
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }
}
