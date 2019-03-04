const checkAndThrow = async () => {
  if (Math.random() < 0.02) {
    throw new Error('chaos is inevitable!');
  }
}

const checkAndInjectLatency = (context) => {
  if (Math.random() < 0.05) {
    const maxDelay = context && context.getRemainingTimeInMillis ? context.getRemainingTimeInMillis() : 1000;

    const delay = maxDelay * Math.random();

    await new Promise(res => setTimeout(res, delay));
  }
}

module.exports = {
  runWithChaos = async (fn, context) => {
    checkAndThrow();

    const data = await fn();

    await checkAndInjectLatency(context);

    return data;
  }
}