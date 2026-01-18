variable "config" {
  type = object({

    identity = object({
      app = string
      env = string
    })

    route53 = object({
      apex_domain = string
      is_apex     = bool
    })

  })
}
