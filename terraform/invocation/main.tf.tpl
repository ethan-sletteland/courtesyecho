terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket       = "${COURTESYECHO_STATE_S3_BUCKET_NAME}"
    key          = "${COURTESYECHO_STATE_S3_KEY_BASE}/state/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }
}


provider "aws" {
  profile = "${AWS_PROFILE}"
  region  = "us-east-1"

  default_tags {
    tags = {
      Application     = "courtesyecho"
      Environment     = "${COURTESYECHO_ENV}"
      Name            = "courtesyecho-${COURTESYECHO_ENV}"
      TerraformModule = "courtesyecho"
    }
  }
}


module "courtesyecho-${COURTESYECHO_ENV}" {
  source = "${MODULE_PATH}"

  config  = var.config
}
