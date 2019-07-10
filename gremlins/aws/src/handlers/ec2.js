module.exports.createEc2Vector = (ec2Client) => {
  if (!ec2Client) {
    throw new Error('ec2Client is not defined')
  }

  return {
    terminateInstance: (instanceId) => {
      console.log(`terminating instance ${instanceId}`) // eslint-disable-line
    }
  }
}