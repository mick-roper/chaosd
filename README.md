# chaosd

A management layer for caos engineering practices.

## Control Plane

This application mananges the chaos. From here you can:

* view the gremlins that are connected to the control plance
* invoke adhoc chaos commands
* create new chaos incidents - you can also (try) to revoke them if you feel they have gone too far.

### Security

We're not oblivious to the obvious concerns about bad actors hijacking a gremlin and killing stuff with wild abandon. Ironically, if you have a good grasp of chaos engineering practices then this shouldn't be a problem, but since these things take time and the purposed of chaosd is to 'sandbox' your chaos, we are putting security front and centre. There are a couple of things you can do to minimise the blast radius:

* run the control plane on the network as the gremlins, and then wrap that network in a firewall to prevent external access to the gremlins. Gremlins can be configured to listen on a non-standard port to help with this.
* run the control plane with MFA enabled (```this is currently in development```) this means that before a gremlin acts on a command it will challenge the control plane to validate the command. The control plane will then challenge the user invoking the command via a different device.
* restrict what your gremlins can do. Run them with minimal handlers, and give them minimal permissions. It is better to run several gremlins that each do one thing, than one uber-gremlin that can bring down everything in an account. Minimising the blast radius is key!

## Gremlins

Gremlins are applications that run somewhere within your application. Gremlins take their orders from a control plane, and through these command they introduce chaos!

The plan is for gremlins to be created for each of the major cloud providers, plus on-prem. As such the ```ability to scaffold a gremlin is currently in development.```

### AWS Gremlins

These little tinkers run on ECS. They can interract with anything that is:

* available to the AWS SDK
* allowable based on their IAM permissions
