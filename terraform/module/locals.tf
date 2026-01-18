locals {
  app-env = "${var.config.identity.app}-${var.config.identity.env}"

  domain_name = (var.config.route53.is_apex
    ? var.config.route53.apex_domain
    : "${var.config.identity.env}.${var.config.route53.apex_domain}"
  )
}
